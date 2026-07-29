import { posts } from './postsData';
import { useLanguage } from '../../i18n/LanguageContext';
// Pulls the article prose into this chunk instead of the entry bundle.
import '../../i18n/posts/register';
import LocaleLink from "../../i18n/LocaleLink";

const BlogPrevNext = ({ currentSlug }) => {
  const { t } = useLanguage();
  const idx = posts.findIndex(p => p.slug === currentSlug);
  const next = posts[idx - 1];
  const prev = posts[idx + 1];

  if (!prev && !next) return null;

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="blog__prevnext">
      {prev ? (
        <LocaleLink
          to={`/blog/${prev.slug}`}
          className="blog__prevnext-link blog__prevnext-link--prev"
          onClick={scrollToTop}
        >
          <span className="blog__prevnext-dir">
            <i className="bx bx-arrow-back"></i> {t('blog.previous')}
          </span>
          <span className="blog__prevnext-title">{t(`posts.${prev.key}.title`, prev.title)}</span>
          <span className="blog__prevnext-meta">{t(`posts.${prev.key}.date`, prev.date)} - {t(`posts.${prev.key}.readTime`, prev.readTime)}</span>
        </LocaleLink>
      ) : <div />}

      {next ? (
        <LocaleLink
          to={`/blog/${next.slug}`}
          className="blog__prevnext-link blog__prevnext-link--next"
          onClick={scrollToTop}
        >
          <span className="blog__prevnext-dir">
            {t('blog.next')} <i className="bx bx-right-arrow-alt"></i>
          </span>
          <span className="blog__prevnext-title">{t(`posts.${next.key}.title`, next.title)}</span>
          <span className="blog__prevnext-meta">{t(`posts.${next.key}.date`, next.date)} - {t(`posts.${next.key}.readTime`, next.readTime)}</span>
        </LocaleLink>
      ) : <div />}
    </div>
  );
};

export default BlogPrevNext;
