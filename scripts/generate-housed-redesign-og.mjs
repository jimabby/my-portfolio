// One-off generator for the "Rebuilding Housed" blog post Open Graph card.
// Run with: node scripts/generate-housed-redesign-og.mjs
//
// Deliberately a one-off, like generate-hiro-og.mjs: blog cards are authored
// per post rather than derived from a route table the way the case study cards
// in generate-og-images.mjs are. Palette and geometry are copied from that
// generator so a shared link looks like the page it opens.
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const SCREENSHOT = 'src/assets/housed-redesign/housed-redesign-home.webp';
const OUTPUT = 'scripts/og-art/housed-redesign.webp';

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101318"/>
      <stop offset="100%" stop-color="#1b2230"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6e8efb"/>
      <stop offset="100%" stop-color="#a777e3"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${HEIGHT}"/>`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="${WIDTH}" y2="${i * 100}"/>`).join('')}
  </g>

  <rect x="88" y="150" width="64" height="8" rx="4" fill="url(#accent)"/>
  <text x="88" y="208" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#c3cad6" letter-spacing="3">CASE STUDY</text>

  <text font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="#ffffff">
    <tspan x="88" y="300">Rebuilding</tspan>
    <tspan x="88" y="374">Housed</tspan>
  </text>
  <text x="88" y="434" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#8a93a3">From brochure site to booking platform</text>

  <text x="88" y="500" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#8a93a3">Jim Kong — Full Stack Developer</text>
  <text x="88" y="556" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="#6e8efb">jimkong-portfolio.vercel.app</text>
</svg>`;

const box = { w: 470, h: 305 };
const shot = await sharp(await readFile(SCREENSHOT))
  .resize(box.w, box.h, { fit: 'cover', position: 'top' })
  .toBuffer();

const mask = Buffer.from(
  `<svg width="${box.w}" height="${box.h}"><rect width="${box.w}" height="${box.h}" rx="18" fill="#fff"/></svg>`
);

const framed = await sharp(shot).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: framed, left: 660, top: Math.round((HEIGHT - box.h) / 2) }])
  .webp({ quality: 88 })
  .toFile(OUTPUT);

console.log(`Generated ${OUTPUT}`);
