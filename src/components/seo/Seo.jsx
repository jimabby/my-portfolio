import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../i18n/LanguageContext';
import { HREFLANG, LOCALE_CODES, OG_LOCALE, localizedPath } from '../../i18n/routes';

export const SITE_URL = 'https://jimkong-portfolio.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/og/hermes.webp`;

// Per-page document head. `path` is the canonical, language-independent path
// ("/blog") — the language prefix is applied here, and every translation is
// declared as an alternate so search engines can discover all four and treat
// them as the same page rather than as duplicates.
const Seo = ({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  noindex = false,
  children,
}) => {
  const { lang } = useLanguage();
  const url = `${SITE_URL}${localizedPath(lang, path)}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Alternates are pointless on a page we are asking not to be indexed. */}
      {!noindex &&
        LOCALE_CODES.map((code) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={HREFLANG[code]}
            href={`${SITE_URL}${localizedPath(code, path)}`}
          />
        ))}
      {!noindex && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${SITE_URL}${localizedPath('en', path)}`}
        />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      {LOCALE_CODES.filter((code) => code !== lang).map((code) => (
        <meta key={code} property="og:locale:alternate" content={OG_LOCALE[code]} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}
    </Helmet>
  );
};

export default Seo;
