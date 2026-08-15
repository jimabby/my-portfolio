// Writes the computed Content-Security-Policy into vercel.json.
//
// It has to be committed, not emitted into dist: Vercel reads headers from the
// repo's vercel.json when it configures the deployment, not from the build
// output. So this runs from `npm run csp` and from prebuild, the result is
// committed, and a test fails if the two ever fall out of step — the same
// arrangement as the generated icon CSS and project facts.

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cspFrom } from './csp.mjs';

const root = process.cwd();
const html = await readFile(join(root, 'index.html'), 'utf8');
const configPath = join(root, 'vercel.json');
const existing = await readFile(configPath, 'utf8');

const csp = cspFrom(html);
const config = JSON.parse(existing);

const header = config.headers
  ?.find((entry) => entry.source === '/(.*)')
  ?.headers?.find((entry) => entry.key === 'Content-Security-Policy');

if (!header) {
  throw new Error('CSP: no Content-Security-Policy header found in vercel.json');
}

if (header.value === csp) {
  console.log('CSP: already up to date.');
} else {
  header.value = csp;
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  console.log('CSP: updated vercel.json.');
}
