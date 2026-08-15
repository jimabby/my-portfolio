import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { validateFeedbackBody, MAX_TEXT_LENGTH } = require('../../api/feedbackService.js');

const validBody = () => ({
  verdict: 'up',
  question: 'Do you build mobile apps?',
  answer: 'Yes — Pockyt and Oncora are both React Native apps.',
  lang: 'en',
});

describe('assistant feedback validation', () => {
  it('accepts a well-formed vote and stamps it', () => {
    const result = validateFeedbackBody(validBody());
    expect(result.ok).toBe(true);
    expect(result.entry.verdict).toBe('up');
    expect(result.entry.question).toBe('Do you build mobile apps?');
    expect(result.entry.at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('rejects a verdict that is not a thumb', () => {
    expect(validateFeedbackBody({ ...validBody(), verdict: 'sideways' }).status).toBe(400);
    expect(validateFeedbackBody({ ...validBody(), verdict: undefined }).status).toBe(400);
  });

  it('requires the question that was asked', () => {
    expect(validateFeedbackBody({ ...validBody(), question: '   ' }).status).toBe(400);
    expect(
      validateFeedbackBody({ ...validBody(), question: 'x'.repeat(MAX_TEXT_LENGTH + 1) }).status
    ).toBe(400);
  });

  // The reply's length is the model's doing, not the visitor's — losing the
  // vote over it would throw away the signal the endpoint exists to collect.
  it('truncates an over-long answer instead of rejecting the vote', () => {
    const result = validateFeedbackBody({
      ...validBody(),
      answer: 'x'.repeat(MAX_TEXT_LENGTH + 500),
    });
    expect(result.ok).toBe(true);
    expect(result.entry.answer).toHaveLength(MAX_TEXT_LENGTH);
  });

  it('falls back to English for an unknown language', () => {
    expect(validateFeedbackBody({ ...validBody(), lang: 'klingon' }).entry.lang).toBe('en');
  });

  // Storing an identifier would turn a product signal into personal data.
  it('records nothing that identifies the visitor', () => {
    const { entry } = validateFeedbackBody({ ...validBody(), ip: '1.2.3.4', userId: 'abc' });
    expect(Object.keys(entry).sort()).toEqual(['answer', 'at', 'lang', 'question', 'verdict']);
  });
});
