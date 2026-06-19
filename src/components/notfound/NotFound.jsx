import { Link } from 'react-router-dom';
import './notfound.css';
import { useLanguage } from '../../i18n/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  return (
    <section className="notfound section">
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
    </section>
  );
};

export default NotFound;
