import Header from "../header/Header";
import Footer from "../footer/Footer";
import BlogProgressBar from "./BlogProgressBar";
import ShareButtons from "../share/ShareButtons";
import BlogPrevNext from "./BlogPrevNext";
import BlogSEO from "./BlogSEO";
import ScrollUp from "../scrollup/ScrollUp";
import { useLanguage } from "../../i18n/LanguageContext";
// Pulls the article prose into this chunk instead of the entry bundle.
import "../../i18n/posts/register";
import "./blog.css";

// The before/after pairs pull from both asset folders on purpose: the old site
// is the argument for the new one, so the two are always shown together.
import oldHome from "../../assets/housed/housed-home.webp";
import oldServices from "../../assets/housed/housed-services.webp";
import oldBlog from "../../assets/housed/housed-blog.webp";
import newHome from "../../assets/housed-redesign/housed-redesign-home.webp";
import newSpaces from "../../assets/housed-redesign/housed-redesign-spaces.webp";
import newGoals from "../../assets/housed-redesign/housed-redesign-goals.webp";
import newPersonalTraining from "../../assets/housed-redesign/housed-redesign-personal-training.webp";
import newStudio from "../../assets/housed-redesign/housed-redesign-studio.webp";
import newGetStarted from "../../assets/housed-redesign/housed-redesign-get-started.webp";
import newWellness from "../../assets/housed-redesign/housed-redesign-wellness.webp";
import newMemberships from "../../assets/housed-redesign/housed-redesign-memberships.webp";
import newFreePass from "../../assets/housed-redesign/housed-redesign-free-pass.webp";
import newTimetable from "../../assets/housed-redesign/housed-redesign-timetable.webp";
import newApp from "../../assets/housed-redesign/housed-redesign-app.webp";
import newMemberPortal from "../../assets/housed-redesign/housed-redesign-member-portal.webp";
import newJournal from "../../assets/housed-redesign/housed-redesign-journal.webp";
import newArticle from "../../assets/housed-redesign/housed-redesign-article.webp";
import Img from '../image/Img';
import LocaleLink from "../../i18n/LocaleLink";

const TITLE = 'Rebuilding Housed - From Brochure Site to Booking Platform';
const DESCRIPTION =
  'How the Housed website moved from a nine-page brochure to a club-by-club platform: auditing the old site, rebuilding the information architecture, and cutting over without losing the URLs.';

