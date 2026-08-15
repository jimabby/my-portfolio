// Education, experience and skills as data.
//
// All three were previously spelled out in JSX — the timeline in
// Qualification.jsx, the skill lists in Frontend.jsx and Backend.jsx. The
// resume page needs the same facts in a different shape, and a second hand
// copy of a CV is a second thing to forget to update. Everything that renders
// this information now reads it from here.
//
// `titleKey` resolves under the `qualification.edu` / `qualification.exp`
// namespaces; institutions, employers and technology names are proper nouns
// and stay untranslated.

export const education = [
  {
    titleKey: 'bsMath',
    institution: 'Michigan State University',
    period: '2014 - 2018',
    start: '2014',
    end: '2018',
  },
  {
    titleKey: 'masterIT',
    institution: 'University of Queensland',
    period: '2019 - 2022',
    start: '2019',
    end: '2022',
  },
];

// Kept separate from degrees: they are credentials, not schooling, and the
// resume page lists them as their own section.
export const certifications = [
  { titleKey: 'awsCcp', issuer: 'Amazon Web Services', period: '2023' },
  { titleKey: 'ibmData', issuer: 'IBM', period: '2024' },
  { titleKey: 'awsMl', issuer: 'Amazon Web Services', period: '2024' },
  { titleKey: 'salesforceAi', issuer: 'Salesforce', period: '2024' },
  { titleKey: 'powerBi', issuer: 'Microsoft', period: '2024' },
  { titleKey: 'oci', issuer: 'Oracle', period: '2025' },
];

// Newest last, matching the order the timeline on the home page walks. The
// resume page reverses this, because a CV leads with the current role.
export const experience = [
  { titleKey: 'moview', company: 'Moview', start: '2021', end: '2022' },
  { titleKey: 'takeaway', company: 'Takeaway Platform', start: '2022', end: '2023' },
  { titleKey: 'upward', company: 'Upward Consulting', start: '2023', end: '2024' },
  { titleKey: 'braiv', company: 'Braiv', start: '2024', end: '2025' },
  { titleKey: 'veprm', company: 'VEPRM', start: '2025', end: '2026' },
  { titleKey: 'obk', company: 'Our Big Kitchen', start: '2025', end: null },
  { titleKey: 'airbest', company: 'Airbest', start: '2026', end: '2026' },
  { titleKey: 'housed', company: 'Cessleigh.Housed', start: '2026', end: null },
];

export const frontendSkills = [
  { name: 'HTML', level: 'advanced' },
  { name: 'CSS', level: 'advanced' },
  { name: 'React', level: 'intermediate' },
  { name: 'TypeScript', level: 'intermediate' },
  { name: 'Bootstrap', level: 'intermediate' },
  { name: 'Git', level: 'advanced' },
];

export const backendSkills = [
  { name: 'Python', level: 'advanced' },
  { name: 'Java', level: 'advanced' },
  { name: 'PHP', level: 'intermediate' },
  { name: 'Node.JS', level: 'advanced' },
  { name: 'MySQL', level: 'advanced' },
  { name: 'Flutter', level: 'basic' },
];

// A role that is still running has no end year; the label depends on the
// visitor's language, so it is passed in rather than baked in here.
export const formatPeriod = (start, end, presentLabel) => {
  if (!end) return `${start} - ${presentLabel}`;
  return start === end ? start : `${start} - ${end}`;
};
