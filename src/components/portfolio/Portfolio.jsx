import React from 'react'
import "./portfolio.css"
import Works from './Works'
import { useLanguage } from '../../i18n/LanguageContext'

const Portfolio = () => {
  const { t } = useLanguage()
  return (
    <section className='portfolio section' id='portfolio'>
      <h2 className='section__title'>{t('portfolio.title')}</h2>

      <Works />
    </section>
  )
}

export default Portfolio
