// Shared request-hardening helpers for the chat endpoint. Consumed by the
// Vercel handler (api/chat.js) and the Vite dev middleware (vite.config.js)
// so validation can't drift between dev and prod.

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_ITEMS = 50;
const MAX_HISTORY_ITEM_LENGTH = 4000;
const ALLOWED_LANGS = ['en', 'zh-Hans', 'zh-Hant', 'ja'];

// Rate limit: requests allowed per IP within the rolling window.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 1000;

// Validate and normalise the request body. Returns either { error, status }
// or { ok: true, message, history, lang }.
function validateBody(body) {
  const { message, history = [], lang = 'en' } = body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return { error: 'Message is required', status: 400 };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { error: 'Message is too long', status: 400 };
  }
  if (!Array.isArray(history)) {
    return { error: 'History must be an array', status: 400 };
  }
  if (history.length > MAX_HISTORY_ITEMS) {
    return { error: 'History is too long', status: 400 };
  }
  for (const item of history) {
    if (
      !item ||
      typeof item.content !== 'string' ||
      item.content.length > MAX_HISTORY_ITEM_LENGTH
    ) {
      return { error: 'Invalid history item', status: 400 };
    }
  }

  const safeLang = ALLOWED_LANGS.includes(lang) ? lang : 'en';
  return { ok: true, message: message.trim(), history, lang: safeLang };
}

// Block cross-origin browser requests (hotlinking / embedded abuse). Requests
// with no Origin header (curl, server-to-server) pass here and are governed by
// the rate limiter instead. Same-origin and explicitly allow-listed origins
// (ALLOWED_ORIGINS env, comma-separated) are accepted.
function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;

  const allowList = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const originHost = new URL(origin).host;
    if (req.headers.host && originHost === req.headers.host) return true;
  } catch {
    return false;
  }
  return allowList.includes(origin);
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

// Preferred path: a shared Upstash Redis store, so the limit is enforced across
// all serverless instances and survives cold starts. Configured via env; the
// client is built lazily and cached so the import cost is paid only once.
let upstashLimiter;
let upstashTried = false;

async function getUpstashLimiter() {
  if (upstashTried) return upstashLimiter;
  upstashTried = true;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return (upstashLimiter = null);
  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis } = await import('@upstash/redis');
    upstashLimiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(RATE_LIMIT, `${RATE_WINDOW_MS / 1000} s`),
      prefix: 'portfolio_chat',
    });
  } catch {
    upstashLimiter = null; // package missing / init failed → fall back below
  }
  return upstashLimiter;
}

// Fallback path: best-effort per-IP limiting in memory. Resets on cold starts
// and is per-instance only, but still curbs sustained abuse when Upstash isn't
// configured (e.g. local dev).
const hits = new Map();

function inMemoryRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

async function isRateLimited(req) {
  const ip = getClientIp(req);
  const limiter = await getUpstashLimiter();
  if (limiter) {
    try {
      const { success } = await limiter.limit(ip);
      return !success;
    } catch {
      // Redis hiccup — degrade gracefully to the in-memory limiter.
    }
  }
  return inMemoryRateLimited(ip);
}

module.exports = {
  MAX_MESSAGE_LENGTH,
  ALLOWED_LANGS,
  validateBody,
  isAllowedOrigin,
  isRateLimited,
};
