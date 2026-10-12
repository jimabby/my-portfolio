import { describe, expect, it } from 'vitest';
import { boundedHistory } from '../components/assistant/history';
import guard from '../../api/guard';

const turn = (index) => ({ role: index % 2 ? 'assistant' : 'user', content: `Message ${index}` });

describe('long assistant conversations', () => {
  it('can continue after 30 turns without changing the visible transcript', () => {
    const transcript = Array.from({ length: 60 }, (_, i) => turn(i));
    const history = boundedHistory(transcript);
    expect(history).toHaveLength(50);
    expect(history[0].content).toBe('Message 10');
    expect(guard.validateBody({ message: 'Continue', history }).ok).toBe(true);
    expect(transcript).toHaveLength(60);
  });
  it('handles a long model reply and excludes local error notices', () => {
    const transcript = [turn(0), { role: 'assistant', content: 'x'.repeat(9000) }, { role: 'assistant', content: 'Network error', localOnly: true }];
    const history = boundedHistory(transcript);
    expect(history).toHaveLength(2);
    expect(history[1].content).toHaveLength(4000);
    expect(guard.validateBody({ message: 'Continue', history }).ok).toBe(true);
    expect(transcript[1].content).toHaveLength(9000);
  });
  it('never begins the model context with an orphaned assistant reply', () => {
    expect(boundedHistory([turn(1), turn(2), turn(3)])[0].role).toBe('user');
  });
});
