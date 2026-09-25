import React, { useEffect, useRef } from "react";
import "./scrollup.css";
import { useLanguage } from "../../i18n/LanguageContext";

// Back to top as a rewind. The button is a small reel: a ring round its edge
// fills as the visitor reads down the page — how much of the reel has run —
// and pressing it winds the film back to the start: the page scrolls up, the
// spokes spin backwards, and a camcorder's "◀◀ REW" blinks in the corner of
// the frame until it gets there.
const ScrollUp = () => {
  const { t } = useLanguage();
  const rewindTimer = useRef(0);

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
      // Rewound: stop the rewind as soon as the top is reached.
      if (window.scrollY <= 2 && document.documentElement.dataset.rewind) {
        delete document.documentElement.dataset.rewind;
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(rewindTimer.current);
      delete document.documentElement.dataset.rewind;
    };
  }, []);

  // The link still does the scrolling (href="#top" with smooth scrolling
  // from App.css); this only marks the page as rewinding while it happens.
  // The timer is a backstop in case the visitor interrupts the scroll.
  const onRewind = () => {
    document.documentElement.dataset.rewind = "1";
    clearTimeout(rewindTimer.current);
    rewindTimer.current = setTimeout(() => {
      delete document.documentElement.dataset.rewind;
    }, 2500);
  };

  // The icon is the whole of the link's content, so without a label this is the
  // one icon control on the site a screen reader announces as just "link".
  return (
    <>
      <a href="#top" className="scrollup" aria-label={t('nav.backToTop')} onClick={onRewind}>
        <span className="scrollup__icon" aria-hidden="true">◀◀</span>
      </a>
      <span className="scrollup__rew" aria-hidden="true">◀◀ REW</span>
    </>
  );
};

export default ScrollUp;
