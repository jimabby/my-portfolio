import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollUp from '../scrollup/ScrollUp';
import { posts } from './postsData';
import { useLanguage } from '../../i18n/LanguageContext';
import Seo from '../seo/Seo';
import './blog.css';

const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

const Blog = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const catLabel = useCallback(
    (cat) => t(`blog.categories.${cat}`, cat),
    [t]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const filtered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      if (!matchCat) return false;
      if (words.length === 0) return true;
      const title = t(`posts.${p.key}.title`, p.title);
      const excerpt = t(`posts.${p.key}.excerpt`, p.excerpt);
      const haystack = `${p.title} ${p.excerpt} ${title} ${excerpt} ${p.category} ${catLabel(p.category)} ${p.tags.join(' ')}`.toLowerCase();
      return words.every(word => haystack.includes(word));
    });
  }, [activeCategory, catLabel, query, t]);

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
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Category filter */}
        <div className="blog__filters">
          {categories.map(cat => (
            <button
              type="button"
              key={cat}
              className={`blog__filter-btn${activeCategory === cat ? ' blog__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>

        <div className="blog__list-container container">
          {filtered.length === 0 && (
            <p className="blog__no-results">{t('blog.noResults')}</p>
          )}

          {filtered.map(post => (
            <article className="blog__card" key={post.id}>
              {post.thumbnail && (
                <img src={post.thumbnail} alt={t(`posts.${post.key}.title`, post.title)} className="blog__card-thumb" loading="lazy" decoding="async" />
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
                    <span key={tag} className="blog__tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/blog/${post.slug}`} className="blog__card-link">
                  {t('blog.readArticle')} <span className="blog__card-arrow">&rarr;</span>
                </Link>
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
