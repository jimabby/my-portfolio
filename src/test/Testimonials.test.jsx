import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import Testimonials from '../components/Testimonials/Testimonials';
import Data from '../components/Testimonials/Data';
import { LanguageProvider } from '../i18n/LanguageContext';

const renderTestimonials = () =>
  render(
    <HelmetProvider>
      <LanguageProvider>
        <Testimonials />
      </LanguageProvider>
    </HelmetProvider>
  );

// Under React 19 only `async` scripts get hoisted into <head>, so Helmet's
// JSON-LD renders in place, in the body. That is fine — structured data is
// valid anywhere in the document — but it means the assertion has to search the
// whole document rather than just the head.
const linkedData = async () => {
  const script = await waitFor(() => {
    const found = document.querySelector('script[type="application/ld+json"]');
    if (!found) throw new Error('no JSON-LD rendered');
    return found;
  });
  return script.textContent;
};

describe('testimonials', () => {
  it('renders the recommendations', () => {
    renderTestimonials();
    expect(screen.getAllByText(Data[0].title).length).toBeGreaterThan(0);
  });

  // Five named endorsements were plain text on the page, so nothing but a human
  // reader could tell they were reviews of a specific person.
  it('describes each recommendation as a Review of Jim', async () => {
    renderTestimonials();
    const graph = JSON.parse(await linkedData())['@graph'];
    expect(graph).toHaveLength(Data.length);
    for (const entry of graph) {
      expect(entry['@type']).toBe('Review');
      expect(entry.itemReviewed.name).toBe('Jim Kong');
      expect(entry.author.name).toBeTruthy();
      expect(entry.reviewBody.length).toBeGreaterThan(0);
    }
  });

  // These are written recommendations with no score attached. Emitting a
  // rating would mean inventing a number nobody gave.
  it('claims no rating, because none was given', async () => {
    renderTestimonials();
    const json = await linkedData();
    expect(json).not.toContain('aggregateRating');
    expect(json).not.toContain('reviewRating');
  });
});
