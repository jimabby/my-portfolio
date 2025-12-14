import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const FirstPost = () => {
  return (
    <>
      <Header />

      <main className="blog blog--single section" id="first-post">
        <div className="blog__container container">

          {/* Back button */}
          <div className="blog__back-wrapper">
            <Link to="/blog" className="button button--flex blog__back-button">
              ← Back to Blog
            </Link>
          </div>

          {/* HERO */}
          <header className="blog__hero card">
            <span className="blog__badge">Camera Basics</span>

            <h1 className="section__title blog__post-title">
              Understanding M Mode
            </h1>

            <p className="blog__hero-text">
              Manual Mode (<strong>M Mode</strong>) gives you full control of
              your camera. Instead of letting the camera choose settings, you
              decide how the image should look.
            </p>

            <p className="blog__hero-text">
              In this guide, you’ll learn how shutter speed, aperture, and ISO
              work together, with simple examples you can try immediately.
            </p>

            <div className="blog__image-placeholder blog__image-placeholder--hero">
              <span>Hero image: Camera in M Mode</span>
            </div>
          </header>

          <span className="section__subtitle blog__post-subtitle">
            A simple, practical guide to Manual Photography
          </span>

          {/* CONTENT */}
          <div className="blog__content">

            {/* STEP 1 */}
            <section className="blog__section card">
              <h2 className="blog__heading">🔧 Step 1 — Switch to M Mode</h2>

              <div className="blog__image-placeholder blog__image-placeholder--small">
                <span>Image: Camera dial on “M”</span>
              </div>

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
                  Don’t worry if it feels confusing at first. The goal is to
                  learn how each setting changes your photo.
                </p>
              </div>
            </section>

            {/* STEP 2 */}
            <section className="blog__section card">
              <h2 className="blog__heading">
                🎛️ Step 2 — The Three Settings Explained
              </h2>

              {/* Shutter */}
              <div className="blog__info-block">
                <div className="blog__image-placeholder blog__image-placeholder--icon">
                  <span>Diagram: Shutter Speed</span>
                </div>

                <h3>1️⃣ Shutter Speed — Motion</h3>

                <ul className="blog__list">
                  <li>Fast shutter (1/1000s): freezes action</li>
                  <li>Slow shutter (1/10s): adds motion blur</li>
                  <li>Very slow shutter: requires tripod</li>
                </ul>
              </div>

              {/* Aperture */}
              <div className="blog__info-block">
                <div className="blog__image-placeholder blog__image-placeholder--icon">
                  <span>Diagram: Aperture</span>
                </div>

                <h3>2️⃣ Aperture — Depth of Field</h3>

                <ul className="blog__list">
                  <li>Wide aperture (f/1.8): blurry background</li>
                  <li>Narrow aperture (f/8–f/16): more in focus</li>
                  <li>Common for portraits: f/1.8–f/2.8</li>
                </ul>
              </div>

              {/* ISO */}
              <div className="blog__info-block">
                <div className="blog__image-placeholder blog__image-placeholder--icon">
                  <span>Diagram: ISO</span>
                </div>

                <h3>3️⃣ ISO — Brightness & Noise</h3>

                <ul className="blog__list">
                  <li>Low ISO (100–400): clean image</li>
                  <li>High ISO (1600+): brighter but grainy</li>
                  <li>Use ISO last, after setting shutter/aperture</li>
                </ul>
              </div>
            </section>

            {/* HOW THEY WORK TOGETHER */}
            <section className="blog__section card">
              <h2 className="blog__heading">🌈 How They Work Together</h2>

              <div className="blog__image-placeholder blog__image-placeholder--triangle">
                <span>Exposure Triangle Diagram</span>
              </div>

              <ul className="blog__list">
                <li><strong>Shutter</strong> → controls motion</li>
                <li><strong>Aperture</strong> → controls background blur</li>
                <li><strong>ISO</strong> → controls brightness</li>
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
            <section className="blog__section card">
              <h2 className="blog__heading">📷 Example Settings to Try</h2>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>Portrait:</strong> 1/125s, f/2.8, ISO 100–400
                </li>
                <li>
                  <strong>Indoor:</strong> 1/60s, f/2.0, ISO 800–1600
                </li>
                <li>
                  <strong>Sports:</strong> 1/1000s, f/4, ISO 400–800
                </li>
                <li>
                  <strong>Night city (tripod):</strong> 1–5s, f/8, ISO 100
                </li>
              </ul>

              <div className="blog__examples-images">
                <div className="blog__image-placeholder blog__image-placeholder--stacked">
                  <span>Portrait example</span>
                </div>
                <div className="blog__image-placeholder blog__image-placeholder--stacked">
                  <span>Long-exposure night shot</span>
                </div>
              </div>
            </section>

            {/* FINAL TIPS */}
            <section className="blog__section card">
              <h2 className="blog__heading">🎯 Final Tips</h2>

              <ul className="blog__list">
                <li>Start with Aperture Priority (A/Av) if M Mode feels too hard.</li>
                <li>Watch your light meter for guidance.</li>
                <li>Take 2–3 test shots whenever lighting changes.</li>
                <li>Mistakes are the best teacher — keep experimenting.</li>
              </ul>

              <div className="blog__image-placeholder blog__image-placeholder--wide">
                <span>Image: Photographer shooting in Manual Mode</span>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FirstPost;
