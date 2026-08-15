// Turns the app's own project and blog data into the two prompt sections the
// AI assistant answers from.
//
// The assistant is told to answer ONLY from its prompt, so every project the
// gallery shows has to be in it. Hand-maintaining that list meant seven
// projects (Pockyt, Oncora, Airbest, Aus Global Trading, Aircon Solutions,
// Simba Health, Simba Hearing) were visible on the page while the assistant
// insisted it could only discuss Jim's portfolio. The list is derived now, and
// a test compares the committed api/projectFacts.js against a fresh build of
// it, so the drift cannot come back quietly.
//
// Pure functions only — the writer lives in generate-project-facts.mjs, so the
// test can rebuild the sections without touching the filesystem.

import { BLOG_POSTS, parseProjects } from './site-routes.mjs';

// Where a project's write-up lives. Mirrors `projectPath` in Data.jsx, which
// cannot be imported here because that module imports .webp assets.
const projectPath = (project) => project.article ?? `/work/${project.slug}`;

export function buildProjectsSection(source) {
  const lines = parseProjects(source).map((project) => {
    const external =
      project.link && project.link !== '#' ? ` Live: ${project.link}` : '';
    return `- ${project.title} [${project.category}] - ${project.summary} Page: ${projectPath(project)}.${external}`;
  });

  return `## Projects
Every project below has a page on this site. Link to that page when the visitor
asks about it. "Page" paths are on this site; "Live" links go off-site.
${lines.join('\n')}`;
}

export function buildBlogSection(posts = BLOG_POSTS) {
  const lines = posts.map(
    (post) => `- "${post.title}" (${post.published}) - ${post.description} Read: ${post.path}`
  );

  return `## Blog
${lines.join('\n')}`;
}

// The whole generated payload, as the object api/projectFacts.js exports.
export function buildFacts(source, posts = BLOG_POSTS) {
  return {
    PROJECTS_SECTION: buildProjectsSection(source),
    BLOG_SECTION: buildBlogSection(posts),
  };
}

// Rendered as a CommonJS module so api/systemPrompt.js can require() it from
// both the Vercel function and the Vite dev middleware.
export function renderModule(facts) {
  const entries = Object.entries(facts)
    .map(([key, value]) => `const ${key} = ${JSON.stringify(value)};`)
    .join('\n\n');

  return `// GENERATED FILE - do not edit by hand.
// Written by scripts/generate-project-facts.mjs from
// src/components/portfolio/Data.jsx and scripts/site-routes.mjs.
// Run \`npm run facts\` after changing either. A test fails if this is stale.

${entries}

module.exports = { ${Object.keys(facts).join(', ')} };
`;
}
