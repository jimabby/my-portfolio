import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Works from '../components/portfolio/Works.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';
import { projectsData } from '../components/portfolio/Data';

// Mirrors Works.jsx's PAGE_SIZE: the assertions below are about page one.
const PAGE_SIZE = 9;

// Project cards link to their case-study page, so a router is required.
const renderWorks = () =>
  render(
    <MemoryRouter>
      <LanguageProvider>
        <Works />
      </LanguageProvider>
    </MemoryRouter>
  );

describe('Works pagination', () => {
  beforeEach(() => {
    localStorage.setItem('lang', 'en');
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('shows one page of projects and moves to the new results', () => {
    const { container } = renderWorks();

    expect(container.querySelectorAll('.work__card')).toHaveLength(9);
    expect(screen.getByRole('navigation', { name: 'Portfolio pages' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    expect(container.querySelectorAll('.work__card')).toHaveLength(9);
    expect(screen.getByRole('heading', { name: 'Simba Education' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledOnce();
    expect(document.activeElement).toHaveClass('work__img-button');
  });

  // A project written up on the blog links there instead of to a near-empty
  // case study page that would compete with the post in search. Read off the
  // data rather than naming projects: every new write-up added one more of
  // these links, and a hard-coded single one broke the moment there were two.
  it('sends a project with a blog article to the post', () => {
    renderWorks();

    const expected = projectsData
      .slice(0, PAGE_SIZE)
      .filter((project) => project.article)
      .map((project) => project.article);

    expect(expected.length).toBeGreaterThan(0);
    expect(
      screen
        .getAllByRole('link', { name: /Read the story/ })
        .map((link) => link.getAttribute('href'))
    ).toEqual(expected);
    expect(screen.getAllByRole('link', { name: /Case study/ }).length).toBeGreaterThan(0);
  });

  it('resets to the first page when a filter is selected', () => {
    const { container } = renderWorks();
    const pagination = screen.getByRole('navigation', { name: 'Portfolio pages' });

    fireEvent.click(within(pagination).getByRole('button', { name: 'Page 3' }));
    fireEvent.click(screen.getByRole('button', { name: 'Wordpress' }));

    expect(container.querySelectorAll('.work__card')).toHaveLength(5);
    expect(screen.queryByRole('navigation', { name: 'Portfolio pages' })).not.toBeInTheDocument();
  });

  it('keeps keyboard focus inside the gallery and restores it on close', () => {
    renderWorks();
    const opener = screen.getByRole('button', {
      name: /Open Hermes - AI Email Client gallery/i,
    });

    opener.focus();
    fireEvent.click(opener);
    const close = screen.getByRole('button', { name: 'Close gallery' });
    expect(close).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: 'View image 6' })).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(opener).toHaveFocus();
  });
});
