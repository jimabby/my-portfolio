import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Desk from '../components/portfolio/Desk.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';
import { projectPath, projectsData } from '../components/portfolio/Data';

const renderDesk = () =>
  render(
    <MemoryRouter>
      <LanguageProvider>
        <Desk />
      </LanguageProvider>
    </MemoryRouter>
  );

describe('Desk', () => {
  beforeEach(() => {
    localStorage.setItem('lang', 'en');
  });

  // The scatter is laid out by slug. A slug renamed in Data.jsx would silently
  // drop its piece off the desk rather than fail anything, so assert the count.
  it('renders every curated piece', () => {
    const { container } = renderDesk();
    expect(container.querySelectorAll('.desk__piece')).toHaveLength(7);
  });

  it('opens a piece into the panel and closes it again', () => {
    const { container } = renderDesk();
    const panel = container.querySelector('#desk-panel');
    const piece = screen.getByRole('button', { name: 'Open Pockyt' });

    expect(panel).toHaveAttribute('hidden');
    expect(piece).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(piece);

    expect(panel).not.toHaveAttribute('hidden');
    expect(piece).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('heading', { name: 'Pockyt' })).toBeInTheDocument();
    expect(document.activeElement).toBe(panel);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(panel).toHaveAttribute('hidden');
    expect(document.activeElement).toBe(piece);
  });

  it('sends the panel link to the project write-up', () => {
    renderDesk();
    // Hermes has an `article`, so its link goes to the blog post rather than
    // to a case study that would compete with it in search.
    const hermes = projectsData.find((p) => p.slug === 'hermes-ai-email-client');

    fireEvent.click(screen.getByRole('button', { name: `Open ${hermes.title}` }));

    expect(screen.getByRole('link', { name: /Read the story/ })).toHaveAttribute(
      'href',
      projectPath(hermes)
    );
  });

  // The facts block on the case-study page is deliberately unpopulated: no
  // project in Data.jsx sets role, year or stack. The panel must not invent
  // them either — it shows only fields that actually exist.
  it('shows only fields the project data carries', () => {
    const { container } = renderDesk();
    fireEvent.click(screen.getByRole('button', { name: 'Open Oncora' }));

    const oncora = projectsData.find((p) => p.slug === 'oncora');
    expect(screen.getByText(oncora.summary)).toBeInTheDocument();
    expect(container.querySelectorAll('.desk__panel-tag')).toHaveLength(
      oncora.tags.length
    );
  });
});
