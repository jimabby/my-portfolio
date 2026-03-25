import React, { useEffect, useState } from 'react'
import "./header.css"
import { Link, useLocation } from 'react-router-dom';

const SECTIONS = ['home', 'about', 'skills', 'services', 'portfolio', 'testimonial', 'contact'];

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector(".header");
      if (!header) return;
      if (window.scrollY >= 80) {
        header.classList.add("scroll-header");
      } else {
        header.classList.remove("scroll-header");
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //Toggle Menu
  const [Toggle, showMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  // Track active section via IntersectionObserver on portfolio page
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/my-portfolio') return;

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

  // Set blog as active when on blog routes
  useEffect(() => {
    if (location.pathname.startsWith('/blog')) {
      setActiveNav('blog');
    }
  }, [location.pathname]);

  // Dark mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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
                className={activeNav === '#home' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-estate nav__icon'></i>Home
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#about"
                onClick={() => handleNavClick('#about')}
                className={activeNav === '#about' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-user nav__icon'></i>About
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#skills"
                onClick={() => handleNavClick('#skills')}
                className={activeNav === '#skills' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-file nav__icon'></i>Skills
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#services"
                onClick={() => handleNavClick('#services')}
                className={activeNav === '#services' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-briefcase-alt nav__icon'></i>Services
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#portfolio"
                onClick={() => handleNavClick('#portfolio')}
                className={activeNav === '#portfolio' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-scenery nav__icon'></i>Portfolio
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/blog"
                onClick={() => handleNavClick("blog")}
                className={
                  activeNav === "blog" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-notes nav__icon"></i>Blog
              </Link>
            </li>
            <li className='nav__item'>
              <Link
                to="/#contact"
                onClick={() => handleNavClick('#contact')}
                className={activeNav === '#contact' ? 'nav__link active-link' : 'nav__link'}
              >
                <i className='uil uil-message nav__icon'></i>Contact
              </Link>
            </li>
          </ul>

          <button className="nav__close" onClick={() => showMenu(!Toggle)} aria-label="Close menu">
            <i className="uil uil-times"></i>
          </button>
        </div>

        <div className="nav__buttons">
          <button className="nav__theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <i className={theme === 'light' ? 'uil uil-moon' : 'uil uil-sun'}></i>
          </button>
          <button className='nav__toggle' onClick={() => showMenu(!Toggle)} aria-label="Open menu">
            <i className='uil uil-apps'></i>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
