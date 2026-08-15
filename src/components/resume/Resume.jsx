import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollUp from '../scrollup/ScrollUp';
import Seo, { AUTHOR, SITE_URL } from '../seo/Seo';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  backendSkills,
  certifications,
  education,
  experience,
  formatPeriod,
  frontendSkills,
} from '../qualification/resumeData';
import CV from '../../assets/Software Developer - Jim.pdf';
import './resume.css';

const EMAIL = 'wksunshine@gmail.com';
const PHONE = '+61 406 448 436';
const LOCATION = 'Sydney, Australia';

const PROFILES = [
  { label: 'GitHub', href: 'https://github.com/jimabby' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/weidong-kong-jim/' },
];

// A readable, indexable, printable resume.
//
// The PDF shipped in the bundle and was linked from two buttons, but nothing
// on the site said what was in it: the single document a visiting recruiter
// most wants was invisible to search and awkward on a phone. This is the same
// content as HTML — translated, crawlable, and styled to print onto one page.
// The PDF stays, offered as a download rather than as the only way in.
const Resume = () => {
  const { t } = useLanguage();

  // The same facts as the visible page, in the shape Google reads for a
  // person's profile page.
  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: AUTHOR,
        jobTitle: 'Full Stack Developer',
        email: `mailto:${EMAIL}`,
        url: `${SITE_URL}/resume`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sydney',
          addressCountry: 'AU',
        },
        sameAs: PROFILES.map((profile) => profile.href),
        alumniOf: education.map((entry) => ({
          '@type': 'CollegeOrUniversity',
          name: entry.institution,
        })),
        hasCredential: certifications.map((entry) => ({
          '@type': 'EducationalOccupationalCredential',
          name: t(`qualification.edu.${entry.titleKey}`),
          recognizedBy: { '@type': 'Organization', name: entry.issuer },
        })),
        knowsAbout: [...frontendSkills, ...backendSkills].map((skill) => skill.name),
      },
    }),
    [t]
  );

  // A CV leads with the current role; the home page timeline runs the other
  // way, so the shared list is reversed here rather than duplicated.
  const roles = [...experience].reverse();

  const skillGroup = (titleKey, skills) => (
    <div className="resume__skill-group">
      <h3 className="resume__skill-title">{t(titleKey)}</h3>
      <ul className="resume__skill-list">
        {skills.map((skill) => (
          <li key={skill.name} className="resume__skill">
            <span className="resume__skill-name">{skill.name}</span>
            <span className="resume__skill-level">{t(`skills.${skill.level}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Seo title={t('seo.resumeTitle')} description={t('seo.resumeDesc')} path="/resume" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />

      <main className="resume section" id="main-content">
        <article className="resume__container container">
          <header className="resume__header">
            <p className="resume__eyebrow">{t('resume.eyebrow')}</p>
            <h1 className="resume__name">{AUTHOR}</h1>
            <p className="resume__role">{t('home.subtitle')}</p>
            <p className="resume__summary">{t('resume.summary')}</p>

            <ul className="resume__contact">
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>{PHONE}</li>
              <li>{LOCATION}</li>
              {PROFILES.map((profile) => (
                <li key={profile.label}>
                  <a href={profile.href} target="_blank" rel="noopener noreferrer">
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Hidden when printing: on paper the reader already has it. */}
            <div className="resume__actions">
              <a href={CV} download className="button button--flex">
                {t('resume.download')}
                <i className="uil uil-import"></i>
              </a>
              <LocaleLink to="/work" className="button button--ghost button--flex">
                {t('resume.viewWork')}
                <i className="bx bx-right-arrow-alt"></i>
              </LocaleLink>
            </div>
          </header>

          <section className="resume__section" aria-labelledby="resume-experience">
            <h2 className="resume__section-title" id="resume-experience">
              {t('qualification.experience')}
            </h2>
            <ol className="resume__timeline">
              {roles.map((role) => (
                <li key={`${role.titleKey}-${role.start}`} className="resume__entry">
                  <div className="resume__entry-head">
                    <h3 className="resume__entry-title">{t(`qualification.exp.${role.titleKey}`)}</h3>
                    <span className="resume__entry-period">
                      {formatPeriod(role.start, role.end, t('qualification.present'))}
                    </span>
                  </div>
                  <p className="resume__entry-org">{role.company}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="resume__section" aria-labelledby="resume-skills">
            <h2 className="resume__section-title" id="resume-skills">
              {t('skills.title')}
            </h2>
            <div className="resume__skills">
              {skillGroup('skills.frontend', frontendSkills)}
              {skillGroup('skills.backend', backendSkills)}
            </div>
          </section>

          <section className="resume__section" aria-labelledby="resume-education">
            <h2 className="resume__section-title" id="resume-education">
              {t('qualification.education')}
            </h2>
            <ol className="resume__timeline">
              {education.map((entry) => (
                <li key={entry.titleKey} className="resume__entry">
                  <div className="resume__entry-head">
                    <h3 className="resume__entry-title">
                      {t(`qualification.edu.${entry.titleKey}`)}
                    </h3>
                    <span className="resume__entry-period">{entry.period}</span>
                  </div>
                  <p className="resume__entry-org">{entry.institution}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="resume__section" aria-labelledby="resume-certs">
            <h2 className="resume__section-title" id="resume-certs">
              {t('resume.certifications')}
            </h2>
            <ul className="resume__certs">
              {certifications.map((entry) => (
                <li key={entry.titleKey} className="resume__cert">
                  <span className="resume__cert-name">
                    {t(`qualification.edu.${entry.titleKey}`)}
                  </span>
                  <span className="resume__cert-meta">
                    {entry.issuer} · {entry.period}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <p className="resume__footnote">
            {t('resume.footnote')}{' '}
            <LocaleLink to="/#contact">{t('resume.getInTouch')}</LocaleLink>
          </p>
        </article>
      </main>

      <Footer />
      <ScrollUp />
    </>
  );
};

export default Resume;
