import { Link } from 'react-router';
import './notfound.css';
import { useLanguage } from '../../i18n/LanguageContext';
import Seo from '../seo/Seo';

const NotFound = () => {
  const { t } = useLanguage();
  return (
    <main className="notfound section" id="main-content">
      <Seo title={t('seo.notFoundTitle')} description={t('notfound.text')} noindex />
      <div className="notfound__container container">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">{t('notfound.title')}</h1>
        <p className="notfound__text">
          {t('notfound.text')}
        </p>
        <Link to="/" className="button button--flex">
          {t('notfound.back')}
          <i className="uil uil-estate"></i>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
