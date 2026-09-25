import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import './leader.css';

// The film leader: the countdown that runs before a reel — 3, 2, 1, the sweep
// around the dial, a flash — and then the hero's own curtain opens on the
// title card. About two seconds, all of it CSS; this component only decides
// whether it plays and takes it away when it is done.
//
// It is an opening, not a gate, so it is deliberately hard to be annoyed by:
//   - once per browser session (a reload or a return to / does not replay it);
//   - only on the home page, and never when a link points into it (#portfolio);
//   - any click, scroll, touch or key skips it on the spot;
//   - never for readers who have asked for reduced motion, and never under
//     automation, so end-to-end tests click the page rather than the leader.
// `?leader` in the URL forces it, for previewing.
//
// Decoration only: hidden from assistive tech, nothing in it can take focus,
// and the page underneath is rendered, readable and indexable throughout.
const SEEN_KEY = 'leader-seen';

const shouldPlay = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const forced = new URLSearchParams(window.location.search).has('leader');
  if (forced) return true;
  if (window.location.hash) return false;
  if (navigator.webdriver) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return false;
  }
};

const Leader = () => {
  const [state, setState] = useState(() => (shouldPlay() ? 'playing' : 'done'));

  // Holds the hero's curtain and title animations until the leader is gone —
  // they are keyed off this attribute in home.css. Set before the first
  // paint, so they never start underneath it.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (state === 'done') {
      delete root.dataset.leader;
      return undefined;
    }
    root.dataset.leader = 'playing';
    return () => {
      delete root.dataset.leader;
    };
  }, [state]);

  useEffect(() => {
    if (state !== 'playing') return undefined;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Storage blocked: it simply plays again next visit.
    }
    const skip = () => setState((current) => (current === 'playing' ? 'skipping' : current));
    const events = ['pointerdown', 'wheel', 'touchstart', 'keydown'];
    events.forEach((type) => window.addEventListener(type, skip, { passive: true }));
    return () => events.forEach((type) => window.removeEventListener(type, skip));
  }, [state]);

  // The last thing the leader does is fade itself out; when that animation
  // ends, it goes. Other animations inside it bubble here too, hence the name
  // check rather than the first animationend to arrive.
  const onAnimationEnd = useCallback((event) => {
    if (event.animationName === 'leader-out') setState('done');
  }, []);

  if (state === 'done') return null;

  return (
    <div
      className={`leader${state === 'skipping' ? ' is-skipping' : ''}`}
      aria-hidden="true"
      onAnimationEnd={onAnimationEnd}
    >
      <div className="leader__frame">
        <span className="leader__rule leader__rule--h" />
        <span className="leader__rule leader__rule--v" />
        <span className="leader__dial">
          <span className="leader__ring leader__ring--outer" />
          <span className="leader__ring leader__ring--inner" />
          <span className="leader__n" style={{ '--k': 0 }}>3</span>
          <span className="leader__n" style={{ '--k': 1 }}>2</span>
          <span className="leader__n" style={{ '--k': 2 }}>1</span>
        </span>
        <span className="leader__label leader__label--tl">REEL 1</span>
        <span className="leader__label leader__label--tr">JIM KONG</span>
        <span className="leader__label leader__label--b">PICTURE START</span>
        <span className="leader__scratch leader__scratch--a" />
        <span className="leader__scratch leader__scratch--b" />
      </div>
    </div>
  );
};

export default Leader;
