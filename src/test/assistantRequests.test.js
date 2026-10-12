import { expect, it, vi } from 'vitest';
import { requestAssistant, subscribeToAssistantRequests } from '../components/assistant/requests';

it('retains a question clicked before the lazy assistant mounts, exactly once', () => {
  requestAssistant('Tell me about Hermes');
  const receive = vi.fn();
  const unsubscribe = subscribeToAssistantRequests(receive);
  expect(receive).toHaveBeenCalledExactlyOnceWith('Tell me about Hermes');
  requestAssistant('');
  expect(receive).toHaveBeenLastCalledWith('');
  expect(receive).toHaveBeenCalledTimes(2);
  unsubscribe();
  const remount = vi.fn();
  const cleanup = subscribeToAssistantRequests(remount);
  expect(remount).not.toHaveBeenCalled();
  cleanup();
});
