import { describe, expect, it } from 'vitest';
import contactService from '../../api/contactService.js';

const { validateContactBody } = contactService;

const validBody = () => ({
  name: 'Jim',
  email: 'jim@example.com',
  message: 'Hello there',
  company: '',
  elapsedMs: 3000,
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
    expect(validateContactBody({ ...validBody(), elapsedMs: 0 }).spam).toBe(true);
    expect(validateContactBody({ ...validBody(), elapsedMs: 200 }).spam).toBe(true);
  });

  // A spam verdict answers 200 and drops the message, so a false positive is
  // silent on both ends. Autofill plus an immediate send cleared 2000 ms only
  // sometimes, which meant a real enquiry occasionally vanished.
  it('accepts a fast but human fill', () => {
    expect(validateContactBody({ ...validBody(), elapsedMs: 900 }).ok).toBe(true);
    expect(validateContactBody({ ...validBody(), elapsedMs: 1500 }).ok).toBe(true);
  });

  // An older cached client that predates the timing field is a visitor, not a
  // bot; the honeypot and the rate limiter still cover it.
  it('accepts a submission with no timing field at all', () => {
    expect(validateContactBody({ ...validBody(), elapsedMs: undefined }).ok).toBe(true);
  });

  // Regression: the check used to compare the visitor's wall clock against the
  // server's, so a device clock running fast made every submission look instant
  // and the message was dropped while the UI still reported success.
  it('accepts a slow fill regardless of how skewed the visitor clock is', () => {
    expect(validateContactBody({ ...validBody(), elapsedMs: 2500 }).ok).toBe(true);
    expect(validateContactBody({ ...validBody(), elapsedMs: 9_000_000 }).ok).toBe(true);
  });

  it('rejects invalid or oversized fields', () => {
    expect(validateContactBody({ ...validBody(), name: '' }).status).toBe(400);
    expect(validateContactBody({ ...validBody(), email: 'invalid' }).status).toBe(400);
    expect(validateContactBody({ ...validBody(), message: 'x'.repeat(2001) }).status).toBe(400);
  });
});
