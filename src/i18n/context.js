import { createContext } from 'react';
import { DEFAULT_LANG } from './routes';

// The context object lives in its own module so LanguageContext.jsx can keep
// exporting only its provider and hooks — exporting a context alongside a
// component breaks fast refresh for the whole file.
//
// ErrorBoundary is the reason this is exported at all: it is a class
// component, so `static contextType` is its only way to read the language.
//
// The default `t` honours the caller's fallback rather than echoing the key.
// The only consumer that ever sees this value is a component rendering outside
// the provider, and showing it "error.title" is worse than showing it English.
export const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (path, fallback) => fallback ?? path,
});

export default LanguageContext;
