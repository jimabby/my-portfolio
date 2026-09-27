import { useEffect, useRef } from 'react';
import './statusbar.css';

// An editor's status bar in the corner of the page: the branch, the file you
// are in, and the cursor's line, as if the page were one source file being
// scrolled through. Decorative — every piece of it is hidden from assistive
// tech, and the headings it reads are already in the document.
//
// Each section is a file named after its id (#about → about.jsx), and scroll
// position maps onto a line in a file of LINES lines. It writes straight to
// the DOM once per animation frame rather than through React state: a
// re-render per scroll event would cost more than the effect is worth.
const LINES = 2400;

const StatusBar = () => {
  const fileRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const paint = () => {
      frame = 0;
      const root = document.documentElement;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      if (lineRef.current) lineRef.current.textContent = `Ln ${Math.max(1, Math.round(progress * LINES))}, Col 1`;

      // The file is the last section whose top has passed the upper third of
      // the viewport; above the first one, the entry point.
      const line = window.innerHeight * 0.35;
      let file = 'main.jsx';
      document.querySelectorAll('.main .section[id]').forEach((section) => {
        if (section.getBoundingClientRect().top <= line) file = `${section.id}.jsx`;
      });
      if (fileRef.current && fileRef.current.textContent !== file) {
        fileRef.current.textContent = file;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="statusbar" aria-hidden="true">
      <span className="statusbar__branch">
        <svg className="statusbar__glyph" viewBox="0 0 16 16" width="12" height="12">
          <circle cx="4" cy="3" r="1.6" />
          <circle cx="4" cy="13" r="1.6" />
          <circle cx="12" cy="5" r="1.6" />
          <path d="M4 4.6v6.8M12 6.6c0 3-8 2-8 4.8" />
        </svg>
        main
      </span>
      <span className="statusbar__file">
        <span className="statusbar__dir">src/sections/</span>
        <span ref={fileRef}>main.jsx</span>
      </span>
      <span className="statusbar__line" ref={lineRef}>Ln 1, Col 1</span>
    </div>
  );
};

export default StatusBar;
