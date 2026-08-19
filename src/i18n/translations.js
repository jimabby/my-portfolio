// Every language's UI strings in one object.
//
// BUILD AND TEST ONLY. Importing this from application code statically pulls
// all four dictionaries into whatever chunk does it — which is exactly the
// ~14 kB gzipped of unread languages that splitting them into ./locales/*.js
// removed from the entry bundle. A test in src/test/translations.test.js fails
// if an app module imports it.
//
// The app loads one language at a time through ./locales/index.js instead.
// Tests use this file because checking key parity across languages is the one
// job that genuinely needs all four at once.
import en from './locales/en.js';
import zhHans from './locales/zh-Hans.js';
import zhHant from './locales/zh-Hant.js';
import ja from './locales/ja.js';

export const translations = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
  ja,
};

export default translations;
