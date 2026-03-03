import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./blog.css";

const Blog = () => {
  return (
    <>
      <Header />
      <section className="blog section" id="blog">
        <h2 className="section__title">Blog</h2>
        <span className="section__subtitle">My latest posts</span>

        <div className="blog__list-container container">
          <article className="blog__card">
            <div className="blog__card-meta">
              <span className="blog__card-category">Camera Basics</span>
              <span className="blog__card-dot">·</span>
              <time className="blog__card-date">Feb 2025</time>
              <span className="blog__card-dot">·</span>
              <span className="blog__card-readtime">5 min read</span>
            </div>

            <h3 className="blog__card-title">Understanding M Mode</h3>

            <p className="blog__card-excerpt">
              Learn how shutter speed, aperture, and ISO work together to give
              you full creative control over your camera — with practical
              examples you can try right away.
            </p>

            <div className="blog__card-footer">
              <div className="blog__card-tags">
                <span className="blog__tag">Photography</span>
                <span className="blog__tag">Beginner</span>
              </div>
              <Link to="/blog/m-mode" className="blog__card-link">
                Read article <span className="blog__card-arrow">→</span>
              </Link>
            </div>
          </article>
          <article className="blog__card">
            <div className="blog__card-meta">
              <span className="blog__card-category">Project</span>
              <span className="blog__card-dot">·</span>
              <time className="blog__card-date">Mar 2026</time>
              <span className="blog__card-dot">·</span>
              <span className="blog__card-readtime">6 min read</span>
            </div>

            <h3 className="blog__card-title">Hermes — An AI-Powered Email Client</h3>

            <p className="blog__card-excerpt">
              A full-featured email client with Claude AI built in. Connect Gmail,
              Outlook, or any IMAP account and use 9 AI writing modes to compose
              better emails — with real-time streaming suggestions.
            </p>

            <div className="blog__card-footer">
              <div className="blog__card-tags">
                <span className="blog__tag">AI</span>
                <span className="blog__tag">Project</span>
              </div>
              <Link to="/blog/hermes" className="blog__card-link">
                Read article <span className="blog__card-arrow">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blog;
