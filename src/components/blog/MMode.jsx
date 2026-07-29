import Header from "../header/Header";
import Footer from "../footer/Footer";
import BlogProgressBar from "./BlogProgressBar";
import BlogShareButtons from "./BlogShareButtons";
import BlogPrevNext from "./BlogPrevNext";
import BlogSEO from "./BlogSEO";
import ScrollUp from "../scrollup/ScrollUp";
import { useLanguage } from '../../i18n/LanguageContext';
// Pulls the article prose into this chunk instead of the entry bundle.
import '../../i18n/posts/register';
import heroImage from '../../assets/m-mode/Nikon-Z8-m-mode.webp'
import Mmode from "../../assets/m-mode/m-mode.webp"
import ShuuterSpeed from "../../assets/m-mode/shutter-speed.webp"
import Apertune from "../../assets/m-mode/apertune.webp"
import ISO from "../../assets/m-mode/iso.webp"
import exposureTriangle from "../../assets/m-mode/exposure-triangle.webp"
import Portrait from "../../assets/m-mode/portrait.webp"
import longExposure from "../../assets/m-mode/long-exposure.webp"
import ManualMode from "../../assets/m-mode/manual-mode.webp"
import "./blog.css";
import Img from '../image/Img';
import LocaleLink from "../../i18n/LocaleLink";

