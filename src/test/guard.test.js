import { describe, it, expect } from 'vitest';
import guard from '../../api/guard.js';

const { validateBody, isAllowedOrigin, isRateLimited } = guard;

describe('validateBody', () => {
  it('accepts a valid body and keeps a supported language', () => {
    const r = validateBody({ message: 'hi', history: [{ role: 'user', content: 'x' }], lang: 'ja' });
    expect(r.ok).toBe(true);
    expect(r.lang).toBe('ja');
    expect(r.message).toBe('hi');
  });

  it('falls back to English for an unsupported language', () => {
    expect(validateBody({ message: 'hi', lang: 'xx' }).lang).toBe('en');
  });

  it('rejects an empty or whitespace-only message', () => {
    expect(validateBody({ message: '   ' }).status).toBe(400);
    expect(validateBody({}).status).toBe(400);
  });

  it('rejects an over-length message', () => {
    expect(validateBody({ message: 'a'.repeat(1001) }).status).toBe(400);
  });

  it('rejects non-array history and oversized history', () => {
    expect(validateBody({ message: 'hi', history: 'nope' }).status).toBe(400);
    const huge = new Array(51).fill({ role: 'user', content: 'x' });
    expect(validateBody({ message: 'hi', history: huge }).status).toBe(400);
  });

  it('rejects malformed history items', () => {
    expect(validateBody({ message: 'hi', history: [{ role: 'user' }] }).status).toBe(400);
    expect(
      validateBody({ message: 'hi', history: [{ role: 'user', content: 'a'.repeat(4001) }] }).status
    ).toBe(400);
  });
});

describe('isAllowedOrigin', () => {
  it('allows same-host origins', () => {
    expect(isAllowedOrigin({ headers: { origin: 'https://a.com', host: 'a.com' } })).toBe(true);
  });

  it('blocks cross-origin requests not on the allowlist', () => {
    expect(isAllowedOrigin({ headers: { origin: 'https://evil.com', host: 'a.com' } })).toBe(false);
  });

  it('allows requests without an Origin header (non-browser clients)', () => {
    expect(isAllowedOrigin({ headers: { host: 'a.com' } })).toBe(true);
  });
});

describe('isRateLimited (in-memory fallback)', () => {
  it('trips after the per-window limit is exceeded', async () => {
    const req = { headers: { 'x-forwarded-for': '9.9.9.9' }, socket: {} };
    let limited = false;
    for (let i = 0; i < 25; i++) limited = await isRateLimited(req);
    expect(limited).toBe(true);
  });
});
