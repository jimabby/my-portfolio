import { defineConfig, devices } from '@playwright/test';

// Smoke tests against the real build output.
//
// The vitest suite covers components in jsdom, which never sees the part of
// this project with the most moving parts: the prerendered per-route <head>,
// the generated manifests and feeds, the service worker, and the 404 shell.
// Those are produced by four build scripts and asserted by nothing.
//
// Locally `npm run e2e` builds and previews automatically. In CI the workflow
// builds in its own step instead — see webServer below. Chromium only: these
// check that the pipeline emitted the right bytes, not that the CSS renders
// the same in every engine.
const PORT = 4318;

const PREVIEW = `npx vite preview --port ${PORT} --strictPort`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // `vite preview` serves dist/ the way Vercel does for static files, which
    // is what makes the prerendered .html assertions below meaningful.
    //
    // The build stays out of this command in CI. Playwright swallows the
    // server's output until the URL answers, so a cold image build that ran
    // long used to surface only as `Timed out waiting 180000ms` with nothing
    // to read; the workflow now builds in a step of its own, where a failure
    // prints its own error and the cache can be restored around it.
    command: process.env.CI ? PREVIEW : `npm run build && ${PREVIEW}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: process.env.CI ? 60_000 : 180_000,
  },
});