const MMode = () => {
  const { t } = useLanguage();
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

      <main className="blog blog--single section" id="main-content">
        <div className="blog__container container">

          {/* Back button */}
          <div className="blog__back-wrapper">
            <LocaleLink to="/blog" className="blog__back-button">
              {t('blog.backToBlog')}
            </LocaleLink>
          </div>

          {/* HERO */}
          <header className="blog__hero card">
            <div className="blog__post-meta">
              <span className="blog__badge">{t('posts.mMode.badge')}</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">{t('posts.mMode.date')}</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">{t('posts.mMode.readTime')}</span>
            </div>

            <h1 className="blog__post-title">
              {t('posts.mMode.title')}
            </h1>

            <p className="blog__hero-text">
              {t('posts.mMode.heroText1Pre')}<strong>{t('posts.mMode.heroText1Strong')}</strong>{t('posts.mMode.heroText1Post')}
            </p>

            <p className="blog__hero-text">
              {t('posts.mMode.heroText2')}
            </p>

            <figure className="blog__figure blog__figure--hero">
              <Img src={heroImage} alt={t('posts.mMode.heroImageAlt')} className="blog__img" fetchPriority="high" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
            </figure>
          </header>

          {/* TABLE OF CONTENTS */}
          <nav className="blog__toc card">
            <h2 className="blog__toc-title">{t('blog.inThisArticle')}</h2>
            <ol className="blog__toc-list">
              <li><a href="#step-1">{t('posts.mMode.toc1')}</a></li>
              <li><a href="#step-2">{t('posts.mMode.toc2')}</a></li>
              <li><a href="#work-together">{t('posts.mMode.toc3')}</a></li>
              <li><a href="#examples">{t('posts.mMode.toc4')}</a></li>
              <li><a href="#final-tips">{t('posts.mMode.toc5')}</a></li>
            </ol>
          </nav>

          {/* CONTENT */}
          <div className="blog__content">

            {/* STEP 1 */}
            <section className="blog__section card" id="step-1">
              <h2 className="blog__heading">{t('posts.mMode.step1Heading')}</h2>

              <figure className="blog__figure blog__figure--aside">
                <Img src={Mmode} alt={t('posts.mMode.step1DialAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.mMode.step1DialCaption')}</figcaption>
              </figure>

              <p>
                {t('posts.mMode.step1Para1Pre')}<strong>{t('posts.mMode.step1Para1Strong')}</strong>{t('posts.mMode.step1Para1Post')}
              </p>

              <p>{t('posts.mMode.step1Para2')}</p>

              <ul className="blog__list">
                <li>{t('posts.mMode.step1Item1')}</li>
                <li>{t('posts.mMode.step1Item2')}</li>
                <li>{t('posts.mMode.step1Item3')}</li>
              </ul>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.mMode.step1TipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.mMode.step1TipText')}
                </p>
              </div>
            </section>

            {/* STEP 2 */}
            <section className="blog__section card" id="step-2">
              <h2 className="blog__heading">
                {t('posts.mMode.step2Heading')}
              </h2>

              {/* Shutter */}
              <div className="blog__info-block">
                <figure className="blog__figure blog__figure--diagram">
                  <Img src={ShuuterSpeed} alt={t('posts.mMode.shutterAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                  <figcaption className="blog__caption">{t('posts.mMode.shutterCaption')}</figcaption>
                </figure>

                <h3 className="blog__subheading">{t('posts.mMode.shutterSubheading')}</h3>

                <ul className="blog__list">
                  <li>{t('posts.mMode.shutterItem1')}</li>
                  <li>{t('posts.mMode.shutterItem2')}</li>
                  <li>{t('posts.mMode.shutterItem3')}</li>
                </ul>
              </div>

              {/* Aperture */}
              <div className="blog__info-block">
                <figure className="blog__figure blog__figure--diagram">
                  <Img src={Apertune} alt={t('posts.mMode.apertureAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                  <figcaption className="blog__caption">{t('posts.mMode.apertureCaption')}</figcaption>
                </figure>

                <h3 className="blog__subheading">{t('posts.mMode.apertureSubheading')}</h3>

                <ul className="blog__list">
                  <li>{t('posts.mMode.apertureItem1')}</li>
                  <li>{t('posts.mMode.apertureItem2')}</li>
                  <li>{t('posts.mMode.apertureItem3')}</li>
                </ul>
              </div>

              {/* ISO */}
              <div className="blog__info-block">
                <figure className="blog__figure blog__figure--diagram">
                  <Img src={ISO} alt={t('posts.mMode.isoAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                  <figcaption className="blog__caption">{t('posts.mMode.isoCaption')}</figcaption>
                </figure>

                <h3 className="blog__subheading">{t('posts.mMode.isoSubheading')}</h3>

                <ul className="blog__list">
                  <li>{t('posts.mMode.isoItem1')}</li>
                  <li>{t('posts.mMode.isoItem2')}</li>
                  <li>{t('posts.mMode.isoItem3')}</li>
                </ul>
              </div>
            </section>

            {/* HOW THEY WORK TOGETHER */}
            <section className="blog__section card" id="work-together">
              <h2 className="blog__heading">{t('posts.mMode.workHeading')}</h2>

              <figure className="blog__figure blog__figure--full">
                <Img src={exposureTriangle} alt={t('posts.mMode.workTriangleAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.mMode.workTriangleCaption')}</figcaption>
              </figure>

              <ul className="blog__list">
                <li><strong>{t('posts.mMode.workItem1Label')}</strong>{t('posts.mMode.workItem1Desc')}</li>
                <li><strong>{t('posts.mMode.workItem2Label')}</strong>{t('posts.mMode.workItem2Desc')}</li>
                <li><strong>{t('posts.mMode.workItem3Label')}</strong>{t('posts.mMode.workItem3Desc')}</li>
              </ul>

              <p>{t('posts.mMode.workBrightenIntro')}</p>

              <ul className="blog__list">
                <li>{t('posts.mMode.workBrightenItem1')}</li>
                <li>{t('posts.mMode.workBrightenItem2')}</li>
                <li>{t('posts.mMode.workBrightenItem3')}</li>
              </ul>

              <p>{t('posts.mMode.workReduce')}</p>
            </section>

            {/* EXAMPLES */}
            <section className="blog__section card" id="examples">
              <h2 className="blog__heading">{t('posts.mMode.examplesHeading')}</h2>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>{t('posts.mMode.examplePortraitLabel')}</strong>{t('posts.mMode.examplePortraitDesc')}
                </li>
                <li>
                  <strong>{t('posts.mMode.exampleIndoorLabel')}</strong>{t('posts.mMode.exampleIndoorDesc')}
                </li>
                <li>
                  <strong>{t('posts.mMode.exampleSportsLabel')}</strong>{t('posts.mMode.exampleSportsDesc')}
                </li>
                <li>
                  <strong>{t('posts.mMode.exampleNightLabel')}</strong>{t('posts.mMode.exampleNightDesc')}
                </li>
              </ul>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <Img src={Portrait} alt={t('posts.mMode.examplePortraitAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async"  sizes="(max-width: 768px) 100vw, 360px"/>
                  <figcaption className="blog__caption">{t('posts.mMode.examplePortraitCaption')}</figcaption>
                </figure>
                <figure className="blog__figure">
                  <Img src={longExposure} alt={t('posts.mMode.exampleLongExpAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async"  sizes="(max-width: 768px) 100vw, 360px"/>
                  <figcaption className="blog__caption">{t('posts.mMode.exampleLongExpCaption')}</figcaption>
                </figure>
              </div>
            </section>

            {/* FINAL TIPS */}
            <section className="blog__section card" id="final-tips">
              <h2 className="blog__heading">{t('posts.mMode.finalHeading')}</h2>

              <ul className="blog__list">
                <li>{t('posts.mMode.finalItem1')}</li>
                <li>{t('posts.mMode.finalItem2')}</li>
                <li>{t('posts.mMode.finalItem3')}</li>
                <li>{t('posts.mMode.finalItem4')}</li>
              </ul>

              <figure className="blog__figure blog__figure--full">
                <Img src={ManualMode} alt={t('posts.mMode.finalImageAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
              </figure>
            </section>

          </div>

          {/* AUTHOR BIO */}
          <div className="blog__author card">
            <div className="blog__author-avatar">
              <span>J</span>
            </div>
            <div className="blog__author-info">
              <p className="blog__author-label">{t('blog.writtenBy')}</p>
              <p className="blog__author-name">{t('blog.authorName')}</p>
              <p className="blog__author-bio">
                {t('blog.authorBio')}
              </p>
            </div>
          </div>

          {/* SHARE */}
          <BlogShareButtons title="Understanding M Mode" />

          {/* PREV / NEXT */}
          <BlogPrevNext currentSlug="m-mode" />

          {/* BOTTOM BACK NAV */}
          <div className="blog__back-wrapper blog__back-wrapper--bottom">
            <LocaleLink to="/blog" className="blog__back-button">
              {t('blog.backToBlog')}
            </LocaleLink>
          </div>

        </div>
      </main>

      <ScrollUp />
      <Footer />
    </>
  );
};

export default MMode;
