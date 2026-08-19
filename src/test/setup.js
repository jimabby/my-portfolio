import '@testing-library/jest-dom';
import { loadLocale, SUPPORTED_LANGS } from '../i18n/locales';

// jsdom implements neither of these, and the portfolio page uses both on mount
// (section reveal, active-nav tracking, reduced-motion checks). Inert stubs
// keep them from throwing without pretending to simulate visibility.
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  });
}

// The UI dictionaries are separate chunks now, fetched before the first render
// by main.jsx. A test renders LanguageProvider directly and never runs
// main.jsx, so without this every assertion on visible text would be comparing
// against raw key paths.
//
// All four, not just English: several tests render a translated page, and the
// full set is what makes a missing translation show up as a failing assertion
// rather than as a silent fallback to English.
await Promise.all(SUPPORTED_LANGS.map(loadLocale));
