import { useEffect, useRef } from 'react';
import './reel.css';

// The camera slate in the corner of the frame: which scene you are in, and a
// running timecode that advances as you scroll, as if the page were a reel
// being played through. Decorative — every piece of it is hidden from
// assistive tech, and the headings it reads are already in the document.
//
// Scroll position maps onto a feature's running time, so the whole page is
// one film of RUNTIME seconds at 24 frames a second. It writes straight to
// the DOM once per animation frame rather than through React state: a
// re-render per scroll event would cost more than the effect is worth.
const RUNTIME = 107 * 60;
const FPS = 24;

const pad = (n) => String(n).padStart(2, '0');

const timecode = (seconds) => {
  const whole = Math.floor(seconds);
  const frames = Math.floor((seconds - whole) * FPS);
  return `${pad(Math.floor(whole / 3600))}:${pad(Math.floor(whole / 60) % 60)}:${pad(whole % 60)}:${pad(frames)}`;
};

const Reel = () => {
  const sceneRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const paint = () => {
      frame = 0;
      const root = document.documentElement;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      if (codeRef.current) codeRef.current.textContent = timecode(progress * RUNTIME);

      // The scene is the last numbered section whose top has passed the
      // upper third of the viewport; above the first one, the title card.
      const scenes = Array.from(document.querySelectorAll('.main .section'));
      const line = window.innerHeight * 0.35;
      let label = 'TITLES';
      let number = 0;
      scenes.forEach((section) => {
        const title = section.querySelector(':scope > .section__title, :scope .desk__head > .section__title');
        if (!title) return;
        number += 1;
        if (section.getBoundingClientRect().top <= line) {
          label = `SC. ${pad(number)} — ${title.textContent.trim()}`;
        }
      });
      if (sceneRef.current && sceneRef.current.textContent !== label) {
        sceneRef.current.textContent = label;
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
    <div className="reel" aria-hidden="true">
      <span className="reel__rec" />
      <span className="reel__scene" ref={sceneRef}>TITLES</span>
      <span className="reel__code" ref={codeRef}>00:00:00:00</span>
    </div>
  );
};

export default Reel;
