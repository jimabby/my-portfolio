import Header from "../header/Header";
import Footer from "../footer/Footer";
import BlogProgressBar from "./BlogProgressBar";
import ShareButtons from "../share/ShareButtons";
import BlogPrevNext from "./BlogPrevNext";
import BlogSEO from "./BlogSEO";
import ScrollUp from "../scrollup/ScrollUp";
import VideoEmbed from "./VideoEmbed";
import { useLanguage } from "../../i18n/LanguageContext";
// Pulls the article prose into this chunk instead of the entry bundle.
import "../../i18n/posts/register";
import "./blog.css";

import poster from "../../assets/policy-time-machine/ptm-video-poster.webp";
import explorerSummary from "../../assets/policy-time-machine/ptm-explorer-summary.webp";
import explorerDetail from "../../assets/policy-time-machine/ptm-explorer-detail.webp";
// The charts are the project's own README figures, generated from the fixture
// replay, in the light and dark variants it ships.
import storyChart from "../../assets/policy-time-machine/ptm-chart-story.svg";
import storyChartDark from "../../assets/policy-time-machine/ptm-chart-story-dark.svg";
import attributionChart from "../../assets/policy-time-machine/ptm-chart-attribution.svg";
import attributionChartDark from "../../assets/policy-time-machine/ptm-chart-attribution-dark.svg";
import sweepChart from "../../assets/policy-time-machine/ptm-chart-sweep.svg";
import sweepChartDark from "../../assets/policy-time-machine/ptm-chart-sweep-dark.svg";
import segmentsChart from "../../assets/policy-time-machine/ptm-chart-segments.svg";
import segmentsChartDark from "../../assets/policy-time-machine/ptm-chart-segments-dark.svg";
import Img from '../image/Img';
import LocaleLink from "../../i18n/LocaleLink";

const TITLE = "Policy Time Machine - Try Tomorrow's Rules on Yesterday's Decisions";
const DESCRIPTION =
  'An Airflow project that replays two years of past decisions under a proposed rule, shows which sentence caused each change, and turns human rulings into a regression suite for the next proposal.';

const REPO_URL = 'https://github.com/jimabby/policy-time-machine';
// The id from the YouTube URL. Emptied, the player links to the video file in
// the repository instead.
const YOUTUBE_ID = 's17FHWoOkDA';
const VIDEO_FALLBACK = `${REPO_URL}/blob/main/policy_time_machine_demo.mp4`;

// Both variants are in the DOM and blog.css shows the one matching the theme,
// so a theme toggle swaps the chart without a re-render. The dark copy carries
// no alt text: only one of the pair is ever visible.
const Chart = ({ light, dark, alt, width, height }) => (
  <>
    <img src={light} alt={alt} width={width} height={height} className="blog__img blog__chart--light" loading="lazy" decoding="async" />
    <img src={dark} alt="" aria-hidden="true" width={width} height={height} className="blog__img blog__chart--dark" loading="lazy" decoding="async" />
  </>
);

