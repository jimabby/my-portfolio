import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../i18n/LanguageContext';
import { HREFLANG, localizedPath } from '../../i18n/routes';
import { AUTHOR, SITE_URL } from '../seo/Seo';
import { projectPath } from './Data';

// Structured data for a case study.
//
// Blog posts have described themselves as BlogPosting since BlogSEO.jsx was
// written; case studies described themselves as nothing, so the only schema on
// the page was the site-wide Person block that index.html copies into every
// prerendered route — which told search engines that each case study *is*
// Jim's profile page. This says what the page actually is.
//
// CreativeWork rather than Article: a case study is a record of a thing that
// was built, not a piece of writing about one. The breadcrumb is what lets a
// result render as "jimkong-portfolio.vercel.app › Work › Pockyt" instead of a
// bare URL.
const CaseStudySchema = ({ project, summary }) => {
  const { lang } = useLanguage();

  const url = `${SITE_URL}${localizedPath(lang, projectPath(project))}`;
  const image = `${SITE_URL}/og/work/${project.slug}.jpg`;
  const author = { '@type': 'Person', name: AUTHOR, url: `${SITE_URL}/` };

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: summary,
    image: [image],
    url,
    inLanguage: HREFLANG[lang],
    author,
    creator: author,
    // The year the work was done, not the year this page was published.
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    ...(project.stack?.length > 0 ? { keywords: project.stack.join(', ') } : {}),
    ...(project.link && project.link !== '#' ? { sameAs: [project.link] } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}${localizedPath(lang, '/')}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: `${SITE_URL}${localizedPath(lang, '/work')}`,
      },
      { '@type': 'ListItem', position: 3, name: project.title, item: url },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(creativeWork)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  );
};

export default CaseStudySchema;
