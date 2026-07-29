import { Link } from 'react-router';
import { useLocalePath } from './useLocalePath';

// Use in place of react-router's <Link> for anything inside the site. `to` is
// written as the canonical, language-independent path ("/blog/hermes") and the
// current language prefix is applied here.
const LocaleLink = ({ to, ...rest }) => {
  const withLocale = useLocalePath();
  return <Link to={withLocale(to)} {...rest} />;
};

export default LocaleLink;
