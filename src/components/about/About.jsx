import React from 'react';
import "./about.css";
import AboutImg from "../../assets/profile.webp";
import Info from './Info';
import Currently from './Currently';
import { useLanguage } from '../../i18n/LanguageContext';
import LocaleLink from '../../i18n/LocaleLink';
import Img from '../image/Img';

const About = () => {
  const { t } = useLanguage();
  return (
    <section className='about section' id='about'>
      <h2 className='section__title'>{t('about.title')}</h2>

      <div className='about__container container grid'>
        <Img src={AboutImg} alt='Jim Kong' className='about__img'  sizes="(max-width: 768px) 220px, 350px"/>

        <div className='about__data'>
          <Currently />
          <Info />
          <p className='about__description'>
            {t('about.description')}
          </p>
          {/* The readable resume, not the raw PDF — see the note in home/Data.jsx.
              /resume carries the PDF download as its own button. */}
          <LocaleLink to='/resume' className='button button--flex'>{t('about.viewResume')}
            <i className='uil uil-file button__icon-inline'></i>
          </LocaleLink>
        </div>
      </div>
    </section>
  )
}

export default About
