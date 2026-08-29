// One-off generator for the Hiro blog post artwork (OG image + thumbnail).
// Run with: node scripts/generate-hiro-og.mjs
import sharp from 'sharp';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
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

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- subtle grid -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join('')}
  </g>

  <!-- decorative job-card stack on the right -->
  <g transform="translate(790 150)">
    <rect x="24" y="48" width="300" height="96" rx="14" fill="#ffffff" fill-opacity="0.05"/>
    <rect x="12" y="24" width="300" height="96" rx="14" fill="#ffffff" fill-opacity="0.08"/>
    <rect x="0" y="0" width="300" height="96" rx="14" fill="#ffffff" fill-opacity="0.12"/>
    <circle cx="40" cy="48" r="20" fill="url(#accent)"/>
    <path d="M32 48 l6 6 l12 -12" stroke="#101318" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="76" y="32" width="170" height="12" rx="6" fill="#ffffff" fill-opacity="0.5"/>
    <rect x="76" y="56" width="120" height="10" rx="5" fill="#ffffff" fill-opacity="0.25"/>
    <rect x="220" y="180" width="104" height="34" rx="17" fill="url(#accent)" opacity="0.9"/>
    <text x="272" y="203" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="700" fill="#101318" text-anchor="middle">98% match</text>
  </g>

  <!-- accent bar -->
  <rect x="92" y="160" width="64" height="8" rx="4" fill="url(#accent)"/>

  <text x="92" y="300" font-family="Helvetica, Arial, sans-serif" font-size="120" font-weight="800" fill="#ffffff">Hiro</text>
  <text x="92" y="368" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="500" fill="#c3cad6">The AI Job Application Agent</text>
  <text x="92" y="440" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#8a93a3">Scrapes Seek, Indeed &amp; LinkedIn — scores, tailors and applies while you sleep.</text>

  <text x="92" y="556" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="#6e8efb">jimkong-portfolio.vercel.app</text>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf).webp({ quality: 88 }).toFile('scripts/og-art/hiro.webp');
await sharp(buf).resize(900, 473).webp({ quality: 82 }).toFile('src/assets/hiro.webp');
console.log('Generated scripts/og-art/hiro.webp and src/assets/hiro.webp');
