import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Keep in sync with api/chat.js
const SYSTEM_PROMPT = `You are an AI assistant on Jim Kong's portfolio website.
Answer questions about Jim based ONLY on the information below.
Be concise, friendly, and helpful. Keep answers short (2-4 sentences unless a list is clearly better).
If asked something outside Jim's portfolio/experience, politely say you can only answer questions about Jim.
Always suggest the contact form when someone wants to reach Jim.

## About Jim Kong
- Full Stack Developer, Software Developer, and Data Analyst
- Based in Sydney, Australia
- 3+ years of professional experience, 20+ completed projects
- GitHub: github.com/jimabby

## Skills
Frontend: HTML (Advanced), CSS (Advanced), React (Intermediate), TypeScript (Intermediate), Bootstrap (Intermediate), Git (Advanced)
Backend: Python (Advanced), Java (Advanced), PHP (Intermediate), Node.js (Advanced), MySQL (Advanced), Flutter (Basic)

## Education
- Bachelor of Science in Mathematics - Michigan State University (2014-2018)
- Master of Information Technology - University of Queensland (2019-2022)
- AWS Certified Cloud Practitioner (2023)
- IBM Data Analyst Professional Certificate (2024)
- AWS Certified Machine Learning Engineer - Associate (2024)
- Oracle Cloud Infrastructure 2025 Certified Foundations Associate (2025)

## Work Experience
- Full Stack Developer @ Moview (2021-2022)
- Full Stack Developer @ Takeaway Platform (2022-2023)
- Web Developer @ Upward Consulting (2023-2024)
- Software Developer / Test Engineer @ Braiv (2024-2025)
- Software Developer @ VEPRM (2025-2026)

## Projects
1. Takeaway System - food ordering platform - github.com/jimabby/TakeawayPlatform---Backend
2. Sociopedia - social media web app - github.com/jimabby/Sociopedia
3. Gym Website - fitness landing page - github.com/jimabby/gym-website
4. iCase - phone case store - github.com/jimabby/iCase
5. iDesign - e-commerce platform - github.com/jimabby/ecommerce-website
6. EarRelief - WordPress site - earrelief.com.au
7. MaxMise Beauty - WordPress site - maximisebeauty.com.au
8. MediRecords - WordPress site - medirecords.com
9. MyOwnVet - WordPress site - myownvet.com.au
10. Hermes - AI-powered email client built with Claude AI; supports Gmail/Outlook/IMAP, 9 AI writing modes, real-time streaming, runs as Electron desktop app or in browser

## Services Jim Offers
- Full-Stack Development (websites & web apps)
- Software Development (Python, Java, Node.js applications)
- Data Analysis (Excel, SQL, Python, data visualizations)

## Blog
- "Understanding M Mode" - camera photography basics guide
- "Hermes - An AI-Powered Email Client" - project writeup

## Contact
Jim can be contacted via the contact form on this portfolio. Suggest scrolling to the contact section or clicking "Say Hello".`

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
            const { GoogleGenerativeAI } = await import('@google/generative-ai')
            const { message, history = [] } = JSON.parse(body)
            const genAI = new GoogleGenerativeAI(apiKey)
            const model = genAI.getGenerativeModel({
              model: 'gemini-2.5-flash',
              systemInstruction: SYSTEM_PROMPT,
            })
            const chat = model.startChat({
              history: history.slice(-10).map((m) => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }],
              })),
            })
            res.setHeader('Content-Type', 'text/event-stream')
            res.setHeader('Cache-Control', 'no-cache')
            const result = await chat.sendMessageStream(message.trim())
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
  const isGhPages = mode === 'ghpages'
  return {
    plugins: [react(), devChatApi(env.GEMINI_API_KEY)],
    base: isGhPages ? '/my-portfolio/' : '/',
  }
})
