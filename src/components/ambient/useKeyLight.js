import { useEffect } from 'react';

// The key light follows the visitor. A warm pool in the page's light-leak
// layer (body::before in App.css) drifts toward the pointer — or toward the
// last touch on a phone — the way a lamp carried through a set pulls the
// light around with it. It eases rather than tracks, so it reads as light,
// not as a cursor effect.
//
// Writes two custom properties on <html> at most once per frame, and stops
// the loop the moment the light has settled. Off for reduced motion.
export const useKeyLight = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const root = document.documentElement;
    let x = 30;
    let y = 20;
    let tx = x;
    let ty = y;
    let frame = 0;

    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      root.style.setProperty('--mx', `${x.toFixed(2)}%`);
      root.style.setProperty('--my', `${y.toFixed(2)}%`);
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(loop) : 0;
    };

    const onPointer = (event) => {
      tx = (event.clientX / window.innerWidth) * 100;
      ty = (event.clientY / window.innerHeight) * 100;
      if (!frame) frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
};
