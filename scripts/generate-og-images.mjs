// Composes one Open Graph card per case study and per blog post, plus the
// site-wide default.
//
// Every case study used to share /og/hermes.webp, so 22 different links all
// previewed as the same Hermes screenshot — indistinguishable in a LinkedIn
// feed and actively misleading about what the link pointed at. Each card now
// carries that project's own screenshot, its title and its category.
//
// The route table is the source of truth for which cards exist and what they
// are called (site-routes.mjs `ogImageForSlug`), so a new project gets a card
// without anyone remembering to add it here.
//
// Output lives in public/og/work/ and is committed: it changes only when a
// project's screenshot or title changes, and committing it keeps a fresh clone
// able to serve correct previews before anyone runs a build.

import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import sharp from 'sharp';
import { AUTHOR, BLOG_POSTS, SITE_URL, caseStudyRoutes } from './site-routes.mjs';

const OG_DIR = join(process.cwd(), 'public', 'og');
const OUTPUT_DIR = join(OG_DIR, 'work');
const SITE_CARD = join(OG_DIR, 'site.jpg');

// JPEG, not WebP. These URLs are fetched once by a crawler, so the format buys
// nothing on the wire — and LinkedIn, which is the highest-intent place a
// portfolio link gets shared, still will not render a WebP og:image at all.
// Every card previewed as a bare title-and-link there.
const CARD_FORMAT = { ext: 'jpg', mime: 'image/jpeg' };
const encodeCard = (pipeline) => pipeline.jpeg({ quality: 88, mozjpeg: true });
// Deliberately outside public/: everything under that directory is copied
// verbatim into dist and served, and a build cache is not something visitors
// should be able to fetch.
const STAMP_PATH = join(process.cwd(), 'scripts', 'og-cache.json');

const WIDTH = 1200;
const HEIGHT = 630;

// Matches the site's dark palette so a shared link looks like the page it opens.
const BG_FROM = '#101318';
const BG_TO = '#1b2230';
const ACCENT_FROM = '#6e8efb';
const ACCENT_TO = '#a777e3';
const TEXT = '#ffffff';
const MUTED = '#c3cad6';
const FAINT = '#8a93a3';

const FONT = 'Helvetica, Arial, sans-serif';
const DISPLAY_URL = SITE_URL.replace(/^https?:\/\//, '');

// Text starts at x=88 and the landscape screenshot frame starts at x=660, so
// the title must wrap inside this width or it runs under the artwork.
const TEXT_X = 88;
const TEXT_MAX_WIDTH = 540;

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const exists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

// Greedy wrap at an approximate glyph width. Helvetica's average advance sits
// near 0.52em for mixed-case text; the cards have generous right margin, so
// erring slightly wide costs nothing and avoids measuring fonts at build time.
function wrap(text, fontSize, maxWidth, maxLines) {
  const perChar = fontSize * 0.54;
  const limit = Math.max(1, Math.floor(maxWidth / perChar));
  const lines = [];
  let line = '';

  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= limit || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
    if (lines.length === maxLines) break;
  }
  if (lines.length < maxLines && line) lines.push(line);

  // Anything that did not fit is signalled rather than silently dropped.
  const joined = lines.join(' ');
  if (joined.length < text.length && lines.length === maxLines) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[\s,.;:-]+$/, '')}…`;
  }
  return lines;
}

const gradients = `
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${BG_FROM}"/>
    <stop offset="100%" stop-color="${BG_TO}"/>
  </linearGradient>
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${ACCENT_FROM}"/>
    <stop offset="100%" stop-color="${ACCENT_TO}"/>
  </linearGradient>`;

const grid = `
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${HEIGHT}"/>`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="${WIDTH}" y2="${i * 100}"/>`).join('')}
  </g>`;

// The text column of a case study card. Title size steps down for long titles
// so "Simba Education - New Build" stays on two lines instead of three.
function cardSvg({ title, category }) {
  const fontSize = title.length > 34 ? 54 : title.length > 22 ? 64 : 74;
  const lines = wrap(title, fontSize, TEXT_MAX_WIDTH, 3);
  const firstBaseline = 330 - (lines.length - 1) * (fontSize * 0.58);

  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="${TEXT_X}" y="${Math.round(firstBaseline + i * fontSize * 1.16)}">${escapeXml(line)}</tspan>`
    )
    .join('');

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>${gradients}</defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  ${grid}
  <rect x="88" y="150" width="64" height="8" rx="4" fill="url(#accent)"/>
  <text x="88" y="208" font-family="${FONT}" font-size="26" font-weight="600" fill="${MUTED}" letter-spacing="3">${escapeXml(
    category.toUpperCase()
  )}</text>
  <text font-family="${FONT}" font-size="${fontSize}" font-weight="800" fill="${TEXT}">${titleTspans}</text>
  <text x="88" y="470" font-family="${FONT}" font-size="24" fill="${FAINT}">${escapeXml(AUTHOR)} — Full Stack Developer</text>
  <text x="88" y="556" font-family="${FONT}" font-size="22" font-weight="600" fill="${ACCENT_FROM}">${escapeXml(
    DISPLAY_URL
  )}</text>
