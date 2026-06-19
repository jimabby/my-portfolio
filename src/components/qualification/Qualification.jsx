import React, { useState } from 'react'
import "./qualification.css"
import { useLanguage } from '../../i18n/LanguageContext'

const Qualification = () => {
  const { t } = useLanguage()
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <section className='qualification section' id='qualification'>
      <h2 className='section__title'>{t('qualification.title')}</h2>
      <span className='section__subtitle'>{t('qualification.subtitle')}</span>

      <div className='qualification__container container'>
        <div className='qualification__tabs'>
          <button type="button" className={toggleState === 1 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i> {t('qualification.education')}
          </button>
          <button type="button" className={toggleState === 2 ? "qualification__button qualification__active button--flex" : "qualification__button button--flex"}
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i> {t('qualification.experience')}
          </button>
        </div>

        <div className='qualification__sections'>
          {/**Education */}
          <div className={toggleState === 1 ? "qualification__content qualification__content-active" : "qualification__content"}>
            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  {t('qualification.edu.bsMath')}
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
                  {t('qualification.edu.masterIT')}
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
                  {t('qualification.edu.awsCcp')}
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
                  {t('qualification.edu.ibmData')}
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
                  {t('qualification.edu.awsMl')}
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
                  {t('qualification.edu.oci')}
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
                  {t('qualification.exp.moview')}
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
                  {t('qualification.exp.takeaway')}
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
                  {t('qualification.exp.upward')}
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
                  {t('qualification.exp.braiv')}
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
                  {t('qualification.exp.veprm')}
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
                  {t('qualification.exp.obk')}
                </h3>
                <span className='qualification__subtitle'>Our Big Kitchen</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2025 - {t('qualification.present')}
                </div>
              </div>
            </div>

            <div className='qualification__data'>
              <div>
                <h3 className='qualification__title'>
                  {t('qualification.exp.airbest')}
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
                  {t('qualification.exp.housed')}
                </h3>
                <span className='qualification__subtitle'>Cessleigh.Housed</span>
                <div className='qualification__calendar'>
                  <i className='uil uil-calendar-alt'></i> 2026 - {t('qualification.present')}
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
