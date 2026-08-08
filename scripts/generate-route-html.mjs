// Writes a static <head> for every route, in every language, so link previews
// and crawlers get correct metadata without executing the SPA.
//
// Case study routes additionally get their text written into the root element:
// title, summary and the caption for every screenshot. See renderCaseStudy
// below for why that markup is worth the trouble.
//
// Also emits sitemap.xml and the blog's RSS feed from the same route table
// (scripts/site-routes.mjs), which is why they can no longer drift apart the
// way the hand-maintained sitemap did.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  AUTHOR,
  BLOG_POSTS,
  CONTENT_UPDATED,
  LOCALES,
  NOINDEX_ROUTES,
  SITE_URL,
  allRoutes,
  localizedPath,
} from './site-routes.mjs';
// Both are plain string dictionaries with no asset imports, so the build can
// read them directly rather than parsing them the way Data.jsx has to be.
import { projectSummaries } from '../src/i18n/projects.mjs';
import { projectCaptions } from '../src/i18n/captions/index.mjs';

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

const escapeText = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// The app mounts with createRoot, which empties #root on its first render — so
// anything written here is a pre-JavaScript stand-in, not markup React
// hydrates. It exists because the case study text (the summary, and one or two
// sentences per screenshot) was otherwise reachable only by executing the
// bundle: correct for a browser, invisible to anything that reads HTML and
// stops. The wording is the same text the mounted page renders, in the same
// language as the rest of the document.
//
// It is deliberately plain and visible. Hiding it would be cloaking, and the
// container/section classes come from the entry stylesheet, which is already
// loaded by the time this parses, so the stand-in is legible rather than raw.
const renderCaseStudy = (route, lang) => {
  const { id, title } = route.project;
  const summary = projectSummaries[lang]?.[id] ?? projectSummaries.en[id] ?? '';
  const captions = projectCaptions[lang]?.[id] ?? projectCaptions.en[id] ?? [];

  const paragraphs = [summary, ...captions]
    .filter(Boolean)
    .map((text) => `      <p>${escapeText(text)}</p>`)
    .join('\n');

  return `<div class="container section">
      <h1>${escapeText(title)}</h1>
${paragraphs}
    </div>`;
};

const replaceMeta = (html, route, lang) => {
  const url = `${SITE_URL}${localizedPath(lang, route.path)}`;
  const image = `${SITE_URL}${route.image}`;
  const title = escapeAttribute(route.title);
  // A case study can describe itself in the language of the page it is on;
  // the hand-written routes only have their English copy to offer.
  const localized = route.project ? projectSummaries[lang]?.[route.project.id] : undefined;
  const description = escapeAttribute(localized || route.description);

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

  // Publication metadata for anything that is an article — both blog posts and
  // case studies. Without it a link preview gives no sense of how old the piece
  // is, and a two-year-old post reads as current.
  const articleDate = route.published ?? route.updated;
  const articleMeta =
    route.type === 'article'
      ? `\n    ${[
          `<meta property="article:author" content="${escapeAttribute(AUTHOR)}" />`,
          ...(articleDate
            ? [`<meta property="article:published_time" content="${articleDate}T00:00:00Z" />`]
            : []),
        ].join('\n    ')}`
      : '';

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
      `<meta property="og:type" content="${route.type}" />${articleMeta}`
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
      `<meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />`
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

  if (route.project) {
    result = result.replace(
      '<div id="root"></div>',
      `<div id="root">${renderCaseStudy(route, lang)}</div>`
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
