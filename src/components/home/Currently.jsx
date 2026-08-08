import { useLanguage } from '../../i18n/LanguageContext'

// The role Jim is in right now. The qualification timeline further down the page
// carries the full history, but a visitor who reads only the hero — which is
// most of them — had no way to tell what Jim is doing at the moment.
//
// Role titles reuse the `qualification.exp.*` keys rather than restating them,
// so the hero and the timeline are translated once and cannot disagree.
const CURRENT_ROLES = [
  { key: 'housed', company: 'Cessleigh.Housed', since: '2026' },
]

const Currently = () => {
  const { t } = useLanguage()

  return (
    <div className='home__currently'>
      <span className='home__currently-label'>{t('home.currently')}</span>
      <ul className='home__currently-list'>
        {CURRENT_ROLES.map((role) => (
          <li key={role.key} className='home__currently-item'>
            <span className='home__currently-dot' aria-hidden='true'></span>
            <span className='home__currently-role'>{t(`qualification.exp.${role.key}`)}</span>
            <span className='home__currently-at'>{t('home.currentlyAt')}</span>
            <span className='home__currently-company'>{role.company}</span>
            <span className='home__currently-since'>
              {t('home.currentlySince').replace('{year}', role.since)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Currently
