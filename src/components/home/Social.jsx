import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

const Social = () => {
  const { t } = useLanguage()
  const socialAria = (platform) => t('footer.socialAria').replace('{platform}', platform)
  return (
    <div className='home__social'>
      <a href='https://www.instagram.com/wkongjim/' className='home__social-icon' target='_blank' rel='noopener noreferrer' aria-label={socialAria('Instagram')}>
        <i className='uil uil-instagram'></i>
      </a>

      <a href='https://www.linkedin.com/in/weidong-kong-jim/' className='home__social-icon' target='_blank' rel='noopener noreferrer' aria-label={socialAria('LinkedIn')}>
        <i className='uil uil-linkedin'></i>
      </a>

      <a href='https://github.com/jimabby' className='home__social-icon' target='_blank' rel='noopener noreferrer' aria-label={socialAria('GitHub')}>
        <i className='uil uil-github-alt'></i>
      </a>
    </div>
  )
}

export default Social
