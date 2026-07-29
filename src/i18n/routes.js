// URL <-> language mapping.
//
// Every page exists at one URL per language, because a language kept only in
// localStorage is invisible to search engines and impossible to link to: all
// four translations collapsed onto a single English-looking URL. English keeps
// the bare path (it is the default and x-default), the others take a prefix:
//
//   /blog/hermes            en
//   /zh-Hans/blog/hermes    zh-Hans
//   /zh-Hant/blog/hermes    zh-Hant
//   /ja/blog/hermes         ja

export const DEFAULT_LANG = 'en';

// Order matters only for readability; `en` deliberately has no prefix.
export const LOCALE_PREFIXES = {
  en: '',
  'zh-Hans': '/zh-Hans',
  'zh-Hant': '/zh-Hant',
  ja: '/ja',
};

export const LOCALE_CODES = Object.keys(LOCALE_PREFIXES);

// The path segments that introduce a non-default language.
export const PREFIXED_LOCALES = LOCALE_CODES.filter((code) => code !== DEFAULT_LANG);

// BCP 47 tags for hreflang and og:locale.
export const HREFLANG = {
  en: 'en',
  'zh-Hans': 'zh-Hans',
  'zh-Hant': 'zh-Hant',
  ja: 'ja',
};

export const OG_LOCALE = {
  en: 'en_US',
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
  ja: 'ja_JP',
};

// Split a pathname into its language and the language-independent path.
// "/ja/blog/hermes" -> { lang: 'ja', path: '/blog/hermes' }
export const splitLocalePath = (pathname) => {
  const [, first = '', ...rest] = pathname.split('/');
  if (PREFIXED_LOCALES.includes(first)) {
    return { lang: first, path: `/${rest.join('/')}`.replace(/\/$/, '') || '/' };
  }
  return { lang: DEFAULT_LANG, path: pathname || '/' };
};

// Build the URL for a canonical path in a given language.
// ('ja', '/blog/hermes') -> '/ja/blog/hermes'
export const localizedPath = (lang, path = '/') => {
  const prefix = LOCALE_PREFIXES[lang] ?? '';
  const clean = path === '/' ? '' : path;
  return `${prefix}${clean}` || '/';
};
