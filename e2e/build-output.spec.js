import { expect, test } from '@playwright/test';

// What the build scripts emitted, checked over HTTP rather than by reading
// dist/. If a route's file is missing or served under the wrong name, this
// fails the same way a visitor's browser would.

const LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'ja'];
const prefix = (lang) => (lang === 'en' ? '' : `/${lang}`);

test.describe('prerendered head', () => {
  for (const lang of LOCALES) {
    test(`the home page carries ${lang} metadata before any JavaScript runs`, async ({
      request,
    }) => {
      const response = await request.get(`${prefix(lang)}/`);
      expect(response.ok()).toBe(true);

      const html = await response.text();
      expect(html).toContain(`<html lang="${lang}">`);
      // English is the bare path, which canonicalises to a trailing slash.
      const canonical = lang === 'en' ? '/' : prefix(lang);
      expect(html).toContain(
        `<link rel="canonical" href="https://jimkong-portfolio.vercel.app${canonical}"`
      );
      expect(html).toContain(`<link rel="manifest" href="${lang === 'en' ? '/manifest.json' : `/manifest.${lang}.json`}"`);
      // Every translation declared, plus x-default.
      for (const other of LOCALES) {
        expect(html).toContain(`hreflang="${other}"`);
      }
      expect(html).toContain('hreflang="x-default"');
    });
  }

  test('a blog post declares itself an article with a publication date', async ({ request }) => {
    const html = await (await request.get('/blog/hermes')).text();
    expect(html).toContain('<meta property="og:type" content="article" />');
    expect(html).toContain('article:published_time');
    expect(html).toContain('/og/hermes.jpg');
  });

  test('an indexable page says so exactly once', async ({ request }) => {
    const html = await (await request.get('/blog')).text();
    expect(html.match(/name="robots"/g)).toHaveLength(1);
  });

  test('a case study ships its text in the HTML, not only in the bundle', async ({ request }) => {
    const html = await (await request.get('/work/pockyt')).text();
    // The stand-in written into #root by generate-route-html.mjs: without it
    // the summary and captions are reachable only by executing the bundle.
    expect(html).toMatch(/<div id="root"><div class="container section">/);
    expect(html).toContain('<h1>');
  });

  test('the Japanese case study is written up in Japanese', async ({ request }) => {
    const html = await (await request.get('/ja/work/pockyt')).text();
    expect(html).toContain('<html lang="ja">');
    // Some CJK text made it into the prerendered body, not just the head.
    const body = html.slice(html.indexOf('<div id="root">'));
    expect(body).toMatch(/[぀-ヿ一-龯]/);
  });
});

