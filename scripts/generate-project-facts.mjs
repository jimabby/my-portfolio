// Writes api/projectFacts.js from the app's own project and blog data, so the
// AI assistant's knowledge of the portfolio is derived rather than retyped.
// Runs from `npm run facts`, and from predev/prebuild so it is never stale in
// a deployed build.

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildFacts, renderModule } from './project-facts.mjs';

const root = process.cwd();
const source = await readFile(join(root, 'src/components/portfolio/Data.jsx'), 'utf8');
const output = join(root, 'api/projectFacts.js');

const contents = renderModule(buildFacts(source));

// Only touch the file when it actually changes, so a no-op build does not
// churn the working tree.
const existing = await readFile(output, 'utf8').catch(() => null);
if (existing === contents) {
  console.log('Project facts: already up to date.');
} else {
  await writeFile(output, contents, 'utf8');
  console.log('Project facts: wrote api/projectFacts.js.');
}
