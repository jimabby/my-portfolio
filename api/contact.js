const { isAllowedOrigin, isRateLimited } = require('./guard');
const { validateContactBody, sendContactEmail } = require('./contactService');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (
    await isRateLimited(req, {
      prefix: 'portfolio_contact',
      limit: 5,
      windowMs: 10 * 60 * 1000,
    })
  ) {
    res.setHeader('Retry-After', '600');
    return res.status(429).json({ error: 'Too many requests' });
  }

  const parsed = validateContactBody(req.body);
  if (parsed.spam) return res.status(200).json({ ok: true });
  if (parsed.error) return res.status(parsed.status).json({ error: parsed.error });

  try {
    await sendContactEmail(parsed.fields);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email error:', error.message);
    return res.status(500).json({ error: 'Unable to send message' });
  }
};
