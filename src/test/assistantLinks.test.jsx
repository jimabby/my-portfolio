import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderMarkdown } from '../components/assistant/markdown';
import { localizedPath } from '../i18n/routes';

// The assistant is prompted to answer with canonical, language-independent
// paths ("/blog", "/#contact"). Everything else on the site routes through
// LocaleLink, which applies the visitor's language prefix; the assistant is
// the one place that renders a path the model wrote, so it has to do the same
// thing itself. Without this, a visitor reading /ja who followed an assistant
// link silently landed on the English page.

// Stand-in for useLocalePath(), which needs a provider to run.
const localizeFor = (lang) => (to) => {
  const [pathname, hash] = String(to).split('#');
  const localized = localizedPath(lang, pathname || '/');
  return hash ? `${localized}#${hash}` : localized;
};

const show = (text, lang) =>
  render(<div>{renderMarkdown(text, vi.fn(), localizeFor(lang))}</div>);

describe('assistant links', () => {
  it('keeps a page link in the visitor’s language', () => {
    show('See the [blog](/blog).', 'ja');
    expect(screen.getByRole('link', { name: 'blog' })).toHaveAttribute('href', '/ja/blog');
  });

  it('keeps a section link on the home page in the visitor’s language', () => {
    show('Use the [contact form](/#contact).', 'zh-Hant');
    expect(screen.getByRole('link', { name: 'contact form' })).toHaveAttribute(
      'href',
      '/zh-Hant#contact'
    );
  });

  it('treats a bare hash as a link to that section of the home page', () => {
    show('Jump to [about](#about).', 'zh-Hans');
    expect(screen.getByRole('link', { name: 'about' })).toHaveAttribute(
      'href',
      '/zh-Hans#about'
    );
  });

  it('leaves English on the bare path', () => {
    show('See the [work index](/work).', 'en');
    expect(screen.getByRole('link', { name: 'work index' })).toHaveAttribute('href', '/work');
  });

  it('never rewrites an external link', () => {
    show('See [GitHub](https://github.com/jimabby).', 'ja');
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/jimabby');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('still renders when no localizer is supplied', () => {
    render(<div>{renderMarkdown('See the [blog](/blog).', vi.fn())}</div>);
    expect(screen.getByRole('link', { name: 'blog' })).toHaveAttribute('href', '/blog');
  });

  it('hands the click handler the canonical path, not the localized one', () => {
    const onNavigate = vi.fn();
    render(<div>{renderMarkdown('See the [blog](/blog).', onNavigate, localizeFor('ja'))}</div>);

    screen.getByRole('link', { name: 'blog' }).click();
    // Assistant.jsx localizes it again before navigating; handing it the
    // already-prefixed path would produce /ja/ja/blog.
    expect(onNavigate).toHaveBeenCalledWith(expect.anything(), '/blog');
  });
});
