// On-demand loading for the UI string dictionaries.
//
// All four languages used to sit in one module in the entry bundle, so every
// visitor paid ~14 kB gzipped to carry three languages they were not reading.
// Each is now its own chunk, and only the active one (plus English, which is
// the fallback whenever a key is missing) is ever fetched.
//
// The dictionaries are held in a plain module-level map rather than in React
// state on purpose: `t` has to be synchronous and correct on the very first
// render, or the page paints raw key paths and then flips to real text.
// main.jsx awaits the active language before mounting, which is what makes
// that guarantee hold.

import { DEFAULT_LANG } from '../routes';

// Written as literal import() calls so the bundler can see all four at build
// time and emit a chunk for each. A computed specifier would defeat that.
const loaders = {
  en: () => import('./en.js'),
  'zh-Hans': () => import('./zh-Hans.js'),
  'zh-Hant': () => import('./zh-Hant.js'),
  ja: () => import('./ja.js'),
};

export const SUPPORTED_LANGS = Object.keys(loaders);

const dictionaries = {};
const inFlight = {};

export const isLoaded = (lang) => Boolean(dictionaries[lang]);

export const dictionaryFor = (lang) => dictionaries[lang];

// Idempotent, and safe to call concurrently for the same language — the second
// caller awaits the first request rather than issuing another.
export function loadLocale(lang) {
  if (dictionaries[lang]) return Promise.resolve(dictionaries[lang]);
  if (!loaders[lang]) return Promise.resolve(undefined);
  if (!inFlight[lang]) {
    inFlight[lang] = loaders[lang]()
      .then((module) => {
        dictionaries[lang] = module.default;
        return dictionaries[lang];
      })
      .finally(() => {
        delete inFlight[lang];
      });
  }
  return inFlight[lang];
}

// What the app needs before it can render a given language: the language
// itself, and English underneath it so a key missing from a translation falls
// back to real text instead of its own key path.
export function loadLocaleWithFallback(lang) {
  const needed = lang === DEFAULT_LANG ? [lang] : [lang, DEFAULT_LANG];
  return Promise.all(needed.map(loadLocale));
}
