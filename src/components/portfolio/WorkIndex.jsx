import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollUp from '../scrollup/ScrollUp';
import Img from '../image/Img';
import Seo from '../seo/Seo';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import { projectsData, projectPath, projectsNav } from './Data';
import './workindex.css';

// Every tag any project carries, so the filter row is derived from the data
// rather than maintained beside it.
const allTags = Array.from(new Set(projectsData.flatMap((p) => p.tags ?? []))).sort();

// Every case study in one list, at a URL of its own.
//
// The 22 case study pages were reachable only through the paginated gallery on
// the home page, which has no URL of its own and shows nine cards at a time —
// so the work section could not be linked to, and the case studies had no
// internal hub pointing at them. This is that hub: one page, every project,
// grouped so the shape of the work is visible at a glance.
const WorkIndex = () => {
  const { t } = useLanguage();

  // Filter state lives in the URL, the same way it does on the blog index and
  // for the same reason: a narrowed list is something you send to someone
  // ("here are the WordPress builds"), and the back button should undo a
  // filter rather than leave the page. A useState here made /work a single
  // URL that always opened unfiltered, and the tags every project already
  // carried were not reachable at all.
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get('category')?.toLowerCase() || 'all';
  const query = searchParams.get('q') || '';
  const activeTags = useMemo(() => {
    const raw = searchParams.get('tags');
    // Only tags that still exist: a stale link must not filter everything away.
    return raw ? raw.split(',').filter((tag) => allTags.includes(tag)) : [];
  }, [searchParams]);

  // Defaults stay out of the URL, so an unfiltered /work is never a second URL
  // for the same content.
  const updateParams = useCallback(
    (changes) => {
      const next = new URLSearchParams(searchParams);
      for (const [key, value] of Object.entries(changes)) {
        if (!value || value === 'all') next.delete(key);
        else next.set(key, value);
      }
      // Typing in the search box must not push a history entry per keystroke.
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Tags narrow cumulatively — picking "AI" and "Product" shows only projects
  // carrying both, which is what makes stacking them useful.
  const toggleTag = (tag) => {
    const next = activeTags.includes(tag)
      ? activeTags.filter((each) => each !== tag)
      : [...activeTags, tag];
    updateParams({ tags: next.join(',') });
  };

  // Whether the tag panel is open is UI state, not a filter, so it stays out
  // of the URL — but a link that arrives with tags already applied has to show
  // which ones, or the results look arbitrary. There are 24 project tags
  // against the blog's 10, and left expanded they filled three rows above the
  // fold and pushed every project below it.
  const [tagsOpen, setTagsOpen] = useState(() => activeTags.length > 0);

  const isFiltered = filter !== 'all' || activeTags.length > 0 || query !== '';
  const clearFilters = () => setSearchParams(new URLSearchParams(), { replace: true });

  const projects = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return projectsData.filter((project) => {
      if (filter !== 'all' && project.category.toLowerCase() !== filter) return false;
      if (!activeTags.every((tag) => project.tags?.includes(tag))) return false;
      if (words.length === 0) return true;
      // Both the source strings and the active translation, so a Japanese
      // visitor searching in Japanese and a recruiter searching the English
      // project name both find the same project.
      const summary = t(`projects.${project.id}`, project.summary || '');
      const haystack =
        `${project.title} ${project.summary || ''} ${summary} ${project.category} ${(project.tags ?? []).join(' ')}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [activeTags, filter, query, t]);

  return (
    <>
      <Seo title={t('seo.workTitle')} description={t('seo.workDesc')} path="/work" />
      <Header />

      <main className="workindex section" id="main-content">
        <div className="workindex__container container">
          <h1 className="section__title workindex__title">{t('work.title')}</h1>
          <span className="section__subtitle">{t('work.subtitle')}</span>

          <p className="workindex__intro">
            {t('work.intro').replace('{count}', projectsData.length)}
          </p>

          <div className="workindex__search-wrapper">
            <input
              type="text"
              className="workindex__search"
              aria-label={t('work.searchAria')}
              placeholder={t('work.searchPlaceholder')}
              value={query}
              onChange={(e) => updateParams({ q: e.target.value })}
            />
          </div>

          <div className="workindex__filters">
            {projectsNav.map((nav) => {
              const value = nav.name.toLowerCase();
              return (
                <button
                  type="button"
                  key={nav.name}
                  className={`workindex__filter${filter === value ? ' is-active' : ''}`}
                  onClick={() => updateParams({ category: value })}
                  aria-pressed={filter === value}
                >
                  {t(`portfolio.filters.${value}`, nav.name)}
                </button>
              );
            })}
          </div>

          {/* Separate from the category row on purpose: a category is what
              kind of build it was, a tag is what the project is about, and the
              two compose. */}
          <div className="workindex__tags-toggle-row">
            <button
              type="button"
              className="workindex__tags-toggle"
              onClick={() => setTagsOpen((open) => !open)}
              aria-expanded={tagsOpen}
              aria-controls="work-tag-filters"
            >
              {t('work.tagsToggle')}
              {activeTags.length > 0 && (
                <span className="workindex__tags-badge">{activeTags.length}</span>
              )}
              <i
                className={`bx bx-chevron-down workindex__tags-chevron${tagsOpen ? ' is-open' : ''}`}
                aria-hidden="true"
              ></i>
            </button>
          </div>

          <div
            id="work-tag-filters"
            className="workindex__tags"
            role="group"
            aria-label={t('work.tagFilterAria')}
            hidden={!tagsOpen}
          >
            {allTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`workindex__tag${activeTags.includes(tag) ? ' is-active' : ''}`}
                onClick={() => toggleTag(tag)}
                aria-pressed={activeTags.includes(tag)}
                aria-label={t('work.filterByTag').replace('{tag}', tag)}
              >
                {tag}
              </button>
            ))}
            {activeTags.length > 0 && (
              <button
                type="button"
                className="workindex__tag-clear"
                onClick={() => updateParams({ tags: '' })}
              >
                {t('work.clearTags')}
              </button>
            )}
          </div>

          {/* Filtering rewrites the list below with no other signal that
              anything happened, which for a screen reader is silence. */}
          <p className="workindex__count" role="status" aria-live="polite">
            {t('work.showing')
              .replace('{shown}', projects.length)
              .replace('{total}', projectsData.length)}
            {isFiltered && (
              <>
                {' '}
                <button type="button" className="workindex__clear-all" onClick={clearFilters}>
                  {t('work.clearAll')}
                </button>
              </>
            )}
          </p>

          {projects.length === 0 && (
            <p className="workindex__no-results">{t('work.noResults')}</p>
          )}

          {/* A list, not a grid of bare cards: this page is as much a table of
              contents for crawlers as it is a gallery, so each entry carries
              its summary and its own heading. */}
          <ul className="workindex__list">
            {projects.map((project) => (
              <li key={project.id} className="workindex__item">
                <LocaleLink to={projectPath(project)} className="workindex__link">
                  <Img
                    src={project.image}
                    alt=""
                    className="workindex__thumb"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 260px"
                  />
                  <div className="workindex__body">
                    <span className="workindex__badge">
                      {t(`portfolio.filters.${project.category.toLowerCase()}`, project.category)}
                    </span>
                    <h2 className="workindex__item-title">{project.title}</h2>
                    <p className="workindex__summary">
                      {t(`projects.${project.id}`, project.summary || '')}
                    </p>
                    <span className="workindex__cta">
                      {t(project.article ? 'portfolio.readArticle' : 'portfolio.caseStudy')}
                      <i className="bx bx-right-arrow-alt"></i>
                    </span>
                  </div>
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
      <ScrollUp />
    </>
  );
};

export default WorkIndex;
