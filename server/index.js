import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import process from 'node:process'
import OpenAI from 'openai'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 8787)
const hasApiKey = Boolean(process.env.OPENAI_API_KEY)
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
const baseURL = process.env.OPENAI_BASE_URL
const appUrl = process.env.OPENROUTER_SITE_URL || 'http://localhost:5173'
const appName = process.env.OPENROUTER_APP_NAME || 'Ashish Portfolio'

const openai = hasApiKey
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      ...(baseURL ? { baseURL } : {}),
      ...(baseURL?.includes('openrouter.ai')
        ? {
            defaultHeaders: {
              'HTTP-Referer': appUrl,
              'X-Title': appName,
            },
          }
        : {}),
    })
  : null

const profileContext = `
You are the portfolio assistant for Ashish Yadav.
Facts:
- Software Engineer with 2+ years of experience.
- BTech in ECE from IIIT Nagpur.
- Works mainly with React, Next.js, Node.js, TypeScript, and scalable web architectures.
- Writesonic highlights:
  - Built matrix view components for GEO Overview with Next.js 15, TanStack Query, Zustand.
  - Built advanced citation filters with URL persistence and conditional operators.
  - Built time graph visualizations handling high-frequency streams (~5K updates/min), reducing dashboard load by 30%.
  - Led Mixpanel onboarding diagnostics, increasing onboarding completion by 35%.
  - Implemented AI-assisted code review rules improving issue detection by 30%.
- Aquera highlights:
  - Built custom debugger interface using React, Redux, Socket.io.
  - Built AI-powered assistant module, increasing engagement by 40%.
  - Integrated Monaco editor and CSV ingestion via Web Workers.
  - Implemented secure refresh token flow reducing backend load by 50%.
  - Built scalable UI systems with virtualized lists and testing up to 95% coverage.
- Additional strengths: Kafka, event-driven architecture, Docker, rate limiting, performance optimization.
`

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    aiLive: hasApiKey,
    model,
    provider: baseURL?.includes('openrouter.ai') ? 'openrouter' : 'openai',
  })
})

app.post('/api/chat', async (request, response) => {
  const { question } = request.body ?? {}

  if (!question || typeof question !== 'string') {
    response.status(400).json({ error: 'A question string is required.' })
    return
  }

  if (!openai) {
    response.json({
      answer:
        'AI backend is ready. Add OPENAI_API_KEY to .env to enable live LLM responses. For now: Ashish builds scalable full-stack systems with strong React/Next.js expertise, event-driven architecture, Kafka, Docker, and measurable product impact.',
    })
    return
  }

  try {
    const completion = await openai.responses.create({
      model,
      input: [
        { role: 'system', content: profileContext },
        {
          role: 'user',
          content: `User question: ${question}\nAnswer briefly and professionally in 2-4 sentences.`,
        },
      ],
      temperature: 0.6,
      max_output_tokens: 220,
    })

    const answer =
      completion.output_text?.trim() ||
      'I can help with Ashish’s projects, architecture, and technical strengths.'

    response.json({ answer })
  } catch (error) {
    const detailMessage =
      error instanceof Error ? error.message : 'Unknown AI service failure.'
    console.error('AI generation error:', detailMessage)

    response.status(500).json({
      error: 'Failed to generate AI response.',
      detail: detailMessage,
    })
  }
})

app.listen(PORT, () => {
  console.log(`Chat API running at http://localhost:${PORT}`)
})
