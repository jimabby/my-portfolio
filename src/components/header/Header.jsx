import React, { useEffect, useState } from 'react'
import "./header.css"
import { useLocation } from 'react-router';
import { splitLocalePath } from '../../i18n/routes';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import UpdatesDot from './UpdatesDot';
import LocaleLink from "../../i18n/LocaleLink";

const SECTIONS = ['home', 'about', 'skills', 'services', 'portfolio', 'testimonial', 'contact'];

const THEME_STORAGE_KEY = 'theme';

// Browser-chrome colour per theme. Mirrors --body-color in index.css and the
// inline bootstrap script in index.html, which paints both the attribute and
// this meta tag before first paint to avoid a flash of the wrong theme.
const THEME_COLOR = { light: '#f7f7f7', dark: '#101318' };

// Only a deliberate toggle is ever stored. Returns null when the visitor has
// never chosen, which is what keeps the OS setting authoritative.
const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Ignore storage errors in restricted contexts.
  }
  return null;
};

const systemTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';

// An explicit choice always wins; otherwise follow the OS setting so a visitor
// browsing in dark mode isn't hit with a white page.
const getInitialTheme = () => readStoredTheme() ?? systemTheme();

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("scroll-header", window.scrollY >= 80);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //Toggle Menu
  const [Toggle, showMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  // Compare against the language-independent path: the portfolio page lives at
  // "/" in English but at "/ja", "/zh-Hans" and "/zh-Hant" in the others.
  const path = splitLocalePath(location.pathname).path;

  // Track active section via IntersectionObserver on portfolio page
  useEffect(() => {
    if (path !== '/') return;

    const observers = [];
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(`#${entry.target.id}`);
        }
      });
    };

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect, {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [path]);

  const currentActiveNav = path.startsWith('/blog') ? 'blog' : activeNav;

  // Dark mode
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply only — never persist here. Writing on mount would turn the OS-derived
  // default into a stored choice on the very first page view, permanently
  // detaching the site from the system setting.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  // Follow the OS while the visitor has made no explicit choice, so switching
  // the system theme in another window is reflected here without a reload.
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!query?.addEventListener) return;
    const onChange = (event) => {
      if (readStoredTheme()) return;
      setTheme(event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore storage errors in restricted contexts.
      }
      return next;
    });
  };

  const handleNavClick = (hash) => {
    setActiveNav(hash);
    showMenu(false);
  };

  return (
    <header className='header'>
      <nav className='nav container'>
        <LocaleLink to="/" className="nav__logo">Jim</LocaleLink>

        <div className={Toggle ? "nav__menu show-menu": "nav__menu"}>
          <ul className='nav__list grid'>
            <li className='nav__item'>
              <LocaleLink
                to="/#home"
                onClick={() => handleNavClick('#home')}
                className={currentActiveNav === '#home' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-estate nav__icon'></i>{t('nav.home')}
              </LocaleLink>
            </li>
            <li className='nav__item'>
              <LocaleLink
                to="/#about"
                onClick={() => handleNavClick('#about')}
                className={currentActiveNav === '#about' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-user nav__icon'></i>{t('nav.about')}
              </LocaleLink>
            </li>
            <li className='nav__item'>
              <LocaleLink
                to="/#skills"
                onClick={() => handleNavClick('#skills')}
                className={currentActiveNav === '#skills' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-file nav__icon'></i>{t('nav.skills')}
              </LocaleLink>
            </li>
            <li className='nav__item'>
              <LocaleLink
                to="/#services"
                onClick={() => handleNavClick('#services')}
                className={currentActiveNav === '#services' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-briefcase-alt nav__icon'></i>{t('nav.services')}
              </LocaleLink>
            </li>
            <li className='nav__item'>
              <LocaleLink
                to="/#portfolio"
                onClick={() => handleNavClick('#portfolio')}
                className={currentActiveNav === '#portfolio' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-scenery nav__icon'></i>{t('nav.portfolio')}
              </LocaleLink>
            </li>
            <li className="nav__item">
              <LocaleLink
                to="/blog"
                onClick={() => handleNavClick("blog")}
                className={
                  currentActiveNav === "blog" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-notes nav__icon"></i>{t('nav.blog')}
              </LocaleLink>
            </li>
            <li className='nav__item'>
              <LocaleLink
                to="/#contact"
                onClick={() => handleNavClick('#contact')}
                className={currentActiveNav === '#contact' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-message nav__icon'></i>{t('nav.contact')}
              </LocaleLink>
            </li>
          </ul>

          <button type="button" className="nav__close" onClick={() => showMenu(false)} aria-label={t('nav.menuClose')}>
            <i className="uil uil-times"></i>
          </button>
        </div>

        <div className="nav__buttons">
          <UpdatesDot />
          <LanguageSwitcher />
          <button
            type="button"
            className="nav__theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t('theme.toDark') : t('theme.toLight')}
            aria-pressed={theme === 'dark'}
          >
            <i className={theme === 'light' ? 'uil uil-moon' : 'uil uil-sun'}></i>
          </button>
          <button
            type="button"
            className='nav__toggle'
            onClick={() => showMenu(!Toggle)}
            aria-label={Toggle ? t('nav.menuClose') : t('nav.menuOpen')}
            aria-expanded={Toggle}
          >
            <i className='uil uil-apps'></i>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
