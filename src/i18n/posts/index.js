// Per-language content for the long-form blog articles. Each post owns one
// file exporting { en, 'zh-Hans', 'zh-Hant', ja }. They are merged here under
// a camelCase key derived from the post slug, e.g. 'm-mode' -> mMode.
import hermes from './hermes';
import hiro from './hiro';
import mMode from './mMode';
import grandHotelTaipei from './grandHotelTaipei';

const sources = { hermes, hiro, mMode, grandHotelTaipei };

const LANGS = ['en', 'zh-Hans', 'zh-Hant', 'ja'];

export const postsContent = LANGS.reduce((acc, lang) => {
  acc[lang] = {};
  for (const [key, src] of Object.entries(sources)) {
    acc[lang][key] = src[lang] || src.en;
  }
  return acc;
}, {});
