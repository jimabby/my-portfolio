import React from 'react'
import "./home.css"
import Social from './Social'
import Data from './Data'
import ScrollDown from './ScrollDown'
import Img from '../image/Img'
import profileImg from '../../assets/profile.webp'
import { useLanguage } from '../../i18n/LanguageContext'

const Home = () => {
  const { t } = useLanguage()
  return (
    <section className='home section' id='home'>
      <div className='home__container container grid'>
        <div className='home__content grid'>
          <Social />

          <Img
            className='home__img'
            src={profileImg}
            alt={t('home.profileAlt')}
            fetchPriority='high'
            decoding='async'
            sizes='(max-width: 768px) 200px, 300px'
          />

          <Data />
        </div>
        <ScrollDown />
      </div>
    </section>
  )
}

export default Home
