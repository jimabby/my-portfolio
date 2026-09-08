import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './desk.css';
import Img from '../image/Img';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import { projectPath, projectsData } from './Data';

// A flat-lay of the flagship work: the pieces are scattered on a surface, and
// clicking one dims the rest and opens its details beside it.
//
// The scatter is real DOM, not a photo with an image map. Every piece is a
// <button> carrying the same <Img> the grid uses, so it keeps the AVIF/WebP
// pipeline, alt text, focus order and keyboard access, and below 768px the
// whole thing collapses into an ordinary two-column grid — the absolute
// positioning lives in custom properties the mobile rules simply stop reading.
//
// Curated on purpose. There are 24 projects in Data.jsx; a scatter stops
// reading as a collection somewhere north of nine. The rest are one click away
// in the portfolio grid below.
const DESK_LAYOUT = [
  { slug: 'oncora', frame: 'phone', x: 1.5, y: 15, w: 12, r: -6 },
  { slug: 'housed-redesign', frame: 'browser', x: 15, y: 2, w: 30, r: -3 },
  { slug: 'hermes-ai-email-client', frame: 'browser', x: 47, y: 7, w: 29, r: 2.5 },
  { slug: 'pockyt', frame: 'phone', x: 80, y: 3, w: 12, r: 5 },
  { slug: 'simba-health-redesign', frame: 'browser', x: 2, y: 57, w: 29, r: 3 },
  { slug: 'airbest', frame: 'browser', x: 33, y: 61, w: 30, r: -2.5 },
  { slug: 'simba-education-new-build', frame: 'browser', x: 65, y: 54, w: 30, r: 4 },
];

// The panel sits opposite the piece it belongs to, so the thing you just
// clicked is never the thing the panel covers.
const panelSide = (piece) => (piece.x + piece.w / 2 < 50 ? 'right' : 'left');

const BrowserChrome = () => (
  <span className="desk__chrome" aria-hidden="true">
    <span className="desk__dot" />
    <span className="desk__dot" />
    <span className="desk__dot" />
    <span className="desk__bar" />
  </span>
);

