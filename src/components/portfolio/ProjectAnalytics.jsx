import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { projectsData, projectPath } from './Data';
import { splitLocalePath } from '../../i18n/routes';
import { trackConversion } from '../../utils/analytics';

export default function ProjectAnalytics() {
  const { pathname } = useLocation();
  const previous = useRef(null);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    const { path, lang } = splitLocalePath(pathname);
    const project = projectsData.find((p) => projectPath(p) === path);
    if (project) trackConversion('project_open', { project: project.slug, locale: lang });
  }, [pathname]);
  return null;
}
