// The one place that knows every indexable URL on the site.
//
// Consumed by generate-route-html.mjs (per-route <head> metadata), and by the
// sitemap and RSS generators, so those can never drift out of sync with each
// other the way the hand-maintained public/sitemap.xml did.

export const SITE_URL = 'https://jimkong-portfolio.vercel.app';
export const AUTHOR = 'Jim Kong';

// English is the default and takes the bare path; the rest are prefixed.
// Mirrors src/i18n/routes.js.
export const LOCALE_PREFIXES = {
  en: '',
  'zh-Hans': '/zh-Hans',
  'zh-Hant': '/zh-Hant',
  ja: '/ja',
};

export const LOCALES = Object.keys(LOCALE_PREFIXES);

export const localizedPath = (lang, path = '/') => {
  const prefix = LOCALE_PREFIXES[lang] ?? '';
  const clean = path === '/' ? '' : path;
  return `${prefix}${clean}` || '/';
};

export const BLOG_POSTS = [
  {
    path: '/blog/grand-hotel-taipei',
    title: 'Staying at the Grand Hotel Taipei',
    description:
      'A personal April stay at the Grand Hotel Taipei, from the red-pillared entrance and grand lobby to quiet corridors, city views, and slow moments around the grounds.',
    image: '/og/grand-hotel-taipei.webp',
    published: '2026-04-15',
  },
  {
    path: '/blog/hiro',
    title: 'Hiro - The AI Job Application Agent',
    description:
      'Hiro scrapes Seek, Indeed, and LinkedIn on a schedule, scores every job against your resume, tailors your application, and submits - all while you sleep.',
    image: '/og/hiro.webp',
    published: '2026-03-20',
  },
  {
    path: '/blog/hermes',
    title: 'Hermes - An AI-Powered Email Client',
    description:
      'A full-featured email client with Claude AI built in. Connect Gmail, Outlook, or any IMAP account and use 9 AI writing modes to compose better emails.',
    image: '/og/hermes.webp',
    published: '2026-03-05',
  },
  {
    path: '/blog/m-mode',
    title: 'Understanding M Mode',
    description:
      'Learn how shutter speed, aperture, and ISO work together to give you full creative control over your camera - with practical examples you can try right away.',
    image: '/og/m-mode.webp',
    published: '2025-02-10',
  },
];

const CONTENT_ROUTES = [
  {
    path: '/',
    title: 'Jim Kong | Portfolio',
    description:
      'Jim Kong is a Sydney-based full stack developer building web apps, AI tools, WordPress sites, and data-driven software.',
    image: '/og/hermes.webp',
    type: 'website',
    priority: '1.0',
    changefreq: 'monthly',
  },
  {
    path: '/blog',
    title: 'Jim Kong | Blog',
    description: 'Articles about software projects, AI, photography, and travel by Jim Kong.',
    image: '/og/hermes.webp',
    type: 'website',
    priority: '0.8',
    changefreq: 'monthly',
  },
  ...BLOG_POSTS.map((post) => ({
    ...post,
    type: 'article',
    priority: '0.7',
    changefreq: 'yearly',
  })),
];

// Data.jsx imports .webp assets, so it cannot simply be imported here. Read
// each project as the block of text from its title up to the next entry's
// `id:`, so an optional field is always attributed to the project it actually
// belongs to rather than to whichever one happened to come first.
export function parseProjects(source) {
  const entries = source.matchAll(
    /title: '([^']+)',\s*slug: '([^']+)',([\s\S]*?)(?=\n\s*id: \d|\n\]|$)/g
  );

  return [...entries].map(([, title, slug, body]) => ({
    title,
    slug,
    summary: body.match(/summary: '([^']*)'/)?.[1],
    // A project written up on the blog has no case study page of its own.
    article: body.match(/article: '([^']*)'/)?.[1],
  }));
}

// Project case studies. Slugs are read from the app's own project data so a new
// project appears in the sitemap without anyone remembering to add it here.
export async function caseStudyRoutes() {
  const source = await import('node:fs/promises').then((fs) =>
    fs.readFile(new URL('../src/components/portfolio/Data.jsx', import.meta.url), 'utf8')
  );

  return parseProjects(source)
    .filter((project) => !project.article)
    .map(({ title, slug, summary }) => ({
      path: `/work/${slug}`,
      title: `${title} | ${AUTHOR}`,
      description: summary || `${title} — a project by ${AUTHOR}.`,
      image: '/og/hermes.webp',
      type: 'article',
      priority: '0.6',
      changefreq: 'yearly',
    }));
}

// Every indexable route, in every language.
export async function allRoutes() {
  return [...CONTENT_ROUTES, ...(await caseStudyRoutes())];
}

export const NOINDEX_ROUTES = [
  {
    path: '/404',
    title: 'Page Not Found | Jim Kong',
    description: 'The requested page could not be found.',
    image: '/og/hermes.webp',
    type: 'website',
    noindex: true,
  },
];
