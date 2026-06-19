import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

const Info = () => {
  const { t } = useLanguage()
  return (
    <div className='about__info grid'>
      <div className='about__box'>
        <i className='bx bx-award about__icon'></i>
        <h3 className='about__title'>{t('about.experience')}</h3>
        <span className='about__subtitle'>{t('about.experienceValue')}</span>
      </div>

      <div className='about__box'>
        <i className='bx bx-briefcase-alt about__icon'></i>
        <h3 className='about__title'>{t('about.completed')}</h3>
        <span className='about__subtitle'>{t('about.completedValue')}</span>
      </div>

      <div className='about__box'>
        <i className='bx bx-support about__icon'></i>
        <h3 className='about__title'>{t('about.support')}</h3>
        <span className='about__subtitle'>{t('about.supportValue')}</span>
      </div>
    </div>
  )
}

export default Info
