import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './desk.css';
import Img from '../image/Img';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import { projectPath, projectsData } from './Data';

// The flagship work as a shelf of bound volumes lying on a desk at night, lit
// by a single lamp. Picking one up flies it to the camera and opens it into a
// two-page spread: the plate on the left, the story on the right.
//
// The scene is real DOM, not a render. Every book is a <button> carrying the
// same <Img> the grid uses, so it keeps the AVIF/WebP pipeline, focus order and
// keyboard access; the set dressing (lamp, pencil, coffee ring, dust) is
// decorative and hidden from assistive tech. Below 768px the scatter collapses
// into a two-column shelf and a volume opens full screen as a single page,
// swiped sideways to the next one — the absolute positioning lives in custom
// properties the mobile rules stop reading.
//
// Curated on purpose. There are 24 projects in Data.jsx; a desk stops reading
// as a desk somewhere north of seven. The rest are one click away in the
// portfolio grid below.
//
// `format` is the binding: `tall` for the phone apps (a pocket edition),
// `album` for the wide sites (a landscape art book, so a browser screenshot
// sits on the cover without being cropped to a sliver), `quarto` in between.
// `cloth` is the binding colour; each volume gets its own so the pile reads as
// a collection gathered over years rather than one boxed set.
const DESK_LAYOUT = [
  { slug: 'oncora', format: 'tall', cloth: '#1f3b36', x: 3, y: 12, w: 12, r: -8 },
  { slug: 'housed-redesign', format: 'album', cloth: '#4a1d1f', x: 18.5, y: 6, w: 24, r: -3 },
  { slug: 'hermes-ai-email-client', format: 'quarto', cloth: '#1b2640', x: 46, y: 9, w: 17, r: 4 },
  { slug: 'pockyt', format: 'tall', cloth: '#5a4318', x: 69, y: 4, w: 12, r: 7 },
  { slug: 'simba-health-redesign', format: 'album', cloth: '#2c2f33', x: 6, y: 57, w: 23, r: 4 },
  { slug: 'airbest', format: 'quarto', cloth: '#3a2342', x: 35, y: 55, w: 16, r: -5 },
  { slug: 'simba-education-new-build', format: 'album', cloth: '#243a24', x: 58, y: 57, w: 24, r: -2 },
];

const pad = (n) => String(n).padStart(2, '0');

const reduceMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

// Matches the breakpoint in desk.css where the volume opens full screen.
const isSheet = () => window.matchMedia?.('(max-width: 767px)')?.matches ?? false;

// The front board of a volume. Shared by the book on the desk and the one in
// the spread, so the object that flies to the camera is visibly the same one
// that left the table.
const Cover = ({ piece, number, category }) => (
  <span className="desk__cover" aria-hidden="true">
    <span className="desk__spine" />
    <span className="desk__cover-no">No. {pad(number)}</span>
    <span className="desk__plate">
      <Img
        src={piece.project.image}
        alt=""
        className="desk__plate-img"
        loading="lazy"
        decoding="async"
        sizes={piece.format === 'tall' ? '(max-width: 767px) 40vw, 150px' : '(max-width: 767px) 45vw, 300px'}
      />
    </span>
    <span className="desk__cover-title">{piece.project.title}</span>
    <span className="desk__cover-rule" />
    <span className="desk__cover-cat">{category}</span>
  </span>
);

