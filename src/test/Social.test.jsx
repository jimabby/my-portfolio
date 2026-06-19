import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Social from '../components/home/Social.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';

describe('Social', () => {
  it('renders localized aria-labels for each social link', () => {
    render(
      <LanguageProvider>
        <Social />
      </LanguageProvider>
    );
    // Default language is English; aria-labels come from footer.socialAria.
    expect(screen.getByLabelText('Jim Kong on Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Jim Kong on LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Jim Kong on GitHub')).toBeInTheDocument();
  });
});
