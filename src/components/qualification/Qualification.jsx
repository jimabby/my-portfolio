import React, { useState } from 'react'
import "./qualification.css"
import { useLanguage } from '../../i18n/LanguageContext'
import { certifications, education, experience, formatPeriod } from './resumeData'

// The timeline alternates sides: even-indexed entries sit left of the spine,
// odd-indexed ones right. This used to be eight hand-written copies of the
// same markup per tab, which is how the resume page and this section would
// have drifted the moment either was edited. Both read resumeData.js now.
const TimelineEntry = ({ title, subtitle, period, side }) => (
  <div className='qualification__data'>
    {side === 'right' && <div></div>}

    {side === 'left' && (
      <div>
        <h3 className='qualification__title'>{title}</h3>
        <span className='qualification__subtitle'>{subtitle}</span>
        <div className='qualification__calendar'>
          <i className='uil uil-calendar-alt'></i> {period}
        </div>
      </div>
    )}

    <div>
      <span className='qualification__rounder'></span>
      <span className='qualification__line'></span>
    </div>

    {side === 'right' && (
      <div>
        <h3 className='qualification__title'>{title}</h3>
        <span className='qualification__subtitle'>{subtitle}</span>
        <div className='qualification__calendar'>
          <i className='uil uil-calendar-alt'></i> {period}
        </div>
      </div>
    )}
  </div>
);

const Qualification = () => {
  const { t } = useLanguage()
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  }

  // Degrees first, then certifications — the order the section has always
  // shown them in.
  const educationEntries = [
    ...education.map((entry) => ({
      key: `edu-${entry.titleKey}`,
      title: t(`qualification.edu.${entry.titleKey}`),
      subtitle: `${entry.institution} - Institute`,
      period: entry.period,
    })),
    ...certifications.map((entry) => ({
      key: `cert-${entry.titleKey}`,
      title: t(`qualification.edu.${entry.titleKey}`),
      subtitle: entry.issuer,
      period: entry.period,
    })),
  ];

  const experienceEntries = experience.map((entry) => ({
    key: `exp-${entry.titleKey}`,
    title: t(`qualification.exp.${entry.titleKey}`),
    subtitle: entry.company,
    period: formatPeriod(entry.start, entry.end, t('qualification.present')),
  }));

  return (
    <section className='qualification section' id='qualification'>
      <h2 className='section__title'>{t('qualification.title')}</h2>

      <div className='qualification__container container'>
        <div className='qualification__tabs'>
          <button type="button" className={toggleState === 1 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i> {t('qualification.education')}
          </button>
          <button type="button" className={toggleState === 2 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i> {t('qualification.experience')}
          </button>
        </div>

        <div className='qualification__sections'>
          {/**Education */}
          <div className={toggleState === 1 ? "qualification__content qualification__content-active" : "qualification__content"}>
            {educationEntries.map((entry, i) => (
              <TimelineEntry key={entry.key} {...entry} side={i % 2 === 0 ? 'left' : 'right'} />
            ))}
          </div>

          {/**Experience */}
          <div className={toggleState === 2 ? "qualification__content qualification__content-active" : "qualification__content"}>
            {experienceEntries.map((entry, i) => (
              <TimelineEntry key={entry.key} {...entry} side={i % 2 === 0 ? 'left' : 'right'} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Qualification
