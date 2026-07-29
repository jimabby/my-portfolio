import Header from "../header/Header";
import Footer from "../footer/Footer";
import BlogProgressBar from "./BlogProgressBar";
import BlogShareButtons from "./BlogShareButtons";
import BlogPrevNext from "./BlogPrevNext";
import BlogSEO from "./BlogSEO";
import ScrollUp from "../scrollup/ScrollUp";
import { useLanguage } from "../../i18n/LanguageContext";
// Pulls the article prose into this chunk instead of the entry bundle.
import "../../i18n/posts/register";
import "./blog.css";
import LocaleLink from "../../i18n/LocaleLink";

const Hiro = () => {
  const { t } = useLanguage();
  return (
    <>
      <BlogSEO
        title="Hiro - The AI Job Application Agent"
        description="Hiro scrapes Seek, Indeed, and LinkedIn on a schedule, scores every job against your resume, tailors your application, and submits - all while you sleep."
        ogImage="hiro.webp"
        slug="hiro"
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
              <span className="blog__badge">{t('posts.hiro.badge')}</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">{t('posts.hiro.date')}</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">{t('posts.hiro.readTime')}</span>
            </div>

            <h1 className="blog__post-title">
              {t('posts.hiro.title')}
            </h1>

            <p className="blog__hero-text">
              {t('posts.hiro.heroPara1Pre')}
              <strong>Hiro</strong>{t('posts.hiro.heroPara1Post')}
            </p>

            <p className="blog__hero-text">
              {t('posts.hiro.heroPara2')}
            </p>
          </header>

          {/* TABLE OF CONTENTS */}
          <nav className="blog__toc card">
            <h2 className="blog__toc-title">{t('blog.inThisArticle')}</h2>
            <ol className="blog__toc-list">
              <li><a href="#problem">{t('posts.hiro.tocProblem')}</a></li>
              <li><a href="#scraping">{t('posts.hiro.tocScraping')}</a></li>
              <li><a href="#ai-scoring">{t('posts.hiro.tocAiScoring')}</a></li>
              <li><a href="#tailoring">{t('posts.hiro.tocTailoring')}</a></li>
              <li><a href="#auto-apply">{t('posts.hiro.tocAutoApply')}</a></li>
              <li><a href="#dashboard">{t('posts.hiro.tocDashboard')}</a></li>
              <li><a href="#job-detail">{t('posts.hiro.tocJobDetail')}</a></li>
              <li><a href="#analytics">{t('posts.hiro.tocAnalytics')}</a></li>
              <li><a href="#scheduling">{t('posts.hiro.tocScheduling')}</a></li>
              <li><a href="#try-it">{t('posts.hiro.tocTryIt')}</a></li>
            </ol>
          </nav>

          {/* CONTENT */}
          <div className="blog__content">

            {/* THE PROBLEM */}
            <section className="blog__section card" id="problem">
              <h2 className="blog__heading">{t('posts.hiro.problemHeading')}</h2>

              <p>
                {t('posts.hiro.problemPara1')}
              </p>

              <p>
                {t('posts.hiro.problemPara2')}
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.hiro.problemTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.hiro.problemTipText')}
                </p>
              </div>
            </section>

            {/* SCRAPING */}
            <section className="blog__section card" id="scraping">
              <h2 className="blog__heading">{t('posts.hiro.scrapingHeading')}</h2>

              <p>
                {t('posts.hiro.scrapingPara1')}
              </p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>{t('posts.hiro.scrapingSeekLabel')}</strong>{t('posts.hiro.scrapingSeekDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.scrapingIndeedLabel')}</strong>{t('posts.hiro.scrapingIndeedDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.scrapingLinkedInLabel')}</strong>{t('posts.hiro.scrapingLinkedInDesc')}
                </li>
              </ul>

              <p>
                {t('posts.hiro.scrapingPara2')}
              </p>
            </section>

            {/* AI SCORING */}
            <section className="blog__section card" id="ai-scoring">
              <h2 className="blog__heading">{t('posts.hiro.aiScoringHeading')}</h2>

              <p>
                {t('posts.hiro.aiScoringPara1')}
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.aiScoringSubheading')}</h3>
                <ul className="blog__list">
                  <li>{t('posts.hiro.aiScoringItem1')}</li>
                  <li>{t('posts.hiro.aiScoringItem2')}</li>
                  <li>{t('posts.hiro.aiScoringItem3')}</li>
                  <li>{t('posts.hiro.aiScoringItem4')}</li>
                </ul>
              </div>

              <p>
                {t('posts.hiro.aiScoringPara2')}
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.hiro.aiScoringTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.hiro.aiScoringTipText')}
                </p>
              </div>
            </section>

            {/* TAILORING */}
            <section className="blog__section card" id="tailoring">
              <h2 className="blog__heading">{t('posts.hiro.tailoringHeading')}</h2>

              <p>
                {t('posts.hiro.tailoringPara1')}
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.tailoringResumeSubheading')}</h3>
                <p>
                  {t('posts.hiro.tailoringResumePara')}
                </p>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.tailoringCoverSubheading')}</h3>
                <p>
                  {t('posts.hiro.tailoringCoverPara')}
                </p>
                <ul className="blog__list">
                  <li><strong>{t('posts.hiro.tailoringToneProfLabel')}</strong>{t('posts.hiro.tailoringToneProfDesc')}</li>
                  <li><strong>{t('posts.hiro.tailoringToneCasualLabel')}</strong>{t('posts.hiro.tailoringToneCasualDesc')}</li>
                  <li><strong>{t('posts.hiro.tailoringToneConfidentLabel')}</strong>{t('posts.hiro.tailoringToneConfidentDesc')}</li>
                </ul>
                <p>
                  {t('posts.hiro.tailoringCoverPara2')}
                </p>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.tailoringScreeningSubheading')}</h3>
                <p>
                  {t('posts.hiro.tailoringScreeningPara')}
                </p>
              </div>
            </section>

            {/* AUTO-APPLY */}
            <section className="blog__section card" id="auto-apply">
              <h2 className="blog__heading">{t('posts.hiro.autoApplyHeading')}</h2>

              <p>
                {t('posts.hiro.autoApplyPara1')}
              </p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>{t('posts.hiro.autoApplySeekLabel')}</strong>{t('posts.hiro.autoApplySeekDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.autoApplyLinkedInLabel')}</strong>{t('posts.hiro.autoApplyLinkedInDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.autoApplyIndeedLabel')}</strong>{t('posts.hiro.autoApplyIndeedDesc')}
                </li>
              </ul>

              <p>
                {t('posts.hiro.autoApplyPara2')}
              </p>
            </section>

            {/* DASHBOARD */}
            <section className="blog__section card" id="dashboard">
              <h2 className="blog__heading">{t('posts.hiro.dashboardHeading')}</h2>

              <p>
                {t('posts.hiro.dashboardPara1')}
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.dashboardStatsSubheading')}</h3>
                <p>
                  {t('posts.hiro.dashboardStatsPara')}
                </p>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.dashboardTableSubheading')}</h3>
                <ul className="blog__list">
                  <li>{t('posts.hiro.dashboardTableItem1')}</li>
                  <li>{t('posts.hiro.dashboardTableItem2')}</li>
                  <li>{t('posts.hiro.dashboardTableItem3Pre')}<kbd>/</kbd>{t('posts.hiro.dashboardTableItem3Post')}</li>
                  <li>
                    <kbd>Up</kbd> / <kbd>Down</kbd>{t('posts.hiro.dashboardTableItem4Post')}
                  </li>
                  <li><kbd>Escape</kbd>{t('posts.hiro.dashboardTableItem5Post')}</li>
                  <li>{t('posts.hiro.dashboardTableItem6')}</li>
                  <li>{t('posts.hiro.dashboardTableItem7')}</li>
                </ul>
              </div>
            </section>

            {/* JOB DETAIL PANEL */}
            <section className="blog__section card" id="job-detail">
              <h2 className="blog__heading">{t('posts.hiro.jobDetailHeading')}</h2>

              <p>
                {t('posts.hiro.jobDetailPara1')}
              </p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>{t('posts.hiro.jobDetailMatchLabel')}</strong>{t('posts.hiro.jobDetailMatchDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.jobDetailKeywordLabel')}</strong>{t('posts.hiro.jobDetailKeywordDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.jobDetailInterviewLabel')}</strong>{t('posts.hiro.jobDetailInterviewDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.jobDetailResumeLabel')}</strong>{t('posts.hiro.jobDetailResumeDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.jobDetailScreeningLabel')}</strong>{t('posts.hiro.jobDetailScreeningDesc')}
                </li>
                <li>
                  <strong>{t('posts.hiro.jobDetailBlacklistLabel')}</strong>{t('posts.hiro.jobDetailBlacklistDesc')}
                </li>
              </ul>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.hiro.jobDetailTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.hiro.jobDetailTipText')}
                </p>
              </div>
            </section>

            {/* ANALYTICS */}
            <section className="blog__section card" id="analytics">
              <h2 className="blog__heading">{t('posts.hiro.analyticsHeading')}</h2>

              <p>
                {t('posts.hiro.analyticsPara1')}
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.analyticsPageSubheading')}</h3>
                <ul className="blog__list">
                  <li>{t('posts.hiro.analyticsItem1')}</li>
                  <li>{t('posts.hiro.analyticsItem2')}</li>
                  <li>{t('posts.hiro.analyticsItem3')}</li>
                  <li>{t('posts.hiro.analyticsItem4')}</li>
                </ul>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.analyticsTimelineSubheading')}</h3>
                <p>
                  {t('posts.hiro.analyticsTimelinePara')}
                </p>
              </div>
            </section>

            {/* SCHEDULING */}
            <section className="blog__section card" id="scheduling">
              <h2 className="blog__heading">{t('posts.hiro.schedulingHeading')}</h2>

              <p>
                {t('posts.hiro.schedulingPara1')}
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.schedulingFollowupSubheading')}</h3>
                <p>
                  {t('posts.hiro.schedulingFollowupPara')}
                </p>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hiro.schedulingReportSubheading')}</h3>
                <p>
                  {t('posts.hiro.schedulingReportPara')}
                </p>
              </div>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.hiro.schedulingTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.hiro.schedulingTipText')}
                </p>
              </div>
            </section>

            {/* TRY IT */}
            <section className="blog__section card" id="try-it">
              <h2 className="blog__heading">{t('posts.hiro.tryItHeading')}</h2>

              <p>
                {t('posts.hiro.tryItPara1')}
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.hiro.tryItTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.hiro.tryItTipText')}
                </p>
              </div>
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
          <BlogShareButtons title="Hiro - The AI Job Application Agent" />

          {/* PREV / NEXT */}
          <BlogPrevNext currentSlug="hiro" />

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

export default Hiro;
