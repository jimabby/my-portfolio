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

import heroImage from "../../assets/taipei-taoyuan/taipei-taoyuan-9.webp";
import gateImage from "../../assets/taipei-taoyuan/taipei-taoyuan-5.webp";
import lobbyImage from "../../assets/taipei-taoyuan/taipei-taoyuan-4.webp";
import corridorImage from "../../assets/taipei-taoyuan/taipei-taoyuan-2.webp";
import dragonImage from "../../assets/taipei-taoyuan/taipei-taoyuan-3.webp";
import viewImage from "../../assets/taipei-taoyuan/taipei-taoyuan-16.webp";
import galleryImage1 from "../../assets/taipei-taoyuan/taipei-taoyuan-1.webp";
import galleryImage6 from "../../assets/taipei-taoyuan/taipei-taoyuan-6.webp";
import galleryImage7 from "../../assets/taipei-taoyuan/taipei-taoyuan-7.webp";
import galleryImage8 from "../../assets/taipei-taoyuan/taipei-taoyuan-8.webp";
import galleryImage10 from "../../assets/taipei-taoyuan/taipei-taoyuan-10.webp";
import galleryImage11 from "../../assets/taipei-taoyuan/taipei-taoyuan-11.webp";
import galleryImage12 from "../../assets/taipei-taoyuan/taipei-taoyuan-12.webp";
import galleryImage13 from "../../assets/taipei-taoyuan/taipei-taoyuan-13.webp";
import galleryImage14 from "../../assets/taipei-taoyuan/taipei-taoyuan-14.webp";
import galleryImage15 from "../../assets/taipei-taoyuan/taipei-taoyuan-15.webp";
import galleryImage17 from "../../assets/taipei-taoyuan/taipei-taoyuan-17.webp";
import galleryImage18 from "../../assets/taipei-taoyuan/taipei-taoyuan-18.webp";
import Img from '../image/Img';
import LocaleLink from "../../i18n/LocaleLink";

