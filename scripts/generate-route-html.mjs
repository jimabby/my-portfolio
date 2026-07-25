import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE_URL = 'https://jimkong-portfolio.vercel.app';
const DIST_DIR = join(process.cwd(), 'dist');

const routes = [
  {
    path: '/blog',
    title: 'Jim Kong | Blog',
    description: 'Articles about software projects, AI, photography, and travel by Jim Kong.',
    image: '/og/hermes.webp',
    type: 'website',
  },
  {
    path: '/blog/grand-hotel-taipei',
    title: 'Staying at the Grand Hotel Taipei',
    description:
      'A personal April stay at the Grand Hotel Taipei, from the red-pillared entrance and grand lobby to quiet corridors, city views, and slow moments around the grounds.',
    image: '/og/grand-hotel-taipei.webp',
    type: 'article',
  },
  {
    path: '/blog/hiro',
    title: 'Hiro - The AI Job Application Agent',
    description:
      'Hiro scrapes Seek, Indeed, and LinkedIn on a schedule, scores every job against your resume, tailors your application, and submits - all while you sleep.',
    image: '/og/hiro.webp',
    type: 'article',
  },
  {
    path: '/blog/hermes',
    title: 'Hermes - An AI-Powered Email Client',
    description:
      'A full-featured email client with Claude AI built in. Connect Gmail, Outlook, or any IMAP account and use 9 AI writing modes to compose better emails.',
    image: '/og/hermes.webp',
    type: 'article',
  },
  {
    path: '/blog/m-mode',
    title: 'Understanding M Mode',
    description:
      'Learn how shutter speed, aperture, and ISO work together to give you full creative control over your camera - with practical examples you can try right away.',
    image: '/og/m-mode.webp',
    type: 'article',
  },
  {
    path: '/404',
    title: 'Page Not Found | Jim Kong',
    description: 'The requested page could not be found.',
    image: '/og/hermes.webp',
    type: 'website',
    noindex: true,
  },
];

const escapeAttribute = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const replaceMeta = (html, route) => {
  const url = `${SITE_URL}${route.path}`;
  const image = `${SITE_URL}${route.image}`;
  const title = escapeAttribute(route.title);
  const description = escapeAttribute(route.description);

  const result = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta[^>]+name="description"[^>]*>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link[^>]+rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${url}" />`
    )
    .replace(
      /<meta[^>]+property="og:type"[^>]*>/,
      `<meta property="og:type" content="${route.type}" />`
    )
    .replace(
      /<meta[^>]+property="og:url"[^>]*>/,
      `<meta property="og:url" content="${url}" />`
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

  return route.noindex
    ? result.replace(
        /<meta[^>]+name="robots"[^>]*>/,
        '<meta name="robots" content="noindex, follow" />'
      )
    : result;
};

const baseHtml = await readFile(join(DIST_DIR, 'index.html'), 'utf8');

for (const route of routes) {
  const routeHtml = replaceMeta(baseHtml, route);
  const cleanUrlOutput = join(DIST_DIR, `${route.path.slice(1)}.html`);
  const trailingSlashOutput = join(DIST_DIR, route.path.slice(1), 'index.html');
  await mkdir(dirname(cleanUrlOutput), { recursive: true });
  await mkdir(dirname(trailingSlashOutput), { recursive: true });
  await Promise.all([
    writeFile(cleanUrlOutput, routeHtml, 'utf8'),
    writeFile(trailingSlashOutput, routeHtml, 'utf8'),
  ]);
}

console.log(`Generated static metadata for ${routes.length} routes.`);
