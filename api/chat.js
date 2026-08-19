const { streamChatText } = require('./chatService');
const { validateBody, isAllowedOrigin, isRateLimited } = require('./guard');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (await isRateLimited(req)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  const parsed = validateBody(req.body);
  if (parsed.error) {
    return res.status(parsed.status).json({ error: parsed.error });
  }
  const { message, history, lang } = parsed;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    for await (const text of streamChatText({
      apiKey: process.env.GEMINI_API_KEY,
      message,
      history,
      lang,
    })) {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Gemini error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to get a response' });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`);
      res.end();
    }
  }
};
