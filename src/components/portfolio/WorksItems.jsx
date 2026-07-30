import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import LocaleLink from '../../i18n/LocaleLink'
import Img from '../image/Img';
import { projectPath } from './Data';

const WorksItems = ({ item, onOpenGallery }) => {
  const { t } = useLanguage()
  const openLabel = t('portfolio.openGallery').replace('{title}', item.title)

  return (
    <div className='work__card'>
      <button
        type="button"
        className="work__img-button"
        onClick={() => onOpenGallery?.(item)}
        aria-label={openLabel}
      >
        <Img src={item.image} alt={item.title} className='work__img' loading="lazy"  sizes="(max-width: 768px) 100vw, 350px"/>
        <span className="work__img-overlay">{t('portfolio.viewGallery')}</span>
      </button>

      <h3 className='work__title'>{item.title}</h3>
      {/* The image above still opens the quick-look gallery; this goes to the
          project's own page, which is linkable, shareable, and indexable —
          or to the blog post, for projects already written up there. */}
      <LocaleLink to={projectPath(item)} className='work__button'>
        {t(item.article ? 'portfolio.readArticle' : 'portfolio.caseStudy')}
        <i className='bx bx-right-arrow-alt work__button-icon'></i>
      </LocaleLink>
    </div>
  )
}

export default WorksItems
