import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Img from '../components/image/Img';
import { buildSrcSet, manifestKeyFor } from '../components/image/srcset';
import manifest from '../assets/image-manifest.json';

// A source image with generated variants, and one small enough to have none.
const WIDE = 'Hermes_overview.webp';
const SMALL = 'profile.webp';

describe('manifestKeyFor', () => {
  it('resolves the plain source path Vite serves in dev', () => {
    expect(manifestKeyFor(`/src/assets/hermes/${WIDE}`)).toBe(WIDE);
  });

  it('resolves the hashed filename Vite emits in production', () => {
    expect(manifestKeyFor(`/assets/Hermes_overview-D8pF-c2I.webp`)).toBe(WIDE);
  });

  // Regression: several assets end in a segment that looks like a build hash
  // ("simba-edu-redesign1"). Stripping it as one would point at a key that
  // does not exist and silently drop the srcset.
  it('does not mistake a hash-shaped name segment for a build hash', () => {
    const trap = Object.keys(manifest).find((k) => /-redesign1\./.test(k));
    expect(trap, 'expected a "-redesign1" asset to exist').toBeTruthy();
    expect(manifestKeyFor(`/src/assets/simba-edu-redesign/${trap}`)).toBe(trap);
  });

  it('returns null for an asset that is not in the manifest', () => {
    expect(manifestKeyFor('/assets/not-a-real-image.webp')).toBeNull();
  });
});

describe('buildSrcSet', () => {
  it('lists every variant plus the original, ascending', () => {
    const src = '/assets/Hermes_overview-D8pF-c2I.webp';
    const srcSet = buildSrcSet(src, WIDE);
    const widths = srcSet.split(', ').map((c) => Number(c.split(' ')[1].replace('w', '')));

    expect(widths).toEqual([...widths].sort((a, b) => a - b));
    expect(widths.at(-1)).toBe(manifest[WIDE].w);
    expect(srcSet).toContain(`${src} ${manifest[WIDE].w}w`);
    // Variants resolve to real, immutably named files under /responsive.
    expect(srcSet).toMatch(/\/responsive\/Hermes_overview-480-[A-Za-z0-9_-]{8}\.webp 480w/);
  });

  it('returns undefined when the source is too small to need variants', () => {
    expect(manifest[SMALL].v).toHaveLength(0);
    expect(buildSrcSet(`/assets/${SMALL}`, SMALL)).toBeUndefined();
  });
});

describe('<Img>', () => {
  it('always carries intrinsic width and height so layout cannot shift', () => {
    const { container } = render(<Img src={`/src/assets/hermes/${WIDE}`} alt="Overview" />);
    const img = container.querySelector('img');

    expect(img.getAttribute('width')).toBe(String(manifest[WIDE].w));
    expect(img.getAttribute('height')).toBe(String(manifest[WIDE].h));
    expect(img.getAttribute('sizes')).toBe('100vw');
  });

  it('passes an explicit sizes value through', () => {
    const { container } = render(
      <Img src={`/src/assets/hermes/${WIDE}`} alt="" sizes="(max-width: 820px) 100vw, 780px" />
    );
    expect(container.querySelector('img').getAttribute('sizes')).toBe(
      '(max-width: 820px) 100vw, 780px'
    );
  });

  it('renders a usable plain image for an asset missing from the manifest', () => {
    const { container } = render(<Img src="/assets/unknown.webp" alt="Unknown" />);
    const img = container.querySelector('img');

    expect(img.getAttribute('src')).toBe('/assets/unknown.webp');
    expect(img.hasAttribute('srcset')).toBe(false);
    expect(img.getAttribute('alt')).toBe('Unknown');
  });

  it('omits sizes when there is nothing to choose between', () => {
    const { container } = render(<Img src={`/src/assets/${SMALL}`} alt="" />);
    const img = container.querySelector('img');

    expect(img.hasAttribute('srcset')).toBe(false);
    expect(img.hasAttribute('sizes')).toBe(false);
  });
});
