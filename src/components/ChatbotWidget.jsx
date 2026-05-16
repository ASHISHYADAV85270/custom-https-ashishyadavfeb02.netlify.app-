import { useEffect, useState } from 'react'

const getApiEndpoint = (path) => {
  const base = import.meta.env.VITE_CHAT_API_URL
  if (!base) {
    return path
  }

  return `${base.replace(/\/$/, '')}${path}`
}

export function ChatbotWidget() {
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking')
  const [isAiLive, setIsAiLive] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hi, I am Ashish AI Assistant. Ask me about projects, architecture, product impact, or tech stack.',
    },
  ])

  useEffect(() => {
    let isMounted = true

    const checkBackendHealth = async () => {
      try {
        const healthUrl = getApiEndpoint('/api/health')
        const response = await fetch(healthUrl)

        const contentType = response.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          throw new Error('Health endpoint did not return JSON')
        }

        const payload = await response.json()

        if (!response.ok) {
          throw new Error('Backend unavailable')
        }

        if (isMounted) {
          setBackendStatus('online')
          setIsAiLive(Boolean(payload.aiLive))
        }
      } catch {
        if (isMounted) {
          setBackendStatus('offline')
          setIsAiLive(false)
        }
      }
    }

    checkBackendHealth()
    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedQuestion = question.trim()

    if (!trimmedQuestion || isLoading) {
      return
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      { sender: 'user', text: trimmedQuestion },
    ])
    setQuestion('')

    try {
      setIsLoading(true)
      const apiUrl = getApiEndpoint('/api/chat')
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmedQuestion }),
      })

      const contentType = apiResponse.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('Chat endpoint returned non-JSON response')
      }

      const payload = await apiResponse.json()

      if (!apiResponse.ok) {
        throw new Error(payload.detail || payload.error || 'AI request failed')
      }

      const responseText =
        payload.answer ||
        payload.error ||
        'I can help with Ashish’s experience in full-stack engineering and AI integration.'

      if (payload.answer?.includes('Add OPENAI_API_KEY')) {
        setIsAiLive(false)
        setBackendStatus('online')
      } else {
        setBackendStatus('online')
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        { sender: 'assistant', text: responseText },
      ])
    } catch (error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: 'assistant',
          text:
            error instanceof Error
              ? `AI backend issue: ${error.message}. Please ensure both web and API dev servers are running.`
              : 'I could not reach the AI backend. Please ensure both web and API dev servers are running.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <aside className="chatbot" aria-label="AI assistant chatbot">
      <div className="chatbot-header">
        <h3>AI Portfolio Assistant</h3>
        <span className={`status-badge ${isAiLive ? 'live' : 'fallback'}`}>
          {backendStatus === 'checking'
            ? 'Checking...'
            : isAiLive
              ? 'AI Live'
              : backendStatus === 'online'
                ? 'Fallback Mode'
                : 'Backend Offline'}
        </span>
      </div>

      <div className="chat-thread">
        {!isAiLive && backendStatus === 'online' ? (
          <p className="chat-hint">
            Live LLM is disabled. Add <code>OPENAI_API_KEY</code> in{' '}
            <code>.env</code> and restart <code>npm run dev</code>.
          </p>
        ) : null}
        {messages.map((message, index) => (
          <p
            key={`${message.sender}-${index}`}
            className={`chat-message ${message.sender}`}
          >
            {message.text}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <label htmlFor="chat-input" className="visually-hidden">
          Ask a question
        </label>
        <input
          id="chat-input"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          disabled={isLoading}
          placeholder="Ask about CQRS, Kafka, Docker..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </aside>
  )
}
