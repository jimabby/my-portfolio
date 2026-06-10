import { useState, useRef, useEffect } from 'react';
import './assistant.css';

const STARTER_PROMPTS = [
  "What projects has Jim built?",
  "Summarize Jim's experience",
  "What are Jim's main skills?",
  'Tell me about Hermes',
  'What certifications does Jim have?',
  'How can I contact Jim?',
];

const STORAGE_KEY = 'assistant_messages_v1';
const MAX_STORED_MESSAGES = 20;

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamText, setStreamText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  async function sendMessage(text) {
    const userMessage = text.trim();
    if (!userMessage || isStreaming) return;

    // `messages` holds the prior turns only; the new message is sent
    // separately so the server doesn't receive it twice.
    const priorHistory = messages;
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setInput('');
    setIsStreaming(true);
    setStreamText('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: priorHistory,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`HTTP ${response.status}: ${body}`);
      }

      if (!response.body) {
        throw new Error('Streaming is not supported by this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            buffer = '';
            break;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              fullText += parsed.text;
              setStreamText(fullText);
            }
          } catch {
            // Ignore malformed stream chunks.
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: fullText || "I couldn't find a response. Please try again.",
        },
      ]);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('[Assistant] Error:', err.message);
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't get a response. Please try again.",
        },
      ]);
    } finally {
      setIsStreaming(false);
      setStreamText('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function clearMessages() {
    if (isStreaming) return;
    setMessages([]);
    setStreamText('');
    setInput('');
  }

  const allMessages = isStreaming
    ? [...messages, { role: 'assistant', content: streamText, streaming: true }]
    : messages;

  return (
    <>
      <button
        type="button"
        className={`assistant__fab ${isOpen ? 'assistant__fab--open' : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Toggle AI assistant"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <span className="assistant__fab-icon">X</span>
        ) : (
          <span className="assistant__fab-icon">
            <i className="uil uil-message"></i>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="assistant__panel" role="dialog" aria-label="AI assistant">
          <div className="assistant__header">
            <div className="assistant__header-info">
              <div className="assistant__avatar">J</div>
              <div>
                <p className="assistant__name">Ask about Jim</p>
                <p className="assistant__status">AI assistant powered by Gemini</p>
              </div>
            </div>
            <div className="assistant__actions">
              <button
                type="button"
                className="assistant__clear"
                onClick={clearMessages}
                disabled={isStreaming || messages.length === 0}
                aria-label="Clear chat"
              >
                Clear
              </button>
              <button
                type="button"
                className="assistant__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                X
              </button>
            </div>
          </div>

          <div className="assistant__messages">
            {allMessages.length === 0 && (
              <p className="assistant__welcome-text">
                Ask about projects, skills, and experience. Answers are based on portfolio content.
              </p>
            )}
            {allMessages.map((msg, i) => (
              <div key={i} className={`assistant__message assistant__message--${msg.role}`}>
                <p className="assistant__message-text">
                  {msg.content}
                  {msg.streaming && <span className="assistant__cursor" />}
                </p>
              </div>
            ))}
            {isStreaming && streamText === '' && (
              <div className="assistant__message assistant__message--assistant">
                <div className="assistant__typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="assistant__chips-bar">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                type="button"
                key={prompt}
                className="assistant__chip"
                onClick={() => sendMessage(prompt)}
                disabled={isStreaming}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="assistant__input-area">
            <input
              ref={inputRef}
              className="assistant__input"
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
            />
            <button
              type="button"
              className="assistant__send"
              onClick={() => sendMessage(input)}
              disabled={isStreaming || !input.trim()}
              aria-label="Send"
            >
              <i className="uil uil-message"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
