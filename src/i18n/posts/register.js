// Side-effect module: hands the long-form article prose to the language
// context. Every blog component imports this, so the content is pulled into the
// blog chunk rather than the entry bundle, and the entry bundle never carries
// four articles × four languages for visitors who only look at the home page.
//
// This runs during module evaluation of the blog chunk, which completes before
// React renders any component from that chunk — so `t('posts...')` resolves on
// the first render with no loading state and no flash of raw key names.
import { registerDictionary } from '../LanguageContext';
import { postsContent } from './index';

registerDictionary({
  en: { posts: postsContent.en },
  'zh-Hans': { posts: postsContent['zh-Hans'] },
  'zh-Hant': { posts: postsContent['zh-Hant'] },
  ja: { posts: postsContent.ja },
});
