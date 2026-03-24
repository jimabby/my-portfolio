import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import BlogProgressBar from "./BlogProgressBar";
import BlogShareButtons from "./BlogShareButtons";
import BlogPrevNext from "./BlogPrevNext";
import BlogSEO from "./BlogSEO";
import ScrollUp from "../scrollup/ScrollUp";
import heroImage from '../../assets/Nikon-Z8-m-mode.webp'
import Mmode from "../../assets/m-mode.webp"
import ShuuterSpeed from "../../assets/shutter-speed.webp"
import Apertune from "../../assets/apertune.webp"
import ISO from "../../assets/iso.webp"
import exposureTriangle from "../../assets/exposure-triangle.webp"
import Portrait from "../../assets/portrait.webp"
import longExposure from "../../assets/long-exposure.webp"
import ManualMode from "../../assets/manual-mode.webp"
import "./blog.css";

const MMode = () => {
  return (
    <>
      <BlogSEO
        title="Understanding M Mode"
        description="Learn how shutter speed, aperture, and ISO work together to give you full creative control over your camera - with practical examples you can try right away."
        ogImage="m-mode.webp"
        slug="m-mode"
      />
      <Header />
      <BlogProgressBar />

      <main className="blog blog--single section" id="first-post">
        <div className="blog__container container">

          {/* Back button */}
          <div className="blog__back-wrapper">
            <Link to="/blog" className="blog__back-button">
              {"<- Back to Blog"}
            </Link>
          </div>

          {/* HERO */}
          <header className="blog__hero card">
            <div className="blog__post-meta">
              <span className="blog__badge">Camera Basics</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">February 2025</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">5 min read</span>
            </div>

            <h1 className="blog__post-title">
              Understanding M Mode
            </h1>

            <p className="blog__hero-text">
              Manual Mode (<strong>M Mode</strong>) gives you full control of
              your camera. Instead of letting the camera choose settings, you
              decide how the image should look.
            </p>

            <p className="blog__hero-text">
              In this guide, you'll learn how shutter speed, aperture, and ISO
              work together, with simple examples you can try immediately.
            </p>

            <figure className="blog__figure blog__figure--hero">
              <img src={heroImage} alt="Camera in M Mode" className="blog__img" />
            </figure>
          </header>

          {/* TABLE OF CONTENTS */}
          <nav className="blog__toc card">
            <h2 className="blog__toc-title">In this article</h2>
            <ol className="blog__toc-list">
              <li><a href="#step-1">Step 1 - Switch to M Mode</a></li>
              <li><a href="#step-2">Step 2 - The Three Settings Explained</a></li>
              <li><a href="#work-together">How They Work Together</a></li>
              <li><a href="#examples">Example Settings to Try</a></li>
              <li><a href="#final-tips">Final Tips</a></li>
            </ol>
          </nav>

          {/* CONTENT */}
          <div className="blog__content">

            {/* STEP 1 */}
            <section className="blog__section card" id="step-1">
              <h2 className="blog__heading">Step 1 - Switch to M Mode</h2>

              <figure className="blog__figure blog__figure--aside">
                <img src={Mmode} alt='Camera dial on M' className="blog__img" />
                <figcaption className="blog__caption">Camera mode dial set to M</figcaption>
              </figure>

              <p>
                Most cameras have a mode dial on top. Turn the dial until it
                points to <strong>M</strong>.
              </p>

              <p>Once you're in M Mode, you can control:</p>

              <ul className="blog__list">
                <li>Shutter Speed</li>
                <li>Aperture (f-number)</li>
                <li>ISO</li>
              </ul>

              <div className="blog__tip">
                <h3 className="blog__tip-title">Quick Tip</h3>
                <p className="blog__tip-text">
                  Don't worry if it feels confusing at first. The goal is to
                  learn how each setting changes your photo.
                </p>
              </div>
            </section>

            {/* STEP 2 */}
            <section className="blog__section card" id="step-2">
              <h2 className="blog__heading">
                Step 2 - The Three Settings Explained
              </h2>

              {/* Shutter */}
              <div className="blog__info-block">
                <figure className="blog__figure blog__figure--diagram">
                  <img src={ShuuterSpeed} alt="Shutter Speed diagram" className="blog__img" />
                  <figcaption className="blog__caption">Shutter speed</figcaption>
                </figure>

                <h3 className="blog__subheading">Shutter Speed - Motion</h3>

                <ul className="blog__list">
                  <li>Fast shutter (1/1000s): freezes action</li>
                  <li>Slow shutter (1/10s): adds motion blur</li>
                  <li>Very slow shutter: requires tripod</li>
                </ul>
              </div>

              {/* Aperture */}
              <div className="blog__info-block">
                <figure className="blog__figure blog__figure--diagram">
                  <img src={Apertune} alt="Aperture diagram" className="blog__img" />
                  <figcaption className="blog__caption">Aperture</figcaption>
                </figure>

                <h3 className="blog__subheading">Aperture - Depth of Field</h3>

                <ul className="blog__list">
                  <li>Wide aperture (f/1.8): blurry background</li>
                  <li>Narrow aperture (f/8-f/16): more in focus</li>
                  <li>Common for portraits: f/1.8-f/2.8</li>
                </ul>
              </div>

              {/* ISO */}
              <div className="blog__info-block">
                <figure className="blog__figure blog__figure--diagram">
                  <img src={ISO} alt="ISO diagram" className="blog__img" />
                  <figcaption className="blog__caption">ISO</figcaption>
                </figure>

                <h3 className="blog__subheading">ISO - Brightness &amp; Noise</h3>

                <ul className="blog__list">
                  <li>Low ISO (100-400): clean image</li>
                  <li>High ISO (1600+): brighter but grainy</li>
                  <li>Use ISO last, after setting shutter/aperture</li>
                </ul>
              </div>
            </section>

            {/* HOW THEY WORK TOGETHER */}
            <section className="blog__section card" id="work-together">
              <h2 className="blog__heading">How They Work Together</h2>

              <figure className="blog__figure blog__figure--full">
                <img src={exposureTriangle} alt="Exposure Triangle Diagram" className="blog__img" />
                <figcaption className="blog__caption">Exposure Triangle Diagram</figcaption>
              </figure>

              <ul className="blog__list">
                <li><strong>Shutter</strong> - controls motion</li>
                <li><strong>Aperture</strong> - controls background blur</li>
                <li><strong>ISO</strong> - controls brightness</li>
              </ul>

              <p>To brighten your photo, you can:</p>

              <ul className="blog__list">
                <li>Use a slower shutter</li>
                <li>Use a wider aperture (lower f-number)</li>
                <li>Increase ISO</li>
              </ul>

              <p>To reduce brightness, do the opposite.</p>
            </section>

            {/* EXAMPLES */}
            <section className="blog__section card" id="examples">
              <h2 className="blog__heading">Example Settings to Try</h2>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>Portrait:</strong> 1/125s, f/2.8, ISO 100-400
                </li>
                <li>
                  <strong>Indoor:</strong> 1/60s, f/2.0, ISO 800-1600
                </li>
                <li>
                  <strong>Sports:</strong> 1/1000s, f/4, ISO 400-800
                </li>
                <li>
                  <strong>Night city (tripod):</strong> 1-5s, f/8, ISO 100
                </li>
              </ul>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <img src={Portrait} alt="Portrait example" className="blog__img blog__img--cover" />
                  <figcaption className="blog__caption">Portrait example</figcaption>
                </figure>
                <figure className="blog__figure">
                  <img src={longExposure} alt="Long-exposure night shot" className="blog__img blog__img--cover" />
                  <figcaption className="blog__caption">Long-exposure night shot</figcaption>
                </figure>
              </div>
            </section>

            {/* FINAL TIPS */}
            <section className="blog__section card" id="final-tips">
              <h2 className="blog__heading">Final Tips</h2>

              <ul className="blog__list">
                <li>Start with Aperture Priority (A/Av) if M Mode feels too hard.</li>
                <li>Watch your light meter for guidance.</li>
                <li>Take 2-3 test shots whenever lighting changes.</li>
                <li>Mistakes are the best teacher - keep experimenting.</li>
              </ul>

              <figure className="blog__figure blog__figure--full">
                <img src={ManualMode} alt="Photographer shooting in Manual Mode" className="blog__img" />
              </figure>
            </section>

          </div>

          {/* AUTHOR BIO */}
          <div className="blog__author card">
            <div className="blog__author-avatar">
              <span>J</span>
            </div>
            <div className="blog__author-info">
              <p className="blog__author-label">Written by</p>
              <p className="blog__author-name">Jim</p>
              <p className="blog__author-bio">
                Photographer and developer passionate about sharing techniques
                that make complex ideas approachable.
              </p>
            </div>
          </div>

          {/* SHARE */}
          <BlogShareButtons title="Understanding M Mode" />

          {/* PREV / NEXT */}
          <BlogPrevNext currentSlug="m-mode" />

          {/* BOTTOM BACK NAV */}
          <div className="blog__back-wrapper blog__back-wrapper--bottom">
            <Link to="/blog" className="blog__back-button">
              {"<- Back to Blog"}
            </Link>
          </div>

        </div>
      </main>

      <ScrollUp />
      <Footer />
    </>
  );
};

export default MMode;
