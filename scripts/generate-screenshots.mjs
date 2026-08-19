// Renders the real home page at two viewports for the manifest's `screenshots`
// field, which is what unlocks Chrome's richer install dialog instead of the
// bare one-line prompt.
//
// Not part of prebuild: it needs a built site and a headless browser, and the
// output only changes when the design does. Run `npm run screenshots` after a
// visual change and commit the result.
//
// Deliberately screenshots the running site rather than composing something in
// sharp. A manifest screenshot is a promise about what the app looks like; a
// synthesised graphic would be a picture of a promise.

import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const PORT = 4319;
const ORIGIN = `http://localhost:${PORT}`;
const OUT_DIR = join(process.cwd(), 'public/screenshots');

// Sizes Chrome documents for the two form factors. The narrow shot is a phone
// viewport; the wide one is a small laptop.
const SHOTS = [
  { name: 'home-wide.webp', width: 1280, height: 800, formFactor: 'wide' },
  { name: 'home-narrow.webp', width: 540, height: 1170, formFactor: 'narrow' },
];

const waitForServer = async (url, timeoutMs = 30000) => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Screenshots: ${url} did not come up within ${timeoutMs}ms`);
};

const preview = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort'],
  { stdio: 'ignore', shell: process.platform === 'win32' }
);

let browser;
try {
  await waitForServer(ORIGIN);
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  browser = await chromium.launch();

  for (const shot of SHOTS) {
    const page = await browser.newPage({
      viewport: { width: shot.width, height: shot.height },
      deviceScaleFactor: 1,
      // Screenshot the light theme regardless of the machine's OS setting, so
      // reruns on different laptops don't flip the committed images.
      colorScheme: 'light',
      // The reveal-on-scroll animation starts every section at opacity 0. With
      // motion reduced the CSS shows them immediately, so the shot is of the
      // page rather than of its first animation frame.
      reducedMotion: 'reduce',
    });
    await page.goto(ORIGIN, { waitUntil: 'networkidle' });
    // The hero portrait is the largest element on first paint; wait for it
    // rather than for a fixed delay.
    await page.waitForSelector('.home__img, .home__blob, img', { timeout: 10000 });
    await page.screenshot({
      path: join(OUT_DIR, shot.name),
      type: 'webp',
      quality: 80,
    });
    await page.close();
    console.log(`Screenshots: wrote ${shot.name} (${shot.width}x${shot.height}, ${shot.formFactor}).`);
  }
} finally {
  await browser?.close();
  preview.kill();
}
