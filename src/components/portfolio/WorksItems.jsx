import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

const WorksItems = ({ item, onOpenGallery }) => {
  const { t } = useLanguage()
  const hasExternalLink = item.link && item.link !== '#'
  const openLabel = t('portfolio.openGallery').replace('{title}', item.title)

  return (
    <div className='work__card'>
      <button
        type="button"
        className="work__img-button"
        onClick={() => onOpenGallery?.(item)}
        aria-label={openLabel}
      >
        <img src={item.image} alt={item.title} className='work__img' loading="lazy" />
        <span className="work__img-overlay">{t('portfolio.viewGallery')}</span>
      </button>

      <h3 className='work__title'>{item.title}</h3>
      {hasExternalLink ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className='work__button'>
          {t('portfolio.moreDetails')}
          <i className='bx bx-right-arrow-alt work__button-icon'></i>
        </a>
      ) : (
        <button type="button" className='work__button' onClick={() => onOpenGallery?.(item)}>
          {t('portfolio.viewGallery')}
          <i className='bx bx-right-arrow-alt work__button-icon'></i>
        </button>
      )}
    </div>
  )
}

export default WorksItems
