import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';
import { DEFAULT_LANG, splitLocalePath } from './routes';

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh-Hans', label: '简体中文', short: '简' },
  { code: 'zh-Hant', label: '繁體中文', short: '繁' },
  { code: 'ja', label: '日本語', short: '日' },
];

const SUPPORTED = LANGUAGES.map((l) => l.code);
const STORAGE_KEY = 'lang';

// Map the browser's preferred language onto one of ours.
export const detectBrowserLang = () => {
  const nav = (typeof navigator !== 'undefined' && navigator.language) || '';
  const lower = nav.toLowerCase();
  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('zh')) {
    // zh-TW, zh-HK, zh-Hant -> Traditional; everything else zh -> Simplified
    if (lower.includes('tw') || lower.includes('hk') || lower.includes('hant')) return 'zh-Hant';
    return 'zh-Hans';
  }
  return DEFAULT_LANG;
};

// Whether the visitor has ever picked a language explicitly. Distinct from
// "which language is showing": the URL decides that, and only a deliberate
// choice should suppress the one-time redirect for a browser-preferred locale.
export const readStoredLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && SUPPORTED.includes(stored) ? stored : null;
  } catch {
    return null;
  }
};

// The language the URL asks for, resolved before React mounts so the very first
// render is already correct and no text flips after hydration.
const initialLang = () => {
  const fromUrl =
    typeof window !== 'undefined' ? splitLocalePath(window.location.pathname).lang : DEFAULT_LANG;
  if (fromUrl !== DEFAULT_LANG) return fromUrl;
  return readStoredLang() ?? DEFAULT_LANG;
};

// Resolve a dot-separated path against a nested object.
const resolve = (obj, path) => {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
};

// Dictionaries contributed by code-split chunks. Long-form blog prose is ~45 kB
// gzipped across four languages, which has no business sitting in the entry
// bundle for visitors who never open an article — so the blog chunk registers
// it here instead of `translations` importing it up front.
//
// Registration happens while the chunk's modules evaluate, which always
// completes before React renders anything from that chunk, so `t` sees the
// strings on the very first render and nothing flashes.
const lazyDictionaries = [];

export const registerDictionary = (dictionary) => {
  if (dictionary && !lazyDictionaries.includes(dictionary)) {
    lazyDictionaries.push(dictionary);
  }
};

const lookup = (lang, path) => {
  const fromBase = resolve(translations[lang], path);
  if (fromBase !== undefined && fromBase !== null) return fromBase;
  for (const dictionary of lazyDictionaries) {
    const value = resolve(dictionary[lang], path);
    if (value !== undefined && value !== null) return value;
  }
  return undefined;
};

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (path) => path,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(initialLang);
  const [hasStoredPreference, setHasStoredPreference] = useState(() => readStoredLang() !== null);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  // `persist: false` is how the router syncs state to the URL without turning a
  // shared link into a stored preference — only the language switcher records
  // an actual choice.
  const setLang = useCallback((next, { persist = true } = {}) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    if (!persist) return;
    setHasStoredPreference(true);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }, []);

  const t = useMemo(() => {
    return (path, fallback) => {
      const value = lookup(lang, path);
      if (value !== undefined) return value;
      const en = lookup(DEFAULT_LANG, path);
      if (en !== undefined) return en;
      return fallback !== undefined ? fallback : path;
    };
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, hasStoredPreference }),
    [lang, setLang, t, hasStoredPreference]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
