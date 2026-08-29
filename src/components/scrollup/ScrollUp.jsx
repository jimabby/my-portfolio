import React, { useEffect } from "react";
import "./scrollup.css";
import { useLanguage } from "../../i18n/LanguageContext";

const ScrollUp = () => {
  const { t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollup = document.querySelector(".scrollup");
      if (scrollup) {
        scrollup.classList.toggle("show-scroll", window.scrollY >= 560);
      }
      ticking = false;
    };
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The icon is the whole of the link's content, so without a label this is the
  // one icon control on the site a screen reader announces as just "link".
  return (
    <a href="#top" className="scrollup" aria-label={t('nav.backToTop')}>
      <i className="uil uil-arrow-up scrollup__icon" aria-hidden="true"></i>
    </a>
  );
};

export default ScrollUp;
