import { useLocation } from 'react-router';
import LocaleLink from '../../i18n/LocaleLink';
import { splitLocalePath } from '../../i18n/routes';
import { projectPath } from './Data';

import { safeReturnTo } from './navigation';

export default function ProjectLink({ project, children, ...props }) {
  const location = useLocation();
  const { path } = splitLocalePath(location.pathname);
  const returnTo = path === '/work' ? `/work${location.search}`
    : path === '/' ? '/#workspace' : safeReturnTo(location.state?.returnTo) || '/work';
  return <LocaleLink to={projectPath(project)} state={{ returnTo }} {...props}>{children}</LocaleLink>;
}
