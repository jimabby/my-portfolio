import React from 'react'
import "./footer.css"
import { useLanguage } from '../../i18n/LanguageContext'
import LocaleLink from "../../i18n/LocaleLink";

const Footer = () => {
  const { t } = useLanguage()
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        <LocaleLink to="/" className='footer__title'>Jim</LocaleLink>
        <ul className='footer__list'>
          <li>
            <LocaleLink to="/#about" className='footer__link'>{t('footer.about')}</LocaleLink>
          </li>
          <li>
            <LocaleLink to="/work" className='footer__link'>{t('footer.work')}</LocaleLink>
          </li>
          <li>
            <LocaleLink to="/resume" className='footer__link'>{t('footer.resume')}</LocaleLink>
          </li>
          <li>
            <LocaleLink to="/#testimonial" className='footer__link'>{t('footer.testimonials')}</LocaleLink>
          </li>
          <li>
            <LocaleLink to="/blog" className='footer__link'>{t('footer.blog')}</LocaleLink>
          </li>
          <li>
            {/* The feed is generated at build time and declared in <head>, but
                nothing in the UI pointed at it. Not a LocaleLink: rss.xml is a
                single static file, not a localised route. */}
            <a href='/rss.xml' className='footer__link'>{t('footer.rss')}</a>
          </li>
        </ul>

        <div className='footer__social'>
          <a href='https://www.facebook.com/weidong.kong/' className='footer__social-link' target='_blank' rel='noopener noreferrer' aria-label={t('footer.socialAria').replace('{platform}', 'Facebook')}>
            <i className='bx bxl-facebook'></i>
          </a>

          <a href='https://www.instagram.com/wkongjim/' className='footer__social-link' target='_blank' rel='noopener noreferrer' aria-label={t('footer.socialAria').replace('{platform}', 'Instagram')}>
            <i className='bx bxl-instagram'></i>
          </a>

          <a href='https://x.com/Weidong_jim' className='footer__social-link' target='_blank' rel='noopener noreferrer' aria-label={t('footer.socialAria').replace('{platform}', 'X')}>
            <i className='bx bxl-twitter'></i>
          </a>
        </div>

        <span className='footer__copyright'>&#169; {new Date().getFullYear()} Jim. {t('footer.rights')}</span>
      </div>
    </footer>
  )
}

export default Footer
