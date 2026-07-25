import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://jimkong-portfolio.vercel.app';

const BlogSEO = ({ title, description, ogImage, slug }) => {
  const url      = `${SITE_URL}/blog/${slug}`;
  const imageUrl = `${SITE_URL}/og/${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph — LinkedIn, Facebook */}
      <meta property="og:type"        content="article" />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={imageUrl} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:url"         content={url} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={imageUrl} />
    </Helmet>
  );
};

export default BlogSEO;
