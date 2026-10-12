import { useLanguage } from '../../i18n/LanguageContext';
import './projectdetails.css';

export function ProjectFacts({ project }) {
  const { t, lang } = useLanguage();
  const locale = { en: 'en-AU', ja: 'ja-JP', 'zh-Hans': 'zh-CN', 'zh-Hant': 'zh-TW' }[lang];
  const date = project.projectDate && new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${project.projectDate}T00:00:00Z`));
  const facts = [
    [t('casestudy.roleLabel'), project.role && t(`casestudy.roles.${project.role}`)],
    [t(date ? 'improvements.projectDate' : 'casestudy.yearLabel'), date || project.year],
    [t('casestudy.stackLabel'), project.stack?.join(' · ')],
  ].filter(([, value]) => value);
  if (!facts.length) return null;
  return <dl className="project-facts">{facts.map(([label, value]) => <div key={label}>
    <dt>{label}</dt><dd>{label === t('improvements.projectDate') ? <time dateTime={project.projectDate}>{value}</time> : value}</dd>
  </div>)}</dl>;
}
