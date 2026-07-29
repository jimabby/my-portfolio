import { describe, it, expect } from 'vitest';
import {
  DEFAULT_LANG,
  LOCALE_CODES,
  PREFIXED_LOCALES,
  localizedPath,
  splitLocalePath,
} from '../i18n/routes';
import { projectsData } from '../components/portfolio/Data';
import { posts } from '../components/blog/postsData';

describe('locale paths', () => {
  it('leaves English on the bare path', () => {
    expect(localizedPath('en', '/blog/hermes')).toBe('/blog/hermes');
    expect(localizedPath('en', '/')).toBe('/');
  });

  it('prefixes every other language', () => {
    expect(localizedPath('ja', '/blog/hermes')).toBe('/ja/blog/hermes');
    expect(localizedPath('zh-Hans', '/')).toBe('/zh-Hans');
    expect(localizedPath('zh-Hant', '/work/pockyt')).toBe('/zh-Hant/work/pockyt');
  });

  it('round-trips every language and path', () => {
    const paths = ['/', '/blog', '/blog/hermes', '/work/oncora'];
    for (const lang of LOCALE_CODES) {
      for (const path of paths) {
        expect(splitLocalePath(localizedPath(lang, path))).toEqual({ lang, path });
      }
    }
  });

  it('treats an unprefixed path as the default language', () => {
    expect(splitLocalePath('/blog')).toEqual({ lang: DEFAULT_LANG, path: '/blog' });
  });

  // A project or post slug colliding with a locale segment would make that
  // page unreachable, since the router would read it as a language.
  it('has no content slug that collides with a locale prefix', () => {
    const firstSegments = [
      ...projectsData.map((p) => p.slug),
      ...posts.map((p) => p.slug),
      'blog',
      'work',
    ];
    for (const segment of firstSegments) {
      expect(PREFIXED_LOCALES).not.toContain(segment);
    }
  });
});

describe('project data', () => {
  it('gives every project a unique slug', () => {
    const slugs = projectsData.map((p) => p.slug);
    expect(slugs.every(Boolean)).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('gives every post a machine-readable date for JSON-LD and RSS', () => {
    for (const post of posts) {
      expect(post.isoDate, `${post.slug} is missing isoDate`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
