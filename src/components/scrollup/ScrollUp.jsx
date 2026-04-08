import React, { useEffect } from "react";
import "./scrollup.css";

const ScrollUp = () => {
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

  return (
    <a href="#top" className="scrollup">
      <i className="uil uil-arrow-up scrollup__icon"></i>
    </a>
  );
};

export default ScrollUp;
