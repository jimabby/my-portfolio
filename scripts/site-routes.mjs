// The one place that knows every indexable URL on the site.
//
// Consumed by generate-route-html.mjs (per-route <head> metadata), and by the
// sitemap and RSS generators, so those can never drift out of sync with each
// other the way the hand-maintained public/sitemap.xml did.

export const SITE_URL = 'https://jimkong-portfolio.vercel.app';
export const AUTHOR = 'Jim Kong';

// `lastmod` for routes that have no publication date of their own — the home
// page, the blog index, and every case study.
//
// Deliberately a hand-edited constant rather than `new Date()`. Stamping today
// onto every URL made all 112 of them claim to have changed on every deploy,
// including deploys that touched nothing but a stylesheet, which is exactly the
// signal that teaches a crawler to stop trusting lastmod. Bump this when the
// site's content actually changes.
export const CONTENT_UPDATED = '2026-08-08';

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
    image: '/og/site.webp',
    type: 'website',
    priority: '1.0',
    changefreq: 'monthly',
    updated: CONTENT_UPDATED,
  },
  {
    path: '/blog',
    title: 'Jim Kong | Blog',
    description: 'Articles about software projects, AI, photography, and travel by Jim Kong.',
    image: '/og/site.webp',
    type: 'website',
    priority: '0.8',
    changefreq: 'monthly',
    updated: CONTENT_UPDATED,
  },
  ...BLOG_POSTS.map((post) => ({
    ...post,
    type: 'article',
    priority: '0.7',
    changefreq: 'yearly',
  })),
];

// Maps the identifiers Data.jsx imports its screenshots under onto repo-root
// relative asset paths, so `image: HermesImg` can be resolved back to a real
// file on disk by the Open Graph generator.
export function parseAssetImports(source) {
  const imports = {};
  for (const [, identifier, specifier] of source.matchAll(
    /^import\s+(\w+)\s+from\s+["']([^"']+)["'];?$/gm
  )) {
    // Specifiers are written relative to src/components/portfolio/.
    imports[identifier] = specifier.replace(/^\.\.\/\.\.\//, 'src/');
  }
  return imports;
}

// Data.jsx imports .webp assets, so it cannot simply be imported here. Read
// each project as the block of text from its title up to the next entry's
// `id:`, so an optional field is always attributed to the project it actually
// belongs to rather than to whichever one happened to come first.
export function parseProjects(source) {
  const imports = parseAssetImports(source);
  const entries = source.matchAll(
    /id: (\d+),([\s\S]*?)title: '([^']+)',\s*slug: '([^']+)',([\s\S]*?)(?=\n\s*id: \d|\n\]|$)/g
  );

  return [...entries].map(([, id, head, title, slug, body]) => ({
    id: Number(id),
    title,
    slug,
    summary: body.match(/summary: '([^']*)'/)?.[1],
    // A project written up on the blog has no case study page of its own.
    article: body.match(/article: '([^']*)'/)?.[1],
    category: body.match(/category: '([^']*)'/)?.[1],
    // The card screenshot, as a path the build can read. Used to compose this
    // project's Open Graph card.
    image: imports[`${head}${body}`.match(/\bimage:\s*(\w+)/)?.[1]],
  }));
}

// Where a project's generated Open Graph card lives. One function so the route
// table and the generator can never disagree about the filename.
export const ogImageForSlug = (slug) => `/og/work/${slug}.webp`;

// Project case studies. Slugs are read from the app's own project data so a new
// project appears in the sitemap without anyone remembering to add it here.
// Split from the file read so tests can exercise the mapping without depending
// on `import.meta.url` resolving to a real file path, which it does not under
// the test runner's module loader.
export function caseStudyRoutesFrom(source) {
  return parseProjects(source)
    .filter((project) => !project.article)
    .map(({ id, title, slug, summary, image, category }) => ({
      path: `/work/${slug}`,
      title: `${title} | ${AUTHOR}`,
      description: summary || `${title} — a project by ${AUTHOR}.`,
      // Its own card, not the site default. Every case study previewing as the
      // same Hermes screenshot made 22 different links look like one page.
      image: ogImageForSlug(slug),
      type: 'article',
      priority: '0.6',
      changefreq: 'yearly',
      updated: CONTENT_UPDATED,
      // Lets the HTML generator pull this project's translated summary and
      // its per-image captions out of the app's own dictionaries.
      project: { id, title },
      // Source screenshot and label the Open Graph card is composed from.
      // Build-time only — never referenced by the app.
      source: image,
      category,
    }));
}

export async function caseStudyRoutes() {
  const source = await import('node:fs/promises').then((fs) =>
    fs.readFile(new URL('../src/components/portfolio/Data.jsx', import.meta.url), 'utf8')
  );

  return caseStudyRoutesFrom(source);
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
