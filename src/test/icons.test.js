import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

// The icons are no longer webfonts: src/assets/icons.css maps each class onto a
// locally embedded SVG mask (scripts/generate-icon-css.mjs). A class used in a
// component but missing from that file renders as nothing at all — an invisible
// gap rather than a crash, which is exactly the kind of breakage that reaches
// production unnoticed. So assert the two sides agree.

const ICON_PATTERN = /\b(?:bxl?s?-|uil-)[a-z0-9]+(?:-[a-z0-9]+)*/g;

const collect = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return collect(full);
    return ['.jsx', '.js'].includes(extname(entry.name)) ? [full] : [];
  });

describe('icon stylesheet', () => {
  const css = readFileSync('src/assets/icons.css', 'utf8');

  const used = new Set(
    collect('src')
      // This file names icon classes only to describe them.
      .filter((file) => !file.endsWith('icons.test.js'))
      .flatMap((file) => [...readFileSync(file, 'utf8').matchAll(ICON_PATTERN)].map(([m]) => m))
  );

  it('finds the icon classes the components use', () => {
    expect(used.size).toBeGreaterThan(30);
  });

  it('defines a mask for every icon the app renders', () => {
    const missing = [...used].filter((name) => !css.includes(`.${name} {`));
    expect(missing, `run \`npm run icons\` — missing: ${missing.join(', ')}`).toEqual([]);
  });

  it('embeds every icon inline, so nothing is fetched at runtime', () => {
    const remoteUrls = [...css.matchAll(/url\("(?!data:)([^"]*)"\)/g)].map(([, url]) => url);
    expect(remoteUrls).toEqual([]);
  });

  it('paints from currentColor so `color` still tints an icon', () => {
    expect(css).toContain('background-color: currentColor');
  });
});