test.describe('generated files', () => {
  test('the sitemap lists every route in every language', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.headers()['content-type']).toContain('xml');

    const xml = await response.text();
    const urls = xml.match(/<loc>/g) ?? [];
    // 30 routes x 4 languages at the time of writing; the assertion is that
    // the sitemap is whole, not that the count is frozen.
    expect(urls.length).toBeGreaterThanOrEqual(100);
    expect(xml).toContain('https://jimkong-portfolio.vercel.app/ja/blog');
  });

  test('the RSS feed is valid and dated', async ({ request }) => {
    const xml = await (await request.get('/rss.xml')).text();
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('<pubDate>');
    expect(xml).toContain('rel="self"');
  });

  test('every localized manifest is served and self-consistent', async ({ request }) => {
    for (const lang of LOCALES) {
      const path = lang === 'en' ? '/manifest.json' : `/manifest.${lang}.json`;
      const manifest = await (await request.get(path)).json();

      expect(manifest.lang, path).toBe(lang);
      expect(manifest.start_url, path).toBe(lang === 'en' ? '/' : `/${lang}`);
      expect(manifest.scope, path).toBe('/');
      expect(manifest.icons.length, path).toBeGreaterThan(0);

      for (const icon of manifest.icons) {
        expect((await request.get(icon.src)).ok(), `${path} -> ${icon.src}`).toBe(true);
      }
      for (const shot of manifest.screenshots) {
        expect((await request.get(shot.src)).ok(), `${path} -> ${shot.src}`).toBe(true);
      }
    }
  });

  test('the service worker precaches this build, not a stale one', async ({ request }) => {
    const sw = await (await request.get('/sw.js')).text();
    const precache = [...sw.matchAll(/"(\/assets\/[^"]+)"/g)].map((m) => m[1]);
    expect(precache.length).toBeGreaterThan(0);

    for (const asset of precache) {
      expect((await request.get(asset)).ok(), asset).toBe(true);
    }
    expect((await request.get('/offline.html')).ok()).toBe(true);
  });

  test('security.txt is published where scanners look for it', async ({ request }) => {
    const text = await (await request.get('/.well-known/security.txt')).text();
    expect(text).toContain('Contact:');
    expect(text).toContain('Expires:');

    const expires = text.match(/Expires:\s*(\S+)/)?.[1];
    // An expired file is treated as no file at all.
    expect(new Date(expires).getTime()).toBeGreaterThan(Date.now());
  });

  test('robots.txt points at the sitemap and at llms.txt', async ({ request }) => {
    const text = await (await request.get('/robots.txt')).text();
    expect(text).toContain('Sitemap: https://jimkong-portfolio.vercel.app/sitemap.xml');
    expect(text).toContain('LLM-Content: https://jimkong-portfolio.vercel.app/llms.txt');
  });

  // Generated from the same route table as the sitemap, so the failure this
  // guards against is the one the sitemap already had: a URL listed for a page
  // that is not there.
  test('llms.txt lists only pages the site actually serves', async ({ request }) => {
    const response = await request.get('/llms.txt');
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('text/plain');

    const text = await response.text();
    expect(text).toContain('# Jim Kong');
    expect(text).toContain('## Projects');
    expect(text).toContain('## Writing');

    const paths = [...text.matchAll(/\]\(https:\/\/[^/]+(\/[^)]*)\)/g)].map((m) => m[1]);
    expect(paths.length).toBeGreaterThan(20);

    for (const path of paths) {
      expect((await request.get(path)).ok(), `llms.txt links to ${path}`).toBe(true);
    }
  });

  // WebP cards previewed as a bare title-and-link on LinkedIn, and three of the
  // five blog cards were never resized at all — one was the 8256x5504 camera
  // original, under a <head> that declared it 1200x630.
  test('every Open Graph card is a real 1200x630 JPEG', async ({ request }) => {
    const pages = ['/', '/blog/grand-hotel-taipei', '/blog/hermes', '/work/pockyt'];

    for (const page of pages) {
      const html = await (await request.get(page)).text();
      const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      expect(image, `${page} declares an og:image`).toBeTruthy();
      expect(image, `${page} card is a JPEG`).toMatch(/\.jpg$/);
      expect(html).toContain('<meta property="og:image:type" content="image/jpeg" />');

      const card = await request.get(new URL(image).pathname);
      expect(card.ok(), `${page} -> ${image}`).toBe(true);
      expect(card.headers()['content-type']).toContain('image/jpeg');

      // JFIF/EXIF headers vary, so the dimensions are read off the SOF marker
      // rather than trusting a fixed offset.
      const bytes = Buffer.from(await card.body());
      let i = 2;
      let size = null;
      while (i < bytes.length - 9) {
        if (bytes[i] !== 0xff) break;
        const marker = bytes[i + 1];
        const length = bytes.readUInt16BE(i + 2);
        // SOF0/1/2, excluding the DHT/DAC/DRI markers in the same range.
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          size = { h: bytes.readUInt16BE(i + 5), w: bytes.readUInt16BE(i + 7) };
          break;
        }
        i += 2 + length;
      }

      expect(size, `${image} is decodable JPEG`).not.toBeNull();
      expect(size, `${image} matches the dimensions the head declares`).toEqual({
        w: 1200,
        h: 630,
      });
    }
  });
});
