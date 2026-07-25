import React, { useState, useEffect, useRef } from 'react'
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
  const modalRefs = useRef([]);
  const lastFocusedRef = useRef(null);

  const openModal = (index) => {
    lastFocusedRef.current = document.activeElement;
    setToggleState(index);
  };

  const closeModal = () => setToggleState(0);

  useEffect(() => {
    if (toggleState !== 0) {
      document.body.style.overflow = 'hidden';
      const modal = modalRefs.current[toggleState];
      modal?.querySelector('.services__model-close')?.focus();

      const onKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          return;
        }
        if (e.key !== 'Tab' || !modal) return;

        const focusable = Array.from(
          modal.querySelectorAll(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => !element.disabled);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeyDown);
        lastFocusedRef.current?.focus?.();
        lastFocusedRef.current = null;
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

              <button type="button" className='services__button' onClick={() => openModal(index)}>
                {t('services.viewMore')}
                <i className="uil uil-arrow-right services__button-icon"></i>
              </button>

              <div
                className={toggleState === index ? "services__model active-model" : "services__model"}
                aria-hidden={toggleState !== index}
                onClick={closeModal}
              >
                <div
                  ref={(element) => {
                    modalRefs.current[index] = element;
                  }}
                  className='services__model-content'
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`services-modal-title-${index}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button type="button" onClick={closeModal} className="services__model-close" aria-label={t('services.closeModal')}>
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
