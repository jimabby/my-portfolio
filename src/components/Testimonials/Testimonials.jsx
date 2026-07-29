import React, { useRef, useState } from 'react'
import "./testimonials.css"
import Data from './Data';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from 'swiper/modules';
import { useLanguage } from '../../i18n/LanguageContext';
import Img from '../image/Img';

const CHAR_LIMIT = 200;

const TestimonialCard = ({ image, title, description }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > CHAR_LIMIT;
  const displayText = !isLong || expanded ? description : description.slice(0, CHAR_LIMIT) + '...';

  return (
    <>
      {image
        ? <Img src={image} alt={`${title}'s photo`} className='testimonial__img'  sizes="60px"/>
        : <div className='testimonial__img testimonial__img-placeholder'><i className='uil uil-user'></i></div>
      }
      <h3 className='testimonial__name'>{title}</h3>
      <p className='testimonial__description'>{displayText}</p>
      {isLong && (
        <button type="button" className='testimonial__toggle' onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? t('testimonials.showLess') : t('testimonials.readMore')}
        </button>
      )}
    </>
  );
};

const Testimonials = () => {
  const { t } = useLanguage();
  const swiperRef = useRef(null);

  return (
    <section className='testimonial container section' id="testimonial">
      <h2 className='section__title'>{t('testimonials.title')}</h2>
      <span className='section__subtitle'>{t('testimonials.subtitle')}</span>

      <div className='testimonial__wrapper'>
        <button type="button" className='testimonial__nav testimonial__nav-prev' onClick={() => swiperRef.current?.slidePrev()} aria-label={t('testimonials.prev')}>
          <i className='uil uil-angle-left'></i>
        </button>

        <Swiper className='testimonial__container'
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          loop={true}
          grabCursor={true}
          spaceBetween={24}
          pagination={{clickable: true}}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 48
            },
          }}
          modules={[Pagination]}
        >
          {Data.map(({id, image, title, description}) => {
            return (
              <SwiperSlide className='testimonial__card' key={id}>
                <TestimonialCard image={image} title={title} description={description} />
              </SwiperSlide>
            )
          })}
        </Swiper>

        <button type="button" className='testimonial__nav testimonial__nav-next' onClick={() => swiperRef.current?.slideNext()} aria-label={t('testimonials.next')}>
          <i className='uil uil-angle-right'></i>
        </button>
      </div>
    </section>
  )
}

export default Testimonials
