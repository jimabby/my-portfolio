// Builds one web app manifest per language.
//
// A single manifest with `start_url: "/"` meant a visitor who installed the
// site from /ja got an app that opened in English every time. The manifest is
// static, so the only way to fix it is to serve a different one per language
// and point each prerendered page at its own.
//
// `scope` deliberately stays "/" rather than narrowing to the language prefix:
// the language switcher and the assistant both link across languages, and a
// scoped-out navigation would kick the visitor from the installed app into a
// browser tab.
//
// `id` is what a browser uses to decide whether an install is the same app. It
// differs per language, so a Japanese install and an English one coexist
// instead of overwriting each other's identity.
//
// Shared by the build (scripts/generate-route-html.mjs) and the Vite dev
// middleware, so a localized manifest is not a dead link in dev.
import { manifestStrings } from '../src/i18n/manifest.mjs';
import { LOCALES, localizedPath } from './site-routes.mjs';

const HREFLANG = { en: 'en', 'zh-Hans': 'zh-Hans', 'zh-Hant': 'zh-Hant', ja: 'ja' };

// English keeps /manifest.json so an already-installed app and any external
// reference to it keep resolving.
export const manifestPath = (lang) =>
  lang === 'en' ? '/manifest.json' : `/manifest.${lang}.json`;

export const buildManifest = (lang) => {
  const strings = manifestStrings[lang] ?? manifestStrings.en;
  const start = localizedPath(lang, '/');

  return {
    id: start,
    short_name: strings.short_name,
    name: strings.name,
    description: strings.description,
    icons: [
      { src: '/icons/icon-192.png', type: 'image/png', sizes: '192x192', purpose: 'any' },
      { src: '/icons/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'any' },
      { src: '/icons/maskable-512.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
    ],
    screenshots: [
      {
        src: '/screenshots/home-wide.webp',
        type: 'image/webp',
        sizes: '1280x800',
        form_factor: 'wide',
        label: strings.name,
      },
      {
        src: '/screenshots/home-narrow.webp',
        type: 'image/webp',
        sizes: '540x1170',
        form_factor: 'narrow',
        label: strings.name,
      },
    ],
    start_url: start,
    scope: '/',
    display: 'standalone',
    theme_color: '#f7f7f7',
    background_color: '#f7f7f7',
    categories: ['portfolio', 'productivity', 'education'],
    lang: HREFLANG[lang] ?? 'en',
    dir: 'ltr',
  };
};

export const allManifests = () =>
  LOCALES.map((lang) => ({ lang, path: manifestPath(lang), manifest: buildManifest(lang) }));
