import { track } from '@vercel/analytics';

// Only fixed event names and project identifiers belong here. Never send form
// content, assistant questions, search queries, email addresses, or URL queries.
export function trackConversion(name, properties = {}) {
  try {
    track(name, properties);
  } catch {
    // Analytics must never prevent navigation, downloads, or form completion.
  }
}
