import React from 'react'
import "./home.css"
import Social from './Social'
import Data from './Data'
import ScrollDown from './ScrollDown'
import { useLanguage } from '../../i18n/LanguageContext'

const Home = () => {
  const { t } = useLanguage()
  return (
    <section className='home section' id='home'>
      <div className='home__container container grid'>
        <div className='home__content grid'>
          <Social />

          <div className='home__img' role="img" aria-label={t('home.profileAlt')}></div>

          <Data />
        </div>
        <ScrollDown />
      </div>
    </section>
  )
}

export default Home
