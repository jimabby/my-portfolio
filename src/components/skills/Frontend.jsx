import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { frontendSkills } from '../qualification/resumeData'

// Two columns, split down the middle of the same list the resume page prints.
const half = Math.ceil(frontendSkills.length / 2)
const groups = [frontendSkills.slice(0, half), frontendSkills.slice(half)]

const Frontend = () => {
  const { t } = useLanguage()
  return (
    <div className='skills__content'>
      <h3 className='skills__title'>{t('skills.frontend')}</h3>
      <div className='skills__box'>
        {groups.map((group, i) => (
          <div className='skills__group' key={i}>
            {group.map((skill) => (
              <div className='skills__data' key={skill.name}>
                <i className="bx bx-badge-check"></i>
                <div>
                  <h4 className='skills__name'>{skill.name}</h4>
                  <span className='skills__level'>{t(`skills.${skill.level}`)}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Frontend
