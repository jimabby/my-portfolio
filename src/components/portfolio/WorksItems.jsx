import React from 'react'

const WorksItems = ({ item, onOpenGallery }) => {
  return (
    <div className='work__card' key={item.id}>
      <button
        type="button"
        className="work__img-button"
        onClick={() => onOpenGallery?.(item)}
        aria-label={`Open ${item.title} gallery`}
      >
        <img src={item.image} alt={item.title} className='work__img' loading="lazy" />
        <span className="work__img-overlay">View gallery</span>
      </button>

      <h3 className='work__title'>{item.title}</h3>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className='work__button'>
        More details
        <i className='bx bx-right-arrow-alt work__button-icon'></i>
      </a>
    </div>
  )
}

export default WorksItems
