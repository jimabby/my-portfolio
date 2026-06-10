import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollUp from '../scrollup/ScrollUp';
import { posts } from './postsData';
import './blog.css';

const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const filtered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      if (!matchCat) return false;
      if (words.length === 0) return true;
      const haystack = `${p.title} ${p.excerpt} ${p.category} ${p.tags.join(' ')}`.toLowerCase();
      return words.every(word => haystack.includes(word));
    });
  }, [activeCategory, query]);

  return (
    <>
      <Header />
      <section className="blog section" id="blog">
        <h2 className="section__title">Blog</h2>
        <span className="section__subtitle">My latest posts</span>

        {/* Search */}
        <div className="blog__search-wrapper">
          <input
            aria-label="Search articles"
            type="text"
            className="blog__search"
            placeholder="Search articles..."
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
              {cat}
            </button>
          ))}
        </div>

        <div className="blog__list-container container">
          {filtered.length === 0 && (
            <p className="blog__no-results">No articles found.</p>
          )}

          {filtered.map(post => (
            <article className="blog__card" key={post.id}>
              {post.thumbnail && (
                <img src={post.thumbnail} alt={post.title} className="blog__card-thumb" />
              )}

              <div className="blog__card-meta">
                <span className="blog__card-category">{post.category}</span>
                <span className="blog__card-dot">|</span>
                <time className="blog__card-date">{post.date}</time>
                <span className="blog__card-dot">|</span>
                <span className="blog__card-readtime">{post.readTime}</span>
              </div>

              <h3 className="blog__card-title">{post.title}</h3>

              <p className="blog__card-excerpt">{post.excerpt}</p>

              <div className="blog__card-footer">
                <div className="blog__card-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="blog__tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/blog/${post.slug}`} className="blog__card-link">
                  Read article <span className="blog__card-arrow">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
      <ScrollUp />
    </>
  );
};

export default Blog;
