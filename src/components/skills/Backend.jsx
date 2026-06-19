import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

const groups = [
  [
    { name: 'Python', level: 'advanced' },
    { name: 'Java', level: 'advanced' },
    { name: 'PHP', level: 'intermediate' },
  ],
  [
    { name: 'Node.JS', level: 'advanced' },
    { name: 'MySQL', level: 'advanced' },
    { name: 'Flutter', level: 'basic' },
  ],
]

const Backend = () => {
  const { t } = useLanguage()
  return (
    <div className='skills__content'>
      <h3 className='skills__title'>{t('skills.backend')}</h3>
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

export default Backend