</svg>`;
}

// The site-wide default, used by the home page, the blog index, and anything
// that does not name an image of its own.
function siteCardSvg() {
  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>${gradients}</defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  ${grid}
  <rect x="92" y="176" width="64" height="8" rx="4" fill="url(#accent)"/>
  <text x="92" y="316" font-family="${FONT}" font-size="104" font-weight="800" fill="${TEXT}">${escapeXml(AUTHOR)}</text>
  <text x="92" y="382" font-family="${FONT}" font-size="40" font-weight="500" fill="${MUTED}">Full Stack Developer — Sydney</text>
  <text x="92" y="446" font-family="${FONT}" font-size="24" fill="${FAINT}">Web apps, AI tools, and data-driven software.</text>
  <text x="92" y="556" font-family="${FONT}" font-size="22" font-weight="600" fill="${ACCENT_FROM}">${escapeXml(
    DISPLAY_URL
  )}</text>
</svg>`;
}

// Fits a screenshot into a rounded frame on the right of the card. Phone
// screenshots are far taller than they are wide, so they get a narrow upright
// frame instead of being cropped to a landscape box that would show only their
// status bar.
async function framedScreenshot(sourcePath) {
  const bytes = await readFile(sourcePath);
  const { width, height } = await sharp(bytes).metadata();
  const portrait = width && height ? height / width > 1.2 : false;

  const box = portrait ? { w: 268, h: 500 } : { w: 470, h: 305 };

  const resized = await sharp(bytes)
    .resize(box.w, box.h, { fit: 'cover', position: 'top' })
    .toBuffer();

  const mask = Buffer.from(
    `<svg width="${box.w}" height="${box.h}"><rect width="${box.w}" height="${box.h}" rx="18" fill="#fff"/></svg>`
  );

  const rounded = await sharp(resized)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  return {
    input: rounded,
    left: portrait ? 800 : 660,
    top: Math.round((HEIGHT - box.h) / 2),
  };
}

// A blog post's card comes from one of two places, and both end up at exactly
// 1200x630 so the dimensions the <head> declares are true.
//
// `art` is finished artwork drawn for that post — the decorative Hiro and
// Housed cards, hand-composed by the one-off scripts alongside this one. It is
// only normalised: fitted to the frame, never redrawn, because redrawing it
// would throw the artwork away.
//
// `source` is an ordinary screenshot, composed into the same card layout the
// case studies use. That is what a post without bespoke art gets, and it is
// why adding a post no longer means remembering to make an image by hand.
async function blogCard(post) {
  if (post.art) {
    const bytes = await readFile(join(process.cwd(), post.art));
    return sharp(bytes).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' });
  }

  const svg = cardSvg({
    title: post.title,
    category: post.category || 'Article',
  });
  const screenshot = await framedScreenshot(join(process.cwd(), post.source));
  return sharp(Buffer.from(svg)).composite([screenshot]);
}

// The bytes a blog card is built from, for the rebuild fingerprint.
async function blogCardInputs(post) {
  if (post.art) return [await readFile(join(process.cwd(), post.art))];
  return [
    cardSvg({ title: post.title, category: post.category || 'Article' }),
    await readFile(join(process.cwd(), post.source)),
  ];
}

// A card is rebuilt only when its inputs change, so repeat builds are cheap and
// the committed output stays byte-stable in git.
//
// This file's own bytes are part of every fingerprint. Frame geometry and
// placement live in code rather than in the SVG string, so hashing only the
// SVG left every landscape card stale after the frame moved — the cache said
// "unchanged" about a layout that had changed.
const LAYOUT = await readFile(new URL(import.meta.url), 'utf8');

