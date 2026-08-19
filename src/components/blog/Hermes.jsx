import Header from "../header/Header";
import Footer from "../footer/Footer";
import BlogProgressBar from "./BlogProgressBar";
import ShareButtons from "../share/ShareButtons";
import BlogPrevNext from "./BlogPrevNext";
import BlogSEO from "./BlogSEO";
import ScrollUp from "../scrollup/ScrollUp";
import { useLanguage } from '../../i18n/LanguageContext';
// Pulls the article prose into this chunk instead of the entry bundle.
import '../../i18n/posts/register';
import "./blog.css";

import overviewImg    from '../../assets/hermes/Hermes_overview.webp';
import aiSummaryImg   from '../../assets/hermes/Hermes_ai-summary.webp';
import aiPanelImg     from '../../assets/hermes/Hermes_ai-panel.webp';
import aiAssistantImg from '../../assets/hermes/Hermes_ai-assistant.webp';
import categoryImg    from '../../assets/hermes/Hermes_ai-category.webp';
import accountsImg    from '../../assets/hermes/Hermes_accounts.webp';
import Img from '../image/Img';
import LocaleLink from "../../i18n/LocaleLink";

const Hermes = () => {
  const { t } = useLanguage();
  return (
    <>
      <BlogSEO
        title="Hermes - An AI-Powered Email Client"
        description="A full-featured email client with Claude AI built in. Connect Gmail, Outlook, or any IMAP account and use 9 AI writing modes to compose better emails."
        ogImage="hermes.webp"
        slug="hermes"
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
              <span className="blog__badge">{t('posts.hermes.badge')}</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">{t('posts.hermes.date')}</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">{t('posts.hermes.readTime')}</span>
            </div>

            <h1 className="blog__post-title">
              {t('posts.hermes.title')}
            </h1>

            <p className="blog__hero-text">
              {t('posts.hermes.heroP1Pre')}<strong>{t('posts.hermes.heroP1Strong')}</strong>{t('posts.hermes.heroP1Post')}
            </p>

            <p className="blog__hero-text">
              {t('posts.hermes.heroP2')}
            </p>

            <figure className="blog__figure blog__figure--hero">
              <Img src={overviewImg} alt="Hermes app overview showing the inbox" className="blog__img" fetchPriority="high" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
            </figure>
          </header>

          {/* TABLE OF CONTENTS */}
          <nav className="blog__toc card">
            <h2 className="blog__toc-title">{t('blog.inThisArticle')}</h2>
            <ol className="blog__toc-list">
              <li><a href="#multi-account">{t('posts.hermes.tocMultiAccount')}</a></li>
              <li><a href="#email-client">{t('posts.hermes.tocEmailClient')}</a></li>
              <li><a href="#ai-summary">{t('posts.hermes.tocAiSummary')}</a></li>
              <li><a href="#ai-assist">{t('posts.hermes.tocAiAssist')}</a></li>
              <li><a href="#ai-assistant">{t('posts.hermes.tocAiAssistant')}</a></li>
              <li><a href="#smart-category">{t('posts.hermes.tocSmartCategory')}</a></li>
              <li><a href="#desktop">{t('posts.hermes.tocDesktop')}</a></li>
              <li><a href="#try-it">{t('posts.hermes.tocTryIt')}</a></li>
            </ol>
          </nav>

          {/* CONTENT */}
          <div className="blog__content">

            {/* MULTI-ACCOUNT & AI PROVIDER */}
            <section className="blog__section card" id="multi-account">
              <h2 className="blog__heading">{t('posts.hermes.multiAccountHeading')}</h2>

              <p>
                {t('posts.hermes.multiAccountP1')}
              </p>

              <ul className="blog__list">
                <li><strong>{t('posts.hermes.multiAccountItem1Label')}</strong> - {t('posts.hermes.multiAccountItem1Desc')}</li>
                <li><strong>{t('posts.hermes.multiAccountItem2Label')}</strong> - {t('posts.hermes.multiAccountItem2Desc')}</li>
                <li><strong>{t('posts.hermes.multiAccountItem3Label')}</strong> - {t('posts.hermes.multiAccountItem3Desc')}</li>
              </ul>

              <p>
                {t('posts.hermes.multiAccountP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={accountsImg} alt="Hermes account settings showing multiple email accounts and AI provider selection" className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.hermes.multiAccountCaption')}</figcaption>
              </figure>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.hermes.multiAccountTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.hermes.multiAccountTipText')}
                </p>
              </div>
            </section>

            {/* FULL EMAIL CLIENT */}
            <section className="blog__section card" id="email-client">
              <h2 className="blog__heading">{t('posts.hermes.emailClientHeading')}</h2>

              <p>
                {t('posts.hermes.emailClientP1')}
              </p>

              <ul className="blog__list">
                <li><strong>{t('posts.hermes.emailClientItem1Label')}</strong> - {t('posts.hermes.emailClientItem1Desc')}</li>
                <li><strong>{t('posts.hermes.emailClientItem2Label')}</strong> - {t('posts.hermes.emailClientItem2Desc')}</li>
                <li><strong>{t('posts.hermes.emailClientItem3Label')}</strong> - {t('posts.hermes.emailClientItem3Desc')}</li>
                <li><strong>{t('posts.hermes.emailClientItem4Label')}</strong> - {t('posts.hermes.emailClientItem4Desc')}</li>
              </ul>

              <p>
                {t('posts.hermes.emailClientP2')}
              </p>

            </section>

            {/* AI EMAIL SUMMARY */}
            <section className="blog__section card" id="ai-summary">
              <h2 className="blog__heading">{t('posts.hermes.aiSummaryHeading')}</h2>

              <p>
                {t('posts.hermes.aiSummaryP1')}
              </p>

              <p>
                {t('posts.hermes.aiSummaryP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={aiSummaryImg} alt="Hermes AI email summary" className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.hermes.aiSummaryCaption')}</figcaption>
              </figure>
            </section>

            {/* AI ASSIST */}
            <section className="blog__section card" id="ai-assist">
              <h2 className="blog__heading">{t('posts.hermes.aiAssistHeading')}</h2>

              <p>
                {t('posts.hermes.aiAssistP1')}
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hermes.aiAssistGroup1Heading')}</h3>
                <ul className="blog__list">
                  <li>
                    <strong>{t('posts.hermes.aiAssistImproveLabel')}</strong> - {t('posts.hermes.aiAssistImproveDesc')}
                  </li>
                  <li>
                    <strong>{t('posts.hermes.aiAssistConciseLabel')}</strong> - {t('posts.hermes.aiAssistConciseDesc')}
                  </li>
                  <li>
                    <strong>{t('posts.hermes.aiAssistGrammarLabel')}</strong> - {t('posts.hermes.aiAssistGrammarDesc')}
                  </li>
                </ul>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hermes.aiAssistGroup2Heading')}</h3>
                <ul className="blog__list">
                  <li>
                    <strong>{t('posts.hermes.aiAssistFormalLabel')}</strong> - {t('posts.hermes.aiAssistFormalDesc')}
                  </li>
                  <li>
                    <strong>{t('posts.hermes.aiAssistFriendlyLabel')}</strong> - {t('posts.hermes.aiAssistFriendlyDesc')}
                  </li>
                </ul>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hermes.aiAssistGroup3Heading')}</h3>
                <ul className="blog__list">
                  <li>
                    <strong>{t('posts.hermes.aiAssistCompleteLabel')}</strong> - {t('posts.hermes.aiAssistCompleteDesc')}
                  </li>
                  <li>
                    <strong>{t('posts.hermes.aiAssistSubjectLabel')}</strong> - {t('posts.hermes.aiAssistSubjectDesc')}
                  </li>
                  <li>
                    <strong>{t('posts.hermes.aiAssistDraftLabel')}</strong> - {t('posts.hermes.aiAssistDraftDesc')}
                  </li>
                </ul>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">{t('posts.hermes.aiAssistGroup4Heading')}</h3>
                <ul className="blog__list">
                  <li>
                    <strong>{t('posts.hermes.aiAssistCustomLabel')}</strong> - {t('posts.hermes.aiAssistCustomDesc')}
                  </li>
                </ul>
              </div>

              <figure className="blog__figure blog__figure--full">
                <Img src={aiPanelImg} alt="Hermes AI Assist panel showing 9 writing modes" className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.hermes.aiAssistCaption')}</figcaption>
              </figure>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.hermes.aiAssistTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.hermes.aiAssistTipText')}
                </p>
              </div>
            </section>

            {/* AI ASSISTANT */}
            <section className="blog__section card" id="ai-assistant">
              <h2 className="blog__heading">{t('posts.hermes.aiAssistantHeading')}</h2>

              <p>
                {t('posts.hermes.aiAssistantP1')}
              </p>

              <p>
                {t('posts.hermes.aiAssistantP2')}
              </p>

              <figure className="blog__figure blog__figure--full blog__figure--capped">
                <Img src={aiAssistantImg} alt="Hermes AI assistant side panel" className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.hermes.aiAssistantCaption')}</figcaption>
              </figure>
            </section>

            {/* SMART CATEGORIES */}
            <section className="blog__section card" id="smart-category">
              <h2 className="blog__heading">{t('posts.hermes.smartCategoryHeading')}</h2>

              <p>
                {t('posts.hermes.smartCategoryP1')}
              </p>

              <p>
                {t('posts.hermes.smartCategoryP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={categoryImg} alt="Hermes smart email categories powered by AI" className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.hermes.smartCategoryCaption')}</figcaption>
              </figure>
            </section>

            {/* DESKTOP */}
            <section className="blog__section card" id="desktop">
              <h2 className="blog__heading">{t('posts.hermes.desktopHeading')}</h2>

              <p>
                {t('posts.hermes.desktopP1')}
              </p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>{t('posts.hermes.desktopItem1Label')}</strong> - {t('posts.hermes.desktopItem1Desc')}
                </li>
                <li>
                  <strong>{t('posts.hermes.desktopItem2Label')}</strong> - {t('posts.hermes.desktopItem2Desc')}
                </li>
              </ul>

              <p>
                {t('posts.hermes.desktopP2')}
              </p>
            </section>

            {/* TRY IT */}
            <section className="blog__section card" id="try-it">
              <h2 className="blog__heading">{t('posts.hermes.tryItHeading')}</h2>

              <p>
                {t('posts.hermes.tryItP1')}
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.hermes.tryItTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.hermes.tryItTipText')}
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
          <ShareButtons title="Hermes - An AI-Powered Email Client" />

          {/* PREV / NEXT */}
          <BlogPrevNext currentSlug="hermes" />

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

export default Hermes;
