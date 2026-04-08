import React, { useState } from 'react'
import "./qualification.css"

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <section className='qualification section' id='qualification'>
      <h2 className='section__title'>Qualification</h2>
      <span className='section__subtitle'>My personal journey</span>

      <div className='qualification__container container'>
        <div className='qualification__tabs'>
          <button type="button" className={toggleState === 1 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i> Education
          </button>
          <button type="button" className={toggleState === 2 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i> Experience
          </button>
        </div>

        <div className='qualification__sections'>
          {/**Education */}
          <div className={toggleState === 1 ? "qualification__content qualification__content-active" : "qualification__content"}>
            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  Bachelor of Science in Mathematics
                </h3>
                <span className='qualification__subtitle'>Michigan State University - Institute</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2014 - 2018
                </div>
              </div>

              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
            </div>

            <div className='qualification__data'>
              <div></div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
              <div>
                <h3 className='qualification__title'>
                  Master of Information and Technology
                </h3>
                <span className='qualification__subtitle'>University of Queensland - Institute</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2019 - 2022
                </div>
              </div>
            </div>  

            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  AWS Certified Cloud Practitioner
                </h3>
                <span className='qualification__subtitle'>Amazon Web Service</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2023
                </div>
              </div>

              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
            </div>

            <div className='qualification__data'>
              <div></div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
              <div>
                <h3 className='qualification__title'>
                  IBM Data Analyst Professional Certificate
                </h3>
                <span className='qualification__subtitle'>IBM</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2024
                </div>
              </div>
            </div>  

            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  AWS Certified Machine Learning Engineer - Associate 
                </h3>
                <span className='qualification__subtitle'>Amazon Web Service</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2024
                </div>
              </div>

              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
            </div>

            <div className='qualification__data'>
              <div></div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
              <div>
                <h3 className='qualification__title'>
                  Oracle Cloud Infrastructure 2025 Certified Foundations Associate
                </h3>
                <span className='qualification__subtitle'>Oracle</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2025
                </div>
              </div>
            </div>  

          </div>

          {/**Experience */}
          <div className={toggleState === 2 ? "qualification__content qualification__content-active" : "qualification__content"}>
            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  Full Stack Developer
                </h3>
                <span className='qualification__subtitle'>Moview</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2021 - 2022
                </div>
              </div>

              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
            </div>

            <div className='qualification__data'>
              <div></div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
              <div>
                <h3 className='qualification__title'>
                  Full Stack Developer
                </h3>
                <span className='qualification__subtitle'>Takeaway Platform</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2022 - 2023
                </div>
              </div>
            </div>  

            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  Web Developer
                </h3>
                <span className='qualification__subtitle'>Upward Consulting</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2023 - 2024
                </div>
              </div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
            </div> 

            <div className='qualification__data'>
              <div></div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
              <div>
                <h3 className='qualification__title'>
                  Software Developer / Test Engineer
                </h3>
                <span className='qualification__subtitle'>Braiv</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2024 - 2025
                </div>
              </div>
            </div>  

            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  Software Developer
                </h3>
                <span className='qualification__subtitle'>VEPRM</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2025 - 2026
                </div>
              </div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
            </div>

            <div className='qualification__data'>
              <div></div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
              <div>
                <h3 className='qualification__title'>
                  Full Stack Developer
                </h3>
                <span className='qualification__subtitle'>Our Big Kitchen</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2025 - Present
                </div>
              </div>
            </div>

            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  Automation Developer
                </h3>
                <span className='qualification__subtitle'>Airbest</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2026
                </div>
              </div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
            </div>

            <div className='qualification__data'>
              <div></div>
              <div>
                <span className='qualification__rounder'></span>
                <span className='qualification__line'></span>
              </div>
              <div>
                <h3 className='qualification__title'>
                  Full Stack Developer
                </h3>
                <span className='qualification__subtitle'>Cessleigh.Housed</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2026 - Present
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Qualification
