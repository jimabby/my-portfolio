import { useEffect, useRef } from 'react';
import './codeshot.css';

// The opening shot behind the title card: a monitor full of code, filmed in
// close-up. The code is this site's own source, typing itself out line by
// line; an AI assistant now and then offers the rest of a line as ghost text
// and it is accepted with a flash. Only a band of the screen is in focus, and
// the visitor pulls that focus — the pointer on a desktop, a finger on a
// phone — the way a focus puller racks between planes. Clicking or tapping
// the empty frame asks the assistant for a completion on the spot, and an
// autofocus reticle snaps in where you touched.
//
// Rendered on a canvas rather than shipped as video: nothing to download,
// sharp at any size, and it takes its colours from the current grade. Drawn
// twice from one pass — a sharp copy masked to the focus band over a soft
// copy CSS blurs — which is how the depth of field costs one blur, not one per
// line. Paused whenever the hero is off-screen or the tab is hidden; a single
// still frame for readers who asked for reduced motion.
//
// Decoration only: hidden from assistive tech, and it never takes a click
// meant for a link or button in the hero.

// The source is loaded as its own chunk after first paint, so none of it
// sits in front of the title card.
const SOURCES = [
  () => import('../portfolio/Desk.jsx?raw'),
  () => import('../leader/Leader.jsx?raw'),
  () => import('../reel/Reel.jsx?raw'),
];

const MAX_COLUMNS = 92;

const loadLines = async () => {
  const modules = await Promise.all(SOURCES.map((load) => load()));
  const lines = [];
  modules.forEach(({ default: text }) => {
    text.split('\n').forEach((raw) => {
      const line = raw.replace(/\t/g, '  ').replace(/\s+$/, '');
      // Keep the rhythm of real code (blank lines included) but never two
      // blanks in a row, and nothing wider than the shot.
      if (!line && !lines[lines.length - 1]) return;
      lines.push(line.length > MAX_COLUMNS ? `${line.slice(0, MAX_COLUMNS - 1)}…` : line);
    });
    lines.push('');
  });
  return lines;
};

const PALETTE = {
  dark: {
    text: (a) => `hsla(38, 70%, 68%, ${a})`,
    gutter: 'hsla(38, 50%, 60%, 0.22)',
    ai: (a) => `hsla(176, 60%, 60%, ${a})`,
    chip: 'hsla(176, 60%, 60%, 0.16)',
  },
  light: {
    text: (a) => `hsla(28, 24%, 16%, ${a})`,
    gutter: 'hsla(28, 20%, 20%, 0.22)',
    ai: (a) => `hsla(9, 72%, 42%, ${a})`,
    chip: 'hsla(9, 72%, 42%, 0.12)',
  },
};

const isJsdom = () => typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);

