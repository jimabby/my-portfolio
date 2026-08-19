// Every language's project summaries in one object.
//
// Build-time only: scripts/generate-route-html.mjs prerenders all four
// languages in a single pass, so it genuinely needs all four. The app imports
// ./projects/<lang>.mjs instead, one at a time — importing this file from
// application code would put every language back in the entry bundle.
import en from './projects/en.mjs';
import zhHans from './projects/zh-Hans.mjs';
import zhHant from './projects/zh-Hant.mjs';
import ja from './projects/ja.mjs';

export const projectSummaries = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
  ja,
};

export default projectSummaries;
