import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LATEST_UPDATE_ID, UPDATES } from '../../i18n/updates';

const STORAGE_KEY = 'updatesSeen';

const getSeenId = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
};

// Dates are authored as ISO strings; render them in the active language.
const formatDate = (iso, lang) => {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  } catch {
    return iso;
  }
};

// How many entries at the top of the list the visitor hasn't seen yet. An
// unknown or missing stored id (first visit, or an id since removed) counts
// only the newest entry, so a first-time visitor isn't shown a wall of badges.
const countUnseen = (seenId) => {
  const index = UPDATES.findIndex((u) => u.id === seenId);
  if (index === -1) return UPDATES.length > 0 ? 1 : 0;
  return index;
};

const UpdatesDot = () => {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  // Read once on mount so the dot's colour doesn't flip between renders.
  const [seenId, setSeenId] = useState(getSeenId);
  const ref = useRef(null);
  // Opening the panel clears the dot, but the entries that were new on arrival
  // stay badged for the rest of the session — otherwise the badges vanish at
  // the exact moment the visitor looks at them.
  const [unseenOnArrival] = useState(() => countUnseen(seenId));

  const hasNew = LATEST_UPDATE_ID !== '' && seenId !== LATEST_UPDATE_ID;

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    setOpen((wasOpen) => {
      // Opening the list counts as reading it, so the dot goes quiet until a
      // newer entry lands at the top of UPDATES.
      if (!wasOpen && hasNew) {
        setSeenId(LATEST_UPDATE_ID);
        try {
          localStorage.setItem(STORAGE_KEY, LATEST_UPDATE_ID);
        } catch {
          // Ignore storage errors in restricted contexts.
        }
      }
      return !wasOpen;
    });
  };

  const label = hasNew ? t('updates.labelNew') : t('updates.label');

  return (
    <div className="updates" ref={ref}>
      <button
        type="button"
        className={`updates__toggle${hasNew ? ' has-new' : ''}`}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="site-updates-panel"
        aria-label={label}
        title={label}
      >
        <span className="updates__dot" aria-hidden="true"></span>
      </button>

      {open && (
        <div
          className="updates__panel"
          id="site-updates-panel"
          role="region"
          aria-label={t('updates.title')}
        >
          <p className="updates__title">{t('updates.title')}</p>

          {UPDATES.length === 0 ? (
            <p className="updates__empty">{t('updates.empty')}</p>
          ) : (
            <ul className="updates__list">
              {UPDATES.map((update, index) => (
                <li key={update.id} className="updates__item">
                  <div className="updates__meta">
                    <span className="updates__tag">{t(`updates.tags.${update.tag}`, update.tag)}</span>
                    <time className="updates__date" dateTime={update.date}>
                      {formatDate(update.date, lang)}
                    </time>
                    {index < unseenOnArrival && (
                      <span className="updates__badge">{t('updates.badge')}</span>
                    )}
                  </div>
                  <p className="updates__text">{update.title[lang] || update.title.en}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdatesDot;
