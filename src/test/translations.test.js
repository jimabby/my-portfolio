import { describe, it, expect } from 'vitest';
import { translations } from '../i18n/translations.js';
import { projectsData } from '../components/portfolio/Data.jsx';
import { projectSummaries } from '../i18n/projects.mjs';

// Collect every leaf key path. Arrays are treated as leaves so per-language
// list length differences don't register as missing keys.
function keyPaths(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out.push(...keyPaths(v, path));
    } else {
      out.push(path);
    }
  }
  return out.sort();
}

describe('translations', () => {
  const langs = Object.keys(translations);

  it('supports the four expected languages', () => {
    expect(langs.sort()).toEqual(['en', 'ja', 'zh-Hans', 'zh-Hant']);
  });

  it('has identical key sets in every language (no missing translations)', () => {
    const enKeys = keyPaths(translations.en);
    for (const lang of langs) {
      if (lang === 'en') continue;
      expect(keyPaths(translations[lang]), `missing/extra keys in "${lang}"`).toEqual(enKeys);
    }
  });

  it('has a localized summary for every portfolio project', () => {
    const projectIds = projectsData.map((project) => String(project.id)).sort();
    for (const lang of langs) {
      expect(
        Object.keys(projectSummaries[lang]).sort(),
        `project summaries are incomplete for "${lang}"`
      ).toEqual(projectIds);
    }
  });
});
