import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '../App.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';

// Exercises the real route table at real URLs: the language prefixes are the
// whole point of the localized-URL work, and a silent mismatch there would send
// every translated page to the 404.
const renderAt = (path) =>
  render(
    <HelmetProvider>
      <LanguageProvider>
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </LanguageProvider>
    </HelmetProvider>
  );

describe('localized routing', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('lang', 'en');
    HTMLElement.prototype.scrollIntoView = vi.fn();
    window.scrollTo = vi.fn();
  });

  it('renders the portfolio at the English root', async () => {
    renderAt('/');
    expect(await screen.findByRole('heading', { level: 1, name: /Jim Kong/ })).toBeInTheDocument();
  });

  // localStorage says English in every case, so passing these proves the URL —
  // not the stored preference — is what selects the language.
  it.each([
    ['/ja', 'ホーム'],
    ['/zh-Hans', '首页'],
    ['/zh-Hant', '首頁'],
  ])('renders %s in that language regardless of stored preference', async (path, homeLabel) => {
    renderAt(path);
    expect(await screen.findByRole('link', { name: new RegExp(homeLabel) })).toBeInTheDocument();
  });

  it('keeps the language when following a link from a translated page', async () => {
    renderAt('/ja');
    const blogLink = await screen.findByRole('link', { name: /ブログ|Blog/ });
    expect(blogLink).toHaveAttribute('href', '/ja/blog');
  });

  it('renders a case study for a real project slug', async () => {
    renderAt('/work/pockyt');
    expect(await screen.findByRole('heading', { level: 1, name: 'Pockyt' })).toBeInTheDocument();
  });

  it('renders a case study under a language prefix too', async () => {
    renderAt('/ja/work/oncora');
    expect(await screen.findByRole('heading', { level: 1, name: 'Oncora' })).toBeInTheDocument();
  });

  it('404s an unknown project slug rather than rendering an empty page', async () => {
    renderAt('/work/no-such-project');
    expect(await screen.findByText('404')).toBeInTheDocument();
  });

  it('404s an unknown path under a language prefix', async () => {
    renderAt('/ja/nope');
    expect(await screen.findByText('404')).toBeInTheDocument();
  });
});
