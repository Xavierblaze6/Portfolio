'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { useXP } from '@/context/XPContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  "What's your best project? 🚀",
  'Are you available for work?',
  'What makes you different?',
  'Tell me about TruthSeeker',
]

function ChatAvatar({ size }: { size: string }) {
  return (
    <div
      className={`${size} rounded-full flex items-center justify-center shrink-0 overflow-hidden font-bold`}
      style={{
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #e8c547, #f0a500)',
        boxShadow: '0 0 12px rgba(232,197,71,0.4)',
        color: '#0a0a0a',
      }}
    >
      <img
        src="/images/avatar.png"
        alt="Girish"
        className="w-full h-full object-cover"
        style={{ borderRadius: '50%' }}
      />
    </div>
  )
}

export default function GirishChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm Girish's AI - ask me anything about my work, skills, or projects 👋",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasMountedRef = useRef(false)
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (content: string) => {
    const trimmed = content.trim()
    if (!trimmed || loading) return

    if (!hasInteracted) {
      setHasInteracted(true)
      if (!unlockedEvents.has('CHATTED_WITH_AI')) {
        markEventUnlocked('CHATTED_WITH_AI')
        addXP(150, {
          title: 'Had a Conversation',
          emoji: '💬',
          desc: "Chatted with Girish's AI",
        })
      }
    }

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(message => ({
            role: message.role,
            content: message.content,
          })),
        }),
      })

      const data = await res.json()

      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong on my end - try again! 😅' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: '#0d0d0d',
        border: '1px solid #1f1f1f',
        height: '520px',
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: '1px solid #1f1f1f', background: '#111' }}
      >
        <ChatAvatar size="w-9 h-9" />

        <div>
          <div className="text-[14px] font-bold text-[#f0ede6]" style={{ fontFamily: 'var(--font-heading)' }}>
            Girish Manne
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="font-mono text-[10px] text-[#555]">
              AI · usually replies instantly
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={`${msg.role}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {msg.role === 'assistant' ? (
                <ChatAvatar size="w-7 h-7 mt-0.5" />
              ) : null}

              <div
                className="max-w-[80%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed"
                style={
                  msg.role === 'user'
                    ? {
                        background: 'rgba(232,197,71,0.12)',
                        border: '1px solid rgba(232,197,71,0.2)',
                        color: '#f0ede6',
                        borderBottomRightRadius: '4px',
                      }
                    : {
                        background: '#161616',
                        border: '1px solid #1f1f1f',
                        color: '#c0bdb8',
                        borderBottomLeftRadius: '4px',
                      }
                }
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5"
          >
            <ChatAvatar size="w-7 h-7" />
            <div
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
              style={{ background: '#161616', border: '1px solid #1f1f1f', borderBottomLeftRadius: '4px' }}
            >
              {[0, 1, 2].map(index => (
                <motion.span
                  key={index}
                  className="w-1.5 h-1.5 rounded-full bg-[#555]"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, delay: index * 0.15, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        ) : null}

        <div ref={messagesEndRef} />
      </div>

      {!hasInteracted ? (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={() => sendMessage(question)}
              className="text-[11px] font-mono px-3 py-1.5 rounded-full transition-all"
              style={{
                background: 'rgba(232,197,71,0.06)',
                border: '1px solid rgba(232,197,71,0.15)',
                color: '#888',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = 'rgba(232,197,71,0.4)'
                event.currentTarget.style.color = '#e8c547'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = 'rgba(232,197,71,0.15)'
                event.currentTarget.style.color = '#888'
              }}
            >
              {question}
            </button>
          ))}
        </div>
      ) : null}

      <div className="px-4 py-3 flex gap-3 items-center" style={{ borderTop: '1px solid #1f1f1f' }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') sendMessage(input)
          }}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-[14px] text-[#f0ede6] outline-none placeholder-[#333]"
          style={{ fontFamily: 'var(--font-body)' }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0"
          style={{
            background: input.trim() ? '#e8c547' : '#1f1f1f',
            opacity: loading ? 0.5 : 1,
          }}
        >
          <Send size={14} color={input.trim() ? '#0a0a0a' : '#333'} />
        </button>
      </div>
    </div>
  )
}