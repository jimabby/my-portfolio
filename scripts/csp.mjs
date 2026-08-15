// Builds the site's Content-Security-Policy, with the hash of every inline
// script that has to keep running.
//
// script-src carried 'unsafe-inline' solely for the theme bootstrap in
// index.html — the snippet that paints the right theme before first paint. One
// allowance for one known snippet defeated the directive for every script on
// the page. Hashing it instead means the browser will run that exact snippet
// and nothing else injected inline.
//
// JSON-LD blocks are deliberately not hashed. `application/ld+json` is a data
// block, not executable script, so script-src does not govern it — which is
// what lets Testimonials and Resume keep injecting structured data at runtime
// under a hash-based policy.
//
// Pure functions; scripts/generate-csp.mjs writes the result into vercel.json
// and a test compares the committed file against a fresh build of it.

import { createHash } from 'node:crypto';

// Only <script> elements with no `type` and no `src` — the ones a browser
// executes and CSP therefore governs.
export function inlineScripts(html) {
  return [...html.matchAll(/<script(?![^>]*\b(?:src|type)=)[^>]*>([\s\S]*?)<\/script>/g)].map(
    ([, body]) => body
  );
}

export const sha256 = (source) =>
  `'sha256-${createHash('sha256').update(source, 'utf8').digest('base64')}'`;

export function buildCsp(hashes) {
  const scriptSrc = ["'self'", ...hashes, 'https://va.vercel-scripts.com'].join(' ');

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    // Still 'unsafe-inline': React sets element style attributes, and Swiper
    // writes inline transforms on every frame. Hashes cannot cover either.
    "style-src 'self' 'unsafe-inline'",
    // Self only, now that Poppins is served from this origin instead of
    // fonts.gstatic.com. data: remains for anything inlined by the bundler.
    "font-src 'self' data:",
    "img-src 'self' data:",
    "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
    // The service worker registered by src/registerServiceWorker.js.
    "worker-src 'self'",
    "manifest-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ');
}

export function cspFrom(html) {
  return buildCsp(inlineScripts(html).map(sha256));
}
