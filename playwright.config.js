import { defineConfig, devices } from '@playwright/test';

// Smoke tests against the real build output.
//
// The vitest suite covers components in jsdom, which never sees the part of
// this project with the most moving parts: the prerendered per-route <head>,
// the generated manifests and feeds, the service worker, and the 404 shell.
// Those are produced by four build scripts and asserted by nothing.
//
// `npm run e2e` builds and previews automatically. Chromium only — these check
// that the pipeline emitted the right bytes, not that the CSS renders the same
// in every engine.
const PORT = 4318;

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
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
