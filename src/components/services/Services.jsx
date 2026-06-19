import React, { useState, useEffect } from 'react'
import "./services.css"
import { useLanguage } from '../../i18n/LanguageContext'

const SERVICES = [
  { key: 'fullstack', icon: 'uil uil-web-grid' },
  { key: 'software', icon: 'uil uil-arrow' },
  { key: 'data', icon: 'uil uil-edit' },
]

const Services = () => {
  const { t } = useLanguage()
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  }

  useEffect(() => {
    if (toggleState !== 0) {
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e) => {
        if (e.key === 'Escape') setToggleState(0);
      };
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [toggleState]);

  return (
    <section className='services section' id='services'>
      <h2 className='section__title'>{t('services.title')}</h2>
      <span className='section__subtitle'>{t('services.subtitle')}</span>

      <div className='services__container container grid'>
        {SERVICES.map((service, i) => {
          const index = i + 1;
          const items = t(`services.${service.key}.items`);
          return (
            <div className='services__content' key={service.key}>
              <div>
                <i className={`${service.icon} services__icon`}></i>
                <h3 className='services__title'>{t(`services.${service.key}.title`)}</h3>
              </div>

              <button type="button" className='services__button' onClick={() => toggleTab(index)}>
                {t('services.viewMore')}
                <i className="uil uil-arrow-right services__button-icon"></i>
              </button>

              <div
                className={toggleState === index ? "services__model active-model" : "services__model"}
                onClick={() => toggleTab(0)}
              >
                <div
                  className='services__model-content'
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`services-modal-title-${index}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button type="button" onClick={() => toggleTab(0)} className="services__model-close" aria-label={t('services.closeModal')}>
                    <i className="uil uil-times"></i>
                  </button>

                  <h3 className='services__model-title' id={`services-modal-title-${index}`}>
                    {t(`services.${service.key}.title`)}
                  </h3>

                  <p className='services__model-description'>
                    {t(`services.${service.key}.description`)}
                  </p>

                  <ul className='services__model-services grid'>
                    {(Array.isArray(items) ? items : []).map((item, idx) => (
                      <li className='services__model-service' key={idx}>
                        <i className="uil uil-check-circle services__model-icon"></i>
                        <p className='services__model-info'>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Services