const HousedRedesign = () => {
  const { t } = useLanguage();

  return (
    <>
      <BlogSEO
        title={TITLE}
        description={DESCRIPTION}
        ogImage="housed-redesign.jpg"
        slug="housed-redesign"
      />
      <Header />
      <BlogProgressBar />

      <main className="blog blog--single section" id="main-content">
        <div className="blog__container container">

          <div className="blog__back-wrapper">
            <LocaleLink to="/blog" className="blog__back-button">
              {t('blog.backToBlog')}
            </LocaleLink>
          </div>

          {/* HERO */}
          <header className="blog__hero card">
            <div className="blog__post-meta">
              <span className="blog__badge">{t('posts.housedRedesign.badge')}</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">{t('posts.housedRedesign.date')}</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">{t('posts.housedRedesign.readTime')}</span>
            </div>

            <h1 className="blog__post-title">
              {t('posts.housedRedesign.title')}
            </h1>

            <p className="blog__hero-text">
              {t('posts.housedRedesign.heroP1')}
            </p>

            <p className="blog__hero-text">
              {t('posts.housedRedesign.heroP2')}
            </p>

            <figure className="blog__figure blog__figure--hero">
              <Img src={newHome} alt={t('posts.housedRedesign.heroImgAlt')} className="blog__img" fetchPriority="high" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
            </figure>
          </header>

          {/* TABLE OF CONTENTS */}
          <nav className="blog__toc card">
            <h2 className="blog__toc-title">{t('blog.inThisArticle')}</h2>
            <ol className="blog__toc-list">
              <li><a href="#why">{t('posts.housedRedesign.tocWhy')}</a></li>
              <li><a href="#audit">{t('posts.housedRedesign.tocAudit')}</a></li>
              <li><a href="#goals">{t('posts.housedRedesign.tocGoals')}</a></li>
              <li><a href="#ia">{t('posts.housedRedesign.tocIa')}</a></li>
              <li><a href="#clubs">{t('posts.housedRedesign.tocClubs')}</a></li>
              <li><a href="#memberships">{t('posts.housedRedesign.tocMemberships')}</a></li>
              <li><a href="#booking">{t('posts.housedRedesign.tocBooking')}</a></li>
              <li><a href="#journal">{t('posts.housedRedesign.tocJournal')}</a></li>
              <li><a href="#migration">{t('posts.housedRedesign.tocMigration')}</a></li>
              <li><a href="#takeaways">{t('posts.housedRedesign.tocTakeaways')}</a></li>
            </ol>
          </nav>

          <div className="blog__content">

            {/* WHY */}
            <section className="blog__section card" id="why">
              <h2 className="blog__heading">{t('posts.housedRedesign.whyHeading')}</h2>

              <p>{t('posts.housedRedesign.whyP1')}</p>
              <p>{t('posts.housedRedesign.whyP2')}</p>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <Img src={oldHome} alt={t('posts.housedRedesign.whyOldImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.whyOldCaption')}</figcaption>
                </figure>
                <figure className="blog__figure">
                  <Img src={newSpaces} alt={t('posts.housedRedesign.whyNewImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.whyNewCaption')}</figcaption>
                </figure>
              </div>
            </section>

            {/* AUDIT */}
            <section className="blog__section card" id="audit">
              <h2 className="blog__heading">{t('posts.housedRedesign.auditHeading')}</h2>

              <p>{t('posts.housedRedesign.auditP1')}</p>
              <p>{t('posts.housedRedesign.auditP2')}</p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>{t('posts.housedRedesign.auditItem1Label')}</strong>{t('posts.housedRedesign.auditItem1Desc')}
                </li>
                <li>
                  <strong>{t('posts.housedRedesign.auditItem2Label')}</strong>{t('posts.housedRedesign.auditItem2Desc')}
                </li>
                <li>
                  <strong>{t('posts.housedRedesign.auditItem3Label')}</strong>{t('posts.housedRedesign.auditItem3Desc')}
                </li>
                <li>
                  <strong>{t('posts.housedRedesign.auditItem4Label')}</strong>{t('posts.housedRedesign.auditItem4Desc')}
                </li>
              </ul>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.housedRedesign.auditTipTitle')}</h3>
                <p className="blog__tip-text">{t('posts.housedRedesign.auditTipText')}</p>
              </div>
            </section>

            {/* GOALS */}
            <section className="blog__section card" id="goals">
              <h2 className="blog__heading">{t('posts.housedRedesign.goalsHeading')}</h2>

              <p>{t('posts.housedRedesign.goalsP1')}</p>

              <ul className="blog__list blog__list--spaced">
                <li>{t('posts.housedRedesign.goalsItem1')}</li>
                <li>{t('posts.housedRedesign.goalsItem2')}</li>
                <li>{t('posts.housedRedesign.goalsItem3')}</li>
                <li>{t('posts.housedRedesign.goalsItem4')}</li>
                <li>{t('posts.housedRedesign.goalsItem5')}</li>
              </ul>

              <p>{t('posts.housedRedesign.goalsP2')}</p>
            </section>

            {/* INFORMATION ARCHITECTURE */}
            <section className="blog__section card" id="ia">
              <h2 className="blog__heading">{t('posts.housedRedesign.iaHeading')}</h2>

              <p>{t('posts.housedRedesign.iaP1')}</p>
              <p>{t('posts.housedRedesign.iaP2')}</p>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <Img src={oldServices} alt={t('posts.housedRedesign.iaOldImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.iaOldCaption')}</figcaption>
                </figure>
                <figure className="blog__figure">
                  <Img src={newGoals} alt={t('posts.housedRedesign.iaNewImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.iaNewCaption')}</figcaption>
                </figure>
              </div>

              <figure className="blog__figure blog__figure--full">
                <Img src={newPersonalTraining} alt={t('posts.housedRedesign.iaPtImgAlt')} className="blog__img" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
                <figcaption className="blog__caption">{t('posts.housedRedesign.iaPtCaption')}</figcaption>
              </figure>
            </section>

            {/* CLUB PAGES */}
            <section className="blog__section card" id="clubs">
              <h2 className="blog__heading">{t('posts.housedRedesign.clubsHeading')}</h2>

              <p>{t('posts.housedRedesign.clubsP1')}</p>

              <figure className="blog__figure blog__figure--full">
                <Img src={newStudio} alt={t('posts.housedRedesign.clubsImgAlt')} className="blog__img" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
                <figcaption className="blog__caption">{t('posts.housedRedesign.clubsCaption')}</figcaption>
              </figure>

              <p>{t('posts.housedRedesign.clubsP2')}</p>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <Img src={newGetStarted} alt={t('posts.housedRedesign.clubsPricingImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.clubsPricingCaption')}</figcaption>
                </figure>
                <figure className="blog__figure">
                  <Img src={newWellness} alt={t('posts.housedRedesign.clubsWellnessImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.clubsWellnessCaption')}</figcaption>
                </figure>
              </div>
            </section>

            {/* MEMBERSHIPS */}
            <section className="blog__section card" id="memberships">
              <h2 className="blog__heading">{t('posts.housedRedesign.membershipsHeading')}</h2>

              <p>{t('posts.housedRedesign.membershipsP1')}</p>

              <figure className="blog__figure blog__figure--full">
                <Img src={newMemberships} alt={t('posts.housedRedesign.membershipsImgAlt')} className="blog__img" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
                <figcaption className="blog__caption">{t('posts.housedRedesign.membershipsCaption')}</figcaption>
              </figure>

              <p>{t('posts.housedRedesign.membershipsP2')}</p>

              <figure className="blog__figure blog__figure--full">
                <Img src={newFreePass} alt={t('posts.housedRedesign.membershipsFreePassImgAlt')} className="blog__img" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
                <figcaption className="blog__caption">{t('posts.housedRedesign.membershipsFreePassCaption')}</figcaption>
              </figure>
            </section>

            {/* BOOKING */}
            <section className="blog__section card" id="booking">
              <h2 className="blog__heading">{t('posts.housedRedesign.bookingHeading')}</h2>

              <p>{t('posts.housedRedesign.bookingP1')}</p>

              <figure className="blog__figure blog__figure--full">
                <Img src={newTimetable} alt={t('posts.housedRedesign.bookingTimetableImgAlt')} className="blog__img" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
                <figcaption className="blog__caption">{t('posts.housedRedesign.bookingTimetableCaption')}</figcaption>
              </figure>

              <p>{t('posts.housedRedesign.bookingP2')}</p>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <Img src={newApp} alt={t('posts.housedRedesign.bookingAppImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.bookingAppCaption')}</figcaption>
                </figure>
                <figure className="blog__figure">
                  <Img src={newMemberPortal} alt={t('posts.housedRedesign.bookingPortalImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.bookingPortalCaption')}</figcaption>
                </figure>
              </div>
            </section>

            {/* CONTENT MIGRATION */}
            <section className="blog__section card" id="journal">
              <h2 className="blog__heading">{t('posts.housedRedesign.journalHeading')}</h2>

              <p>{t('posts.housedRedesign.journalP1')}</p>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <Img src={oldBlog} alt={t('posts.housedRedesign.journalOldImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.journalOldCaption')}</figcaption>
                </figure>
                <figure className="blog__figure">
                  <Img src={newJournal} alt={t('posts.housedRedesign.journalNewImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 360px" />
                  <figcaption className="blog__caption">{t('posts.housedRedesign.journalNewCaption')}</figcaption>
                </figure>
              </div>

              <p>{t('posts.housedRedesign.journalP2')}</p>

              <figure className="blog__figure blog__figure--full">
                <Img src={newArticle} alt={t('posts.housedRedesign.journalArticleImgAlt')} className="blog__img" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
                <figcaption className="blog__caption">{t('posts.housedRedesign.journalArticleCaption')}</figcaption>
              </figure>
            </section>

            {/* CUTOVER */}
            <section className="blog__section card" id="migration">
              <h2 className="blog__heading">{t('posts.housedRedesign.migrationHeading')}</h2>

              <p>{t('posts.housedRedesign.migrationP1')}</p>
              <p>{t('posts.housedRedesign.migrationP2')}</p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>{t('posts.housedRedesign.migrationStep1Label')}</strong>{t('posts.housedRedesign.migrationStep1Desc')}
                </li>
                <li>
                  <strong>{t('posts.housedRedesign.migrationStep2Label')}</strong>{t('posts.housedRedesign.migrationStep2Desc')}
                </li>
                <li>
                  <strong>{t('posts.housedRedesign.migrationStep3Label')}</strong>{t('posts.housedRedesign.migrationStep3Desc')}
                </li>
                <li>
                  <strong>{t('posts.housedRedesign.migrationStep4Label')}</strong>{t('posts.housedRedesign.migrationStep4Desc')}
                </li>
                <li>
                  <strong>{t('posts.housedRedesign.migrationStep5Label')}</strong>{t('posts.housedRedesign.migrationStep5Desc')}
                </li>
                <li>
                  <strong>{t('posts.housedRedesign.migrationStep6Label')}</strong>{t('posts.housedRedesign.migrationStep6Desc')}
                </li>
              </ul>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.housedRedesign.migrationTipTitle')}</h3>
                <p className="blog__tip-text">{t('posts.housedRedesign.migrationTipText')}</p>
              </div>
            </section>

            {/* TAKEAWAYS */}
            <section className="blog__section card" id="takeaways">
              <h2 className="blog__heading">{t('posts.housedRedesign.takeawaysHeading')}</h2>

              <p>{t('posts.housedRedesign.takeawaysP1')}</p>

              <ul className="blog__list blog__list--spaced">
                <li>{t('posts.housedRedesign.takeawaysItem1')}</li>
                <li>{t('posts.housedRedesign.takeawaysItem2')}</li>
                <li>{t('posts.housedRedesign.takeawaysItem3')}</li>
                <li>{t('posts.housedRedesign.takeawaysItem4')}</li>
              </ul>

              <p>{t('posts.housedRedesign.takeawaysP2')}</p>
            </section>
          </div>

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

          <ShareButtons title={TITLE} />

          <BlogPrevNext currentSlug="housed-redesign" />

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

export default HousedRedesign;
