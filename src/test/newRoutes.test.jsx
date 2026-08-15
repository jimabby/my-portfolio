import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '../App';
import { LanguageProvider } from '../i18n/LanguageContext';
import { projectsData } from '../components/portfolio/Data';
import { posts } from '../components/blog/postsData';

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

describe('the work index', () => {
  it('lists every project, not just the first page of the gallery', async () => {
    renderAt('/work');
    // Lazy route: wait for the chunk to resolve.
    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument();

    for (const project of projectsData) {
      expect(
        screen.getByRole('heading', { name: project.title, level: 2 }),
        `${project.title} is missing from the index`
      ).toBeInTheDocument();
    }
  });

  it('narrows to a category and says how many are showing', async () => {
    renderAt('/work');
    await screen.findByRole('heading', { level: 1 });

    const apps = projectsData.filter((p) => p.category === 'App');
    fireEvent.click(screen.getByRole('button', { name: 'App' }));

    expect(screen.getByRole('button', { name: 'App' })).toHaveAttribute('aria-pressed', 'true');
    // Project titles are the only level-2 headings on this page, so counting
    // them counts the visible entries without reaching into the footer's list.
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(apps.length);
    expect(screen.getByText(`Showing ${apps.length} of ${projectsData.length}`)).toBeInTheDocument();
  });

  // "/work" must not be read as a case study whose slug is the empty string.
  it('is not mistaken for a case study', async () => {
    renderAt('/work');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Work');
  });
});

describe('the resume page', () => {
  it('renders the roles, skills and credentials as real text', async () => {
    renderAt('/resume');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Jim Kong');

    // Current role first — a CV leads with it.
    const roles = screen.getAllByRole('heading', { level: 3 });
    expect(roles[0]).toBeInTheDocument();

    expect(screen.getByText('Our Big Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Michigan State University')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
    // The PDF is offered, not the only way in.
    expect(screen.getByRole('link', { name: /Download PDF/ })).toBeInTheDocument();
  });

  it('shows a role that is still running as ongoing', async () => {
    renderAt('/resume');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getAllByText(/2026 - Present/).length).toBeGreaterThan(0);
  });
});

describe('blog filters in the URL', () => {
  it('applies a category from the query string on first render', async () => {
    renderAt('/blog?category=Project');
    expect(await screen.findByRole('heading', { level: 2 })).toBeInTheDocument();

    const projectPosts = posts.filter((post) => post.category === 'Project');
    expect(
      screen.getByText(`Showing ${projectPosts.length} of ${posts.length} articles`)
    ).toBeInTheDocument();
  });

  it('applies stacked tags from the query string', async () => {
    renderAt('/blog?tags=AI,Automation');
    await screen.findByRole('heading', { level: 2 });

    const matching = posts.filter(
      (post) => post.tags.includes('AI') && post.tags.includes('Automation')
    );
    expect(
      screen.getByText(`Showing ${matching.length} of ${posts.length} articles`)
    ).toBeInTheDocument();
  });

  // A shared link carrying a tag that has since been removed must not filter
  // the whole list away.
  it('ignores a tag that no longer exists', async () => {
    renderAt('/blog?tags=NoSuchTag');
    await screen.findByRole('heading', { level: 2 });
    expect(
      screen.getByText(`Showing ${posts.length} of ${posts.length} articles`)
    ).toBeInTheDocument();
  });
});
