import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import WorkIndex from '../components/portfolio/WorkIndex.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';
import { projectsData } from '../components/portfolio/Data';

// The filters put their state in the URL, so these mount at a real one and
// assert on what the page renders for it — which is the whole point of the
// feature: the URL alone has to be enough to reproduce a view.
const renderAt = (url = '/work') =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <LanguageProvider>
        <WorkIndex />
      </LanguageProvider>
    </MemoryRouter>
  );

const items = () => document.querySelectorAll('.workindex__item');

describe('WorkIndex filtering', () => {
  beforeEach(() => {
    localStorage.setItem('lang', 'en');
  });

  it('lists every project when nothing is filtered', () => {
    renderAt();
    expect(items()).toHaveLength(projectsData.length);
  });

  it('opens already filtered when the URL says so', () => {
    const wordpress = projectsData.filter((p) => p.category.toLowerCase() === 'wordpress');
    expect(wordpress.length).toBeGreaterThan(0);

    renderAt('/work?category=wordpress');

    expect(items()).toHaveLength(wordpress.length);
    expect(screen.getByRole('button', { name: 'Wordpress' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('narrows to projects carrying every selected tag', () => {
    // Two tags that at least one project carries together, read off the data
    // so the test does not encode a project list that will drift.
    const withTwo = projectsData.find((p) => (p.tags ?? []).length >= 2);
    const [first, second] = withTwo.tags;
    const expected = projectsData.filter(
      (p) => p.tags?.includes(first) && p.tags?.includes(second)
    );

    renderAt(`/work?tags=${encodeURIComponent(`${first},${second}`)}`);

    expect(items()).toHaveLength(expected.length);
  });

  it('ignores a tag that no longer exists rather than emptying the page', () => {
    renderAt('/work?tags=NoSuchTagAnywhere');
    expect(items()).toHaveLength(projectsData.length);
  });

  it('searches titles and summaries', () => {
    renderAt();
    const search = screen.getByRole('textbox', { name: 'Search projects' });

    fireEvent.change(search, { target: { value: 'wordpress' } });

    const shown = [...items()].map((li) => li.querySelector('.workindex__item-title').textContent);
    expect(shown.length).toBeGreaterThan(0);
    expect(shown.length).toBeLessThan(projectsData.length);
  });

  it('says so instead of showing an empty list when nothing matches', () => {
    renderAt('/work?q=zzzzzznothingmatchesthis');

    expect(items()).toHaveLength(0);
    expect(screen.getByText('No projects match those filters.')).toBeInTheDocument();
  });

  it('clears every filter at once', () => {
    renderAt('/work?category=wordpress&q=simba');
    expect(items()).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(items()).toHaveLength(projectsData.length);
  });

  // 24 tags left expanded filled three rows and pushed every project below the
  // fold, so the panel is collapsed by default — but a shared link that
  // already has tags applied must show which ones, or the results look
  // arbitrary.
  it('collapses the tag panel by default and opens it on request', () => {
    renderAt();
    const toggle = screen.getByRole('button', { name: /Filter by tag/ });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Queried by id, not by role: `hidden` takes the panel out of the
    // accessibility tree entirely, which is exactly what it should do — a
    // collapsed panel is not a group a screen reader should be offered.
    expect(document.getElementById('work-tag-filters')).not.toBeVisible();

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('group', { name: 'Filter projects by tag' })).toBeVisible();
  });

  it('arrives open when the URL already applies tags', () => {
    const tag = projectsData.find((p) => p.tags?.length)?.tags[0];
    renderAt(`/work?tags=${encodeURIComponent(tag)}`);

    expect(screen.getByRole('button', { name: /Filter by tag/ })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('group', { name: 'Filter projects by tag' })).toBeVisible();
  });

  it('announces the result count politely', () => {
    renderAt('/work?category=app');
    const count = screen.getByRole('status');

    expect(count).toHaveAttribute('aria-live', 'polite');
    expect(within(count).getByText(/Showing \d+ of \d+/)).toBeInTheDocument();
  });
});
