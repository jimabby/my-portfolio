import { useLocation } from 'react-router';
import { useLanguage } from '../../i18n/LanguageContext';
import './share.css';

const SITE_URL = 'https://jimkong-portfolio.vercel.app';

// The share block that used to live only on blog articles. Case studies are
// the pages most likely to be sent to a recruiter and had no way to do it.
//
// The URL comes from the router rather than window.location so it is correct
// on the first render after an in-app navigation, and it keeps whatever
// language prefix the visitor is reading — sharing the Japanese page should
// not hand someone the English one.
const ShareButtons = ({ title, heading }) => {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  const url = encodeURIComponent(`${SITE_URL}${pathname}`);
  const text = encodeURIComponent(title);

  const targets = [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: 'bxl-linkedin-square',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      key: 'twitter',
      label: 'Twitter',
      icon: 'bxl-twitter',
      href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    },
    {
      key: 'reddit',
      label: 'Reddit',
      icon: 'bxl-reddit',
      href: `https://www.reddit.com/submit?url=${url}&title=${text}`,
    },
  ];

  return (
    <div className="share">
      <div className="share__divider">
        <span className="share__heading">{heading ?? t('blog.shareArticle')}</span>
      </div>
      <div className="share__buttons">
        {targets.map((target) => (
          <a
            key={target.key}
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`share__btn share__btn--${target.key}`}
            aria-label={t('blog.shareOn').replace('{platform}', target.label)}
          >
            <i className={`bx ${target.icon}`}></i>
            <span>{target.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