const CodeShot = () => {
  const wrapRef = useRef(null);
  const sharpRef = useRef(null);
  const softRef = useRef(null);
  const reticleRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sharp = sharpRef.current;
    const soft = softRef.current;
    if (!wrap || !sharp || !soft || isJsdom()) return undefined;
    const ctx = sharp.getContext('2d');
    const softCtx = soft.getContext('2d');
    if (!ctx || !softCtx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const hero = wrap.parentElement;

    let source = [];
    let cursor = 0;
    let lines = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let fontPx = 13;
    let lineH = 21;
    let padX = 0;
    let maxLines = 0;
    let caretY = 0;
    let scroll = 0;
    let nextLineAt = 0;
    let aiQueued = false;
    let focusY = 0;
    let focusTarget = 0;
    let lastPointerAt = -Infinity;
    let glowX = 0;
    let glowY = 0;
    let visible = true;
    let frame = 0;
    let last = 0;
    let lastDraw = 0;
    let alive = true;

    const theme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

    const nextSourceLine = () => {
      const text = source[cursor % source.length] ?? '';
      cursor += 1;
      return { text, shown: 0, ghostFrom: -1, acceptAt: 0, flashAt: -Infinity, number: cursor };
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const small = width < 768;
      fontPx = small ? 11 : 13;
      lineH = small ? 18 : 21;
      padX = small ? 18 : Math.max(24, width * 0.06);
      // The line being typed runs along the foot of the frame, in the clear
      // strip under the title card's buttons — where subtitles would sit —
      // so the typing and the assistant's suggestions play where nothing
      // covers them. Older lines scroll up behind the title and stay soft.
      caretY = height - (small ? 34 : 88);
      maxLines = Math.ceil(caretY / lineH) + 2;
      [sharp, soft].forEach((canvas) => {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      });
      if (!focusY) focusY = focusTarget = height * 0.5;
      draw(performance.now());
    };

    // Fill the screen with code already written, so the shot opens mid-scene
    // rather than on an empty editor.
    const prime = () => {
      cursor = Math.floor(Math.random() * Math.max(1, source.length));
      lines = [];
      for (let i = 0; i < maxLines - 1; i += 1) {
        const line = nextSourceLine();
        line.shown = line.text.length;
        lines.push(line);
      }
      lines.push(nextSourceLine());
    };

    const step = (now, dt) => {
      const current = lines[lines.length - 1];
      if (!current) return;

      if (current.ghostFrom >= 0) {
        // The suggestion sits as ghost text, then is accepted in one go.
        if (current.shown < current.text.length && now >= current.acceptAt) {
          current.shown = current.text.length;
          current.flashAt = now;
          nextLineAt = now + 520;
        }
      } else if (current.shown < current.text.length) {
        const ch = current.text[Math.floor(current.shown)];
        const speed = ch === ' ' ? 90 : 34 + Math.random() * 18;
        current.shown = Math.min(current.text.length, current.shown + speed * dt);
        const rest = current.text.length - current.shown;
        // Offer a completion part-way through a line worth completing: on a
        // click, or now and then of its own accord.
        const worth = current.text.trim().length > 18 && current.shown > 6 && rest > 8;
        if (worth && (aiQueued || Math.random() < dt * 0.09)) {
          aiQueued = false;
          current.ghostFrom = Math.floor(current.shown);
          current.shown = current.ghostFrom;
          current.acceptAt = now + 1150;
        }
        if (current.shown >= current.text.length) nextLineAt = now + 140 + Math.random() * 260;
      } else if (now >= nextLineAt) {
        lines.push(nextSourceLine());
        if (lines.length > maxLines) lines.shift();
        scroll = lineH;
      }
    };

    const draw = (now) => {
      if (!width || !height) return;
      const colors = PALETTE[theme()];
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = 'alphabetic';

      const gutterW = fontPx * 3.4;
      const bottom = caretY + scroll;
      const blinkOn = Math.floor(now / 530) % 2 === 0;

      for (let i = lines.length - 1, row = 0; i >= 0; i -= 1, row += 1) {
        const line = lines[i];
        const y = bottom - row * lineH;
        if (y < -lineH) break;
        const x = padX + gutterW;

        ctx.fillStyle = colors.gutter;
        ctx.fillText(String(line.number).padStart(4, ' '), padX - fontPx, y);

        // The accepted suggestion flashes as it lands.
        const flash = Math.max(0, 1 - (now - line.flashAt) / 900);
        if (flash > 0) {
          ctx.fillStyle = colors.ai(0.18 * flash);
          ctx.fillRect(x - 6, y - lineH * 0.72, ctx.measureText(line.text).width + 12, lineH);
        }

        const typed = line.text.slice(0, Math.floor(line.shown));
        ctx.fillStyle = colors.text(0.92);
        ctx.fillText(typed, x, y);
        const typedW = ctx.measureText(typed).width;

        const isCurrent = i === lines.length - 1;
        if (isCurrent && line.ghostFrom >= 0 && line.shown < line.text.length) {
          const ghost = line.text.slice(line.ghostFrom);
          ctx.font = `italic ${fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
          ctx.fillStyle = colors.ai(0.62);
          ctx.fillText(ghost, x + typedW, y);
          const ghostW = ctx.measureText(ghost).width;
          ctx.font = `${Math.round(fontPx * 0.82)}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
          const label = '⇥ Tab  AI';
          const chipX = x + typedW + ghostW + 12;
          const chipW = ctx.measureText(label).width + 14;
          ctx.fillStyle = colors.chip;
          ctx.fillRect(chipX, y - lineH * 0.66, chipW, lineH * 0.86);
          ctx.fillStyle = colors.ai(0.9);
          ctx.fillText(label, chipX + 7, y - 1);
          ctx.font = `${fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        }

        if (isCurrent && blinkOn && !still) {
          ctx.fillStyle = colors.text(0.8);
          ctx.fillRect(x + typedW + 1, y - fontPx * 0.9, fontPx * 0.55, fontPx * 1.1);
        }
      }

      softCtx.setTransform(1, 0, 0, 1, 0, 0);
      softCtx.clearRect(0, 0, soft.width, soft.height);
      softCtx.drawImage(sharp, 0, 0);

      wrap.style.setProperty('--focus', `${focusY.toFixed(1)}px`);
      wrap.style.setProperty('--gx', `${glowX.toFixed(1)}px`);
      wrap.style.setProperty('--gy', `${glowY.toFixed(1)}px`);
    };

    const loop = (now) => {
      frame = 0;
      if (!alive) return;
      const dt = Math.min(0.1, (now - (last || now)) / 1000);
      last = now;

      step(now, dt);
      scroll = Math.max(0, scroll - scroll * Math.min(1, dt * 12) - 0.2);

      // Idle, the focus drifts on its own — except when the assistant speaks,
      // when it pulls to that line, the way a film cuts to the beat that
      // matters. Touched, it follows the visitor.
      if (now - lastPointerAt > 3500) {
        const current = lines[lines.length - 1];
        const suggesting = current && current.ghostFrom >= 0 && current.shown < current.text.length;
        focusTarget = suggesting
          ? caretY - lineH * 0.3
          : height * (0.46 + 0.24 * Math.sin(now / 4200));
      }
      focusY += (focusTarget - focusY) * Math.min(1, dt * 5);

      // About thirty frames a second is plenty for type; halve the work.
      if (now - lastDraw > 32) {
        draw(now);
        lastDraw = now;
      }
      if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frame && alive && visible && !document.hidden && !still) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };

    // ─── The visitor's hand ───

    const onPointerMove = (event) => {
      const rect = wrap.getBoundingClientRect();
      const y = event.clientY - rect.top;
      const x = event.clientX - rect.left;
      if (y < 0 || y > rect.height || x < 0 || x > rect.width) return;
      focusTarget = y;
      glowX = x;
      glowY = y;
      lastPointerAt = performance.now();
      wrap.classList.add('is-touched');
    };

    const onPointerLeave = () => wrap.classList.remove('is-touched');

    const onPointerDown = (event) => {
      if (event.target.closest?.('a, button, input, textarea, select, label')) return;
      onPointerMove(event);
      aiQueued = true;
      const reticle = reticleRef.current;
      if (reticle) {
        const rect = wrap.getBoundingClientRect();
        reticle.style.left = `${event.clientX - rect.left}px`;
        reticle.style.top = `${event.clientY - rect.top}px`;
        reticle.classList.remove('is-on');
        // Restart the snap animation on every tap.
        void reticle.offsetWidth;
        reticle.classList.add('is-on');
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });

    const onVisibility = () => {
      if (!document.hidden) start();
    };

    const resizeObserver = new ResizeObserver(() => resize());

    loadLines().then((loaded) => {
      if (!alive || loaded.length === 0) return;
      source = loaded;
      resize();
      prime();
      draw(performance.now());
      if (still) return;
      observer.observe(wrap);
      resizeObserver.observe(wrap);
      hero?.addEventListener('pointermove', onPointerMove);
      hero?.addEventListener('pointerdown', onPointerDown);
      hero?.addEventListener('pointerleave', onPointerLeave);
      document.addEventListener('visibilitychange', onVisibility);
      start();
    });

    return () => {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      hero?.removeEventListener('pointermove', onPointerMove);
      hero?.removeEventListener('pointerdown', onPointerDown);
      hero?.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="codeshot" ref={wrapRef} aria-hidden="true">
      <canvas className="codeshot__soft" ref={softRef} />
      <canvas className="codeshot__sharp" ref={sharpRef} />
      <span className="codeshot__reticle" ref={reticleRef} />
    </div>
  );
};

export default CodeShot;
