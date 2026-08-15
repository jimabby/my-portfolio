import { useMemo, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollUp from '../scrollup/ScrollUp';
import Img from '../image/Img';
import Seo from '../seo/Seo';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import { projectsData, projectPath, projectsNav } from './Data';
import './workindex.css';

// Every case study in one list, at a URL of its own.
//
// The 22 case study pages were reachable only through the paginated gallery on
// the home page, which has no URL of its own and shows nine cards at a time —
// so the work section could not be linked to, and the case studies had no
// internal hub pointing at them. This is that hub: one page, every project,
// grouped so the shape of the work is visible at a glance.
const WorkIndex = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const projects = useMemo(() => {
    if (filter === 'all') return projectsData;
    return projectsData.filter((project) => project.category.toLowerCase() === filter);
  }, [filter]);

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

          <div className="workindex__filters">
            {projectsNav.map((nav) => {
              const value = nav.name.toLowerCase();
              return (
                <button
                  type="button"
                  key={nav.name}
                  className={`workindex__filter${filter === value ? ' is-active' : ''}`}
                  onClick={() => setFilter(value)}
                  aria-pressed={filter === value}
                >
                  {t(`portfolio.filters.${value}`, nav.name)}
                </button>
              );
            })}
          </div>

          <p className="workindex__count" aria-live="polite">
            {t('work.showing')
              .replace('{shown}', projects.length)
              .replace('{total}', projectsData.length)}
          </p>

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
