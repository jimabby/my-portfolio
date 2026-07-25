// Site changelog shown in the header's update dot, newest first.
//
// The first entry's `id` is what the "new update" indicator compares against:
// once a visitor opens the panel, that id is stored and the dot goes quiet
// until a newer entry is added at the top. Ids are never reused.
//
// `tag` maps to a label under the `updates.tags` translation namespace.
// Product/brand names are kept in their original form.

export const UPDATES = [
  {
    id: '2026-07-26-hvac-projects',
    date: '2026-07-26',
    tag: 'project',
    title: {
      en: 'Three new HVAC projects: Airbest, Aus Global Trading, and Aircon Solutions.',
      'zh-Hans': '新增三个暖通空调行业项目：Airbest、Aus Global Trading 和 Aircon Solutions。',
      'zh-Hant': '新增三個暖通空調產業專案：Airbest、Aus Global Trading 與 Aircon Solutions。',
      ja: '空調業界の新規プロジェクトを3件追加：Airbest、Aus Global Trading、Aircon Solutions。',
    },
  },
  {
    id: '2026-07-09-simba-health-original',
    date: '2026-07-09',
    tag: 'project',
    title: {
      en: 'Added the original Simba Health build alongside its redesign.',
      'zh-Hans': '在改版作品之外，补充了 Simba Health 的原始版本。',
      'zh-Hant': '在改版作品之外，補充了 Simba Health 的原始版本。',
      ja: 'Simba Health のリニューアル版に加えて、初期版も掲載しました。',
    },
  },
  {
    id: '2026-06-19-multi-language',
    date: '2026-06-19',
    tag: 'feature',
    title: {
      en: 'The site now reads in English, 简体中文, 繁體中文, and 日本語.',
      'zh-Hans': '网站现已支持 English、简体中文、繁體中文 与 日本語。',
      'zh-Hant': '網站現已支援 English、简体中文、繁體中文 與 日本語。',
      ja: 'English・简体中文・繁體中文・日本語の4言語に対応しました。',
    },
  },
  {
    id: '2026-06-19-simba-projects',
    date: '2026-06-19',
    tag: 'project',
    title: {
      en: 'Added the Simba Education, Simba Health, and Simba Hearing projects.',
      'zh-Hans': '新增 Simba Education、Simba Health 与 Simba Hearing 项目。',
      'zh-Hant': '新增 Simba Education、Simba Health 與 Simba Hearing 專案。',
      ja: 'Simba Education、Simba Health、Simba Hearing のプロジェクトを追加。',
    },
  },
  {
    id: '2026-06-04-grand-hotel-taipei',
    date: '2026-06-04',
    tag: 'blog',
    title: {
      en: 'New post: a photo essay on the Grand Hotel Taipei.',
      'zh-Hans': '新文章：圆山大饭店的摄影随笔。',
      'zh-Hant': '新文章：圓山大飯店的攝影隨筆。',
      ja: '新記事：圓山大飯店のフォトエッセイ。',
    },
  },
  {
    id: '2026-03-25-dark-mode',
    date: '2026-03-25',
    tag: 'feature',
    title: {
      en: 'Dark mode, plus a smoother project gallery and accessibility fixes.',
      'zh-Hans': '新增深色模式，并优化项目图库与无障碍体验。',
      'zh-Hant': '新增深色模式，並優化專案圖庫與無障礙體驗。',
      ja: 'ダークモードを追加し、プロジェクトギャラリーとアクセシビリティを改善。',
    },
  },
  {
    id: '2026-03-17-blog-tools',
    date: '2026-03-17',
    tag: 'blog',
    title: {
      en: 'The blog gained search, category filters, and sharing.',
      'zh-Hans': '博客新增搜索、分类筛选与分享功能。',
      'zh-Hant': '網誌新增搜尋、分類篩選與分享功能。',
      ja: 'ブログに検索・カテゴリー絞り込み・シェア機能を追加。',
    },
  },
  {
    id: '2026-03-07-assistant',
    date: '2026-03-07',
    tag: 'feature',
    title: {
      en: 'An AI assistant you can ask about my work and background.',
      'zh-Hans': '上线 AI 助手，可随时询问我的作品与经历。',
      'zh-Hant': '上線 AI 助理，可隨時詢問我的作品與經歷。',
      ja: '作品や経歴について質問できる AI アシスタントを公開。',
    },
  },
];

// The newest entry decides whether the dot lights up.
export const LATEST_UPDATE_ID = UPDATES[0]?.id ?? '';