const PolicyTimeMachine = () => {
  const { t } = useLanguage();

  return (
    <>
      <BlogSEO
        title={TITLE}
        description={DESCRIPTION}
        ogImage="policy-time-machine.jpg"
        slug="policy-time-machine"
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
              <span className="blog__badge">{t('posts.policyTimeMachine.badge')}</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">{t('posts.policyTimeMachine.date')}</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">{t('posts.policyTimeMachine.readTime')}</span>
            </div>

            <h1 className="blog__post-title">
              {t('posts.policyTimeMachine.title')}
            </h1>

            <p className="blog__hero-text">
              {t('posts.policyTimeMachine.heroP1')}
            </p>

            <p className="blog__hero-text">
              {t('posts.policyTimeMachine.heroP2')}
            </p>

            <figure className="blog__figure blog__figure--hero">
              <VideoEmbed
                videoId={YOUTUBE_ID}
                poster={poster}
                title={t('posts.policyTimeMachine.videoTitle')}
                playLabel={t('posts.policyTimeMachine.videoPlay')}
                fallbackHref={VIDEO_FALLBACK}
              />
              <figcaption className="blog__caption">{t('posts.policyTimeMachine.videoCaption')}</figcaption>
            </figure>
          </header>

          {/* TABLE OF CONTENTS */}
          <nav className="blog__toc card">
            <h2 className="blog__toc-title">{t('blog.inThisArticle')}</h2>
            <ol className="blog__toc-list">
              <li><a href="#problem">{t('posts.policyTimeMachine.tocProblem')}</a></li>
              <li><a href="#replay">{t('posts.policyTimeMachine.tocReplay')}</a></li>
              <li><a href="#twist">{t('posts.policyTimeMachine.tocTwist')}</a></li>
              <li><a href="#point-in-time">{t('posts.policyTimeMachine.tocPit')}</a></li>
              <li><a href="#people">{t('posts.policyTimeMachine.tocPeople')}</a></li>
              <li><a href="#sweep">{t('posts.policyTimeMachine.tocSweep')}</a></li>
              <li><a href="#trust">{t('posts.policyTimeMachine.tocTrust')}</a></li>
              <li><a href="#airflow">{t('posts.policyTimeMachine.tocAirflow')}</a></li>
              <li><a href="#lessons">{t('posts.policyTimeMachine.tocLessons')}</a></li>
              <li><a href="#try-it">{t('posts.policyTimeMachine.tocTryIt')}</a></li>
            </ol>
          </nav>

          <div className="blog__content">

            {/* THE PROBLEM */}
            <section className="blog__section card" id="problem">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.problemHeading')}</h2>

              <p>{t('posts.policyTimeMachine.problemP1')}</p>
              <p>{t('posts.policyTimeMachine.problemP2')}</p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.policyTimeMachine.problemTipTitle')}</h3>
                <p className="blog__tip-text">{t('posts.policyTimeMachine.problemTipText')}</p>
              </div>
            </section>

            {/* REPLAY */}
            <section className="blog__section card" id="replay">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.replayHeading')}</h2>

              <p>{t('posts.policyTimeMachine.replayP1')}</p>
              <p>{t('posts.policyTimeMachine.replayP2')}</p>
              <p>{t('posts.policyTimeMachine.replayP3')}</p>

              <figure className="blog__figure">
                <Chart light={storyChart} dark={storyChartDark} alt={t('posts.policyTimeMachine.replayChartAlt')} width={824} height={232} />
                <figcaption className="blog__caption">{t('posts.policyTimeMachine.replayChartCaption')}</figcaption>
              </figure>

              <figure className="blog__figure blog__figure--full">
                <Img src={explorerSummary} alt={t('posts.policyTimeMachine.replayShotAlt')} className="blog__img" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
                <figcaption className="blog__caption">{t('posts.policyTimeMachine.replayShotCaption')}</figcaption>
              </figure>
            </section>

            {/* THE TWIST */}
            <section className="blog__section card" id="twist">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.twistHeading')}</h2>

              <p>{t('posts.policyTimeMachine.twistP1')}</p>
              <p>{t('posts.policyTimeMachine.twistP2')}</p>
              <p>{t('posts.policyTimeMachine.twistP3')}</p>

              <figure className="blog__figure">
                <Chart light={attributionChart} dark={attributionChartDark} alt={t('posts.policyTimeMachine.twistChartAlt')} width={824} height={390} />
                <figcaption className="blog__caption">{t('posts.policyTimeMachine.twistChartCaption')}</figcaption>
              </figure>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.policyTimeMachine.twistTipTitle')}</h3>
                <p className="blog__tip-text">{t('posts.policyTimeMachine.twistTipText')}</p>
              </div>
            </section>

            {/* POINT IN TIME */}
            <section className="blog__section card" id="point-in-time">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.pitHeading')}</h2>

              <p>{t('posts.policyTimeMachine.pitP1')}</p>
              <p>{t('posts.policyTimeMachine.pitP2')}</p>
              <p>{t('posts.policyTimeMachine.pitP3')}</p>
            </section>

            {/* PEOPLE */}
            <section className="blog__section card" id="people">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.peopleHeading')}</h2>

              <p>{t('posts.policyTimeMachine.peopleP1')}</p>
              <p>{t('posts.policyTimeMachine.peopleP2')}</p>
              <p>{t('posts.policyTimeMachine.peopleP3')}</p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.policyTimeMachine.peopleTipTitle')}</h3>
                <p className="blog__tip-text">{t('posts.policyTimeMachine.peopleTipText')}</p>
              </div>
            </section>

            {/* SWEEP */}
            <section className="blog__section card" id="sweep">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.sweepHeading')}</h2>

              <p>{t('posts.policyTimeMachine.sweepP1')}</p>

              <figure className="blog__figure">
                <Chart light={sweepChart} dark={sweepChartDark} alt={t('posts.policyTimeMachine.sweepChartAlt')} width={824} height={376} />
                <figcaption className="blog__caption">{t('posts.policyTimeMachine.sweepChartCaption')}</figcaption>
              </figure>

              <p>{t('posts.policyTimeMachine.sweepP2')}</p>
            </section>

            {/* TRUST */}
            <section className="blog__section card" id="trust">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.trustHeading')}</h2>

              <p>{t('posts.policyTimeMachine.trustP1')}</p>

              <ul className="blog__list blog__list--spaced">
                <li><strong>{t('posts.policyTimeMachine.trustItem1Label')}</strong>{t('posts.policyTimeMachine.trustItem1Desc')}</li>
                <li><strong>{t('posts.policyTimeMachine.trustItem2Label')}</strong>{t('posts.policyTimeMachine.trustItem2Desc')}</li>
                <li><strong>{t('posts.policyTimeMachine.trustItem3Label')}</strong>{t('posts.policyTimeMachine.trustItem3Desc')}</li>
                <li><strong>{t('posts.policyTimeMachine.trustItem4Label')}</strong>{t('posts.policyTimeMachine.trustItem4Desc')}</li>
              </ul>

              <figure className="blog__figure">
                <Chart light={segmentsChart} dark={segmentsChartDark} alt={t('posts.policyTimeMachine.trustChartAlt')} width={824} height={340} />
                <figcaption className="blog__caption">{t('posts.policyTimeMachine.trustChartCaption')}</figcaption>
              </figure>

              <figure className="blog__figure blog__figure--full">
                <Img src={explorerDetail} alt={t('posts.policyTimeMachine.trustShotAlt')} className="blog__img" loading="lazy" decoding="async" sizes="(max-width: 820px) 100vw, 780px" />
                <figcaption className="blog__caption">{t('posts.policyTimeMachine.trustShotCaption')}</figcaption>
              </figure>
            </section>

            {/* AIRFLOW */}
            <section className="blog__section card" id="airflow">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.airflowHeading')}</h2>

              <p>{t('posts.policyTimeMachine.airflowP1')}</p>

              <ul className="blog__list blog__list--spaced">
                <li><strong>{t('posts.policyTimeMachine.airflowItem1Label')}</strong>{t('posts.policyTimeMachine.airflowItem1Desc')}</li>
                <li><strong>{t('posts.policyTimeMachine.airflowItem2Label')}</strong>{t('posts.policyTimeMachine.airflowItem2Desc')}</li>
                <li><strong>{t('posts.policyTimeMachine.airflowItem3Label')}</strong>{t('posts.policyTimeMachine.airflowItem3Desc')}</li>
                <li><strong>{t('posts.policyTimeMachine.airflowItem4Label')}</strong>{t('posts.policyTimeMachine.airflowItem4Desc')}</li>
                <li><strong>{t('posts.policyTimeMachine.airflowItem5Label')}</strong>{t('posts.policyTimeMachine.airflowItem5Desc')}</li>
                <li><strong>{t('posts.policyTimeMachine.airflowItem6Label')}</strong>{t('posts.policyTimeMachine.airflowItem6Desc')}</li>
              </ul>

              <p>{t('posts.policyTimeMachine.airflowP2')}</p>
            </section>

            {/* LESSONS */}
            <section className="blog__section card" id="lessons">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.lessonsHeading')}</h2>

              <p>{t('posts.policyTimeMachine.lessonsP1')}</p>

              <ul className="blog__list blog__list--spaced">
                <li>{t('posts.policyTimeMachine.lessonsItem1')}</li>
                <li>{t('posts.policyTimeMachine.lessonsItem2')}</li>
                <li>{t('posts.policyTimeMachine.lessonsItem3')}</li>
                <li>{t('posts.policyTimeMachine.lessonsItem4')}</li>
                <li>{t('posts.policyTimeMachine.lessonsItem5')}</li>
              </ul>

              <p>{t('posts.policyTimeMachine.lessonsP2')}</p>
            </section>

            {/* TRY IT */}
            <section className="blog__section card" id="try-it">
              <h2 className="blog__heading">{t('posts.policyTimeMachine.tryItHeading')}</h2>

              <p>{t('posts.policyTimeMachine.tryItP1')}</p>
              <p>
                {t('posts.policyTimeMachine.tryItP2Pre')}
                <code>python demo.py --setup --step</code>
                {t('posts.policyTimeMachine.tryItP2Post')}
              </p>
              <p>
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                  {t('posts.policyTimeMachine.tryItRepoLabel')}
                </a>
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.policyTimeMachine.tryItTipTitle')}</h3>
                <p className="blog__tip-text">{t('posts.policyTimeMachine.tryItTipText')}</p>
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

          <ShareButtons title={TITLE} />

          <BlogPrevNext currentSlug="policy-time-machine" />

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

export default PolicyTimeMachine;
