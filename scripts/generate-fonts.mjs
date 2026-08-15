// Downloads Poppins and writes src/assets/fonts.css plus the woff2 files, so
// the site's typeface is served from its own origin.
//
// src/App.css opened with `@import url('https://fonts.googleapis.com/...')`.
// That import is a style fetch from a third-party host, which the site's own
// Content-Security-Policy (style-src 'self') blocks — and the woff2 it points
// at lives on fonts.gstatic.com, which font-src 'self' blocks too. The site
// was therefore already rendering in the fallback sans-serif in production.
//
// Self-hosting fixes that in the direction that keeps the CSP strict, and
// removes two extra origins from the critical path. Same pattern as the icon
// stylesheet: generated with `npm run fonts`, output committed, so builds and
// fresh clones never need the network.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const FAMILY = 'Poppins';
const WEIGHTS = [300, 400, 500, 600, 700, 800];

// Poppins has no CJK coverage, so Chinese and Japanese fall through to the
// system stack either way. Pulling only the Latin subsets keeps this to a
// handful of small files instead of dozens.
const WANTED_SUBSETS = ['latin', 'latin-ext'];

const OUT_DIR = join(process.cwd(), 'src/assets/fonts');
const CSS_OUT = join(process.cwd(), 'src/assets/fonts.css');

// Google serves woff2 only to browsers that advertise support; the default
// Node fetch UA gets ttf.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const cssUrl = `https://fonts.googleapis.com/css2?family=${FAMILY}:wght@${WEIGHTS.join(';')}&display=swap`;

const response = await fetch(cssUrl, { headers: { 'User-Agent': UA } });
if (!response.ok) {
  throw new Error(`Fonts: Google returned ${response.status} for the stylesheet`);
}
const source = await response.text();

// Each @font-face block is preceded by a `/* subset */` comment naming the
// subset it covers, which is the only way to tell them apart.
const blocks = [...source.matchAll(/\/\* (\S+) \*\/\s*(@font-face \{[^}]*\})/g)];
if (blocks.length === 0) {
  throw new Error('Fonts: could not parse any @font-face blocks');
}

await mkdir(OUT_DIR, { recursive: true });

const faces = [];
const downloaded = [];

for (const [, subset, block] of blocks) {
  if (!WANTED_SUBSETS.includes(subset)) continue;

  const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
  const style = block.match(/font-style:\s*(\w+)/)?.[1] ?? 'normal';
  const src = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
  const unicodeRange = block.match(/unicode-range:\s*([^;]+);/)?.[1];
  if (!weight || !src) continue;

  const filename = `poppins-${weight}-${style}-${subset}.woff2`;
  const binary = await fetch(src, { headers: { 'User-Agent': UA } });
  if (!binary.ok) {
    throw new Error(`Fonts: ${filename} returned ${binary.status}`);
  }
  await writeFile(join(OUT_DIR, filename), Buffer.from(await binary.arrayBuffer()));
  downloaded.push(filename);

  faces.push(`@font-face {
  font-family: 'Poppins';
  font-style: ${style};
  font-weight: ${weight};
  /* swap, not block: text is readable in the fallback face while the woff2
     arrives, which is what keeps the first paint from being blank. */
  font-display: swap;
  src: url('./fonts/${filename}') format('woff2');${
    unicodeRange ? `\n  unicode-range: ${unicodeRange};` : ''
  }
}`);
}

const css = `/* GENERATED FILE - do not edit by hand.
 * Written by scripts/generate-fonts.mjs. Run \`npm run fonts\` to refresh.
 *
 * Self-hosted Poppins. Replaces the @import of fonts.googleapis.com that
 * App.css used to open with — a third-party style fetch the site's own CSP
 * blocked, which meant the deployed site never actually rendered in Poppins.
 *
 * Vite fingerprints these woff2 files and rewrites the URLs below, so they
 * are served under the immutable cache header in vercel.json.
 */

${faces.join('\n\n')}
`;

await writeFile(CSS_OUT, css, 'utf8');

// Fail loudly if App.css ever grows the remote import back.
const appCss = await readFile(join(process.cwd(), 'src/App.css'), 'utf8');
if (appCss.includes('fonts.googleapis.com')) {
  console.warn('Fonts: WARNING - src/App.css still imports fonts.googleapis.com.');
}

console.log(`Fonts: ${downloaded.length} woff2 files written to src/assets/fonts/.`);
