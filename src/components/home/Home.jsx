import React from 'react'
import "./home.css"
import Social from './Social'
import CodeShot from './CodeShot'
import Data from './Data'
import Img from '../image/Img'
import profileImg from '../../assets/profile.webp'
import { useLanguage } from '../../i18n/LanguageContext'

const Home = () => {
  const { t } = useLanguage()
  return (
    <section className='home section' id='home'>
      <CodeShot />
      <div className='home__container container grid'>
        <div className='home__content grid'>
          <Social />

          {/* The portrait as a single frame cut from a strip of 35mm: sprocket
              holes top and bottom, and the stock's edge printing down the
              side. The markings are decoration and hidden from assistive
              tech; the image keeps its own alt text. */}
          <figure className='home__still'>
            <Img
              className='home__img'
              src={profileImg}
              alt={t('home.profileAlt')}
              fetchPriority='high'
              decoding='async'
              sizes='(max-width: 768px) 220px, 320px'
            />
            <span className='home__edge' aria-hidden='true'>
              JK 400TX <span>▸</span> 12 <span>▸</span> 12A
            </span>
          </figure>

          <Data />
        </div>
      </div>
    </section>
  )
}

export default Home
