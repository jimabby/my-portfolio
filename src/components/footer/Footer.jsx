import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        <Link to="/" className='footer__title'>Jim</Link>
        <ul className='footer__list'>
          <li>
            <Link to="/#about" className='footer__link'>About</Link>
          </li>
          <li>
            <Link to="/#portfolio" className='footer__link'>Portfolio</Link>
          </li>
          <li>
            <Link to="/#testimonial" className='footer__link'>Testimonials</Link>
          </li>
        </ul>

        <div className='footer__social'>
          <a href='https://www.facebook.com/weidong.kong/' className='footer__social-link' target='_blank' rel='noopener noreferrer'>
            <i className='bx bxl-facebook'></i>
          </a>

          <a href='https://www.instagram.com/wkongjim/' className='footer__social-link' target='_blank' rel='noopener noreferrer'>
            <i className='bx bxl-instagram'></i>
          </a>

          <a href='https://x.com/Weidong_jim' className='footer__social-link' target='_blank' rel='noopener noreferrer'>
            <i className='bx bxl-twitter'></i>
          </a>
        </div>

        <span className='footer__copyright'>&#169; {new Date().getFullYear()} Jim. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
