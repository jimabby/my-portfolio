import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Services from '../components/services/Services.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';

describe('Services dialogs', () => {
  it('moves focus into the dialog and restores it after Escape', () => {
    render(
      <LanguageProvider>
        <Services />
      </LanguageProvider>
    );

    const opener = screen.getAllByRole('button', { name: /view more/i })[0];
    opener.focus();
    fireEvent.click(opener);

    const dialog = screen.getByRole('dialog', { name: 'Full-Stack Developer' });
    const close = screen.getAllByRole('button', { name: 'Close modal' })[0];
    expect(dialog).toBeVisible();
    expect(close).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(close).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(opener).toHaveFocus();
  });
});
