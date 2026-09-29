import React, { useCallback, useMemo, useRef, useState } from 'react';
import './workspace.css';
import Img from '../image/Img';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import { projectPath, projectsData } from './Data';

// The flagship work as an editor window. Each project is a folder in the
// explorer on the left; opening one adds a tab and shows its README in the
// pane on the right — the screenshot in a browser frame, what it is, its
// tags, the link to the write-up, and a button that hands the project to the
// AI assistant as a question.
//
// Every file in the explorer is a real <button> and every tab a real one, so
// keyboard and screen-reader access come for free; ArrowUp/ArrowDown walk the
// explorer the way they do in an editor. One project is always open to begin
// with, so the section never lands on an empty pane. Below 768px the explorer
// becomes a row of chips that scrolls sideways and the tabs step aside.
//
// Curated on purpose. There are 24 projects in Data.jsx; the explorer shows
// the seven that best represent the work, and the rest are one click away in
// the portfolio grid below. Hermes leads because it is the AI product.
const CURATED = [
  'hermes-ai-email-client',
  'housed-redesign',
  'oncora',
  'pockyt',
  'simba-health-redesign',
  'airbest',
  'simba-education-new-build',
];

const Workspace = () => {
  const { t } = useLanguage();
  const projects = useMemo(
    () => CURATED.map((slug) => projectsData.find((p) => p.slug === slug)).filter(Boolean),
    []
  );
  const [tabs, setTabs] = useState(() => (projects[0] ? [projects[0].slug] : []));
  const [active, setActive] = useState(() => projects[0]?.slug ?? null);
  const fileRefs = useRef({});

  const project = projects.find((p) => p.slug === active) ?? null;
  const categoryFor = (p) => t(`portfolio.filters.${p.category.toLowerCase()}`, p.category);
  const summaryFor = (p) => t(`projects.${p.id}`, p.summary || '');

  const open = useCallback((slug) => {
    setTabs((current) => (current.includes(slug) ? current : [...current, slug]));
    setActive(slug);
  }, []);

  // Closing the active tab moves to its neighbour, the way an editor does;
  // closing the last one leaves the empty state.
  const closeTab = (slug) => {
    const index = tabs.indexOf(slug);
    const next = tabs.filter((s) => s !== slug);
    setTabs(next);
    if (slug === active) setActive(next[Math.min(index, next.length - 1)] ?? null);
  };

  const onExplorerKey = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const index = projects.findIndex((p) => p.slug === e.target.dataset.slug);
    if (index < 0) return;
    e.preventDefault();
    const next = projects[(index + (e.key === 'ArrowDown' ? 1 : -1) + projects.length) % projects.length];
    open(next.slug);
    fileRefs.current[next.slug]?.focus();
  };

  // The assistant listens for this event (Assistant.jsx).
  const ask = (p) => {
    window.dispatchEvent(
      new CustomEvent('assistant:ask', {
        detail: { question: t('workspace.askQuestion').replace('{title}', p.title) },
      })
    );
  };

  if (projects.length === 0) return null;

  return (
    <section className="workspace section" id="workspace">
      <div className="workspace__head">
        <h2 className="section__title">{t('workspace.title')}</h2>
        <span className="section__subtitle">{t('workspace.subtitle')}</span>
      </div>

      <div className="workspace__window container">
        <div className="workspace__titlebar" aria-hidden="true">
          <span className="workspace__dots" />
          <span className="workspace__path">~/work — jim-kong</span>
        </div>

        <div className="workspace__body">
          <nav className="workspace__explorer" aria-label={t('workspace.explorer')}>
            <span className="workspace__explorer-label" aria-hidden="true">
              {t('workspace.explorer')}
            </span>
            <span className="workspace__folder" aria-hidden="true">work</span>
            <ul className="workspace__files" onKeyDown={onExplorerKey}>
              {projects.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    ref={(el) => {
                      fileRefs.current[p.slug] = el;
                    }}
                    data-slug={p.slug}
                    className={`workspace__file${p.slug === active ? ' is-active' : ''}`}
                    onClick={() => open(p.slug)}
                    aria-current={p.slug === active ? 'true' : undefined}
                    aria-controls="workspace-preview"
                    aria-label={t('workspace.openPiece').replace('{title}', p.title)}
                  >
                    <span className="workspace__file-name">{p.slug}</span>
                    <span className="workspace__file-cat" aria-hidden="true">
                      {categoryFor(p)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="workspace__main">
            {tabs.length > 0 && (
              <ul className="workspace__tabs">
                {tabs.map((slug) => {
                  const tab = projects.find((p) => p.slug === slug);
                  return (
                    <li key={slug} className={`workspace__tab${slug === active ? ' is-active' : ''}`}>
                      <button
                        type="button"
                        className="workspace__tab-open"
                        onClick={() => setActive(slug)}
                        aria-current={slug === active ? 'true' : undefined}
                      >
                        {slug}/README.md
                      </button>
                      <button
                        type="button"
                        className="workspace__tab-close"
                        onClick={() => closeTab(slug)}
                        aria-label={t('workspace.closeTab').replace('{title}', tab.title)}
                      >
                        ×
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <div
              id="workspace-preview"
              className="workspace__preview"
              role="region"
              aria-label={project ? project.title : t('workspace.empty')}
            >
              {project ? (
                // Keyed on the project so switching files replays the fade-in.
                <article key={project.slug} className="workspace__readme">
                  <span className="workspace__crumbs" aria-hidden="true">
                    work › {project.slug} › README.md
                  </span>

                  <figure className="workspace__shot">
                    <span className="workspace__shot-bar" aria-hidden="true" />
                    <Img
                      src={project.image}
                      alt={project.title}
                      className="workspace__shot-img"
                      decoding="async"
                      sizes="(max-width: 767px) 92vw, (min-width: 1280px) 660px, 520px"
                    />
                  </figure>

                  <div className="workspace__doc">
                    <h3 className="workspace__title">{project.title}</h3>
                    <span className="workspace__cat">{categoryFor(project)}</span>
                    {summaryFor(project) && (
                      <p className="workspace__summary">{summaryFor(project)}</p>
                    )}

                    {project.tags?.length > 0 && (
                      <ul className="workspace__tags">
                        {project.tags.map((tag) => (
                          <li key={tag} className="workspace__tag">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="workspace__actions">
                      <LocaleLink to={projectPath(project)} className="workspace__link">
                        {t(project.article ? 'portfolio.readArticle' : 'portfolio.caseStudy')}
                        <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
                      </LocaleLink>
                      <button type="button" className="workspace__ask" onClick={() => ask(project)}>
                        <span aria-hidden="true">›</span> {t('workspace.ask')}
                      </button>
                    </div>
                  </div>
                </article>
              ) : (
                <p className="workspace__empty">{t('workspace.empty')}</p>
              )}
            </div>
          </div>
        </div>

        <div className="workspace__status" aria-hidden="true">
          <span>README.md</span>
          <span>Markdown</span>
          <span>{t('workspace.count').replace('{n}', projects.length)}</span>
        </div>
      </div>

      <a className="workspace__all" href="#portfolio">
        {t('workspace.viewAll')}
        <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
      </a>
    </section>
  );
};

export default Workspace;
