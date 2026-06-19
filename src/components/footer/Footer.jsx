import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"
import { useLanguage } from '../../i18n/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        <Link to="/" className='footer__title'>Jim</Link>
        <ul className='footer__list'>
          <li>
            <Link to="/#about" className='footer__link'>{t('footer.about')}</Link>
          </li>
          <li>
            <Link to="/#portfolio" className='footer__link'>{t('footer.portfolio')}</Link>
          </li>
          <li>
            <Link to="/#testimonial" className='footer__link'>{t('footer.testimonials')}</Link>
          </li>
        </ul>

        <div className='footer__social'>
          <a href='https://www.facebook.com/weidong.kong/' className='footer__social-link' target='_blank' rel='noopener noreferrer' aria-label="Jim Kong on Facebook">
            <i className='bx bxl-facebook'></i>
          </a>

          <a href='https://www.instagram.com/wkongjim/' className='footer__social-link' target='_blank' rel='noopener noreferrer' aria-label="Jim Kong on Instagram">
            <i className='bx bxl-instagram'></i>
          </a>

          <a href='https://x.com/Weidong_jim' className='footer__social-link' target='_blank' rel='noopener noreferrer' aria-label="Jim Kong on X">
            <i className='bx bxl-twitter'></i>
          </a>
        </div>

        <span className='footer__copyright'>&#169; {new Date().getFullYear()} Jim. {t('footer.rights')}</span>
      </div>
    </footer>
  )
}

export default Footer
