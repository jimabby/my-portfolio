// The assistant is code-split. Retain the latest request if a visitor clicks
// before its chunk mounts, then consume it when the listener is ready.
let pending = null;

export function requestAssistant(question = '') {
  pending = { question };
  window.dispatchEvent(new CustomEvent('assistant:ask', { detail: pending }));
}

export function subscribeToAssistantRequests(listener) {
  const receive = (event) => {
    pending = null;
    listener(event.detail?.question || '');
  };
  window.addEventListener('assistant:ask', receive);
  if (pending) {
    const { question } = pending;
    pending = null;
    listener(question);
  }
  return () => window.removeEventListener('assistant:ask', receive);
}
