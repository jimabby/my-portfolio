import { buildSrcSet, manifestKeyFor, metadataFor } from './srcset';

// Drop-in replacement for <img> that adds the two things every image on the
// site was missing: intrinsic width/height (so nothing reflows once the bytes
// arrive) and a srcset (so phones stop downloading 3600px-wide originals).
//
// Usage is unchanged from a plain <img> — pass the imported asset:
//   import shot from '../../assets/hermes/Hermes_overview.webp';
//   <Img src={shot} alt="..." sizes="(max-width: 820px) 100vw, 780px" />
const Img = ({ src, alt = '', sizes, width, height, ...rest }) => {
  const key = manifestKeyFor(src);
  const entry = metadataFor(key);

  // No manifest entry (a new asset before `npm run images` has run) still
  // renders a perfectly good plain image, just without the extra hints.
  if (!entry) return <img src={src} alt={alt} width={width} height={height} {...rest} />;

  const srcSet = buildSrcSet(src, key);

  return (
    <img
      src={src}
      alt={alt}
      width={width ?? entry.w}
      height={height ?? entry.h}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? '100vw') : undefined}
      {...rest}
    />
  );
};

export default Img;
