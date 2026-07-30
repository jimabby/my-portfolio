import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseProjects } from '../../scripts/site-routes.mjs';
import {
  DEFAULT_LANG,
  LOCALE_CODES,
  PREFIXED_LOCALES,
  localizedPath,
  splitLocalePath,
} from '../i18n/routes';
import { projectsData, projectPath } from '../components/portfolio/Data';
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

// The sitemap, RSS feed and prerendered HTML are built from the routes derived
// from this text, so a parse that drifts from the real data is invisible until
// something is missing from search.
describe('project data parsed for the sitemap', () => {
  // Relative to the project root, where vitest runs.
  const source = readFileSync('src/components/portfolio/Data.jsx', 'utf8');

  it('reads back exactly what the app renders', () => {
    expect(parseProjects(source)).toEqual(
      projectsData.map((project) => ({
        title: project.title,
        slug: project.slug,
        summary: project.summary,
        article: project.article,
      }))
    );
  });
});

describe('project data', () => {
  it('gives every project a unique slug', () => {
    const slugs = projectsData.map((p) => p.slug);
    expect(slugs.every(Boolean)).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  // A project either has a case study page or points at a blog post, never
  // both: two URLs for one project split the ranking and duplicate content.
  it('points every project at exactly one write-up that exists', () => {
    const postPaths = new Set(posts.map((post) => `/blog/${post.slug}`));
    for (const project of projectsData) {
      if (project.article) {
        expect(postPaths, `${project.slug} links to a missing post`).toContain(project.article);
        expect(projectPath(project)).toBe(project.article);
      } else {
        expect(projectPath(project)).toBe(`/work/${project.slug}`);
      }
    }
  });

  // The article path replaced a `link` back to the blog on the same origin,
  // which opened the site in a new tab and dropped the language prefix.
  it('keeps project links pointing off-site', () => {
    for (const project of projectsData) {
      if (!project.link || project.link === '#') continue;
      expect(project.link, `${project.slug} links to itself`).not.toMatch(
        /jimkong-portfolio\.vercel\.app/
      );
    }
  });

  it('gives every post a machine-readable date for JSON-LD and RSS', () => {
    for (const post of posts) {
      expect(post.isoDate, `${post.slug} is missing isoDate`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
