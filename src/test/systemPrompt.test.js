import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { buildFacts, renderModule } from '../../scripts/project-facts.mjs';
import { BLOG_POSTS } from '../../scripts/site-routes.mjs';
import { projectsData, projectPath } from '../components/portfolio/Data';
import { posts } from '../components/blog/postsData';

const require = createRequire(import.meta.url);
const { SYSTEM_PROMPT } = require('../../api/systemPrompt.js');

// Relative to the project root, where vitest runs.
const source = readFileSync('src/components/portfolio/Data.jsx', 'utf8');

// The assistant is told to answer ONLY from this prompt, so anything the site
// shows but the prompt omits becomes a flat "I can only discuss Jim's
// portfolio" for work the visitor is looking at. That is exactly how seven
// projects went missing before the list was generated.
describe('assistant system prompt', () => {
  // Line endings are normalised on both sides. The file is committed with LF
  // and the generator writes LF, but git checks it out as CRLF on Windows
  // (core.autocrlf), so a byte comparison failed on every Windows clone while
  // passing in CI — a staleness check that cried wolf on one platform only.
  it('has the generated facts file committed in sync with the app data', () => {
    const lf = (text) => text.replace(/\r\n/g, '\n');
    const committed = readFileSync('api/projectFacts.js', 'utf8');
    expect(lf(committed), 'api/projectFacts.js is stale — run `npm run facts`').toBe(
      lf(renderModule(buildFacts(source, BLOG_POSTS)))
    );
  });

  it('knows about every project in the gallery', () => {
    for (const project of projectsData) {
      expect(SYSTEM_PROMPT, `the assistant cannot discuss "${project.title}"`).toContain(
        project.title
      );
    }
  });

  it('can link to the page that covers each project', () => {
    for (const project of projectsData) {
      expect(SYSTEM_PROMPT, `no link to ${project.title}'s write-up`).toContain(
        `Page: ${projectPath(project)}.`
      );
    }
  });

  it('knows about every blog post', () => {
    for (const post of posts) {
      expect(SYSTEM_PROMPT, `the assistant cannot discuss "${post.slug}"`).toContain(
        `Read: /blog/${post.slug}`
      );
    }
  });

  // Every path the prompt offers has to be a route the app actually serves;
  // a hallucinated-looking link the model got from us lands on the 404 page.
  it('only offers paths the site really has', () => {
    const known = new Set([
      '/',
      '/blog',
      '/work',
      '/resume',
      ...posts.map((post) => `/blog/${post.slug}`),
      ...projectsData.map(projectPath),
    ]);

    const paths = [...SYSTEM_PROMPT.matchAll(/\]\((\/[^)#]*)(?:#[^)]*)?\)/g)]
      .map(([, path]) => path)
      .filter(Boolean);
    const referenced = [...SYSTEM_PROMPT.matchAll(/(?:Page|Read): (\/[^\s.]*)/g)].map(
      ([, path]) => path
    );

    expect(paths.length).toBeGreaterThan(0);
    for (const path of [...paths, ...referenced]) {
      expect(known, `prompt links to a route that does not exist: ${path}`).toContain(path);
    }
  });
});
