// Builds sitemap.xml and the blog's RSS feed.
//
// Split out of generate-route-html.mjs so the Vite dev server can serve the
// very same output at /sitemap.xml and /rss.xml. Both files are written only
// into dist/, which meant they 404'd during `npm run dev` — so the one link in
// the footer pointing at the feed, and every <link rel="alternate"> in the
// <head>, were dead in the only environment anyone actually clicks them in.
//
// Pure functions with no filesystem access, for the same reason api/guard.js
// is shared: a thing that behaves differently in dev and prod is a thing whose
// bugs are found in production.

import { AUTHOR, BLOG_POSTS, CONTENT_UPDATED, LOCALES, SITE_URL, localizedPath } from './site-routes.mjs';

const HREFLANG = { en: 'en', 'zh-Hans': 'zh-Hans', 'zh-Hant': 'zh-Hant', ja: 'ja' };

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const buildSitemap = (routes) => {
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
    <lastmod>${route.published ?? route.updated ?? CONTENT_UPDATED}</lastmod>
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

export const buildFeed = (posts = BLOG_POSTS) => {
  const items = posts.map((post) => {
    const url = `${SITE_URL}${post.path}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.published}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
  });

  const latest = posts.reduce(
    (newest, post) => (post.published > newest ? post.published : newest),
    posts[0].published
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
