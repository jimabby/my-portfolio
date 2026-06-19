import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'node:module'

// Reuse the same prompt + history shaping the production handler uses, so dev
// and prod can never drift apart.
const require = createRequire(import.meta.url)
const { buildSystemPrompt, buildChatHistory } = require('./api/systemPrompt.js')
const { validateBody } = require('./api/guard.js')

function devChatApi(apiKey) {
  return {
    name: 'dev-chat-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        let body = ''
        req.on('data', (d) => (body += d))
        req.on('end', async () => {
          try {
            if (!apiKey) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ error: 'API key not configured' }))
            }
            const { GoogleGenerativeAI } = await import('@google/generative-ai')
            const parsed = validateBody(JSON.parse(body))
            if (parsed.error) {
              res.statusCode = parsed.status
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ error: parsed.error }))
            }
            const { message, history, lang } = parsed
            const genAI = new GoogleGenerativeAI(apiKey)
            const model = genAI.getGenerativeModel({
              model: 'gemini-2.5-flash',
              systemInstruction: buildSystemPrompt(lang),
            })
            const chat = model.startChat({ history: buildChatHistory(history) })
            res.setHeader('Content-Type', 'text/event-stream')
            res.setHeader('Cache-Control', 'no-cache')
            const result = await chat.sendMessageStream(message)
            for await (const chunk of result.stream) {
              const text = chunk.text()
              if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`)
            }
            res.write('data: [DONE]\n\n')
            res.end()
          } catch (err) {
            if (!res.headersSent) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            } else {
              res.end()
            }
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), devChatApi(env.GEMINI_API_KEY)],
  }
})
