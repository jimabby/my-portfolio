# My Portfolio

Personal portfolio and blog built with React + Vite, deployed on Vercel.

## Tech Stack

- **React 19** + React Router v8
- **Vite** (build tool)
- **Plain CSS** (component-level styles)

## Available Scripts

### `npm run dev`

Starts the development server at [http://localhost:5173](http://localhost:5173).
Runs `npm run images` first.

### `npm run build`

Builds the app for production to the `dist` folder. Runs `npm run images` first,
then generates per-route HTML, `sitemap.xml`, and `rss.xml`.

### `npm run images`

Regenerates the responsive image variants in `public/responsive/` and the
sizing metadata in `src/assets/image-manifest.json`. Idempotent — reruns skip
anything already generated. `dev` and `build` both invoke it, so it is rarely
needed on its own.

### `npm run preview`

Previews the production build locally.

### `npm test` / `npm run lint`

Vitest suite and ESLint.

## Languages and URLs

The site is published in English, 简体中文, 繁體中文, and 日本語, and **the URL
decides which one renders**. English keeps the bare path; the rest are prefixed:

```
/blog/hermes            en
/zh-Hans/blog/hermes    zh-Hans
/zh-Hant/blog/hermes    zh-Hant
/ja/blog/hermes         ja
```

`src/i18n/routes.js` owns that mapping. Use `<LocaleLink>` (not react-router's
`<Link>`) for internal links so the current language is preserved, and write
`to` as the canonical, language-independent path.

Every page emits `hreflang` alternates for all four languages plus `x-default`,
and the sitemap declares the same, so the translations are indexed as one page
rather than as duplicates.

## Images

Use `<Img>` from `src/components/image/Img.jsx` instead of a bare `<img>`. It
reads `src/assets/image-manifest.json` to attach intrinsic `width`/`height`
(preventing layout shift) and a `srcset` of down-scaled variants (so phones do
not download full-resolution originals). Adding a new asset needs no extra
wiring — run `npm run images` and it is picked up.

`public/responsive/` is generated and gitignored; `image-manifest.json` is
committed so a fresh clone renders sensible markup before the variants exist.

## Content

Adding or changing a blog post or a project means touching:

- `src/components/blog/postsData.js` or `src/components/portfolio/Data.jsx`
  (the app's own data, including the `slug` and a post's `isoDate`)
- `scripts/site-routes.mjs` — the route table behind the prerendered `<head>`,
  the sitemap, and the RSS feed. Project case studies are read straight out of
  `Data.jsx`, so only blog posts need adding here by hand.

## Deployment

Deployed on **Vercel**. Every push to `master` triggers an automatic redeploy.

The production build writes a static `<head>` for every route in every language,
so link previews and crawlers get correct metadata without running JavaScript.
Security and caching headers live in `vercel.json`.

## Environment variables

Copy `.env.example` to `.env.local` for local development and configure the
same values in Vercel:

- `GEMINI_API_KEY` enables the portfolio assistant.
- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` enable
  the server-side contact endpoint.
- `EMAILJS_PRIVATE_KEY` is optional when EmailJS private-key authentication is
  enabled.
- The Upstash variables are strongly recommended in production so assistant
  and contact rate limits are shared across serverless instances.