function fingerprint(parts) {
  const hash = createHash('sha256').update(LAYOUT);
  for (const part of parts) hash.update(part);
  return hash.digest('base64url').slice(0, 16);
}

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const routes = await caseStudyRoutes();
  const stamps = JSON.parse(await readFile(STAMP_PATH, 'utf8').catch(() => '{}'));
  const nextStamps = {};
  const expected = new Set();

  let generated = 0;
  let reused = 0;
  let skipped = 0;

  for (const route of routes) {
    const slug = route.path.replace('/work/', '');
    const name = `${slug}.${CARD_FORMAT.ext}`;
    expected.add(name);

    if (!route.source) {
      console.warn(`No screenshot resolved for ${route.path} — skipping its card.`);
      skipped += 1;
      continue;
    }

    const sourcePath = join(process.cwd(), route.source);
    if (!(await exists(sourcePath))) {
      console.warn(`Missing ${route.source} for ${route.path} — skipping its card.`);
      skipped += 1;
      continue;
    }

    const svg = cardSvg({
      title: route.project.title,
      category: route.category || 'Case study',
    });
    const stamp = fingerprint([svg, await readFile(sourcePath)]);
    nextStamps[name] = stamp;

    if (stamps[name] === stamp && (await exists(join(OUTPUT_DIR, name)))) {
      reused += 1;
      continue;
    }

    const screenshot = await framedScreenshot(sourcePath);
    await encodeCard(sharp(Buffer.from(svg)).composite([screenshot])).toFile(
      join(OUTPUT_DIR, name)
    );
    generated += 1;
  }

  // Cards for projects that were renamed or promoted to a blog post.
  let removed = 0;
  for (const name of await readdir(OUTPUT_DIR)) {
    if (!expected.has(name)) {
      await rm(join(OUTPUT_DIR, name));
      removed += 1;
    }
  }

  // Blog cards. Same cache, same output directory as the site card — one
  // level up from the case studies, because that is where the route table has
  // always pointed and changing it would break every shared link.
  const blogExpected = new Set([basename(SITE_CARD)]);

  for (const post of BLOG_POSTS) {
    const slug = post.path.replace('/blog/', '');
    const name = `${slug}.${CARD_FORMAT.ext}`;
    blogExpected.add(name);

    const declared = post.art || post.source;
    if (!declared) {
      console.warn(`No art or source declared for ${post.path} — skipping its card.`);
      skipped += 1;
      continue;
    }
    if (!(await exists(join(process.cwd(), declared)))) {
      console.warn(`Missing ${declared} for ${post.path} — skipping its card.`);
      skipped += 1;
      continue;
    }

    const stamp = fingerprint(await blogCardInputs(post));
    nextStamps[name] = stamp;

    if (stamps[name] === stamp && (await exists(join(OG_DIR, name)))) {
      reused += 1;
      continue;
    }

    await encodeCard(await blogCard(post)).toFile(join(OG_DIR, name));
    generated += 1;
  }

  const siteSvg = siteCardSvg();
  const siteStamp = fingerprint([siteSvg]);
  nextStamps[basename(SITE_CARD)] = siteStamp;
  if (stamps[basename(SITE_CARD)] !== siteStamp || !(await exists(SITE_CARD))) {
    await encodeCard(sharp(Buffer.from(siteSvg))).toFile(SITE_CARD);
    generated += 1;
  } else {
    reused += 1;
  }

  // Blog cards left behind by a renamed post or a format change. Scoped to
  // files: `work/` is a directory in here and is cleaned by its own pass above.
  for (const entry of await readdir(OG_DIR, { withFileTypes: true })) {
    if (entry.isFile() && !blogExpected.has(entry.name)) {
      await rm(join(OG_DIR, entry.name));
      removed += 1;
    }
  }

  await writeFile(STAMP_PATH, `${JSON.stringify(nextStamps, null, 2)}\n`, 'utf8');

  console.log(
    `OG cards: ${generated} generated, ${reused} reused, ${removed} stale removed` +
      (skipped ? `, ${skipped} skipped` : '') +
      '.'
  );
}

await run();
