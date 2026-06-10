import { Link } from 'react-router-dom';
import { posts } from './postsData';

const BlogPrevNext = ({ currentSlug }) => {
  const idx = posts.findIndex(p => p.slug === currentSlug);
  const next = posts[idx - 1];
  const prev = posts[idx + 1];

  if (!prev && !next) return null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="blog__prevnext">
      {prev ? (
        <Link
          to={`/blog/${prev.slug}`}
          className="blog__prevnext-link blog__prevnext-link--prev"
          onClick={scrollToTop}
        >
          <span className="blog__prevnext-dir">
            <i className="bx bx-arrow-back"></i> Previous
          </span>
          <span className="blog__prevnext-title">{prev.title}</span>
          <span className="blog__prevnext-meta">{prev.date} - {prev.readTime}</span>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          to={`/blog/${next.slug}`}
          className="blog__prevnext-link blog__prevnext-link--next"
          onClick={scrollToTop}
        >
          <span className="blog__prevnext-dir">
            Next <i className="bx bx-right-arrow-alt"></i>
          </span>
          <span className="blog__prevnext-title">{next.title}</span>
          <span className="blog__prevnext-meta">{next.date} - {next.readTime}</span>
        </Link>
      ) : <div />}
    </div>
  );
};

export default BlogPrevNext;
