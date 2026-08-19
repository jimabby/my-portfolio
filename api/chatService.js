// The model call itself, shared by the Vercel handler (api/chat.js) and the
// Vite dev middleware (vite.config.js) — the same arrangement as
// contactService.js and feedbackService.js, and for the same reason: two
// copies of a model configuration drift, and the copy that drifts is always
// the one nobody runs locally.
//
// SSE framing is left to the callers. It is four lines either side, and
// keeping it out here means this module can be tested without faking a
// ServerResponse.

const { buildSystemPrompt, buildChatHistory } = require('./systemPrompt');

const MODEL = 'gemini-2.5-flash';

// Thinking is on by default for 2.5 Flash and shows up here as dead air before
// the first token — the visitor watches a typing indicator while the model
// reasons about a question the system prompt already answers verbatim. This is
// lookup over a fixed page of facts, not a reasoning task, so the budget buys
// latency and nothing else.
const THINKING_DISABLED = { thinkingConfig: { thinkingBudget: 0 } };

// Yields reply text as it arrives. In @google/genai a chunk's text is a
// property; in the retired @google/generative-ai it was a method — the single
// most likely thing to break silently if this is ever ported back.
async function* streamChatText({ apiKey, message, history = [], lang = 'en' }) {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey });

  const chat = ai.chats.create({
    model: MODEL,
    config: { ...THINKING_DISABLED, systemInstruction: buildSystemPrompt(lang) },
    history: buildChatHistory(history),
  });

  const stream = await chat.sendMessageStream({ message });
  for await (const chunk of stream) {
    if (chunk.text) yield chunk.text;
  }
}

module.exports = { MODEL, THINKING_DISABLED, streamChatText };
