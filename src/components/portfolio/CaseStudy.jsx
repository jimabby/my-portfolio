import { useParams } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollUp from '../scrollup/ScrollUp';
import Img from '../image/Img';
import Seo from '../seo/Seo';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import { projectsData } from './Data';
import NotFound from '../notfound/NotFound';
import './casestudy.css';

// A linkable, indexable page per project. The gallery modal on the home page
// already held every screenshot, the summary and the tags, but none of it had
// a URL: it could not be shared, bookmarked, or found in search.
const CaseStudy = () => {
  const { slug } = useParams();
  const { t } = useLanguage();

  const index = projectsData.findIndex((project) => project.slug === slug);
  const project = projectsData[index];

  // An unknown slug is a genuine 404, not an empty case study.
  if (!project) return <NotFound />;

  const previous = projectsData[index - 1];
  const next = projectsData[index + 1];

  const summary = t(`projects.${project.id}`, project.summary || '');
  const images = project.gallery?.length > 0 ? project.gallery : [project.image];
  const hasExternalLink = project.link && project.link !== '#';
  const categoryLabel = t(`portfolio.filters.${project.category.toLowerCase()}`, project.category);

  return (
    <>
      <Seo
        title={`${project.title} | Jim Kong`}
        description={summary}
        path={`/work/${project.slug}`}
      />
      <Header />

      <main className="casestudy section" id="main-content">
        <div className="casestudy__container container">
          <div className="casestudy__back-wrapper">
            <LocaleLink to="/#portfolio" className="casestudy__back">
              {t('casestudy.backToWork')}
            </LocaleLink>
          </div>

          <header className="casestudy__hero card">
            <div className="casestudy__meta">
              <span className="casestudy__badge">{categoryLabel}</span>
            </div>
            <h1 className="casestudy__title">{project.title}</h1>
            {summary && <p className="casestudy__summary">{summary}</p>}

            {project.tags?.length > 0 && (
              <ul className="casestudy__tags">
                {project.tags.map((tag) => (
                  <li key={tag} className="casestudy__tag">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {hasExternalLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--flex casestudy__visit"
              >
                {t('casestudy.visit')}
                <i className="bx bx-right-arrow-alt"></i>
              </a>
            )}
          </header>

          <section className="casestudy__gallery" aria-label={t('casestudy.galleryLabel')}>
            {images.map((image, i) => (
              <figure key={image} className="casestudy__figure">
                <Img
                  src={image}
                  alt={`${project.title} — ${i + 1}`}
                  className="casestudy__img"
                  loading={i === 0 ? undefined : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  decoding="async"
                  sizes="(max-width: 820px) 100vw, 780px"
                />
              </figure>
            ))}
          </section>

          {(previous || next) && (
            <nav className="casestudy__prevnext" aria-label={t('casestudy.moreWork')}>
              {previous ? (
                <LocaleLink
                  to={`/work/${previous.slug}`}
                  className="casestudy__prevnext-link casestudy__prevnext-link--prev"
                >
                  <span className="casestudy__prevnext-dir">
                    <i className="bx bx-arrow-back"></i> {t('casestudy.previous')}
                  </span>
                  <span className="casestudy__prevnext-title">{previous.title}</span>
                </LocaleLink>
              ) : (
                <div />
              )}

              {next ? (
                <LocaleLink
                  to={`/work/${next.slug}`}
                  className="casestudy__prevnext-link casestudy__prevnext-link--next"
                >
                  <span className="casestudy__prevnext-dir">
                    {t('casestudy.next')} <i className="bx bx-right-arrow-alt"></i>
                  </span>
                  <span className="casestudy__prevnext-title">{next.title}</span>
                </LocaleLink>
              ) : (
                <div />
              )}
            </nav>
          )}
        </div>
      </main>

      <Footer />
      <ScrollUp />
    </>
  );
};

export default CaseStudy;
