import React, { useState } from 'react'
import "./services.css"

const Services = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <section className='services section' id='services'>
      <h2 className='section__title'>Services</h2>
      <span className='section__subtitle'>What I can offer</span>

      <div className='services__container container grid'>
        <div className='services__content'>
          <div>
            <i class="uil uil-web-grid services_icon"></i>
            <h3 className='services__title'>
              Full-Stack <br /> Developer
            </h3>
          </div>

          <span className='services__button' onClick={() => toggleTab(1)}>
            View More
            <i class="uil uil-arrow-right services__button-icon"></i>
          </span>

          <div className={toggleState === 1 ? "services__model active-model": "services__model"}>
            <div className='services__model-content'>
              <i onClick={() => toggleTab(0)} class="uil uil-times services__model-close"></i>

              <h3 className='services__model-title'>
                Full-Stack Developer
              </h3>

              <p className='services__model-description'>
                Service with more than three years of experience. 
                Providing quality work to clients and companies.
              </p>

              <ul className='services__model-services grid'>
                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I design and build functional, user-friendly websites.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I work with HTML, CSS, JavaScript and database for development.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I ensure seamless integration between user interfaces and server logic.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I optimize applications for performance, scalability, and security.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I stay updated with the latest development tools and frameworks.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='services__content'>
          <div>
            <i class="uil uil-arrow services_icon"></i>
            <h3 className='services__title'>
              Software <br /> Developer
            </h3>
          </div>

          <span className='services__button' onClick={() => toggleTab(2)}>
            View More
            <i class="uil uil-arrow-right services__button-icon"></i>
          </span>

          <div className={toggleState === 2 ? "services__model active-model": "services__model"}>
            <div className='services__model-content'>
              <i onClick={() => toggleTab(0)} class="uil uil-times services__model-close"></i>

              <h3 className='services__model-title'>
                Software Developer
              </h3>

              <p className='services__model-description'>
                Service with more than three years of experience. 
                Providing quality work to clients and companies.
              </p>

              <ul className='services__model-services grid'>
                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I design and build software applications to solve complex problems.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I use programming languages like Python, Java, and C++.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I focus on creating efficient, scalable, and reliable solutions.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I test and debug code to ensure software quality.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I continuously learn new technologies to improve my development skills.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='services__content'>
          <div>
            <i class="uil uil-edit services_icon"></i>
            <h3 className='services__title'>
              Data <br /> Analyst
            </h3>
          </div>

          <span className='services__button' onClick={() => toggleTab(3)}>
            View More
            <i class="uil uil-arrow-right services__button-icon"></i>
          </span>

          <div className={toggleState === 3 ? "services__model active-model": "services__model"}>
            <div className='services__model-content'>
              <i onClick={() => toggleTab(0)} class="uil uil-times services__model-close"></i>

              <h3 className='services__model-title'>
                Data Analyst
              </h3>

              <p className='services__model-description'>
                Service with more than three years of experience. 
                Providing quality work to clients and companies.
              </p>

              <ul className='services__model-services grid'>
                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I analyze data to uncover trends and insights.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I use tools like Excel, SQL, and Python for data analysis.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I create visualizations to make data easier to understand.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I help businesses make informed decisions based on data.
                  </p>
                </li>

                <li className='services__model-service'>
                  <i class="uil uil-check-circle services__model-icon"></i>
                  <p className='services__model-info'>
                    I continuously learn new techniques to enhance my analysis skills.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
