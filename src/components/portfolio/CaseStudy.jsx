import { Navigate, useParams } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollUp from '../scrollup/ScrollUp';
import Img from '../image/Img';
import { manifestKeyFor, metadataFor } from '../image/srcset';
import Seo from '../seo/Seo';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import { useLocalePath } from '../../i18n/useLocalePath';
import { projectsData, projectPath } from './Data';
import NotFound from '../notfound/NotFound';
// Registers the per-image captions into this chunk. Import for side effect.
import '../../i18n/captions/register';
import './casestudy.css';

// A linkable, indexable page per project. The gallery modal on the home page
// already held every screenshot, the summary and the tags, but none of it had
// a URL: it could not be shared, bookmarked, or found in search.
const CaseStudy = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const withLocale = useLocalePath();

  const index = projectsData.findIndex((project) => project.slug === slug);
  const project = projectsData[index];

  // An unknown slug is a genuine 404, not an empty case study.
  if (!project) return <NotFound />;

  // Projects written up on the blog own that URL instead. Vercel 301s this
  // path for real visitors; this covers in-app navigation to a stale link.
  if (project.article) return <Navigate to={withLocale(project.article)} replace />;

  const previous = projectsData[index - 1];
  const next = projectsData[index + 1];

  const summary = t(`projects.${project.id}`, project.summary || '');
  const images = project.gallery?.length > 0 ? project.gallery : [project.image];
  const hasExternalLink = project.link && project.link !== '#';
  const categoryLabel = t(`portfolio.filters.${project.category.toLowerCase()}`, project.category);
  const roleLabel = project.role && t(`casestudy.roles.${project.role}`, project.role);

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

          <header className="casestudy__hero">
            <div className="casestudy__meta">
              <span className="casestudy__badge">{categoryLabel}</span>
            </div>
            <h1 className="casestudy__title">{project.title}</h1>
            {summary && <p className="casestudy__summary">{summary}</p>}

            {/* Role, year and stack: a page of screenshots and one line of
                text is thin enough that search engines may skip it. */}
            {(roleLabel || project.year || project.stack?.length > 0) && (
              <dl className="casestudy__facts">
                {roleLabel && (
                  <div className="casestudy__fact">
                    <dt className="casestudy__fact-label">{t('casestudy.roleLabel')}</dt>
                    <dd className="casestudy__fact-value">{roleLabel}</dd>
                  </div>
                )}
                {project.year && (
                  <div className="casestudy__fact">
                    <dt className="casestudy__fact-label">{t('casestudy.yearLabel')}</dt>
                    <dd className="casestudy__fact-value">{project.year}</dd>
                  </div>
                )}
                {project.stack?.length > 0 && (
                  <div className="casestudy__fact">
                    <dt className="casestudy__fact-label">{t('casestudy.stackLabel')}</dt>
                    <dd className="casestudy__fact-value">{project.stack.join(', ')}</dd>
                  </div>
                )}
              </dl>
            )}

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
            {images.map((image, i) => {
              // Captions are index-aligned with the gallery; a test keeps the
              // two in step. The alt text stays a plain identifier so a screen
              // reader doesn't read the same sentence twice.
              const caption = t(`captions.${project.id}.${i}`, '');

              // A phone screenshot (900x1948) at the full column width would
              // render nearly 1700px tall, so tall shots sit two to a row.
              const size = metadataFor(manifestKeyFor(image));
              const portrait = size ? size.h / size.w > 1.2 : false;

              return (
                <figure
                  key={image}
                  className={`casestudy__figure${portrait ? ' casestudy__figure--portrait' : ''}`}
                >
                  <Img
                    src={image}
                    alt={t('casestudy.imageAlt')
                      .replace('{title}', project.title)
                      .replace('{n}', i + 1)
                      .replace('{total}', images.length)}
                    className="casestudy__img"
                    loading={i === 0 ? undefined : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    decoding="async"
                    sizes={
                      portrait
                        ? '(max-width: 640px) 100vw, 400px'
                        : '(max-width: 860px) 100vw, 820px'
                    }
                  />
                  {caption && (
                    <figcaption className="casestudy__caption">
                      <span className="casestudy__caption-index" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="casestudy__caption-text">{caption}</span>
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </section>

          {(previous || next) && (
            <nav className="casestudy__prevnext" aria-label={t('casestudy.moreWork')}>
              {previous ? (
                <LocaleLink
                  to={projectPath(previous)}
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
                  to={projectPath(next)}
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
