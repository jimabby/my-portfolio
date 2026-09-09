import { useLanguage } from '../../i18n/LanguageContext'

// The role Jim is in right now. The qualification timeline further down the
// page carries the full history; this is the one-line answer to "what is he
// doing at the moment", and it opens About rather than crowding the hero.
//
// Role titles reuse the `qualification.exp.*` keys rather than restating them,
// so this block and the timeline are translated once and cannot disagree. The
// surrounding labels keep their original `home.currently*` key names so the
// four locale files did not have to be re-keyed when this moved sections.
const CURRENT_ROLES = [
  { key: 'housed', company: 'Cessleigh.Housed', since: '2026' },
]

const Currently = () => {
  const { t } = useLanguage()

  return (
    <div className='about__currently'>
      <span className='about__currently-label'>{t('home.currently')}</span>
      <ul className='about__currently-list'>
        {CURRENT_ROLES.map((role) => (
          <li key={role.key} className='about__currently-item'>
            {/* The one dot on the page, and it carries real state: this role is
                live. Steady, not blinking. */}
            <span className='about__currently-dot' aria-hidden='true'></span>
            <span className='about__currently-role'>{t(`qualification.exp.${role.key}`)}</span>
            <span className='about__currently-at'>{t('home.currentlyAt')}</span>
            <span className='about__currently-company'>{role.company}</span>
            <span className='about__currently-since'>
              {t('home.currentlySince').replace('{year}', role.since)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Currently
