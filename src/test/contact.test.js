import { describe, expect, it } from 'vitest';
import contactService from '../../api/contactService.js';

const { validateContactBody } = contactService;

const validBody = () => ({
  name: 'Jim',
  email: 'jim@example.com',
  message: 'Hello there',
  company: '',
  renderedAt: Date.now() - 3000,
});

describe('contact request validation', () => {
  it('normalizes a valid contact request', () => {
    const result = validateContactBody(validBody());
    expect(result.ok).toBe(true);
    expect(result.fields).toEqual({
      name: 'Jim',
      email: 'jim@example.com',
      message: 'Hello there',
    });
  });

  it('silently identifies honeypot and instant submissions as spam', () => {
    expect(validateContactBody({ ...validBody(), company: 'Bot Ltd' }).spam).toBe(true);
    expect(validateContactBody({ ...validBody(), renderedAt: Date.now() }).spam).toBe(true);
  });

  it('rejects invalid or oversized fields', () => {
    expect(validateContactBody({ ...validBody(), name: '' }).status).toBe(400);
    expect(validateContactBody({ ...validBody(), email: 'invalid' }).status).toBe(400);
    expect(validateContactBody({ ...validBody(), message: 'x'.repeat(2001) }).status).toBe(400);
  });
});
