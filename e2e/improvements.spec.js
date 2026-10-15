import { expect, test } from '@playwright/test';

for (const locale of ['', '/ja', '/zh-Hans', '/zh-Hant']) {
  test(`mobile opening exposes both actions without floating overlap ${locale || 'en'}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${locale}/`);
    const actions = page.locator('.home__cta');
    await expect(actions).toBeVisible();
    const [cta, nav] = await Promise.all([actions.boundingBox(), page.locator('.header').boundingBox()]);
    expect(cta.y + cta.height).toBeLessThan(nav.y);
    await expect(page.locator('.assistant__fab')).toBeHidden();
    await page.locator('.nav__assistant').click();
    await expect(page.locator('.assistant__panel')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.nav__assistant')).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('first-visit language detection preserves filters and the anchor', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'ja-JP' });
  const page = await context.newPage();
  await page.goto('http://localhost:4318/work?tags=AI#results');
  await expect(page).toHaveURL(/\/ja\/work\?tags=AI#results$/);
  await expect(page.locator('.workindex__item')).toHaveCount(3);
  await context.close();
});

for (const [query, target, back] of [
  ['oncora', '/work/oncora', '.casestudy__back'],
  ['hermes', '/blog/hermes', '.blog__back-button'],
]) {
  test(`project back link preserves search for ${query}`, async ({ page }) => {
    await page.goto(`/work?q=${query}`);
    await page.locator('.workindex__link').first().click();
    await expect(page).toHaveURL(new RegExp(`${target}$`));
    await page.locator(back).first().click();
    await expect(page).toHaveURL(new RegExp(`/work\\?q=${query}$`));
    await expect(page.locator('.workindex__item')).toHaveCount(1);
  });
}

test('comparison is operable with the keyboard and offers both endpoints', async ({ page }) => {
  await page.goto('/work/simba-health-redesign');
  const slider = page.getByRole('slider', { name: 'Reveal the new design' });
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveValue('51');
  await page.getByRole('button', { name: 'After', exact: true }).click();
  await expect(slider).toHaveValue('100');
  await page.getByRole('button', { name: 'Before', exact: true }).click();
  await expect(slider).toHaveValue('0');
});

test('walkthrough navigates the captured screens and stops at the end', async ({ page }) => {
  await page.clock.install();
  await page.goto('/work/oncora');
  await expect(page.locator('.project-facts')).toContainText('27 July 2026');
  const tour = page.locator('.project-tour');
  await expect(tour.locator('img')).toHaveAttribute('alt', /Check in today/);
  await tour.getByRole('button', { name: 'Next step' }).click();
  await expect(tour.locator('img')).toHaveAttribute('alt', /See patterns/);
  await tour.getByRole('button', { name: 'Play tour' }).click();
  await page.clock.fastForward(5001);
  await expect(tour.locator('img')).toHaveAttribute('alt', /Prepare for an appointment/);
  await page.clock.fastForward(5001);
  await expect(tour.getByRole('button', { name: 'Replay tour' })).toHaveAttribute('aria-pressed', 'false');
});

test('the intro plays once per session, can be dismissed, and respects reduced motion', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await page.goto('/');
  await expect(page.locator('.boot')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.boot')).toHaveCount(0);
  await page.goto('/');
  await expect(page.locator('.home__title')).toBeVisible();
  await expect(page.locator('.boot')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?boot');
  await expect(page.locator('.home__title')).toBeVisible();
  await expect(page.locator('.boot')).toHaveCount(0);
});

test('contact timeout retains the message and permits a successful retry', async ({ page }) => {
  await page.clock.install();
  await page.addInitScript(() => {
    window.auditEvents = [];
    window.va = (...args) => window.auditEvents.push(args);
  });
  await page.route('**/api/contact', () => {});
  await page.goto('/#contact');
  await page.locator('#contact-name').fill('Test Visitor');
  await page.locator('#contact-email').fill('visitor@example.com');
  await page.locator('#contact-message').fill('A test message that must remain available.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await page.clock.fastForward(15001);
  await expect(page.locator('.contact__status--error')).toContainText('email me directly');
  await expect(page.locator('#contact-message')).toHaveValue('A test message that must remain available.');
  await page.unroute('**/api/contact');
  await page.route('**/api/contact', (route) => route.fulfill({ json: { ok: true } }));
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.locator('.contact__status--success')).toBeVisible();
  await expect(page.locator('#contact-message')).toHaveValue('');
  expect(await page.evaluate(() => window.auditEvents.filter(([type]) => type === 'event'))).toEqual([
    ['event', { name: 'contact_sent', data: { locale: 'en' } }],
  ]);
});

test('conversion events contain identifiers, not visitor input', async ({ page }) => {
  await page.addInitScript(() => {
    window.auditEvents = [];
    window.va = (...args) => window.auditEvents.push(args);
  });
  await page.goto('/work/oncora');
  await page.getByRole('button', { name: 'Play tour' }).click();
  await expect.poll(() => page.evaluate(() => window.auditEvents.filter(([type]) => type === 'event'))).toEqual([
    ['event', { name: 'project_open', data: { project: 'oncora', locale: 'en' } }],
    ['event', { name: 'project_tour_play', data: { project: 'oncora', locale: 'en' } }],
  ]);
  await page.goto('/resume');
  await page.locator('[download]').click();
  // Navigation creates a new page global; validate the resume event here.
  await expect.poll(() => page.evaluate(() => window.auditEvents.filter(([type]) => type === 'event'))).toEqual([
    ['event', { name: 'resume_download', data: { locale: 'en' } }],
  ]);
});


for (const width of [320, 768]) {
  test(`hero content fits within the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const portrait = await page.locator('.home__still').boundingBox();
    const subtitle = await page.locator('.home__subtitle').boundingBox();
    expect(portrait.y + portrait.height).toBeLessThanOrEqual(subtitle.y);
    for (const selector of ['.home__description', '.home__ask', '.home__cta', '.home__still']) {
      const element = page.locator(selector);
      await expect(element).toBeVisible();
      const bounds = await element.boundingBox();
      expect(bounds.x, selector).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width, selector).toBeLessThanOrEqual(width);
    }
  });
}
