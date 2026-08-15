import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'node:module'

// Reuse the same prompt + history shaping the production handler uses, so dev
// and prod can never drift apart.
const require = createRequire(import.meta.url)
const { buildSystemPrompt, buildChatHistory } = require('./api/systemPrompt.js')
const { validateBody, isAllowedOrigin, isRateLimited } = require('./api/guard.js')
const { validateContactBody, sendContactEmail } = require('./api/contactService.js')
const { validateFeedbackBody, recordFeedback } = require('./api/feedbackService.js')

// Reject a request the same way the production handlers do. Dev used to skip
// the origin check and the rate limiter entirely, which is precisely the drift
// api/guard.js was extracted to prevent: a limit that is never exercised
// locally is a limit nobody notices is broken.
async function rejectRequest(req, res, limitOptions) {
  if (!isAllowedOrigin(req)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Forbidden' }))
    return true
  }
  if (await isRateLimited(req, limitOptions)) {
    res.statusCode = 429
    res.setHeader('Retry-After', String(Math.ceil((limitOptions?.windowMs ?? 60000) / 1000)))
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Too many requests. Please slow down.' }))
    return true
  }
  return false
}

function devApi(env) {
  const apiKey = env.GEMINI_API_KEY
  return {
    name: 'dev-api',
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
            if (await rejectRequest(req, res)) return
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
            // Log locally, but answer with the same opaque message production
            // sends — a dev-only error shape hides response-handling bugs in
            // the client until they reach the deployed site.
            console.error('[dev /api/chat]', err.message)
            if (!res.headersSent) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Failed to get a response' }))
            } else {
              res.write(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`)
              res.end()
            }
          }
        })
      })

      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', async () => {
          try {
            // Same limits as api/contact.js.
            if (
              await rejectRequest(req, res, {
                prefix: 'portfolio_contact',
                limit: 5,
                windowMs: 10 * 60 * 1000,
              })
            ) {
              return
            }
            res.setHeader('Content-Type', 'application/json')
            const parsed = validateContactBody(JSON.parse(body))
            if (parsed.spam) {
              console.warn('Contact submission rejected as spam')
              return res.end(JSON.stringify({ ok: true }))
            }
            if (parsed.error) {
              res.statusCode = parsed.status
              return res.end(JSON.stringify({ error: parsed.error }))
            }
            await sendContactEmail(parsed.fields, env)
            return res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            console.error('[dev /api/contact]', err.message)
            res.statusCode = 500
            return res.end(JSON.stringify({ error: 'Unable to send message' }))
          }
        })
      })

      server.middlewares.use('/api/feedback', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', async () => {
          try {
            // Same limits as api/feedback.js.
            if (
              await rejectRequest(req, res, {
                prefix: 'portfolio_feedback',
                limit: 30,
                windowMs: 60 * 60 * 1000,
              })
            ) {
              return
            }
            res.setHeader('Content-Type', 'application/json')
            const parsed = validateFeedbackBody(JSON.parse(body))
            if (parsed.error) {
              res.statusCode = parsed.status
              return res.end(JSON.stringify({ error: parsed.error }))
            }
            await recordFeedback(parsed.entry, env)
            return res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            // Matches production: a vote is never worth an error state.
            console.error('[dev /api/feedback]', err.message)
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ ok: true }))
          }
        })
      })
    },
  }
}

// sitemap.xml and rss.xml are written into dist/ at build time, so in dev they
// 404 — including the feed link in the footer and the <link rel="alternate">
// in every <head>. Serving them here from the same builders the build uses
// means the dev server and production answer identically.
function devFeeds() {
  return {
    name: 'dev-feeds',
    apply: 'serve',
    configureServer(server) {
      const send = (res, body) => {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        // Never cached in dev: the whole point is seeing an edit take effect.
        res.setHeader('Cache-Control', 'no-store')
        res.end(body)
      }

      server.middlewares.use('/rss.xml', async (_req, res) => {
        const { buildFeed } = await import('./scripts/feeds.mjs')
        send(res, buildFeed())
      })

      server.middlewares.use('/sitemap.xml', async (_req, res) => {
        const { buildSitemap } = await import('./scripts/feeds.mjs')
        const { allRoutes } = await import('./scripts/site-routes.mjs')
        send(res, buildSitemap(await allRoutes()))
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), devApi(env), devFeeds()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.js',
    },
  }
})
