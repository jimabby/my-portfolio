import React, { useEffect, useState } from 'react'
import "./header.css"
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import UpdatesDot from './UpdatesDot';

const SECTIONS = ['home', 'about', 'skills', 'services', 'portfolio', 'testimonial', 'contact'];

const getStoredTheme = () => {
  try {
    return localStorage.getItem('theme') || 'light';
  } catch {
    return 'light';
  }
};

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

  // Track active section via IntersectionObserver on portfolio page
  useEffect(() => {
    if (location.pathname !== '/') return;

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
  }, [location.pathname]);

  const currentActiveNav = location.pathname.startsWith('/blog') ? 'blog' : activeNav;

  // Dark mode
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage errors in restricted contexts.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavClick = (hash) => {
    setActiveNav(hash);
    showMenu(false);
  };

  return (
    <header className='header'>
      <nav className='nav container'>
        <Link to="/" className="nav__logo">Jim</Link>

        <div className={Toggle ? "nav__menu show-menu": "nav__menu"}>
          <ul className='nav__list grid'>
            <li className='nav__item'>
              <Link
                to="/#home"
                onClick={() => handleNavClick('#home')}
                className={currentActiveNav === '#home' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-estate nav__icon'></i>{t('nav.home')}
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#about"
                onClick={() => handleNavClick('#about')}
                className={currentActiveNav === '#about' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-user nav__icon'></i>{t('nav.about')}
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#skills"
                onClick={() => handleNavClick('#skills')}
                className={currentActiveNav === '#skills' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-file nav__icon'></i>{t('nav.skills')}
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#services"
                onClick={() => handleNavClick('#services')}
                className={currentActiveNav === '#services' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-briefcase-alt nav__icon'></i>{t('nav.services')}
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#portfolio"
                onClick={() => handleNavClick('#portfolio')}
                className={currentActiveNav === '#portfolio' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-scenery nav__icon'></i>{t('nav.portfolio')}
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/blog"
                onClick={() => handleNavClick("blog")}
                className={
                  currentActiveNav === "blog" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-notes nav__icon"></i>{t('nav.blog')}
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#contact"
                onClick={() => handleNavClick('#contact')}
                className={currentActiveNav === '#contact' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-message nav__icon'></i>{t('nav.contact')}
              </Link>
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
