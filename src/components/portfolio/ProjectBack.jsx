import { useLocation } from 'react-router';
import LocaleLink from '../../i18n/LocaleLink';
import { useLanguage } from '../../i18n/LanguageContext';
import { safeReturnTo } from './navigation';

export default function ProjectBack({ blog = false, className }) {
  const { state } = useLocation();
  const { t } = useLanguage();
  const returnTo = safeReturnTo(state?.returnTo);
  return <LocaleLink to={returnTo || (blog ? '/blog' : '/work')} className={className}>
    {t(returnTo || !blog ? 'casestudy.backToWork' : 'blog.backToBlog')}
  </LocaleLink>;
}
