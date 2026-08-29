import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../i18n/LanguageContext';
import { HREFLANG, LOCALE_CODES, OG_LOCALE, localizedPath } from '../../i18n/routes';
import { posts } from './postsData';

const SITE_URL = 'https://jimkong-portfolio.vercel.app';
const AUTHOR = 'Jim Kong';

const BlogSEO = ({ title, description, ogImage, slug }) => {
  const { lang } = useLanguage();
  const path = `/blog/${slug}`;
  const url = `${SITE_URL}${localizedPath(lang, path)}`;
  const imageUrl = `${SITE_URL}/og/${ogImage}`;
  const datePublished = posts.find((post) => post.slug === slug)?.isoDate;

  // Article pages used to inherit the site-wide Person schema from index.html,
  // which told search engines every post was Jim's profile page. This describes
  // what the page actually is.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: [imageUrl],
    inLanguage: HREFLANG[lang],
    ...(datePublished ? { datePublished } : {}),
    author: { '@type': 'Person', name: AUTHOR, url: `${SITE_URL}/` },
    publisher: { '@type': 'Person', name: AUTHOR, url: `${SITE_URL}/` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {LOCALE_CODES.map((code) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={HREFLANG[code]}
          href={`${SITE_URL}${localizedPath(code, path)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizedPath('en', path)}`} />

      {/* Open Graph — LinkedIn, Facebook */}
      <meta property="og:type"        content="article" />
      <meta property="article:author" content={AUTHOR} />
      {datePublished && (
        <meta property="article:published_time" content={`${datePublished}T00:00:00Z`} />
      )}
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={imageUrl} />
      <meta property="og:image:type"  content="image/jpeg" />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale"      content={OG_LOCALE[lang]} />
      {LOCALE_CODES.filter((code) => code !== lang).map((code) => (
        <meta key={code} property="og:locale:alternate" content={OG_LOCALE[code]} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:url"         content={url} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default BlogSEO;
