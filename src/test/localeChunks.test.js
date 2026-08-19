import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SUPPORTED_LANGS, dictionaryFor, isLoaded, loadLocale } from '../i18n/locales';

// The four UI dictionaries are separate chunks so a visitor downloads only the
// language they are reading. That saving is invisible in every other test —
// nothing breaks if someone re-adds a static import of translations.js, the
// entry bundle just quietly grows ~14 kB gzipped again. This is the guard.

const SRC = join(process.cwd(), 'src');

const sourceFiles = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...sourceFiles(full));
      continue;
    }
    if (/\.(js|jsx|mjs)$/.test(entry)) out.push(full);
  }
  return out;
};

describe('locale chunks', () => {
  it('exposes exactly the four supported languages', () => {
    expect([...SUPPORTED_LANGS].sort()).toEqual(['en', 'ja', 'zh-Hans', 'zh-Hant']);
  });

  it('loads a dictionary on demand and caches it', async () => {
    const first = await loadLocale('ja');
    expect(isLoaded('ja')).toBe(true);
    expect(first.nav.home).toBeTruthy();
    // Same object back, not a second evaluation of the module.
    expect(await loadLocale('ja')).toBe(first);
    expect(dictionaryFor('ja')).toBe(first);
  });

  it('resolves an unknown language to undefined rather than throwing', async () => {
    await expect(loadLocale('kl')).resolves.toBeUndefined();
  });

  it('merges the project summaries into each dictionary', async () => {
    for (const lang of SUPPORTED_LANGS) {
      const dictionary = await loadLocale(lang);
      expect(Object.keys(dictionary.projects ?? {}).length, `no projects for ${lang}`).toBeGreaterThan(0);
    }
  });

  // The whole point: no shipped module may pull all four dictionaries in at
  // once. translations.js does exactly that, on purpose, for the build and for
  // tests — so nothing under src/ outside src/test/ may import it.
  it('keeps the all-languages aggregate out of the app', () => {
    const offenders = sourceFiles(SRC)
      .filter((file) => !relative(SRC, file).replaceAll('\\', '/').startsWith('test/'))
      .filter((file) => {
        const text = readFileSync(file, 'utf8');
        // Only a real import, not a mention in a comment.
        return /^\s*import\s[^\n]*['"][^'"]*i18n\/translations(\.js)?['"]/m.test(text) ||
          /\bfrom\s+['"][^'"]*\.\/translations(\.js)?['"]/.test(text);
      })
      .map((file) => relative(SRC, file));

    expect(offenders, 'these would put all four languages back in the entry bundle').toEqual([]);
  });

  it('keeps the all-languages project summaries out of the app', () => {
    const offenders = sourceFiles(SRC)
      .filter((file) => !relative(SRC, file).replaceAll('\\', '/').startsWith('test/'))
      .filter((file) => /\bfrom\s+['"][^'"]*i18n\/projects\.mjs['"]/.test(readFileSync(file, 'utf8')))
      .map((file) => relative(SRC, file));

    expect(offenders, 'import ./projects/<lang>.mjs instead').toEqual([]);
  });
});
