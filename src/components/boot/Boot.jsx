import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { projectsData } from '../portfolio/Data';
import { PREFIXED_LOCALES } from '../../i18n/routes';
import './boot.css';

// Optional terminal introduction, previewed with ?boot. Never hides content
// on ordinary visits or for visitors requesting reduced motion.
const shouldPlay = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  // Opt in for the terminal intro. The default visit opens on the work immediately.
  return new URLSearchParams(window.location.search).has('boot');
};

// Each line is printed at its own step of the timeline in boot.css.
const LINES = [
  { cls: 'cmd', text: 'npm run dev' },
  { cls: 'dim', text: '> jim-kong-portfolio@2026 dev' },
  { cls: 'dim', text: '> vite' },
  { cls: 'ok', text: `✓ ${projectsData.length} projects · ${PREFIXED_LOCALES.length + 1} locales · 1 assistant` },
  { cls: 'ready', text: 'VITE ready in 312 ms' },
  { cls: 'url', text: '➜  Local:   http://localhost:5173/' },
];

const Boot = () => {
  const [state, setState] = useState(() => (shouldPlay() ? 'playing' : 'done'));

  // Holds the hero's curtain and title animations until the log is gone —
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
    if (state === 'done') return undefined;
    const fallback = setTimeout(() => setState('done'), state === 'skipping' ? 350 : 2600);
    const skip = () => setState((current) => (current === 'playing' ? 'skipping' : current));
    const events = ['pointerdown', 'wheel', 'touchstart', 'keydown'];
    events.forEach((type) => window.addEventListener(type, skip, { passive: true }));
    return () => {
      clearTimeout(fallback);
      events.forEach((type) => window.removeEventListener(type, skip));
    };
  }, [state]);

  // The last thing the log does is fade itself out; when that animation
  // ends, it goes. Other animations inside it bubble here too, hence the name
  // check rather than the first animationend to arrive.
  const onAnimationEnd = useCallback((event) => {
    if (event.animationName === 'boot-out') setState('done');
  }, []);

  if (state === 'done') return null;

  return (
    <div
      className={`boot${state === 'skipping' ? ' is-skipping' : ''}`}
      aria-hidden="true"
      onAnimationEnd={onAnimationEnd}
    >
      <div className="boot__window">
        <div className="boot__bar">
          <span className="boot__dot" />
          <span className="boot__dot" />
          <span className="boot__dot" />
          <span className="boot__title">~/jim-kong — zsh</span>
        </div>
        <ol className="boot__log">
          {LINES.map((line, k) => (
            <li key={line.text} className={`boot__line boot__line--${line.cls}`} style={{ '--k': k }}>
              {line.text}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Boot;
