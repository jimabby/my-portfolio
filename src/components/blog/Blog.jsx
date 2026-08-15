import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollUp from '../scrollup/ScrollUp';
import { posts } from './postsData';
import { useLanguage } from '../../i18n/LanguageContext';
// Pulls the article prose into this chunk instead of the entry bundle.
import '../../i18n/posts/register';
import Seo from '../seo/Seo';
import './blog.css';
import Img from '../image/Img';
import LocaleLink from "../../i18n/LocaleLink";

const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort();

const Blog = () => {
  const { t } = useLanguage();

  // Filter state lives in the URL, not in component state. A filtered view is
  // something people share and come back to ("the AI posts"), and the back
  // button should undo a filter rather than leave the page — neither of which
  // works when the only record of the choice is a useState.
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'All';
  const query = searchParams.get('q') || '';
  const activeTags = useMemo(() => {
    const raw = searchParams.get('tags');
    // Only tags that still exist: a stale link must not filter everything away.
    return raw ? raw.split(',').filter((tag) => allTags.includes(tag)) : [];
  }, [searchParams]);

  // Defaults are omitted from the URL, so an unfiltered /blog stays clean and
  // is never a second URL for the same content.
  const updateParams = useCallback(
    (changes) => {
      const next = new URLSearchParams(searchParams);
      for (const [key, value] of Object.entries(changes)) {
        if (!value || value === 'All') next.delete(key);
        else next.set(key, value);
      }
      // Typing in the search box must not push a history entry per keystroke.
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Tags narrow the list cumulatively: picking "AI" and "Automation" shows only
  // posts carrying both, which is what makes stacking them useful rather than
  // just a second way to widen the results.
  const toggleTag = (tag) => {
    const next = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];
    updateParams({ tags: next.join(',') });
  };

  const catLabel = useCallback(
    (cat) => t(`blog.categories.${cat}`, cat),
    [t]
  );

  const isFiltered = activeCategory !== 'All' || activeTags.length > 0 || query !== '';

  const clearFilters = () => setSearchParams(new URLSearchParams(), { replace: true });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const filtered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      if (!matchCat) return false;
      if (!activeTags.every(tag => p.tags.includes(tag))) return false;
      if (words.length === 0) return true;
      const title = t(`posts.${p.key}.title`, p.title);
      const excerpt = t(`posts.${p.key}.excerpt`, p.excerpt);
      const haystack = `${p.title} ${p.excerpt} ${title} ${excerpt} ${p.category} ${catLabel(p.category)} ${p.tags.join(' ')}`.toLowerCase();
      return words.every(word => haystack.includes(word));
    });
  }, [activeCategory, activeTags, catLabel, query, t]);

  return (
    <>
      <Seo title={t('seo.blogTitle')} description={t('seo.blogDesc')} path="/blog" />
      <Header />
      <main className="blog section" id="main-content">
        <h2 className="section__title">{t('blog.title')}</h2>
        <span className="section__subtitle">{t('blog.subtitle')}</span>

        {/* Search */}
        <div className="blog__search-wrapper">
          <input
            aria-label={t('blog.searchAria')}
            type="text"
            className="blog__search"
            placeholder={t('blog.searchPlaceholder')}
            value={query}
            onChange={e => updateParams({ q: e.target.value })}
          />
        </div>

        {/* Category filter */}
        <div className="blog__filters">
          {categories.map(cat => (
            <button
              type="button"
              key={cat}
              className={`blog__filter-btn${activeCategory === cat ? ' blog__filter-btn--active' : ''}`}
              onClick={() => updateParams({ category: cat })}
              aria-pressed={activeCategory === cat}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>

        {/* Tag filter. Separate from categories on purpose: a category is the
            kind of post, a tag is what it is about, and they compose. */}
        <div className="blog__tag-filters" role="group" aria-label={t('blog.tagFilterAria')}>
          {allTags.map(tag => (
            <button
              type="button"
              key={tag}
              className={`blog__tag blog__tag--button${activeTags.includes(tag) ? ' blog__tag--active' : ''}`}
              onClick={() => toggleTag(tag)}
              aria-pressed={activeTags.includes(tag)}
            >
              {tag}
            </button>
          ))}
          {activeTags.length > 0 && (
            <button
              type="button"
              className="blog__tag-clear"
              onClick={() => updateParams({ tags: '' })}
            >
              {t('blog.clearTags')}
            </button>
          )}
        </div>

        {/* Filtering rewrites the list below with no other signal that
            anything happened, which for a screen reader is silence. Announced
            politely so it lands after the keystroke rather than over it. */}
        <p className="blog__result-count" role="status" aria-live="polite">
          {t('blog.resultCount')
            .replace('{shown}', filtered.length)
            .replace('{total}', posts.length)}
          {isFiltered && (
            <>
              {' '}
              <button type="button" className="blog__clear-all" onClick={clearFilters}>
                {t('blog.clearAll')}
              </button>
            </>
          )}
        </p>

        <div className="blog__list-container container">
          {filtered.length === 0 && (
            <p className="blog__no-results">{t('blog.noResults')}</p>
          )}

          {filtered.map(post => (
            <article className="blog__card" key={post.id}>
              {post.thumbnail && (
                <Img src={post.thumbnail} alt={t(`posts.${post.key}.title`, post.title)} className="blog__card-thumb" loading="lazy" decoding="async"  sizes="(max-width: 768px) 100vw, 400px"/>
              )}

              <div className="blog__card-meta">
                <span className="blog__card-category">{catLabel(post.category)}</span>
                <span className="blog__card-dot">|</span>
                <time className="blog__card-date">{t(`posts.${post.key}.date`, post.date)}</time>
                <span className="blog__card-dot">|</span>
                <span className="blog__card-readtime">{t(`posts.${post.key}.readTime`, post.readTime)}</span>
              </div>

              <h3 className="blog__card-title">{t(`posts.${post.key}.title`, post.title)}</h3>

              <p className="blog__card-excerpt">{t(`posts.${post.key}.excerpt`, post.excerpt)}</p>

              <div className="blog__card-footer">
                <div className="blog__card-tags">
                  {post.tags.map(tag => (
                    <button
                      type="button"
                      key={tag}
                      className={`blog__tag blog__tag--button${activeTags.includes(tag) ? ' blog__tag--active' : ''}`}
                      onClick={() => toggleTag(tag)}
                      aria-pressed={activeTags.includes(tag)}
                      aria-label={t('blog.filterByTag').replace('{tag}', tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <LocaleLink to={`/blog/${post.slug}`} className="blog__card-link">
                  {t('blog.readArticle')} <span className="blog__card-arrow">&rarr;</span>
                </LocaleLink>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
};

export default Blog;
