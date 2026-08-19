// Web app manifest strings, one set per language.
//
// Deliberately NOT in translations.js: nothing in the running app reads these,
// only the build does, so putting them in the entry dictionary would ship four
// languages of PWA metadata to every visitor for no benefit. `.mjs` for the
// same reason projects.mjs is — the build scripts are plain Node and cannot
// import an ESM `.js` file from a CommonJS package.
//
// Wording matches seo.homeTitle / seo.homeDesc in translations.js, so the
// install prompt reads like the page it was installed from.
export const manifestStrings = {
  en: {
    name: 'Jim Kong | Full Stack Developer Portfolio',
    short_name: 'Jim Kong',
    description:
      'Portfolio, projects, blog, and contact details for Jim Kong, a full stack developer in Sydney.',
  },
  'zh-Hans': {
    name: 'Jim Kong | 全栈开发者作品集',
    short_name: 'Jim Kong',
    description: 'Jim Kong 的作品集、项目、博客与联系方式——一位位于悉尼的全栈开发者。',
  },
  'zh-Hant': {
    name: 'Jim Kong | 全端開發者作品集',
    short_name: 'Jim Kong',
    description: 'Jim Kong 的作品集、專案、網誌與聯絡方式——一位位於雪梨的全端開發者。',
  },
  ja: {
    name: 'Jim Kong | フルスタック開発者ポートフォリオ',
    short_name: 'Jim Kong',
    description:
      'シドニーを拠点とするフルスタック開発者 Jim Kong のポートフォリオ、プロジェクト、ブログ、連絡先。',
  },
};

export default manifestStrings;
