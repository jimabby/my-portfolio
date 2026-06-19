import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh-Hans', label: '简体中文', short: '简' },
  { code: 'zh-Hant', label: '繁體中文', short: '繁' },
  { code: 'ja', label: '日本語', short: '日' },
];

const SUPPORTED = LANGUAGES.map((l) => l.code);
const STORAGE_KEY = 'lang';
const DEFAULT_LANG = 'en';

// Map a browser language tag to one of our supported codes.
const detectLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {
    // ignore storage errors
  }
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

// Resolve a dot-separated path against a nested object.
const resolve = (obj, path) => {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
};

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (path) => path,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(detectLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const setLang = (next) => {
    if (SUPPORTED.includes(next)) setLangState(next);
  };

  const t = useMemo(() => {
    return (path, fallback) => {
      const value = resolve(translations[lang], path);
      if (value !== undefined && value !== null) return value;
      const en = resolve(translations[DEFAULT_LANG], path);
      if (en !== undefined && en !== null) return en;
      return fallback !== undefined ? fallback : path;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
