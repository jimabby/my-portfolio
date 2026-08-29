import { buildSrcSet, manifestKeyFor, metadataFor } from './srcset';

// Drop-in replacement for <img> that adds the three things every image on the
// site was missing: intrinsic width/height (so nothing reflows once the bytes
// arrive), a srcset (so phones stop downloading 3600px-wide originals), and an
// AVIF set offered ahead of the WebP one.
//
// Usage is unchanged from a plain <img> — pass the imported asset:
//   import shot from '../../assets/hermes/Hermes_overview.webp';
//   <Img shot={shot} alt="..." sizes="(max-width: 820px) 100vw, 780px" />
//
// The AVIF set is an offer, never a requirement. It rides in a <source> that a
// browser which cannot decode AVIF simply skips, falling through to the <img>
// and its WebP srcset — which is also what happens for any image with no
// manifest entry, and for the original asset at full width.
const Img = ({ src, alt = '', sizes, width, height, className, ...rest }) => {
  const key = manifestKeyFor(src);
  const entry = metadataFor(key);

  // No manifest entry (a new asset before `npm run images` has run) still
  // renders a perfectly good plain image, just without the extra hints.
  if (!entry) {
    return (
      <img src={src} alt={alt} width={width} height={height} className={className} {...rest} />
    );
  }

  const webpSrcSet = buildSrcSet(src, key, 'webp');
  const avifSrcSet = buildSrcSet(src, key, 'avif');

  const image = (
    <img
      src={src}
      alt={alt}
      width={width ?? entry.w}
      height={height ?? entry.h}
      srcSet={webpSrcSet}
      sizes={webpSrcSet ? (sizes ?? '100vw') : undefined}
      className={className}
      {...rest}
    />
  );

  // No variants means no <source> worth writing, and a <picture> wrapping a
  // lone <img> would only add a DOM node — and a layout box that callers
  // styling `.some-class img` do not expect.
  if (!avifSrcSet) return image;

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes ?? '100vw'} />
      {image}
    </picture>
  );
};

export default Img;
