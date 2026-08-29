import { expect, test } from '@playwright/test';

// The app as a browser actually runs it: routing, language, and the things
// jsdom cannot check.

test('the home page renders and keeps its language on an internal link', async ({ page }) => {
  await page.goto('/ja');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');

  // Follow the nav to the blog and stay in Japanese — the URL is what selects
  // the language, so a link that drops the prefix silently switches it.
  await page.getByRole('link', { name: /ブログ/ }).first().click();
  await expect(page).toHaveURL(/\/ja\/blog$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
});

test('the blog index leads with an h1', async ({ page }) => {
  await page.goto('/blog');
  // Every standalone route has exactly one top-level heading; /blog led with
  // an h2 and had no h1 at all.
  await expect(page.locator('main h1')).toHaveCount(1);
});

test('the language switcher moves between translations without losing the page', async ({
  page,
}) => {
  await page.goto('/work');
  await page.locator('.lang-switcher__toggle').click();
  await page.getByRole('option', { name: '日本語' }).click();

  await expect(page).toHaveURL(/\/ja\/work$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  // The dictionary for the new language loaded — a raw key path here would
  // mean the chunk was not awaited before the switch committed.
  await expect(page.locator('main')).not.toContainText('work.title');
});

// Two mechanisms, checked separately because `vite preview` only exercises
// one of them. In production Vercel serves dist/404.html for an unmatched path
// (there is no SPA rewrite in vercel.json), which is where the noindex comes
// from; preview instead serves the shell and lets the router sort it out.
test('an unknown path renders the 404 page', async ({ page }) => {
  await page.goto('/work/no-such-project');
  await expect(page.locator('.notfound__code')).toHaveText('404');
  await expect(page.locator('.notfound__title')).toBeVisible();
});

test('the 404 shell Vercel serves asks not to be indexed, exactly once', async ({ page }) => {
  await page.goto('/404');

  // One tag, not two. React 19 hoists <meta> by appending, so anything that
  // emitted a robots tag at runtime landed next to the static one and left the
  // page claiming both "index, follow" and "noindex, follow".
  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveCount(1);
  await expect(robots).toHaveAttribute('content', /noindex/);
});

test('an indexable page carries exactly one robots tag too', async ({ page }) => {
  await page.goto('/work/pockyt');
  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveCount(1);
  await expect(robots).toHaveAttribute('content', 'index, follow');
});

test('a case study page shows its gallery, facts, and share block', async ({ page }) => {
  await page.goto('/work/pockyt');
  await expect(page.locator('h1.casestudy__title')).toBeVisible();
  await expect(page.locator('.casestudy__summary')).toBeVisible();
  await expect(page.locator('.casestudy__figure img').first()).toBeVisible();
  // Share buttons used to exist only on blog articles.
  await expect(page.locator('.share__btn')).toHaveCount(3);
});

test('a case study describes itself to crawlers as a work, not as a person', async ({ page }) => {
  await page.goto('/work/pockyt');

  const scripts = page.locator('script[type="application/ld+json"]');
  // Helmet injects after mount, so the count settles a beat after navigation.
  await expect(scripts).toHaveCount(3);

  const blocks = await scripts.allTextContents();
  const types = blocks.map((text) => JSON.parse(text)['@type']);
  expect(types).toContain('CreativeWork');
  expect(types).toContain('BreadcrumbList');
});

test('the mobile menu closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.locator('.nav__toggle').click();
  await expect(page.locator('.nav__menu')).toHaveClass(/show-menu/);

  await page.keyboard.press('Escape');
  await expect(page.locator('.nav__menu')).not.toHaveClass(/show-menu/);
  // Focus goes back to the control that opened it.
  await expect(page.locator('.nav__toggle')).toBeFocused();
});

test('only the active language’s dictionary is fetched', async ({ page }) => {
  const localeChunks = [];
  page.on('request', (request) => {
    const match = request.url().match(/\/assets\/(en|ja|zh-Hans|zh-Hant)-[^/]+\.js$/);
    if (match) localeChunks.push(match[1]);
  });

  await page.goto('/ja');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');

  // Japanese, plus English underneath it as the missing-key fallback. The
  // other two are what splitting the dictionary was for.
  expect(localeChunks.sort()).toEqual(['en', 'ja']);
});

// The point of putting the filters in the URL is that the URL alone
// reproduces the view — so this reloads into one rather than clicking to it.
test('a filtered /work URL opens already filtered, and can be shared', async ({ page }) => {
  await page.goto('/work?category=wordpress');

  // The list is client-rendered, so wait for it rather than counting an empty
  // container that React has not reached yet.
  await expect(page.locator('.workindex__item').first()).toBeVisible();
  const filtered = await page.locator('.workindex__item').count();
  expect(filtered).toBeGreaterThan(0);
  await expect(page.getByRole('button', { name: 'Wordpress', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true'
  );

  // Clearing returns to the bare URL, so an unfiltered /work is never a second
  // URL for the same page.
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page).toHaveURL(/\/work$/);
  // Polled, not counted once: the URL settles a render before the list does.
  await expect
    .poll(() => page.locator('.workindex__item').count())
    .toBeGreaterThan(filtered);
});

test('searching /work narrows the list and survives a reload', async ({ page }) => {
  await page.goto('/work');
  await expect(page.locator('.workindex__item').first()).toBeVisible();
  await page.getByRole('textbox', { name: 'Search projects' }).fill('hvac');

  await expect(page).toHaveURL(/q=hvac/);
  const narrowed = await page.locator('.workindex__item').count();
  expect(narrowed).toBeGreaterThan(0);

  await page.reload();
  await expect(page.locator('.workindex__item')).toHaveCount(narrowed);
});

// The AVIF set is an offer, not a substitution: Chromium takes it, and a
// browser that cannot decode it must still find a WebP srcset on the <img>.
test('images offer AVIF ahead of the WebP fallback', async ({ page }) => {
  const served = [];
  page.on('response', (response) => {
    if (/\/responsive\/.+\.(avif|webp)$/.test(response.url())) served.push(response.url());
  });

  await page.goto('/work');
  await page.locator('.workindex__item').first().scrollIntoViewIfNeeded();

  const first = page.locator('picture').first();
  await expect(first.locator('source[type="image/avif"]')).toHaveAttribute(
    'srcset',
    /\.avif \d+w/
  );
  await expect(first.locator('img')).toHaveAttribute('srcset', /\.webp \d+w/);

  await expect
    .poll(() => served.filter((url) => url.endsWith('.avif')).length)
    .toBeGreaterThan(0);
});
