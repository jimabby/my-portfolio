// Writes dist/sw.js after the bundle exists, with this build's hashed asset
// names baked into the precache list.
//
// manifest.json already declared `display: standalone` and shipped all three
// icon sizes, but with no service worker the site was not actually
// installable — the manifest was decorative. This adds the missing half, and
// makes a repeat visit render from cache instead of the network.
//
// Deliberately conservative about what it caches:
//   - the entry HTML, CSS and JS, plus the icons and the offline page
//   - never /api/*, which must always hit the network
//   - never a prerendered route's HTML beyond the shell, because those carry
//     per-route <head> metadata that must stay fresh for crawlers

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST_DIR = join(process.cwd(), 'dist');

// Cache name is derived from the build's own asset hashes, so a deploy that
// changes nothing keeps the old cache and a deploy that changes anything
// invalidates it wholesale. No hand-bumped version number to forget.
const assets = await readdir(join(DIST_DIR, 'assets'));

// The entry chunk and the entry stylesheet — everything the shell needs to
// paint. Route chunks are left to the network and the runtime cache; there
// are twelve of them and most visitors open one.
const entryJs = assets.find((name) => /^index-.*\.js$/.test(name));
const entryCss = assets.find((name) => /^index-.*\.css$/.test(name));

if (!entryJs || !entryCss) {
  throw new Error('Service worker: could not find the entry chunk in dist/assets');
}

const PRECACHE = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  `/assets/${entryJs}`,
  `/assets/${entryCss}`,
];

const version = `${entryJs}-${entryCss}`;

const sw = `// GENERATED FILE - written by scripts/generate-service-worker.mjs.
// The cache name carries this build's asset hashes, so deploying new assets
// retires the old cache and deploying identical ones keeps it warm.
const CACHE = 'portfolio-${version}';
const PRECACHE = ${JSON.stringify(PRECACHE, null, 2)};

self.addEventListener('install', (event) => {
  // Individually, not addAll: one 404 in the list must not fail the whole
  // install and leave the site with no worker at all.
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Network-first for navigations, cache-first for hashed assets.
//
// Navigations must not be served stale: every route carries its own <head>,
// and a cached shell would show yesterday's metadata. Hashed assets can never
// change under a fixed URL, so serving them from cache is always correct.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // The chat and contact endpoints are never cached, and never served stale.
  if (url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match('/offline.html'))
        )
    );
    return;
  }

  const isImmutable =
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/responsive/') ||
    url.pathname.startsWith('/icons/');

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Only store what is safe to store: same-origin, successful, and
        // either content-hashed or an icon.
        if (isImmutable && response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
`;

await writeFile(join(DIST_DIR, 'sw.js'), sw, 'utf8');

// Read the built shell so the offline page inherits the real stylesheet name.
const offline = await readFile(join(process.cwd(), 'public/offline.html'), 'utf8');
await writeFile(
  join(DIST_DIR, 'offline.html'),
  offline.replace('__ENTRY_CSS__', `/assets/${entryCss}`),
  'utf8'
);

console.log(`Service worker: precaching ${PRECACHE.length} entries.`);
