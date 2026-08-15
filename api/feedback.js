const { isAllowedOrigin, isRateLimited } = require('./guard');
const { validateFeedbackBody, recordFeedback } = require('./feedbackService');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (
    await isRateLimited(req, {
      prefix: 'portfolio_feedback',
      limit: 30,
      windowMs: 60 * 60 * 1000,
    })
  ) {
    res.setHeader('Retry-After', '3600');
    return res.status(429).json({ error: 'Too many requests' });
  }

  const parsed = validateFeedbackBody(req.body);
  if (parsed.error) return res.status(parsed.status).json({ error: parsed.error });

  try {
    await recordFeedback(parsed.entry);
    return res.status(200).json({ ok: true });
  } catch (error) {
    // A vote that fails to store is not worth showing the visitor an error
    // over — they rated a chat reply, not submitted a form.
    console.error('Feedback error:', error.message);
    return res.status(200).json({ ok: true });
  }
};
