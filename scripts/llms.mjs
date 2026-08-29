// Builds /llms.txt — a plain-text index of the site for language models.
//
// The site already publishes two machine-readable indexes: sitemap.xml, which
// tells a crawler which URLs exist, and rss.xml, which tells a reader when
// posts appeared. Neither says what anything *is* without fetching it. That
// gap matters more than it used to, because an assistant now sits between a
// recruiter's question and these pages, and it answers from whatever it can
// read cheaply.
//
// Everything here is derived from the same two sources the rest of the build
// uses — the route table and Data.jsx — so a new project or post appears in
// llms.txt without anyone remembering it exists. That is the same reason
// api/projectFacts.js is generated rather than hand-written; seven projects
// once went missing from the assistant's prompt exactly this way.
//
// Only the English URLs are listed. The translations are declared to crawlers
// through hreflang in the sitemap, and repeating all four here would
// quadruple the file to say the same things.
//
// Format follows the llms.txt convention: an H1 for the site, a blockquote
// summary, then H2 sections of `- [title](url): description` links.
//
// Pure functions with no filesystem access, mirroring feeds.mjs, so the Vite
// dev server and the build can serve byte-identical output.

import { AUTHOR, BLOG_POSTS, SITE_URL, parseProjects } from './site-routes.mjs';

const SUMMARY =
  `${AUTHOR} is a Sydney-based full stack developer. This site is his portfolio: ` +
  'case studies for every project he has shipped, articles about the ones worth ' +
  'writing up, and a resume. Everything below is a real page on this site.';

// Mirrors `projectPath` in Data.jsx, which cannot be imported here because
// that module imports .webp assets. Same reason project-facts.mjs re-declares
// it rather than sharing one copy.
const projectPath = (project) => project.article ?? `/work/${project.slug}`;

// One line per entry. Descriptions are collapsed onto a single line because a
// wrapped description reads as two separate list items to anything parsing
// this by line, which is most things that will.
const link = (title, path, description) =>
  `- [${title}](${SITE_URL}${path}): ${String(description).replace(/\s+/g, ' ').trim()}`;

export function buildLlmsTxt(source, posts = BLOG_POSTS) {
  const projects = parseProjects(source);

  // Projects written up on the blog live at their post's URL, so they are
  // listed under Writing rather than twice under two headings.
  const caseStudies = projects.filter((project) => !project.article);

  const sections = [
    `# ${AUTHOR}`,
    '',
    `> ${SUMMARY}`,
    '',
    '## Pages',
    '',
    link(`${AUTHOR} — Portfolio`, '/', 'Home: introduction, skills, services, selected work, and contact.'),
    link('Work', '/work', 'Every project in one list, filterable by category and tag.'),
    link('Blog', '/blog', 'Articles about software projects, AI, photography, and travel.'),
    link('Resume', '/resume', 'Full resume: experience, skills, education, and certifications.'),
    '',
    '## Projects',
    '',
    ...caseStudies.map((project) =>
      link(project.title, projectPath(project), `${project.category}. ${project.summary}`)
    ),
    '',
    '## Writing',
    '',
    ...posts.map((post) => link(post.title, post.path, `${post.published}. ${post.description}`)),
    '',
    '## Optional',
    '',
    link('RSS feed', '/rss.xml', 'New articles, in publication order.'),
    link('Sitemap', '/sitemap.xml', 'Every URL, in all four published languages.'),
    '',
  ];

  return `${sections.join('\n')}`;
}