const Desk = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const stageRef = useRef(null);
  const panelRef = useRef(null);
  const pieceRefs = useRef({});
  const shouldFocusPanel = useRef(false);

  const pieces = useMemo(
    () =>
      DESK_LAYOUT.map((layout) => {
        const project = projectsData.find((p) => p.slug === layout.slug);
        return project ? { ...layout, project } : null;
      }).filter(Boolean),
    []
  );

  const active = useMemo(
    () => pieces.find((piece) => piece.slug === selected) ?? null,
    [pieces, selected]
  );

  const close = useCallback(
    ({ restoreFocus = true } = {}) => {
      setSelected((current) => {
        if (restoreFocus && current) pieceRefs.current[current]?.focus();
        return null;
      });
    },
    []
  );

  const toggle = (slug) => {
    if (slug === selected) {
      close();
      return;
    }
    shouldFocusPanel.current = true;
    setSelected(slug);
  };

  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected, close]);

  // The camera. Pointer position leans the whole table a couple of degrees and
  // tilts whatever piece is under the cursor toward it, which is what makes the
  // scene read as objects on a surface rather than images on a page — the
  // visitor's own pointer does the reaching.
  //
  // Only for a fine pointer that can hover: on a touchscreen there is no
  // pointer to follow, and the listener would fire through every scroll.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (!canHover || reduceMotion) return undefined;

    let frame = 0;
    let queued = null;
    let tilted = null;

    const clearTilt = () => {
      if (!tilted) return;
      tilted.style.removeProperty('--tx');
      tilted.style.removeProperty('--ty');
      tilted = null;
    };

    // Every geometry read happens here, inside the frame and ahead of the
    // writes below it. A pointermove can fire well over once per frame, and
    // measuring in the handler instead would force the browser to recompute
    // layout after the previous frame's style writes, every single event.
    const paint = () => {
      frame = 0;
      if (!queued) return;
      const { x, y, piece } = queued;

      const box = stage.getBoundingClientRect();
      const dx = (x - box.left) / box.width - 0.5;
      const dy = (y - box.top) / box.height - 0.5;

      let px = 0;
      let py = 0;
      if (piece) {
        // Layout geometry, not getBoundingClientRect: the box of a piece that
        // is already tilted would feed its own tilt back in and shimmer.
        px = (x - box.left - piece.offsetLeft) / piece.offsetWidth - 0.5;
        py = (y - box.top - piece.offsetTop) / piece.offsetHeight - 0.5;
      }

      stage.style.setProperty('--drift-x', `${(-dy * 2.4).toFixed(2)}deg`);
      stage.style.setProperty('--drift-y', `${(dx * 2.8).toFixed(2)}deg`);
      if (piece !== tilted) clearTilt();
      if (piece) {
        piece.style.setProperty('--tx', `${(-py * 7).toFixed(2)}deg`);
        piece.style.setProperty('--ty', `${(px * 7).toFixed(2)}deg`);
        tilted = piece;
      }
    };

    const onMove = (event) => {
      queued = {
        x: event.clientX,
        y: event.clientY,
        piece: event.target.closest?.('.desk__piece') ?? null,
      };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      queued = null;
      stage.style.removeProperty('--drift-x');
      stage.style.removeProperty('--drift-y');
      clearTilt();
    };

    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Move focus into the panel when it opens so a keyboard visitor lands on the
  // details rather than tabbing through the rest of the scatter to reach them.
  useEffect(() => {
    if (!selected || !shouldFocusPanel.current) return;
    shouldFocusPanel.current = false;
    const panel = panelRef.current;
    if (!panel) return;
    panel.focus({ preventScroll: true });
    // On a phone the panel is a sheet below the whole grid, so tapping a piece
    // in the top row would otherwise open the details a screen and a half away
    // and look like nothing happened. `nearest` makes this a no-op on desktop,
    // where the panel is already inside the stage being looked at.
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    panel.scrollIntoView?.({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  }, [selected]);

  if (pieces.length === 0) return null;

  const summaryFor = (project) => t(`projects.${project.id}`, project.summary || '');

  return (
    <section className="desk section" id="desk">
      <h2 className="section__title">{t('desk.title')}</h2>
      <span className="section__subtitle">{t('desk.subtitle')}</span>

      <div className="container">
        <div className={`desk__stage${active ? ' is-open' : ''}`} ref={stageRef}>
          {/* Clicking the dimmed surface closes the panel, the way tapping
              outside a popover does. It is decorative for assistive tech —
              Escape and the panel's own close button do the same job. */}
          <div className="desk__scrim" onClick={() => close()} aria-hidden="true" />

          <ul className="desk__scatter">
            {pieces.map((piece, index) => {
              const { project } = piece;
              const isSelected = piece.slug === selected;
              return (
                <li
                  key={piece.slug}
                  className={`desk__piece desk__piece--${piece.frame}${
                    isSelected ? ' is-selected' : ''
                  }`}
                  /* --rot is the piece's resting angle on the table. The CSS
                     reads it through --r so selecting a piece can straighten
                     it; an inline --r could not be overridden by a class. --i
                     staggers the settle-in. */
                  style={{
                    '--x': `${piece.x}%`,
                    '--y': `${piece.y}%`,
                    '--w': `${piece.w}%`,
                    '--rot': `${piece.r}deg`,
                    '--i': index,
                  }}
                >
                  <button
                    type="button"
                    ref={(el) => {
                      pieceRefs.current[piece.slug] = el;
                    }}
                    className="desk__button"
                    onClick={() => toggle(piece.slug)}
                    aria-expanded={isSelected}
                    aria-controls="desk-panel"
                    aria-label={t('desk.openPiece').replace('{title}', project.title)}
                  >
                    <span className="desk__frame">
                      {piece.frame === 'browser' && <BrowserChrome />}
                      {piece.frame === 'phone' && (
                        <span className="desk__notch" aria-hidden="true" />
                      )}
                      <Img
                        src={project.image}
                        alt=""
                        className="desk__shot"
                        loading="lazy"
                        decoding="async"
                        sizes={
                          piece.frame === 'phone'
                            ? '(max-width: 767px) 40vw, 150px'
                            : '(max-width: 767px) 45vw, 350px'
                        }
                      />
                    </span>
                    <span className="desk__label">{project.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* A disclosure, not a modal: the other pieces stay clickable so one
              click moves you from project to project. No focus trap, no body
              scroll lock, and nothing here is position: fixed — which matters,
              because the glass panel's backdrop-filter would become the
              containing block for any fixed descendant. */}
          <div
            id="desk-panel"
            className={`desk__panel desk__panel--${active ? panelSide(active) : 'right'}`}
            hidden={!active}
            ref={panelRef}
            tabIndex={-1}
            role="region"
            aria-label={active ? active.project.title : undefined}
          >
            {active && (
              <>
                <button
                  type="button"
                  className="desk__panel-close"
                  onClick={() => close()}
                  aria-label={t('desk.close')}
                >
                  <i className="uil uil-times" aria-hidden="true"></i>
                </button>

                <span className="desk__panel-category">
                  {t(
                    `portfolio.filters.${active.project.category.toLowerCase()}`,
                    active.project.category
                  )}
                </span>
                <h3 className="desk__panel-title">{active.project.title}</h3>
                {summaryFor(active.project) && (
                  <p className="desk__panel-summary">{summaryFor(active.project)}</p>
                )}

                {active.project.tags?.length > 0 && (
                  <ul className="desk__panel-tags">
                    {active.project.tags.map((tag) => (
                      <li key={tag} className="desk__panel-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <LocaleLink
                  to={projectPath(active.project)}
                  className="button button--flex desk__panel-link"
                >
                  {t(active.project.article ? 'portfolio.readArticle' : 'portfolio.caseStudy')}
                  <i className="bx bx-right-arrow-alt button__icon-inline" aria-hidden="true"></i>
                </LocaleLink>
              </>
            )}
          </div>
        </div>

        <a className="desk__all" href="#portfolio">
          {t('desk.viewAll')}
          <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
        </a>
      </div>
    </section>
  );
};

export default Desk;
