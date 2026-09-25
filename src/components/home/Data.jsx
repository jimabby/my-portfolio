import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import LocaleLink from '../../i18n/LocaleLink'

// Four elements, and no more: name, role, one paragraph, the two calls to
// action. The "Currently" strip that used to sit between the paragraph and the
// buttons now opens the About section — a hero carrying six stacked things
// reads as a summary of the page rather than as its opening line.
const Data = () => {
  const { t } = useLanguage()
  return (
    <div className='home__data'>
      {/* The slate over the title card: a production number and where it
          was shot. Coordinates rather than words, so it needs no translation;
          decoration, so hidden from assistive tech. */}
      <span className='home__slate' aria-hidden='true'>
        <span className='home__rec' />
        Nº 001 — 33°52′S 151°12′E
      </span>
      <h1 className='home__title'>
        Jim <em>Kong</em>
      </h1>

      <h3 className='home__subtitle'>
        {t('home.subtitle')}
      </h3>

      <p className='home__description'>
        {t('home.description')}
      </p>

      <div className='home__cta'>
        <a href='#contact' className='button button--flex'>
          {t('home.sayHello')}
          <i className='uil uil-message button__icon-inline'></i>
        </a>
        {/* Goes to the resume page rather than straight to the PDF. A blind
            download is the wrong default: it is unreadable on a phone without
            a viewer, invisible to search, and gives nothing to anyone who just
            wanted to skim. /resume is the readable version and offers the same
            PDF as its own button. */}
        <LocaleLink to='/resume' className='button button--ghost button--flex'>
          {t('home.viewResume')}
          <i className='uil uil-file button__icon-inline'></i>
        </LocaleLink>
      </div>
    </div>
  )
}

export default Data
