import React from 'react'
import "./skills.css"
import Frontend from './Frontend'
import Backend from './Backend'
import { useLanguage } from '../../i18n/LanguageContext'

const Skills = () => {
  const { t } = useLanguage()
  return (
    <section className='skills section' id='skills'>
      <h2 className='section__title'>{t('skills.title')}</h2>

      <div className='skills__container container grid'>
        <Frontend />
        <Backend />
      </div>
    </section>
  )
}

export default Skills