const Desk = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const stageRef = useRef(null);
  const panelRef = useRef(null);
  const tomeRef = useRef(null);
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

  const activeIndex = pieces.findIndex((piece) => piece.slug === selected);
  const active = activeIndex >= 0 ? pieces[activeIndex] : null;

  const categoryFor = (project) =>
    t(`portfolio.filters.${project.category.toLowerCase()}`, project.category);
  const summaryFor = (project) => t(`projects.${project.id}`, project.summary || '');

  const close = useCallback(({ restoreFocus = true } = {}) => {
    setSelected((current) => {
      if (restoreFocus && current) pieceRefs.current[current]?.focus();
      return null;
    });
  }, []);

  const open = useCallback((slug) => {
    shouldFocusPanel.current = true;
    setSelected(slug);
  }, []);

  const toggle = (slug) => {
    if (slug === selected) close();
    else open(slug);
  };

  const step = useCallback(
    (delta) => {
      if (activeIndex < 0) return;
      const next = pieces[(activeIndex + delta + pieces.length) % pieces.length];
      open(next.slug);
    },
    [activeIndex, pieces, open]
  );

  // Escape puts the book down. The arrows leaf through the pile the way a
  // game's inspect screen cycles items — but only while focus is inside the
  // scene, so they never hijack keys meant for something else on the page.
  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      const inScene = stageRef.current?.contains(document.activeElement);
      if (!inScene) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected, close, step]);

  // The flight. The spread is laid out at its resting place, then handed the
  // offset, angle and scale that put its closed front board exactly over the
  // book that was clicked; the CSS animation plays it back from there to the
  // centre of the frame and opens the cover.
  //
  // Layout geometry (offset*), never getBoundingClientRect: the spread is
  // already animating by the time this runs, and a measured box would include
  // the very transform this is computing. Runs before paint, so the first
  // frame is already on the desk rather than a flash in the middle.
  useLayoutEffect(() => {
    const tome = tomeRef.current;
    const panel = panelRef.current;
    const source = active && pieceRefs.current[active.slug];
    if (!tome || !panel || !source) return;
    const slot = source.parentElement;
    if (getComputedStyle(slot).position !== 'absolute') return; // phone shelf

    // The closed book is the right-hand board, centred by translateX(-25%).
    const boardW = tome.offsetWidth / 2;
    const boardH = tome.offsetHeight;
    const tomeCx = panel.offsetLeft + tome.offsetLeft + tome.offsetWidth / 2;
    const tomeCy = panel.offsetTop + tome.offsetTop + tome.offsetHeight / 2;
    const srcCx = slot.offsetLeft + slot.offsetWidth / 2;
    const srcCy = slot.offsetTop + slot.offsetHeight / 2;

    tome.style.setProperty('--fx', `${(srcCx - tomeCx).toFixed(1)}px`);
    tome.style.setProperty('--fy', `${(srcCy - tomeCy).toFixed(1)}px`);
    tome.style.setProperty('--fr', `${active.r}deg`);
    tome.style.setProperty('--fsx', (source.offsetWidth / boardW).toFixed(4));
    tome.style.setProperty('--fsy', (source.offsetHeight / boardH).toFixed(4));
  }, [active]);

  // The camera. Pointer position steers the lamp — the pool of light drifts a
  // little toward wherever the visitor is looking — and tilts whichever book
  // is under the cursor toward it. It is what turns a picture of a desk into a
  // place: the visitor's own hand holds the light.
  //
  // Only for a fine pointer that can hover: on a touchscreen there is no
  // pointer to follow, and the listener would fire through every scroll.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
    if (!canHover || reduceMotion()) return undefined;

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
    // writes below it, so a burst of pointermoves never forces a layout per
    // event after the previous frame's style writes.
    const paint = () => {
      frame = 0;
      if (!queued) return;
      const { x, y, piece } = queued;

      const box = stage.getBoundingClientRect();
      const dx = (x - box.left) / box.width;
      const dy = (y - box.top) / box.height;

      // The lamp is on an arm, not a leash: it follows a fifth of the way.
      stage.style.setProperty('--lx', `${(44 + (dx - 0.5) * 22).toFixed(1)}%`);
      stage.style.setProperty('--ly', `${(42 + (dy - 0.5) * 18).toFixed(1)}%`);

      if (piece !== tilted) clearTilt();
      if (piece) {
        // Layout geometry again: the box of a tilted piece would feed its own
        // tilt back in and shimmer.
        const px = (x - box.left - piece.offsetLeft) / piece.offsetWidth - 0.5;
        const py = (y - box.top - piece.offsetTop) / piece.offsetHeight - 0.5;
        piece.style.setProperty('--tx', `${(-py * 10).toFixed(2)}deg`);
        piece.style.setProperty('--ty', `${(px * 10).toFixed(2)}deg`);
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
      stage.style.removeProperty('--lx');
      stage.style.removeProperty('--ly');
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

  // Move focus into the spread when it opens so a keyboard visitor lands on
  // the story rather than tabbing through the rest of the pile to reach it.
  // Leafing to the next volume on a phone starts it at the top of the sheet.
  useEffect(() => {
    if (!selected || !shouldFocusPanel.current) return;
    shouldFocusPanel.current = false;
    const panel = panelRef.current;
    if (!panel) return;
    panel.focus({ preventScroll: true });
    panel.scrollTop = 0;
  }, [selected]);

  // On a phone the open volume is a full-screen sheet, so it behaves as one:
  // the page behind it stops scrolling and Tab stays inside it. On a desktop
  // it is a disclosure over the desk and none of this applies.
  const isOpen = Boolean(selected);
  useEffect(() => {
    if (!isOpen || !isSheet()) return undefined;
    const panel = panelRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.sheet = 'open';

    const onKeyDown = (e) => {
      if (e.key !== 'Tab' || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      delete document.documentElement.dataset.sheet;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  // A sideways swipe on the sheet turns to the next or previous volume. It
  // has to be clearly sideways — a vertical scroll that wanders never turns
  // the page.
  const swipeStart = useRef(null);
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (e) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || !isSheet()) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };

  if (pieces.length === 0) return null;

  return (
    <section className="desk section" id="desk">
      <div className="desk__head">
        <h2 className="section__title">{t('desk.title')}</h2>
        <span className="section__subtitle">{t('desk.subtitle')}</span>
      </div>

      <div className={`desk__stage${active ? ' is-open' : ''}`} ref={stageRef}>
        {/* Set dressing. None of it is interactive and none of it is content. */}
        <div className="desk__set" aria-hidden="true">
          <span className="desk__surface" />
          <span className="desk__ring" />
          <span className="desk__pencil" />
        </div>

        {/* Clicking the empty desk puts the book down, the way tapping outside
            a popover does. Decorative for assistive tech — Escape and the
            spread's own close button do the same job. */}
        <div className="desk__scrim" onClick={() => close()} aria-hidden="true" />

        <ul className="desk__scatter">
          {pieces.map((piece, index) => {
            const { project } = piece;
            const isSelected = piece.slug === selected;
            return (
              <li
                key={piece.slug}
                className={`desk__piece desk__piece--${piece.format}${
                  isSelected ? ' is-selected' : ''
                }`}
                /* --rot is the book's resting angle on the desk; --i staggers
                   the settle-in. */
                style={{
                  '--x': `${piece.x}%`,
                  '--y': `${piece.y}%`,
                  '--w': `${piece.w}%`,
                  '--rot': `${piece.r}deg`,
                  '--cloth': piece.cloth,
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
                  <Cover piece={piece} number={index + 1} category={categoryFor(project)} />
                </button>
                <span className="desk__label" aria-hidden="true">
                  <kbd>↵</kbd>
                  {project.title}
                </span>
              </li>
            );
          })}
        </ul>

        {/* The lamp's falloff and the film over the lens. Above the pile so
            the books at the edge of the pool really are in the dark. */}
        <div className="desk__light" aria-hidden="true" />
        <div className="desk__air" aria-hidden="true">
          <span className="desk__beam" />
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} className="desk__mote" style={{ '--d': i }} />
          ))}
        </div>
        <div className="desk__grain" aria-hidden="true" />
        <div className="desk__bars" aria-hidden="true" />

        {/* Viewfinder: corner marks and a slate. Pure HUD. */}
        <div className="desk__hud" aria-hidden="true">
          <span className="desk__corner desk__corner--tl" />
          <span className="desk__corner desk__corner--tr" />
          <span className="desk__corner desk__corner--bl" />
          <span className="desk__corner desk__corner--br" />
          <span className="desk__slate">
            <span className="desk__rec" />
            {active
              ? `No. ${pad(activeIndex + 1)} / ${pad(pieces.length)}`
              : t('desk.count').replace('{n}', pieces.length)}
          </span>
          <span className="desk__keys">
            {active ? (
              <>
                <kbd>←</kbd>
                <kbd>→</kbd>
                <kbd>Esc</kbd>
              </>
            ) : (
              <kbd>↵</kbd>
            )}
          </span>
        </div>

        {/* A disclosure, not a modal: the rest of the pile stays reachable, so
            one click moves from volume to volume. No focus trap, no scroll
            lock, and nothing here is position: fixed. */}
        <div
          id="desk-panel"
          className="desk__panel"
          hidden={!active}
          ref={panelRef}
          tabIndex={-1}
          role="region"
          aria-label={active ? active.project.title : undefined}
          data-count={active ? `${pad(activeIndex + 1)} / ${pad(pieces.length)}` : undefined}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {active && (
            <>
              <button
                type="button"
                className="desk__nav desk__nav--prev"
                onClick={() => step(-1)}
                aria-label={t('desk.prev')}
              >
                <i className="bx bx-chevron-left" aria-hidden="true"></i>
              </button>

              {/* Keyed on the volume so leafing to the next one replays the
                  flight from wherever that book was lying. */}
              <div
                key={active.slug}
                ref={tomeRef}
                className={`desk__tome desk__tome--${active.format}`}
                style={{ '--cloth': active.cloth }}
              >
                <div className="desk__leaf desk__leaf--right">
                  <span className="desk__panel-category">
                    No. {pad(activeIndex + 1)} — {categoryFor(active.project)}
                  </span>
                  <h3 className="desk__panel-title">{active.project.title}</h3>
                  <span className="desk__fleuron" aria-hidden="true">
                    ❦
                  </span>
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

                  <LocaleLink to={projectPath(active.project)} className="desk__panel-link">
                    {t(active.project.article ? 'portfolio.readArticle' : 'portfolio.caseStudy')}
                    <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
                  </LocaleLink>
                  <span className="desk__folio" aria-hidden="true">
                    — {activeIndex * 2 + 3} —
                  </span>
                </div>

                <div className="desk__board">
                  <div className="desk__board-front">
                    <Cover
                      piece={active}
                      number={activeIndex + 1}
                      category={categoryFor(active.project)}
                    />
                  </div>
                  <div className="desk__board-back">
                    <figure className="desk__endplate">
                      <Img
                        src={active.project.gallery?.[1] ?? active.project.image}
                        alt=""
                        className="desk__endplate-img"
                        decoding="async"
                        sizes="(max-width: 767px) 90vw, 440px"
                      />
                      <figcaption>{active.project.title}</figcaption>
                    </figure>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="desk__nav desk__nav--next"
                onClick={() => step(1)}
                aria-label={t('desk.next')}
              >
                <i className="bx bx-chevron-right" aria-hidden="true"></i>
              </button>

              <button
                type="button"
                className="desk__panel-close"
                onClick={() => close()}
                aria-label={t('desk.close')}
              >
                <kbd>Esc</kbd>
                <i className="uil uil-times" aria-hidden="true"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <a className="desk__all" href="#portfolio">
        {t('desk.viewAll')}
        <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
      </a>
    </section>
  );
};

export default Desk;
