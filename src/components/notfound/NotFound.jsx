import './notfound.css';
import { useLanguage } from '../../i18n/LanguageContext';
import LocaleLink from '../../i18n/LocaleLink';
import Seo from '../seo/Seo';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const NotFound = () => {
  const { t } = useLanguage();
  return (
    <>
      <Seo title={t('seo.notFoundTitle')} description={t('notfound.text')} noindex />
      <Header />
      <main className="notfound section" id="main-content">
        <div className="notfound__container container">
          <span className="notfound__code">404</span>
          <h1 className="notfound__title">{t('notfound.title')}</h1>
          <p className="notfound__text">
            {t('notfound.text')}
          </p>
          <div className="notfound__actions">
            <LocaleLink to="/" className="button button--flex">
              {t('notfound.back')}
              <i className="uil uil-estate"></i>
            </LocaleLink>
            <LocaleLink to="/blog" className="button button--ghost button--flex">
              {t('nav.blog')}
              <i className="uil uil-notes"></i>
            </LocaleLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;