import React, { useEffect } from "react";
import "./scrollup.css";

const ScrollUp = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollup = document.querySelector(".scrollup");
      if (!scrollup) return; // ✅ prevent null crash

      if (window.scrollY >= 560) {
        scrollup.classList.add("show-scroll");
      } else {
        scrollup.classList.remove("show-scroll");
      }
    };

    // Run once and add listener
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a href="#top" className="scrollup">
      <i className="uil uil-arrow-up scrollup__icon"></i>
    </a>
  );
};

export default ScrollUp;

