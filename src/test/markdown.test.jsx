import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderMarkdown } from '../components/assistant/markdown';

const show = (text, onNavigate) => render(<div>{renderMarkdown(text, onNavigate)}</div>);

describe('assistant markdown', () => {
  it('renders emphasis, strong, and code as real elements', () => {
    const { container } = show('Uses **React** and *Vite* via `npm run dev`.');

    expect(container.querySelector('strong')).toHaveTextContent('React');
    expect(container.querySelector('em')).toHaveTextContent('Vite');
    expect(container.querySelector('code')).toHaveTextContent('npm run dev');
  });

  it('renders bullet and numbered lists', () => {
    const { container } = show('Skills:\n- React\n- Node\n\n1. First\n2. Second');

    expect(container.querySelectorAll('ul li')).toHaveLength(2);
    expect(container.querySelectorAll('ol li')).toHaveLength(2);
  });

  it('routes internal links in place instead of reloading', () => {
    const onNavigate = vi.fn();
    show('Try the [contact form](/#contact).', onNavigate);

    const link = screen.getByRole('link', { name: 'contact form' });
    expect(link).toHaveAttribute('href', '/#contact');
    expect(link).not.toHaveAttribute('target');

    link.click();
    expect(onNavigate).toHaveBeenCalledWith(expect.anything(), '/#contact');
  });

  it('opens external links in a new tab with a safe rel', () => {
    show('See [GitHub](https://github.com/jimabby).');
    const link = screen.getByRole('link', { name: 'GitHub' });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Reply text comes from a model and is not trusted to be well-behaved.
  it.each([
    'javascript:alert(1)',
    'data:text/html;base64,PHNjcmlwdD4=',
    'vbscript:msgbox(1)',
  ])('refuses to make %s clickable', (href) => {
    show(`Click [here](${href}) now.`);

    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByText('here')).toBeInTheDocument();
  });

  it('never emits raw markup from the reply text', () => {
    const { container } = show('<img src=x onerror="alert(1)"> and <b>bold</b>');

    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('b')).toBeNull();
    expect(container.textContent).toContain('<img src=x');
  });

  it('renders a partial reply mid-stream without throwing', () => {
    const partial = 'Jim built **Hermes';
    expect(() => show(partial)).not.toThrow();
    expect(screen.getByText(/Hermes/)).toBeInTheDocument();
  });
});
