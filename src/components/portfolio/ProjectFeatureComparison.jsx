import { useId } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './projectdetails.css';

// A feature-by-feature table for projects that replaced another product, where
// a before/after screenshot slider would mean publishing someone else's UI.
// Cells are 'yes', 'no', or a short phrase when the answer needs qualifying.
// data-label names the column when phones stack each row into a card.
function Cell({ value, label }) {
  const { t } = useLanguage();
  if (value === 'yes') return <td data-label={label}><span className="project-features__mark" aria-hidden="true">✓</span><span className="project-sr-only">{t('improvements.featureYes')}</span></td>;
  if (value === 'no') return <td data-label={label}><span className="project-features__mark project-features__mark--no" aria-hidden="true">—</span><span className="project-sr-only">{t('improvements.featureNo')}</span></td>;
  return <td data-label={label}>{value}</td>;
}

export default function ProjectFeatureComparison({ comparison }) {
  const id = useId();
  if (!comparison) return null;
  const [feature, before, after] = comparison.columns;
  return <section className="project-features project-panel" aria-labelledby={`${id}-title`}>
    <p className="project-eyebrow">{comparison.eyebrow}</p>
    <h2 id={`${id}-title`}>{comparison.title}</h2>
    <p>{comparison.intro}</p>
    <div className="project-features__scroll" role="region" aria-labelledby={`${id}-title`} tabIndex={0}>
      <table className="project-features__table">
        <thead><tr><th scope="col">{feature}</th><th scope="col">{before}</th><th scope="col">{after}</th></tr></thead>
        {comparison.groups.map((group) => <tbody key={group.label}>
          <tr className="project-features__group"><th scope="colgroup" colSpan={3}>{group.label}</th></tr>
          {group.rows.map(([name, a, b]) => <tr key={name}><th scope="row">{name}</th><Cell value={a} label={before} /><Cell value={b} label={after} /></tr>)}
        </tbody>)}
      </table>
    </div>
    <p className="project-note">{comparison.note}</p>
  </section>;
}
