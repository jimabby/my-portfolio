// Records whether an assistant reply was useful, and what was asked.
//
// The value here is the questions, not the votes: what visitors ask the
// assistant is a direct list of what the site fails to explain on its own
// pages. A thumbs-down on "do you do contract work?" is a missing paragraph in
// the services section.
//
// Storage is the Upstash Redis instance already configured for rate limiting.
// With no Redis configured the endpoint accepts and drops the vote — the
// button must never look broken just because the optional store is absent.

const MAX_TEXT_LENGTH = 1000;
const MAX_ENTRIES = 500;
const LIST_KEY = 'portfolio_assistant_feedback';

const ALLOWED_VERDICTS = ['up', 'down'];
const ALLOWED_LANGS = ['en', 'zh-Hans', 'zh-Hant', 'ja'];

function validateFeedbackBody(body) {
  const { verdict, question, answer, lang = 'en' } = body || {};

  if (!ALLOWED_VERDICTS.includes(verdict)) {
    return { error: 'Invalid verdict', status: 400 };
  }
  if (typeof question !== 'string' || !question.trim()) {
    return { error: 'Question is required', status: 400 };
  }
  if (question.length > MAX_TEXT_LENGTH) {
    return { error: 'Question is too long', status: 400 };
  }
  // Length is not checked here — an over-long reply is truncated below. Its
  // size is the model's doing, not the visitor's, and rejecting the vote over
  // it would discard exactly the signal this endpoint exists to collect.
  if (answer !== undefined && typeof answer !== 'string') {
    return { error: 'Invalid answer', status: 400 };
  }

  return {
    ok: true,
    entry: {
      verdict,
      question: question.trim(),
      // Truncated rather than rejected: a long reply is the assistant's doing,
      // not the visitor's, and dropping the vote over it loses the signal.
      answer: (answer ?? '').slice(0, MAX_TEXT_LENGTH),
      lang: ALLOWED_LANGS.includes(lang) ? lang : 'en',
      at: new Date().toISOString(),
    },
  };
}

// No IP, no fingerprint, no visitor identifier of any kind. The question text
// is the whole point; who asked it is not, and storing it would turn a product
// signal into personal data with a retention problem.
async function recordFeedback(entry, config = process.env) {
  const url = config.UPSTASH_REDIS_REST_URL;
  const token = config.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { stored: false };

  const { Redis } = await import('@upstash/redis');
  const redis = new Redis({ url, token });

  await redis.lpush(LIST_KEY, JSON.stringify(entry));
  // Keep the list bounded so it cannot grow without limit on a free tier.
  await redis.ltrim(LIST_KEY, 0, MAX_ENTRIES - 1);

  return { stored: true };
}

module.exports = {
  LIST_KEY,
  MAX_ENTRIES,
  MAX_TEXT_LENGTH,
  validateFeedbackBody,
  recordFeedback,
};
