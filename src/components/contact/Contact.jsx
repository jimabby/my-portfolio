import React, { useEffect, useRef, useState } from 'react'
import './contact.css'
import { useLanguage } from '../../i18n/LanguageContext';

const now = () =>
  typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now();

const Contact = () => {
  const { t } = useLanguage();
  const form = useRef();
  // Monotonic clock, so how long the form has been open is measured locally and
  // sent as a duration. An absolute timestamp compared against the server's
  // clock would silently classify anyone whose device clock runs fast as a bot.
  const renderedAtRef = useRef(now());
  const statusTimerRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  useEffect(() => () => clearTimeout(statusTimerRef.current), []);

  const resetStatusLater = () => {
    clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setStatus('idle'), 4000);
  };

  const validate = (fields) => {
    const errs = {};
    if (!fields.name.trim()) errs.name = t('contact.errName');
    if (!fields.email.trim()) {
      errs.email = t('contact.errEmailReq');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = t('contact.errEmailValid');
    }
    if (!fields.message.trim()) errs.message = t('contact.errMessage');
    return errs;
  };

  const clearFieldError = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form.current));

    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstInvalid = Object.keys(errs)[0];
      form.current?.elements.namedItem(firstInvalid)?.focus();
      return;
    }
    setErrors({});
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          elapsedMs: Math.round(now() - renderedAtRef.current),
        }),
      });
      if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);

      setStatus('sent');
      e.target.reset();
      renderedAtRef.current = now();
      resetStatusLater();
    } catch {
      setStatus('error');
      resetStatusLater();
    }
  }

  return (
    <section className='contact section' id='contact'>
      <h2 className='section__title'>{t('contact.title')}</h2>

      <div className='contact__container container grid'>
        <div className='contact__content'>
          <h3 className='contact__title'>{t('contact.talkToMe')}</h3>

          <div className='contact__info'>

            {/** Email */}
            <div className='contact__card'>
              <i className="bx bx-mail-send contact__card-icon"></i>

              <h3 className='contact__card-title'>{t('contact.email')}</h3>
              <span className='contact__card-data'>wksunshine@gmail.com</span>

              <a href='mailto:wksunshine@gmail.com' className='contact__button'>
                {t('contact.writeMe')}
                <i className='bx bx-right-arrow-alt contact__button-icon'></i>
              </a>
            </div>

            {/** Whatsapp */}
            <div className='contact__card'>
              <i className="bx bxl-whatsapp contact__card-icon"></i>

              <h3 className='contact__card-title'>{t('contact.whatsapp')}</h3>
              <span className='contact__card-data'>+61-406-448-436</span>

              <a href='https://api.whatsapp.com/send?phone=61406448436&text=Hello%2C%20more%20information' target='_blank' rel='noopener noreferrer' className='contact__button'>
                {t('contact.writeMe')}
                <i className='bx bx-right-arrow-alt contact__button-icon'></i>
              </a>
            </div>

            {/** Messenger */}
            <div className='contact__card'>
              <i className="bx bxl-messenger contact__card-icon"></i>

              <h3 className='contact__card-title'>{t('contact.messenger')}</h3>
              <span className='contact__card-data'>Weidong Kong</span>

              <a href='https://m.me/weidongkong' target='_blank' rel='noopener noreferrer' className='contact__button'>
                {t('contact.writeMe')}
                <i className='bx bx-right-arrow-alt contact__button-icon'></i>
              </a>
            </div>
          </div>
        </div>
        <div className='contact__content'>
          <h3 className='contact__title'>{t('contact.writeProject')}</h3>

          <form ref={form} onSubmit={sendEmail} className='contact__form' noValidate>
            {/* Honeypot: hidden from real users, tempting to bots. */}
            <div className='contact__hp' aria-hidden='true'>
              <label htmlFor='contact-company'>Company</label>
              <input type='text' name='company' id='contact-company' tabIndex={-1} autoComplete='off' />
            </div>

            <div className='contact__form-div'>
              <label htmlFor='contact-name' className='contact__form-tag'>{t('contact.nameLabel')}</label>
              <input type='text' name='name' id='contact-name' required autoComplete='name' maxLength={100} className='contact__form-input' placeholder={t('contact.namePlaceholder')} onChange={clearFieldError} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
            </div>
            {errors.name && <span id='contact-name-error' className='contact__form-error'>{errors.name}</span>}

            <div className='contact__form-div'>
              <label htmlFor='contact-email' className='contact__form-tag'>{t('contact.emailLabel')}</label>
              <input type='email' name='email' id='contact-email' required autoComplete='email' maxLength={150} className='contact__form-input' placeholder={t('contact.emailPlaceholder')} onChange={clearFieldError} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
            </div>
            {errors.email && <span id='contact-email-error' className='contact__form-error'>{errors.email}</span>}

            <div className='contact__form-div contact__form-area'>
              <label htmlFor='contact-message' className='contact__form-tag'>{t('contact.messageLabel')}</label>
              <textarea name='message' id='contact-message' required cols='30' rows='10' maxLength={2000} className='contact__form-input' placeholder={t('contact.messagePlaceholder')} onChange={clearFieldError} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined}></textarea>
            </div>
            {errors.message && <span id='contact-message-error' className='contact__form-error'>{errors.message}</span>}

            <button type='submit' className='button button--flex' disabled={status === 'sending'}>
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
              <svg
                className="button__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z"
                  fill="var(--container-color)"
                ></path>
                <path
                  d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z"
                  fill="var(--container-color)"
                ></path>
              </svg>
            </button>

            <div aria-live='polite' role='status'>
              {status === 'sent' && <p className='contact__status contact__status--success'>{t('contact.sent')}</p>}
              {status === 'error' && <p className='contact__status contact__status--error'>{t('contact.error')}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
