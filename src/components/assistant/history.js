// Keep these bounds aligned with api/guard.js. Preserve the complete visible
// transcript, but send only recent complete turns within the API's limits.
export const MAX_INPUT_LENGTH = 1000;
export function boundedHistory(messages) {
  const history = messages
    .filter((m) => !m.localOnly && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .slice(-50)
    .map(({ role, content }) => ({ role, content: content.slice(0, 4000) }));
  while (history[0]?.role === 'assistant') history.shift();
  return history;
}
