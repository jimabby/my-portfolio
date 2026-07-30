// Side-effect module: hands the per-image case study captions to the language
// context. CaseStudy.jsx imports it, so the text rides in the lazily loaded
// case study chunk instead of the entry bundle — the same arrangement the blog
// uses for article prose (see ../posts/register.js). Four languages of caption
// for 80-odd screenshots has no business loading for someone who only reads
// the home page.
import { registerDictionary } from '../LanguageContext';
import { projectCaptions } from './index';

registerDictionary({
  en: { captions: projectCaptions.en },
  'zh-Hans': { captions: projectCaptions['zh-Hans'] },
  'zh-Hant': { captions: projectCaptions['zh-Hant'] },
  ja: { captions: projectCaptions.ja },
});
