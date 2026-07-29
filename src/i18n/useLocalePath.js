import { useLanguage } from './LanguageContext';
import { localizedPath } from './routes';

// Turns a canonical, language-independent path ("/blog/hermes") into one that
// keeps the visitor in their current language ("/ja/blog/hermes"). Without it,
// following any link from a translated page would silently drop back to
// English, because the URL is what selects the language.
export const useLocalePath = () => {
  const { lang } = useLanguage();
  return (to = '/') => {
    const [pathname, hash] = String(to).split('#');
    const localized = localizedPath(lang, pathname || '/');
    return hash ? `${localized}#${hash}` : localized;
  };
};

export default useLocalePath;
