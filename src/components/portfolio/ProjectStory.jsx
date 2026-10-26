import { useEffect, useId, useState } from 'react';
import { projectsData } from './Data';
import { ProjectFacts } from './ProjectDetails';
import ProjectComparison from './ProjectComparison';
import ProjectFeatureComparison from './ProjectFeatureComparison';
import { useLanguage } from '../../i18n/LanguageContext';
import LocaleLink from '../../i18n/LocaleLink';
import Img from '../image/Img';
import { trackConversion } from '../../utils/analytics';
import './projectdetails.css';

const tours = {
  'hermes-ai-email-client': [0, 2, 1],
  'housed-redesign': [1, 7, 9],
  oncora: [0, 2, 4],
  'simba-education-cms': [2, 1, 5],
  'imperial-centre': [1, 5, 8],
  'housed-sales-system': [1, 4, 6],
};

function Walkthrough({ project, story }) {
  const { t, lang } = useLanguage();
  const id = useId();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const indices = tours[project.slug];
  const last = indices.length - 1;

  // Playback is always opt-in. Stop at the end and whenever the tab is hidden.
  useEffect(() => {
    if (!playing) return undefined;
    const timer = setTimeout(() => {
      if (step < last) setStep((value) => value + 1);
      else setPlaying(false);
    }, 5000);
    const hide = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', hide);
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', hide); };
  }, [playing, step, last]);

  const choose = (next) => { setPlaying(false); setStep(next); };
  const play = () => {
    if (playing) { setPlaying(false); return; }
    if (step === last) setStep(0);
    setPlaying(true);
    trackConversion('project_tour_play', { project: project.slug, locale: lang });
  };
  return <section className="project-tour project-panel" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>{t('improvements.tourTitle')}</h2>
    <p className="project-note">{t('improvements.tourNote')}</p>
    <ol className="project-tour__steps">
      {story.steps.map((label, index) => <li key={label}>
        <button type="button" aria-current={step === index ? 'step' : undefined} aria-controls={`${id}-screen`} onClick={() => choose(index)}>
          <span aria-hidden="true">0{index + 1}</span> {label}
        </button>
      </li>)}
    </ol>
    <figure id={`${id}-screen`} className={`project-tour__screen${project.slug === 'oncora' ? ' project-tour__screen--phone' : ''}`}>
      <Img src={project.gallery[indices[step]]} alt={`${project.title}: ${story.steps[step]}`} loading="lazy" sizes="(max-width: 640px) 90vw, 780px" />
      <figcaption aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        <strong>{t('improvements.step').replace('{n}', step + 1).replace('{total}', indices.length)}</strong>
        <span>{story.stepText[step]}</span>
      </figcaption>
    </figure>
    <div className="project-tour__controls">
      <button type="button" disabled={step === 0} onClick={() => choose(step - 1)}>{t('improvements.previous')}</button>
      <button type="button" onClick={play} aria-pressed={playing}>{t(playing ? 'improvements.pause' : step === last ? 'improvements.replay' : 'improvements.play')}</button>
      <button type="button" disabled={step === last} onClick={() => choose(step + 1)}>{t('improvements.next')}</button>
    </div>
  </section>;
}

export default function ProjectStory({ slug, showFacts = true }) {
  const { t } = useLanguage();
  const id = useId();
  const project = projectsData.find((p) => p.slug === slug);
  const story = t(`improvements.stories.${slug}`, null);
  if (!project || !story || !tours[slug]) return null;
  return <div className="project-story">
    <section className="project-panel" aria-labelledby={`${id}-title`}>
      <p className="project-eyebrow">{t('improvements.storyTitle')}</p>
      <h2 id={`${id}-title`}>{project.title}</h2>
      {showFacts && <ProjectFacts project={project} />}
      <h3>{t('improvements.problem')}</h3><p>{story.problem}</p>
      <h3>{t('improvements.decisions')}</h3>
      <ul className="project-story__decisions">{story.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
      <h3>{t('improvements.outcome')}</h3><p>{story.outcome}</p>
      <LocaleLink to="/#contact" className="project-story__contact">{t('improvements.requestDemo')} <span aria-hidden="true">↗</span></LocaleLink>
    </section>
    <ProjectComparison project={project} />
    <ProjectFeatureComparison comparison={story.comparison} />
    <Walkthrough key={slug} project={project} story={story} />
  </div>;
}
