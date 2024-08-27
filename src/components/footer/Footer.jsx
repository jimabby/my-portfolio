import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        <h1 className='footer__title'>Jim</h1>
        <ul className='footer__list'>
          <li>
            <a href='#about' className='footer__link'>About</a>
          </li>
          <li>
            <a href='#portfolio' className='footer__link'>Portfolio</a>
          </li>
          <li>
            <a href='#testimonial' className='footer__link'>Testimonials</a>
          </li>
        </ul>

        <div className='footer__social'>
          <a href='https://www.facebook.com/weidong.kong/' className='footer__social-link' target='_blank'>
            <i class='bx bxl-facebook'></i>
          </a>

          <a href='https://www.instagram.com/wkongjim/' className='footer__social-link' target='_blank'>
            <i class='bx bxl-instagram'></i>
          </a>

          <a href='https://x.com/Weidong_jim' className='footer__social-link' target='_blank'>
            <i class='bx bxl-twitter'></i>
          </a>
        </div>

        <span className='footer__copyright'>&#169; Jim All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
