export function safeReturnTo(value) {
  if (typeof value !== 'string') return null;
  // Only canonical portfolio destinations, never arbitrary URLs from state.
  if (/^\/work(?:\?[^#]*)?(?:#[\w-]+)?$/.test(value)) return value;
  if (value === '/#workspace' || value === '/#portfolio') return value;
  return null;
}
