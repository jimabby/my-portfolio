import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import CaseStudy from '../components/portfolio/CaseStudy.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';
import { projectCaptions } from '../i18n/captions/index.mjs';

const renderCaseStudy = (slug) =>
  render(
    <MemoryRouter initialEntries={[`/work/${slug}`]}>
      <LanguageProvider>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>
  );

describe('CaseStudy gallery', () => {
  beforeEach(() => {
    localStorage.setItem('lang', 'en');
  });

  it('captions every screenshot', () => {
    const { container } = renderCaseStudy('housed');
    const captions = container.querySelectorAll('.casestudy__caption-text');

    expect(captions).toHaveLength(projectCaptions.en[7].length);
    expect(captions[0]).toHaveTextContent(projectCaptions.en[7][0]);
    // Numbered so the caption reads as documentation of a sequence.
    expect(container.querySelector('.casestudy__caption-index')).toHaveTextContent('01');
  });

  // A 900x1948 phone screenshot at the full column width renders ~1700px tall.
  it('lays tall phone screenshots out two to a row', () => {
    const { container } = renderCaseStudy('pockyt');
    const figures = container.querySelectorAll('.casestudy__figure');

    expect(figures.length).toBeGreaterThan(0);
    for (const figure of figures) {
      expect(figure).toHaveClass('casestudy__figure--portrait');
    }
  });

  it('gives wide screenshots the full width', () => {
    const { container } = renderCaseStudy('housed');

    for (const figure of container.querySelectorAll('.casestudy__figure')) {
      expect(figure).not.toHaveClass('casestudy__figure--portrait');
    }
  });

  it('renders a project written up on the blog nowhere', () => {
    renderCaseStudy('hermes-ai-email-client');

    expect(screen.queryByRole('heading', { name: 'Hermes - AI Email Client' })).toBeNull();
  });
});
