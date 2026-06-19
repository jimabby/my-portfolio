import { useLanguage } from '../../i18n/LanguageContext';

const SITE_URL = 'https://jimkong-portfolio.vercel.app';

const BlogShareButtons = ({ title }) => {
  const { t } = useLanguage();
  const url = encodeURIComponent(`${SITE_URL}${window.location.pathname}`);
  const text = encodeURIComponent(title);

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  const twitterUrl  = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  const redditUrl   = `https://www.reddit.com/submit?url=${url}&title=${text}`;

  return (
    <div className="blog__share">
      <div className="blog__share-divider">
        <span className="blog__share-heading">{t('blog.shareArticle')}</span>
      </div>
      <div className="blog__share-buttons">
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="blog__share-btn blog__share-btn--linkedin" aria-label={t('blog.shareOn').replace('{platform}', 'LinkedIn')}>
          <i className="bx bxl-linkedin-square"></i>
          <span>LinkedIn</span>
        </a>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="blog__share-btn blog__share-btn--twitter" aria-label={t('blog.shareOn').replace('{platform}', 'Twitter')}>
          <i className="bx bxl-twitter"></i>
          <span>Twitter</span>
        </a>
        <a href={redditUrl} target="_blank" rel="noopener noreferrer" className="blog__share-btn blog__share-btn--reddit" aria-label={t('blog.shareOn').replace('{platform}', 'Reddit')}>
          <i className="bx bxl-reddit"></i>
          <span>Reddit</span>
        </a>
      </div>
    </div>
  );
};

export default BlogShareButtons;
