import React, { useEffect } from "react";
import "./scrollup.css";

const ScrollUp = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollup = document.querySelector(".scrollup");
      if (!scrollup) return;

      if (window.scrollY >= 560) {
        scrollup.classList.add("show-scroll");
      } else {
        scrollup.classList.remove("show-scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a href="#top" className="scrollup">
      <i className="uil uil-arrow-up scrollup__icon"></i>
    </a>
  );
};

export default ScrollUp;
