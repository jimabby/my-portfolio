import React, { useEffect } from "react";
import "./scrollup.css";
import { useLanguage } from "../../i18n/LanguageContext";

// Back to top. A ring round the button's edge fills as the visitor reads down
// the page, like a progress indicator; pressing it goes back to the start.
const ScrollUp = () => {
  const { t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollup = document.querySelector(".scrollup");
      if (scrollup) {
        scrollup.classList.toggle("show-scroll", window.scrollY >= 560);
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / max));
        scrollup.style.setProperty("--played", `${(progress * 360).toFixed(1)}deg`);
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
