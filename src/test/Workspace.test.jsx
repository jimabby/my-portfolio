import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Workspace from '../components/portfolio/Workspace.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';
import { projectPath, projectsData } from '../components/portfolio/Data';

const renderWorkspace = () =>
  render(
    <MemoryRouter>
      <LanguageProvider>
        <Workspace />
      </LanguageProvider>
    </MemoryRouter>
  );

const find = (slug) => projectsData.find((p) => p.slug === slug);

describe('Workspace', () => {
  beforeEach(() => {
    localStorage.setItem('lang', 'en');
  });

  // The explorer is curated by slug. A slug renamed in Data.jsx would silently
  // drop its file rather than fail anything, so assert the count.
  it('lists every curated project in the explorer', () => {
    const { container } = renderWorkspace();
    expect(container.querySelectorAll('.workspace__file')).toHaveLength(7);
  });

  it('opens with the first project already showing', () => {
    renderWorkspace();
    const hermes = find('hermes-ai-email-client');
    expect(screen.getByRole('heading', { name: hermes.title })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: `Open ${hermes.title}` })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });

  it('opens a project in a new tab, and closing it falls back to its neighbour', () => {
    const { container } = renderWorkspace();
    const pockyt = find('pockyt');
    const hermes = find('hermes-ai-email-client');

    fireEvent.click(screen.getByRole('button', { name: `Open ${pockyt.title}` }));

    expect(screen.getByRole('heading', { name: pockyt.title })).toBeInTheDocument();
    expect(container.querySelectorAll('.workspace__tab')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: `Close ${pockyt.title}` }));

    expect(container.querySelectorAll('.workspace__tab')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: hermes.title })).toBeInTheDocument();
  });

  it('shows the empty state once the last tab is closed', () => {
    renderWorkspace();
    const hermes = find('hermes-ai-email-client');
    fireEvent.click(screen.getByRole('button', { name: `Close ${hermes.title}` }));
    expect(screen.getByText(/No file open/)).toBeInTheDocument();
  });

  it('walks the explorer with the arrow keys', () => {
    renderWorkspace();
    const first = screen.getByRole('button', { name: `Open ${find('hermes-ai-email-client').title}` });
    const second = find('housed-redesign');

    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowDown' });

    expect(screen.getByRole('heading', { name: second.title })).toBeInTheDocument();
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: `Open ${second.title}` })
    );
  });

  it('sends the README link to the project write-up', () => {
    renderWorkspace();
    // Hermes has an `article`, so its link goes to the blog post rather than
    // to a case study that would compete with it in search.
    const hermes = find('hermes-ai-email-client');
    expect(screen.getByRole('link', { name: /Read the story/ })).toHaveAttribute(
      'href',
      projectPath(hermes)
    );
  });

  it('hands the open project to the assistant as a question', () => {
    renderWorkspace();
    const onAsk = vi.fn();
    window.addEventListener('assistant:ask', onAsk);

    fireEvent.click(screen.getByRole('button', { name: /Ask jim.ai about this/ }));

    window.removeEventListener('assistant:ask', onAsk);
    expect(onAsk).toHaveBeenCalledTimes(1);
    expect(onAsk.mock.calls[0][0].detail.question).toBe(
      `Tell me about ${find('hermes-ai-email-client').title}`
    );
  });

  // The facts block on the case-study page is deliberately unpopulated: no
  // project in Data.jsx sets role, year or stack. The README must not invent
  // them either — it shows only fields that actually exist.
  it('shows only fields the project data carries', () => {
    const { container } = renderWorkspace();
    const oncora = find('oncora');
    fireEvent.click(screen.getByRole('button', { name: `Open ${oncora.title}` }));

    expect(screen.getByText(oncora.summary)).toBeInTheDocument();
    expect(container.querySelectorAll('.workspace__tag')).toHaveLength(oncora.tags.length);
  });
});
