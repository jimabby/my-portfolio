import React, { useState } from 'react'
import "./qualification.css"

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <section className='qualification section'>
      <h2 className='section__title'>Qualification</h2>
      <span className='section__subtitle'>My personal journey</span>

      <div className='qualification__container container'>
        <div className='qualification__tabs'>
          <div className={toggleState === 1 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(1)}
          >
            <i class="uil uil-graduation-cap qualification__active qualification__icon"></i> Education
          </div>
          <div className={toggleState === 2 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(2)}
          >
            <i class="uil uil-briefcase-alt qualificatione__icon"></i> Experience
          </div>
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
                  <i class='uil uil-calendar-alt'>2014 - 2018</i>
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
                  <i class='uil uil-calendar-alt'>2019 - 2022</i>
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
                  <i class='uil uil-calendar-alt'>2023</i>
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
                  <i class='uil uil-calendar-alt'>2024</i>
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
                  <i class='uil uil-calendar-alt'>2021- 2022</i>
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
                  <i class='uil uil-calendar-alt'>2022 - 2023</i>
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
                  <i class='uil uil-calendar-alt'>2023 - 2024</i>
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
                  Software Developer
                </h3>
                <span className='qualification__subtitle'>Braiv</span>
                <div className='qualification__calendar'>
                  <i class='uil uil-calendar-alt'>2024 - 2025</i>
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
