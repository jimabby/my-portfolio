import { describe, it, expect } from 'vitest';
import { allManifests, buildManifest, manifestPath } from '../../scripts/manifests.mjs';
import { LOCALE_CODES } from '../i18n/routes';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// One manifest per language. A single manifest with start_url "/" meant that
// installing the site from /ja produced an app that opened in English every
// time it was launched.

describe('web app manifests', () => {
  it('covers every language the site publishes', () => {
    expect(allManifests().map((entry) => entry.lang).sort()).toEqual([...LOCALE_CODES].sort());
  });

  it('keeps English at /manifest.json so existing installs still resolve', () => {
    expect(manifestPath('en')).toBe('/manifest.json');
    expect(buildManifest('en').start_url).toBe('/');
  });

  it('opens each translation at its own start URL', () => {
    expect(buildManifest('ja').start_url).toBe('/ja');
    expect(buildManifest('zh-Hans').start_url).toBe('/zh-Hans');
    expect(buildManifest('zh-Hant').start_url).toBe('/zh-Hant');
  });

  it('gives every language a distinct id so installs do not collide', () => {
    const ids = LOCALE_CODES.map((lang) => buildManifest(lang).id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps scope at the site root so cross-language links stay in the app', () => {
    for (const lang of LOCALE_CODES) {
      expect(buildManifest(lang).scope, `scope for ${lang}`).toBe('/');
    }
  });

  it('declares its language and localizes the name a visitor sees', () => {
    expect(buildManifest('ja').lang).toBe('ja');
    expect(buildManifest('ja').name).not.toBe(buildManifest('en').name);
    expect(buildManifest('ja').description).not.toBe(buildManifest('en').description);
  });

  it('ships the icons and screenshots the install prompt needs', () => {
    const manifest = buildManifest('en');
    expect(manifest.icons.some((icon) => icon.purpose === 'maskable')).toBe(true);
    // Chrome shows the richer install dialog only with both form factors.
    expect(manifest.screenshots.map((shot) => shot.form_factor).sort()).toEqual([
      'narrow',
      'wide',
    ]);
  });

  // A manifest that names a screenshot which is not there is worse than one
  // with no screenshots: the install prompt falls back with a console error.
  it('references screenshot files that actually exist', () => {
    for (const shot of buildManifest('en').screenshots) {
      const file = join(process.cwd(), 'public', shot.src.slice(1));
      expect(existsSync(file), 'missing ' + shot.src + ' - run npm run screenshots').toBe(true);
    }
  });
});
