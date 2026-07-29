import manifest from '../../assets/image-manifest.json';

// Pure helpers behind <Img>, kept out of the component module so the file that
// exports the component exports nothing else.
//
// Sizing metadata and variant hashes come from src/assets/image-manifest.json,
// written by scripts/generate-responsive-images.mjs alongside the scaled files
// in public/responsive/.

// Vite emits assets as `<name>-<hash>.<ext>` in production and serves the plain
// source path in dev. Both reduce to the original filename, which is how the
// manifest is keyed.
const HASHED_NAME = /^(.*)-[A-Za-z0-9_-]{8,}(\.[A-Za-z0-9]+)$/;

// Returns the manifest key (the original filename), never a guess derived from
// the URL. Asset names like `simba-edu-redesign1` end in something that looks
// exactly like a build hash, so stems must come from the resolved key.
export const manifestKeyFor = (src) => {
  if (typeof src !== 'string') return null;
  const filename = src.split('?')[0].split('/').pop();
  if (!filename) return null;
  if (manifest[filename]) return filename;
  const match = filename.match(HASHED_NAME);
  const unhashed = match ? `${match[1]}${match[2]}` : null;
  return unhashed && manifest[unhashed] ? unhashed : null;
};

export const metadataFor = (key) => (key ? (manifest[key] ?? null) : null);

export const buildSrcSet = (src, key) => {
  const entry = metadataFor(key);
  if (!entry || entry.v.length === 0) return undefined;
  const stem = key.replace(/\.[A-Za-z0-9]+$/, '');
  const candidates = entry.v.map(([w, hash]) => `/responsive/${stem}-${w}-${hash}.webp ${w}w`);
  // The original is the largest candidate, so it wins whenever the layout is
  // wide enough to need it.
  return [...candidates, `${src} ${entry.w}w`].join(', ');
};