const GrandHotelTaipei = () => {
  const { t } = useLanguage();

  const galleryPhotos = [
    { src: galleryImage8, alt: t("posts.grandHotelTaipei.galleryPhoto1Alt") },
    { src: galleryImage12, alt: t("posts.grandHotelTaipei.galleryPhoto2Alt") },
    { src: galleryImage17, alt: t("posts.grandHotelTaipei.galleryPhoto3Alt") },
    { src: galleryImage18, alt: t("posts.grandHotelTaipei.galleryPhoto4Alt") },
  ];

  return (
    <>
      <BlogSEO
        title="Staying at the Grand Hotel Taipei"
        description="A personal April stay at the Grand Hotel Taipei, from the red-pillared entrance and grand lobby to quiet corridors, city views, and slow moments around the grounds."
        ogImage="grand-hotel-taipei.jpg"
        slug="grand-hotel-taipei"
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

          <header className="blog__hero card">
            <div className="blog__post-meta">
              <span className="blog__badge">{t('posts.grandHotelTaipei.badge')}</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">{t('posts.grandHotelTaipei.date')}</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">{t('posts.grandHotelTaipei.readTime')}</span>
            </div>

            <h1 className="blog__post-title">
              {t('posts.grandHotelTaipei.title')}
            </h1>

            <p className="blog__hero-text">
              {t('posts.grandHotelTaipei.heroP1')}
            </p>

            <p className="blog__hero-text">
              {t('posts.grandHotelTaipei.heroP2')}
            </p>

            <figure className="blog__figure blog__figure--hero">
              <Img src={heroImage} alt={t('posts.grandHotelTaipei.heroImgAlt')} className="blog__img" fetchPriority="high" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
            </figure>
          </header>

          <nav className="blog__toc card">
            <h2 className="blog__toc-title">{t('blog.inThisArticle')}</h2>
            <ol className="blog__toc-list">
              <li><a href="#arrival">{t('posts.grandHotelTaipei.tocArrival')}</a></li>
              <li><a href="#lobby">{t('posts.grandHotelTaipei.tocLobby')}</a></li>
              <li><a href="#stay">{t('posts.grandHotelTaipei.tocStay')}</a></li>
              <li><a href="#room">{t('posts.grandHotelTaipei.tocRoom')}</a></li>
              <li><a href="#dining">{t('posts.grandHotelTaipei.tocDining')}</a></li>
              <li><a href="#details">{t('posts.grandHotelTaipei.tocDetails')}</a></li>
              <li><a href="#tunnels">{t('posts.grandHotelTaipei.tocTunnels')}</a></li>
              <li><a href="#views">{t('posts.grandHotelTaipei.tocViews')}</a></li>
              <li><a href="#gallery">{t('posts.grandHotelTaipei.tocGallery')}</a></li>
              <li><a href="#reflection">{t('posts.grandHotelTaipei.tocReflection')}</a></li>
            </ol>
          </nav>

          <div className="blog__content">
            <section className="blog__section card" id="arrival">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.arrivalHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.arrivalP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.arrivalP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={gateImage} alt={t('posts.grandHotelTaipei.arrivalImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.arrivalCaption')}</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="lobby">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.lobbyHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.lobbyP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.lobbyP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={lobbyImage} alt={t('posts.grandHotelTaipei.lobbyImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.lobbyCaption')}</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="stay">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.stayHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.stayP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.stayP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={corridorImage} alt={t('posts.grandHotelTaipei.stayImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.stayCaption')}</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="room">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.roomHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.roomP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.roomP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={galleryImage10} alt={t('posts.grandHotelTaipei.roomImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.roomCaption')}</figcaption>
              </figure>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <Img src={galleryImage11} alt={t('posts.grandHotelTaipei.roomBathImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async"  sizes="(max-width: 768px) 100vw, 360px"/>
                  <figcaption className="blog__caption">{t('posts.grandHotelTaipei.roomBathCaption')}</figcaption>
                </figure>
                <figure className="blog__figure">
                  <Img src={galleryImage15} alt={t('posts.grandHotelTaipei.roomAmenitiesImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async"  sizes="(max-width: 768px) 100vw, 360px"/>
                  <figcaption className="blog__caption">{t('posts.grandHotelTaipei.roomAmenitiesCaption')}</figcaption>
                </figure>
              </div>
            </section>

            <section className="blog__section card" id="dining">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.diningHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.diningP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.diningP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={galleryImage7} alt={t('posts.grandHotelTaipei.diningImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.diningCaption')}</figcaption>
              </figure>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <Img src={galleryImage6} alt={t('posts.grandHotelTaipei.diningDimsumImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async"  sizes="(max-width: 768px) 100vw, 360px"/>
                  <figcaption className="blog__caption">{t('posts.grandHotelTaipei.diningDimsumCaption')}</figcaption>
                </figure>
                <figure className="blog__figure">
                  <Img src={galleryImage14} alt={t('posts.grandHotelTaipei.diningPlateImgAlt')} className="blog__img blog__img--cover" loading="lazy" decoding="async"  sizes="(max-width: 768px) 100vw, 360px"/>
                  <figcaption className="blog__caption">{t('posts.grandHotelTaipei.diningPlateCaption')}</figcaption>
                </figure>
              </div>
            </section>

            <section className="blog__section card" id="details">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.detailsHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.detailsP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.detailsP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={dragonImage} alt={t('posts.grandHotelTaipei.detailsImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.detailsCaption')}</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="tunnels">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.tunnelsHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.tunnelsP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.tunnelsP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={galleryImage1} alt={t('posts.grandHotelTaipei.tunnelsImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.tunnelsCaption')}</figcaption>
              </figure>

              <figure className="blog__figure blog__figure--full">
                <Img src={galleryImage13} alt={t('posts.grandHotelTaipei.tunnelsSlideImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.tunnelsSlideCaption')}</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="views">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.viewsHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.viewsP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.viewsP2')}
              </p>

              <figure className="blog__figure blog__figure--full">
                <Img src={viewImage} alt={t('posts.grandHotelTaipei.viewsImgAlt')} className="blog__img" loading="lazy" decoding="async"  sizes="(max-width: 820px) 100vw, 780px"/>
                <figcaption className="blog__caption">{t('posts.grandHotelTaipei.viewsCaption')}</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="gallery">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.galleryHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.galleryP1')}
              </p>

              <div className="blog__examples-grid">
                {galleryPhotos.map((photo) => (
                  <figure className="blog__figure" key={photo.src}>
                    <Img
                      src={photo.src}
                      alt={photo.alt}
                      className="blog__img blog__img--cover"
                      loading="lazy"
                      decoding="async"
                     sizes="(max-width: 768px) 100vw, 360px"/>
                    <figcaption className="blog__caption">
                      {photo.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="blog__section card" id="reflection">
              <h2 className="blog__heading">{t('posts.grandHotelTaipei.reflectionHeading')}</h2>

              <p>
                {t('posts.grandHotelTaipei.reflectionP1')}
              </p>

              <p>
                {t('posts.grandHotelTaipei.reflectionP2')}
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">{t('posts.grandHotelTaipei.reflectionTipTitle')}</h3>
                <p className="blog__tip-text">
                  {t('posts.grandHotelTaipei.reflectionTipText')}
                </p>
              </div>
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

          <ShareButtons title="Staying at the Grand Hotel Taipei" />

          <BlogPrevNext currentSlug="grand-hotel-taipei" />

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

export default GrandHotelTaipei;
