import { useId, useState } from 'react';
import { projectsData } from './Data';
import { useLanguage } from '../../i18n/LanguageContext';
import Img from '../image/Img';
import './projectdetails.css';

const originals = {
  'housed-redesign': 'housed',
  'simba-education-new-build': 'simba-education',
  'simba-education-redesign': 'simba-education',
  'simba-health-redesign': 'simba-health-original',
};

export default function ProjectComparison({ project }) {
  const { t } = useLanguage();
  const id = useId();
  const [position, setPosition] = useState(50);
  const before = projectsData.find((p) => p.slug === originals[project.slug]);
  if (!before) return null;
  return <section className="project-comparison project-panel" aria-labelledby={`${id}-title`}>
    <p className="project-eyebrow">{project.title}</p>
    <h2 id={`${id}-title`}>{t('improvements.compareTitle')}</h2>
    <p>{t(`improvements.comparisonNotes.${project.slug}`)}</p>
    <div className="project-comparison__frame">
      <Img src={before.image} alt={`${t('improvements.before')}: ${before.title}`} loading="lazy" sizes="(max-width: 860px) 100vw, 820px" />
      <div className="project-comparison__after" style={{ clipPath: `inset(0 0 0 ${100 - position}%)` }}>
        <Img src={project.image} alt={`${t('improvements.after')}: ${project.title}`} loading="lazy" sizes="(max-width: 860px) 100vw, 820px" />
      </div>
      <span className="project-comparison__divider" style={{ left: `${100 - position}%` }} aria-hidden="true" />
    </div>
    <div className="project-comparison__controls">
      <button type="button" onClick={() => setPosition(0)}>{t('improvements.before')}</button>
      <label className="project-sr-only" htmlFor={id}>{t('improvements.reveal')}</label>
      <input id={id} type="range" min="0" max="100" value={position}
        aria-valuetext={t('improvements.revealValue').replace('{n}', position)} onChange={(e) => setPosition(Number(e.target.value))} />
      <button type="button" onClick={() => setPosition(100)}>{t('improvements.after')}</button>
    </div>
    <p className="project-note">{t('improvements.compareNote')}</p>
  </section>;
}
