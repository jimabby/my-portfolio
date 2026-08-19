// Prints what visitors have been asking the assistant, and how the replies
// were rated.
//
// api/feedback.js has been writing these to Redis since it was added, and
// nothing has ever read them back — the endpoint's own comment argues the
// questions are the point ("a thumbs-down on 'do you do contract work?' is a
// missing paragraph in the services section") and then leaves them
// unreachable. This is the reading half.
//
// Usage:
//   npm run feedback              every stored vote, newest first
//   npm run feedback -- --down    only the replies that were rated unhelpful
//   npm run feedback -- --json    raw JSON, for piping somewhere else
//
// Credentials come from .env.local (the same file the dev server reads) or
// from the environment, so it works against the deployed store without
// copying secrets around.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const LIST_KEY = 'portfolio_assistant_feedback';

// Minimal .env reader: no dependency, and it must not clobber a variable the
// caller set deliberately on the command line.
const loadEnvFile = async () => {
  for (const name of ['.env.local', '.env']) {
    try {
      const text = await readFile(join(process.cwd(), name), 'utf8');
      for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (!match) continue;
        const [, key, rawValue] = match;
        if (process.env[key]) continue;
        process.env[key] = rawValue.trim().replace(/^["']|["']$/g, '');
      }
    } catch {
      // Absent is fine — the variables may come from the environment.
    }
  }
};

await loadEnvFile();

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error(
    'Feedback: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are not set.\n' +
      'Add them to .env.local (see .env.example) or export them before running.'
  );
  process.exit(1);
}

const args = new Set(process.argv.slice(2));
const { Redis } = await import('@upstash/redis');
const redis = new Redis({ url, token });

const raw = await redis.lrange(LIST_KEY, 0, -1);

// Upstash decodes JSON strings for you on some paths and not others, so accept
// either an object or the string form rather than assuming.
const entries = raw
  .map((item) => {
    if (item && typeof item === 'object') return item;
    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

const selected = args.has('--down')
  ? entries.filter((entry) => entry.verdict === 'down')
  : args.has('--up')
    ? entries.filter((entry) => entry.verdict === 'up')
    : entries;

if (args.has('--json')) {
  console.log(JSON.stringify(selected, null, 2));
  process.exit(0);
}

if (selected.length === 0) {
  console.log('Feedback: nothing stored yet.');
  process.exit(0);
}

const up = entries.filter((entry) => entry.verdict === 'up').length;
const down = entries.length - up;

console.log(`\n${entries.length} votes stored — ${up} up, ${down} down\n`);

// Repeated questions matter more than any single vote: the same question asked
// five times is a page that should have answered it once.
const byQuestion = new Map();
for (const entry of entries) {
  const key = entry.question.trim().toLowerCase();
  const seen = byQuestion.get(key) ?? { question: entry.question.trim(), count: 0, down: 0 };
  seen.count += 1;
  if (entry.verdict === 'down') seen.down += 1;
  byQuestion.set(key, seen);
}

const repeated = [...byQuestion.values()]
  .filter((item) => item.count > 1)
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);

if (repeated.length > 0) {
  console.log('Asked more than once:');
  for (const item of repeated) {
    const flag = item.down > 0 ? ` (${item.down} rated unhelpful)` : '';
    console.log(`  ${String(item.count).padStart(3)}x  ${item.question}${flag}`);
  }
  console.log('');
}

console.log(args.has('--down') ? 'Replies rated unhelpful:' : 'All votes, newest first:');
for (const entry of selected) {
  const mark = entry.verdict === 'up' ? '+' : '-';
  const when = entry.at ? entry.at.slice(0, 16).replace('T', ' ') : 'unknown';
  console.log(`\n[${mark}] ${when}  (${entry.lang})`);
  console.log(`  Q: ${entry.question}`);
  console.log(`  A: ${(entry.answer || '').replace(/\s+/g, ' ').slice(0, 200)}`);
}
console.log('');
