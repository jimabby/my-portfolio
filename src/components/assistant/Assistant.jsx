import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './assistant.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useLocalePath } from '../../i18n/useLocalePath';
import { renderMarkdown } from './markdown';

const STORAGE_KEY = 'assistant_messages_v1';
const MAX_STORED_MESSAGES = 20;

// Longer than the chat function's own budget (vercel.json sets maxDuration to
// 60s for api/chat.js). At 30s this fired first and cut off long replies at
// half the time the server was allowed to spend on them — and because it
// aborts through the same controller as the stop button, the visitor saw a
// reply that simply stopped, with nothing to say why. The server's limit
// should be what ends a slow request; this is only a backstop for a
// connection that has genuinely gone away.
const REQUEST_TIMEOUT_MS = 65000;

const loadStoredMessages = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (message) =>
          (message?.role === 'user' || message?.role === 'assistant') &&
          typeof message.content === 'string'
      )
      .slice(-MAX_STORED_MESSAGES);
  } catch {
    return [];
  }
};

export default function Assistant() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  // The model is prompted to write canonical, language-independent paths
  // ("/blog", "/#contact"). Without this, a visitor reading /ja who follows one
  // lands on the English page, because the URL is what selects the language.
  const withLocale = useLocalePath();
  const starterPrompts = t('assistant.starters');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(loadStoredMessages);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamText, setStreamText] = useState('');
  // Message index -> 'up' | 'down'. Deliberately not persisted: the vote is
  // already recorded server-side, and restoring it across reloads would only
  // invite a second one.
  const [feedback, setFeedback] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const fabRef = useRef(null);
  const abortRef = useRef(null);
  // Set when the backstop above fires, so the abort handler can tell a timeout
  // apart from the visitor pressing stop. Same AbortError either way.
  const timedOutRef = useRef(false);

  // Abort any in-flight request if the component unmounts mid-stream.
  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [messages, streamText]);

  useEffect(() => {
    if (!isOpen) return;
    const fab = fabRef.current;
    inputRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      // Trap Tab focus inside the open dialog.
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.disabled && el.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      fab?.focus();
    };
  }, [isOpen]);

  async function sendMessage(text) {
    const userMessage = text.trim();
    if (!userMessage || isStreaming) return;

    // `messages` holds the prior turns only; the new message is sent
    // separately so the server doesn't receive it twice. Locally generated
    // error notices are stripped: they were never the model's output, and
    // feeding them back makes it apologise for failures it didn't have.
    const priorHistory = messages.filter((m) => !m.localOnly);
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setInput('');
    setIsStreaming(true);
    setStreamText('');

    const controller = new AbortController();
    abortRef.current = controller;
    timedOutRef.current = false;
    // Don't let a hung request leave the user stuck forever.
    const timeoutId = setTimeout(() => {
      timedOutRef.current = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    let reader;
    let fullText = '';
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: priorHistory,
          lang,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`HTTP ${response.status}: ${body}`);
      }

      if (!response.body) {
        throw new Error('Streaming is not supported by this browser.');
      }

      reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

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
          let parsed;
          try {
            parsed = JSON.parse(data);
          } catch {
            continue; // Ignore malformed stream chunks.
          }
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.text) {
            fullText += parsed.text;
            setStreamText(fullText);
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: fullText || t('assistant.fallback'),
        },
      ]);
    } catch (err) {
      // User pressed stop: keep whatever streamed so far rather than replacing
      // it with an error — they asked for it to end, and the partial answer is
      // still the answer. A timeout is different: nobody chose it, so it gets
      // said out loud, appended to whatever did arrive.
      if (err.name === 'AbortError') {
        const timedOut = timedOutRef.current;
        if (fullText) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: fullText },
          ]);
        }
        if (timedOut) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: t('assistant.errorTimeout'), localOnly: true },
          ]);
        }
      } else {
        if (import.meta.env.DEV) {
          console.error('[Assistant] Error:', err.message);
        }
        const detail = err.message || '';
        let friendly = t('assistant.errorGeneric');
        if (detail.includes('API key not configured')) {
          friendly = t('assistant.errorConfig');
        } else if (detail.includes('HTTP 404') || detail.includes('HTTP 405')) {
          friendly = t('assistant.errorUnavailable');
        }
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: friendly, localOnly: true },
        ]);
      }
    } finally {
      clearTimeout(timeoutId);
      reader?.cancel().catch(() => {});
      abortRef.current = null;
      timedOutRef.current = false;
      setIsStreaming(false);
      setStreamText('');
    }
  }

  function stopStreaming() {
    abortRef.current?.abort();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // Links the assistant offers into the site itself route in-place and close
  // the panel, so "show me the contact form" actually lands the visitor there
  // instead of reloading the page underneath them.
  function handleInternalLink(e, href) {
    e.preventDefault();
    setIsOpen(false);
    navigate(withLocale(href.startsWith('#') ? `/${href}` : href));
  }

  function clearMessages() {
    if (isStreaming) return;
    setMessages([]);
    setStreamText('');
    setInput('');
    setFeedback({});
  }

  // What visitors ask is the useful signal — a thumbs-down on a question the
  // site should already answer is a gap in the pages, not just a bad reply.
  // Fire-and-forget: a vote that fails to record must not surface as an error
  // on top of whatever the assistant just got wrong.
  function sendFeedback(index, verdict) {
    if (feedback[index]) return;
    setFeedback((prev) => ({ ...prev, [index]: verdict }));

    const answer = messages[index]?.content ?? '';
    // The turn immediately before the reply is the question it answered.
    const question = messages[index - 1]?.role === 'user' ? messages[index - 1].content : '';
    if (!question) return;

    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verdict, question, answer, lang }),
    }).catch(() => {});
  }

  const allMessages = isStreaming
    ? [...messages, { role: 'assistant', content: streamText, streaming: true }]
    : messages;

  const lastMessage = messages[messages.length - 1];
  const lastAssistantMessage =
    lastMessage?.role === 'assistant' ? lastMessage.content : '';

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={`assistant__fab ${isOpen ? 'assistant__fab--open' : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t('assistant.toggle')}
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
        <div ref={panelRef} className="assistant__panel" role="dialog" aria-modal="true" aria-label={t('assistant.name')}>
          <div className="assistant__header">
            <div className="assistant__header-info">
              <div className="assistant__avatar">J</div>
              <div>
                <p className="assistant__name">{t('assistant.name')}</p>
                <p className="assistant__status">{t('assistant.status')}</p>
              </div>
            </div>
            <div className="assistant__actions">
              <button
                type="button"
                className="assistant__clear"
                onClick={clearMessages}
                disabled={isStreaming || messages.length === 0}
                aria-label={t('assistant.clearAria')}
              >
                {t('assistant.clear')}
              </button>
              <button
                type="button"
                className="assistant__close"
                onClick={() => setIsOpen(false)}
                aria-label={t('assistant.close')}
              >
                X
              </button>
            </div>
          </div>

          {/* The transcript itself is not a live region: while streaming it
              changes on every token, which makes a screen reader restart the
              whole reply continuously. Only the finished reply is announced,
              from the dedicated status node below. */}
          <div className="assistant__messages">
            {allMessages.length === 0 && (
              <p className="assistant__welcome-text">
                {t('assistant.welcome')}
              </p>
            )}
            {allMessages.map((msg, i) => (
              <div key={i} className={`assistant__message assistant__message--${msg.role}`}>
                {msg.role === 'assistant' ? (
                  <div className="assistant__message-body">
                    {renderMarkdown(msg.content, handleInternalLink, withLocale)}
                    {msg.streaming && <span className="assistant__cursor" />}
                    {/* Only on finished, model-authored replies: rating a
                        locally generated error notice would record a verdict
                        on something the model never said. */}
                    {!msg.streaming && !msg.localOnly && messages[i - 1]?.role === 'user' && (
                      <div className="assistant__feedback">
                        {feedback[i] ? (
                          <span className="assistant__feedback-thanks">
                            {t('assistant.feedbackThanks')}
                          </span>
                        ) : (
                          <>
                            <span className="assistant__feedback-label">
                              {t('assistant.feedbackPrompt')}
                            </span>
                            <button
                              type="button"
                              className="assistant__feedback-btn"
                              onClick={() => sendFeedback(i, 'up')}
                              aria-label={t('assistant.feedbackUp')}
                            >
                              <i className="uil uil-thumbs-up"></i>
                            </button>
                            <button
                              type="button"
                              className="assistant__feedback-btn"
                              onClick={() => sendFeedback(i, 'down')}
                              aria-label={t('assistant.feedbackDown')}
                            >
                              <i className="uil uil-thumbs-down"></i>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="assistant__message-text">{msg.content}</p>
                )}
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

          {/* Announces only settled state: the reply once it has finished
              streaming, so assistive tech reads it exactly once. */}
          <p className="assistant__sr-status" role="status" aria-live="polite">
            {isStreaming ? t('assistant.thinking') : lastAssistantMessage}
          </p>

          <div className="assistant__chips-bar">
            {(Array.isArray(starterPrompts) ? starterPrompts : []).map((prompt) => (
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
              placeholder={t('assistant.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
            />
            {isStreaming ? (
              <button
                type="button"
                className="assistant__send assistant__send--stop"
                onClick={stopStreaming}
                aria-label={t('assistant.stop')}
              >
                <span className="assistant__stop-icon" />
              </button>
            ) : (
              <button
                type="button"
                className="assistant__send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                aria-label={t('assistant.send')}
              >
                <i className="uil uil-message"></i>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
