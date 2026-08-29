import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { cspFrom, inlineScripts, sha256 } from '../../scripts/csp.mjs';

// Relative to the project root, where vitest runs.
const html = readFileSync('index.html', 'utf8');
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));

const csp = config.headers
  .find((entry) => entry.source === '/(.*)')
  .headers.find((entry) => entry.key === 'Content-Security-Policy').value;

// A stale hash is silent in dev — the policy only exists in production — and
// its symptom there is the theme bootstrap being blocked, which shows up as a
// flash of the wrong theme on every cold load rather than as an error.
describe('content security policy', () => {
  it('is committed in sync with index.html', () => {
    expect(csp, 'vercel.json CSP is stale — run `npm run csp`').toBe(cspFrom(html));
  });

  it('carries a hash for every executable inline script', () => {
    const scripts = inlineScripts(html);
    expect(scripts.length).toBeGreaterThan(0);
    for (const script of scripts) {
      expect(csp, 'an inline script has no hash in the policy').toContain(sha256(script));
    }
  });

  // The bootstrap snippet spans several lines, so its line endings are part
  // of what gets hashed. git commits index.html with LF and checks it out as
  // CRLF on Windows, and `npm run csp` runs from prebuild — so before the
  // bodies were normalised, any Windows build rewrote vercel.json with a hash
  // that did not match the LF file Vercel serves. That fails silently in
  // production: the theme bootstrap is blocked and every cold load flashes
  // the wrong theme.
  it('hashes the same on a CRLF checkout as on an LF one', () => {
    const lf = html.replace(/\r\n/g, '\n');
    const crlf = lf.replace(/\n/g, '\r\n');

    expect(cspFrom(crlf)).toBe(cspFrom(lf));
    expect(csp).toBe(cspFrom(lf));
  });

  it('no longer allows arbitrary inline script', () => {
    const scriptSrc = csp.split('; ').find((directive) => directive.startsWith('script-src'));
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(scriptSrc).not.toContain("'unsafe-eval'");
  });

  // Poppins is self-hosted now; a policy that still reaches for Google's fonts
  // would mean the @import crept back into App.css.
  it('does not permit third-party fonts or styles', () => {
    expect(csp).not.toContain('fonts.googleapis.com');
    expect(csp).not.toContain('fonts.gstatic.com');
  });

  // Comments stripped first: App.css explains in prose why the remote import
  // was removed, and the mention is not the thing being guarded against.
  it('loads no stylesheet or font from a third-party origin', () => {
    const stylesheets = ['src/App.css', 'src/index.css', 'src/assets/fonts.css'];
    for (const path of stylesheets) {
      const code = readFileSync(path, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
      expect(code, `${path} reaches off-origin for a resource`).not.toMatch(
        /url\(\s*['"]?https?:\/\//
      );
    }
  });

  it('allows the service worker it registers', () => {
    expect(csp).toContain("worker-src 'self'");
  });
});
