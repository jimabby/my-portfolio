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
    id: '2026-09-27-film-and-code',
    date: '2026-09-27',
    tag: 'feature',
    title: {
      en: 'A new look: the home page opens like a film, then reads like code — the assistant is now a terminal and the projects sit in an editor.',
      'zh-Hans': '全新外观：首页以电影片头开场，之后以代码的语言呈现——AI 助手化身终端，项目收进一个代码编辑器。',
      'zh-Hant': '全新外觀：首頁以電影片頭開場，之後以程式碼的語言呈現——AI 助理化身終端機，專案收進一個程式碼編輯器。',
      ja: '新しいデザイン：トップページは映画のように始まり、その先はコードの言葉で語ります。AI アシスタントはターミナルに、プロジェクトはエディターの中に。',
    },
  },
  {
    id: '2026-09-27-grand-hotel-film',
    date: '2026-09-27',
    tag: 'blog',
    title: {
      en: 'The Grand Hotel Taipei photo essay now plays like a film, from title card to end credits.',
      'zh-Hans': '圆山大饭店摄影随笔现在像一部电影般展开，从片头字幕到片尾名单。',
      'zh-Hant': '圓山大飯店攝影隨筆現在像一部電影般展開，從片頭字幕到片尾名單。',
      ja: '圓山大飯店のフォトエッセイが、タイトルカードからエンドクレジットまで映画のように展開するようになりました。',
    },
  },
  {
    id: '2026-09-24-policy-time-machine',
    date: '2026-09-24',
    tag: 'blog',
    title: {
      en: 'New post: Policy Time Machine — trying tomorrow’s rules on yesterday’s decisions, with a demo video.',
      'zh-Hans': '新文章：Policy Time Machine——用明天的规则重审昨天的决定，附演示视频。',
      'zh-Hant': '新文章：Policy Time Machine——用明天的規則重審昨天的決定，附示範影片。',
      ja: '新記事：Policy Time Machine — 明日のルールで昨日の判断を検証する。デモ動画付き。',
    },
  },
  {
    id: '2026-08-29-work-filters',
    date: '2026-08-29',
    tag: 'feature',
    title: {
      en: 'The project index can now be filtered by category, search, and tags — and every filtered view is a link you can share.',
      'zh-Hans': '项目索引页现在可以按分类、关键词和标签筛选，每一种筛选结果都能以链接分享。',
      'zh-Hant': '專案索引頁現在可以依分類、關鍵字與標籤篩選，每一種篩選結果都能以連結分享。',
      ja: 'プロジェクト一覧をカテゴリー・キーワード・タグで絞り込めるようになり、絞り込んだ状態をそのままリンクで共有できます。',
    },
  },
  {
    id: '2026-08-20-housed',
    date: '2026-08-20',
    tag: 'project',
    title: {
      en: 'New project: the Housed redesign, with a full write-up.',
      'zh-Hans': '新增项目：Housed 改版，附完整说明文章。',
      'zh-Hant': '新增專案：Housed 改版，附完整說明文章。',
      ja: '新プロジェクト：Housed のリデザインを、詳しい解説記事とともに掲載しました。',
    },
  },
  {
    id: '2026-08-16-offline',
    date: '2026-08-16',
    tag: 'feature',
    title: {
      en: 'The site now works offline and can be installed as an app.',
      'zh-Hans': '网站现已支持离线浏览，也可以作为应用安装。',
      'zh-Hant': '網站現已支援離線瀏覽，也可以作為應用程式安裝。',
      ja: 'オフラインでも閲覧でき、アプリとしてインストールできるようになりました。',
    },
  },
  {
    id: '2026-08-16-resume-and-work',
    date: '2026-08-16',
    tag: 'feature',
    title: {
      en: 'A full resume page, a single index of every project, and shareable blog filters.',
      'zh-Hans': '新增完整的简历页面、汇总所有项目的索引页，以及可分享的博客筛选链接。',
      'zh-Hant': '新增完整的履歷頁面、彙整所有專案的索引頁，以及可分享的網誌篩選連結。',
      ja: '完全な履歴書ページ、全プロジェクトの一覧ページ、共有できるブログの絞り込みを追加しました。',
    },
  },
  {
    id: '2026-07-30-case-study-notes',
    date: '2026-07-30',
    tag: 'feature',
    title: {
      en: 'Every case study screenshot now comes with a note on what it shows and why.',
      'zh-Hans': '项目详情页的每张截图，现在都配有说明：画面内容以及这样设计的原因。',
      'zh-Hant': '專案詳情頁的每張截圖，現在都配有說明：畫面內容以及這樣設計的原因。',
      ja: 'ケーススタディの各スクリーンショットに、何を映し、なぜそうしたかの解説を追加しました。',
    },
  },
  {
    id: '2026-07-29-case-studies',
    date: '2026-07-29',
    tag: 'project',
    title: {
      en: 'Each project now has its own page, so any piece of work can be linked and shared.',
      'zh-Hans': '每个项目都拥有独立页面，任何一件作品都可以单独链接与分享。',
      'zh-Hant': '每個專案都擁有獨立頁面，任何一件作品都可以單獨連結與分享。',
      ja: '各プロジェクトに専用ページを用意し、個々の作品をリンク・共有できるようになりました。',
    },
  },
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
