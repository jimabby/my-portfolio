import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LANGUAGES, useLanguage } from '../../i18n/LanguageContext';
import { localizedPath, splitLocalePath } from '../../i18n/routes';

const LanguageSwitcher = () => {
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Switching language changes the URL, because the URL is what decides which
  // language renders. Staying on the same page keeps the hash so the visitor
  // does not lose their place in the one-page scroll.
  const choose = (code) => {
    setOpen(false);
    if (code === lang) return;
    setLang(code);
    const { path } = splitLocalePath(location.pathname);
    navigate(
      { pathname: localizedPath(code, path), hash: location.hash, search: location.search },
      { replace: true }
    );
  };

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        type="button"
        className="lang-switcher__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        title={t('nav.language')}
      >
        <i className="uil uil-globe"></i>
        <span className="lang-switcher__current">{current.short}</span>
      </button>

      {open && (
        <ul className="lang-switcher__menu" role="listbox" aria-label={t('nav.language')}>
          {LANGUAGES.map((l) => (
            <li key={l.code} role="none">
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                className={`lang-switcher__option${l.code === lang ? ' is-active' : ''}`}
                onClick={() => choose(l.code)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
