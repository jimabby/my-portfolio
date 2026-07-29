import { describe, it, expect } from 'vitest';
import { postsContent } from '../i18n/posts';
import { posts } from '../components/blog/postsData';

// Article prose used to live inside `translations`, where translations.test.js
// checked key parity across languages for free. It now loads as a separate
// chunk (see src/i18n/posts/register.js), so that coverage is reproduced here.

function keyPaths(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out.push(...keyPaths(v, path));
    } else {
      out.push(path);
    }
  }
  return out.sort();
}

describe('blog article content', () => {
  const langs = Object.keys(postsContent);

  it('covers the four supported languages', () => {
    expect(langs.sort()).toEqual(['en', 'ja', 'zh-Hans', 'zh-Hant']);
  });

  it('has content for every post listed in postsData', () => {
    const postKeys = posts.map((p) => p.key).sort();
    for (const lang of langs) {
      expect(Object.keys(postsContent[lang]).sort(), `incomplete for "${lang}"`).toEqual(postKeys);
    }
  });

  it('has identical key sets in every language', () => {
    const enKeys = keyPaths(postsContent.en);
    for (const lang of langs) {
      if (lang === 'en') continue;
      expect(keyPaths(postsContent[lang]), `missing/extra keys in "${lang}"`).toEqual(enKeys);
    }
  });

  it('keeps article prose out of the base translations dictionary', async () => {
    const { translations } = await import('../i18n/translations');
    // If this regresses, ~45 kB gzipped of prose is back in the entry bundle.
    expect(translations.en.posts).toBeUndefined();
  });
});
