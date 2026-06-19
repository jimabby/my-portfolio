import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

const groups = [
  [
    { name: 'HTML', level: 'advanced' },
    { name: 'CSS', level: 'advanced' },
    { name: 'React', level: 'intermediate' },
  ],
  [
    { name: 'TypeScript', level: 'intermediate' },
    { name: 'Bootstrap', level: 'intermediate' },
    { name: 'Git', level: 'advanced' },
  ],
]

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
