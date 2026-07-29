// Writes a static <head> for every route, in every language, so link previews
// and crawlers get correct metadata without executing the SPA.
//
// Also emits sitemap.xml and the blog's RSS feed from the same route table
// (scripts/site-routes.mjs), which is why they can no longer drift apart the
// way the hand-maintained sitemap did.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  AUTHOR,
  BLOG_POSTS,
  LOCALES,
  NOINDEX_ROUTES,
  SITE_URL,
  allRoutes,
  localizedPath,
} from './site-routes.mjs';

const DIST_DIR = join(process.cwd(), 'dist');

const HREFLANG = { en: 'en', 'zh-Hans': 'zh-Hans', 'zh-Hant': 'zh-Hant', ja: 'ja' };
const OG_LOCALE = { en: 'en_US', 'zh-Hans': 'zh_CN', 'zh-Hant': 'zh_TW', ja: 'ja_JP' };

const escapeAttribute = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const replaceMeta = (html, route, lang) => {
  const url = `${SITE_URL}${localizedPath(lang, route.path)}`;
  const image = `${SITE_URL}${route.image}`;
  const title = escapeAttribute(route.title);
  const description = escapeAttribute(route.description);

  // Alternates for every translation of this route, plus x-default.
  const alternates = route.noindex
    ? ''
    : `\n    ${[
        ...LOCALES.map(
          (code) =>
            `<link rel="alternate" hreflang="${HREFLANG[code]}" href="${SITE_URL}${localizedPath(code, route.path)}" />`
        ),
        `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${localizedPath('en', route.path)}" />`,
      ].join('\n    ')}`;

  const ogLocales = `\n    ${[
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    ...LOCALES.filter((code) => code !== lang).map(
      (code) => `<meta property="og:locale:alternate" content="${OG_LOCALE[code]}" />`
    ),
  ].join('\n    ')}`;

  let result = html
    .replace(/<html lang="[^"]*">/, `<html lang="${HREFLANG[lang]}">`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta[^>]+name="description"[^>]*>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link[^>]+rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${url}" />${alternates}`
    )
    .replace(
      /<meta[^>]+property="og:type"[^>]*>/,
      `<meta property="og:type" content="${route.type}" />`
    )
    .replace(
      /<meta[^>]+property="og:url"[^>]*>/,
      `<meta property="og:url" content="${url}" />${ogLocales}`
    )
    .replace(
      /<meta[^>]+property="og:title"[^>]*>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta[^>]+property="og:description"[^>]*>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta[^>]+property="og:image"[^>]*>/,
      `<meta property="og:image" content="${image}" />`
    )
    .replace(
      /<meta[^>]+name="twitter:title"[^>]*>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta[^>]+name="twitter:description"[^>]*>/,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      /<meta[^>]+name="twitter:image"[^>]*>/,
      `<meta name="twitter:image" content="${image}" />`
    );

  if (route.noindex) {
    result = result.replace(
      /<meta[^>]+name="robots"[^>]*>/,
      '<meta name="robots" content="noindex, follow" />'
    );
  }

  return result;
};

const writeRoute = async (baseHtml, route, lang) => {
  const html = replaceMeta(baseHtml, route, lang);
  const path = localizedPath(lang, route.path);

  if (path === '/') {
    await writeFile(join(DIST_DIR, 'index.html'), html, 'utf8');
    return;
  }

  // Both spellings, so the route resolves with or without a trailing slash.
  const cleanUrlOutput = join(DIST_DIR, `${path.slice(1)}.html`);
  const trailingSlashOutput = join(DIST_DIR, path.slice(1), 'index.html');
  await mkdir(dirname(cleanUrlOutput), { recursive: true });
  await mkdir(dirname(trailingSlashOutput), { recursive: true });
  await Promise.all([
    writeFile(cleanUrlOutput, html, 'utf8'),
    writeFile(trailingSlashOutput, html, 'utf8'),
  ]);
};

const buildSitemap = (routes) => {
  const today = new Date().toISOString().slice(0, 10);

  const entries = routes.flatMap((route) =>
    LOCALES.map((lang) => {
      const loc = `${SITE_URL}${localizedPath(lang, route.path)}`;
      // Each URL declares every translation of itself, which is what tells
      // Google the four versions are one page rather than duplicates.
      const alternates = [
        ...LOCALES.map(
          (code) =>
            `    <xhtml:link rel="alternate" hreflang="${HREFLANG[code]}" href="${SITE_URL}${localizedPath(code, route.path)}" />`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${localizedPath('en', route.path)}" />`,
      ].join('\n');

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternates}
    <lastmod>${route.published ?? today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
};

const buildFeed = () => {
  const items = BLOG_POSTS.map((post) => {
    const url = `${SITE_URL}${post.path}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.published}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
  });

  const latest = BLOG_POSTS.reduce(
    (newest, post) => (post.published > newest ? post.published : newest),
    BLOG_POSTS[0].published
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${AUTHOR} | Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>Articles about software projects, AI, photography, and travel by ${escapeXml(AUTHOR)}.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${latest}T00:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;
};

const baseHtml = await readFile(join(DIST_DIR, 'index.html'), 'utf8');
const routes = await allRoutes();

for (const route of routes) {
  for (const lang of LOCALES) {
    await writeRoute(baseHtml, route, lang);
  }
}

// The 404 shell is language-neutral: Vercel serves it for any unmatched path,
// and the SPA renders the right language once it boots.
for (const route of NOINDEX_ROUTES) {
  await writeRoute(baseHtml, route, 'en');
}

await writeFile(join(DIST_DIR, 'sitemap.xml'), buildSitemap(routes), 'utf8');
await writeFile(join(DIST_DIR, 'rss.xml'), buildFeed(), 'utf8');

console.log(
  `Generated ${routes.length} routes x ${LOCALES.length} languages, plus sitemap.xml and rss.xml.`
);
