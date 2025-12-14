import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Blog = () => {
  return (
    <>
      <Header />
      <section className="blog section" id="blog">
        <h2 className="section__title">Blog</h2>
        <span className="section__subtitle">My latest posts</span>

        <div className="blog__container container grid">
          <article className="blog__card">
            <h3 className="blog__title">Understanding M Mode</h3>
            <p className="blog__description">
              A simple guide to Manual Photography
            </p>
            <Link to="/blog/first-post" className="blog__button">
              Read more
            </Link>
          </article>
        </div>
      </section>

      <Footer />
    </>
    
  );
};

export default Blog;