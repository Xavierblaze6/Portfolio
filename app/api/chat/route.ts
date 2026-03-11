import { NextRequest, NextResponse } from 'next/server'
import { GIRISH_CONTEXT } from '@/lib/chatContext'

const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 20
const RATE_WINDOW = 60 * 60 * 1000

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for') || 'unknown'
  const ip = forwardedFor.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()

  const userLimit = rateLimit.get(ip)
  if (userLimit) {
    if (now < userLimit.resetTime) {
      if (userLimit.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: 'Too many messages! Come back later 😅' },
          { status: 429 }
        )
      }
      userLimit.count += 1
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    }
  } else {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
  }

  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] }
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chat is not configured right now. Try the contact form instead.' },
        { status: 500 }
      )
    }

    const safeMessages = Array.isArray(messages)
      ? messages.filter(
          (message): message is ChatMessage =>
            !!message &&
            (message.role === 'user' || message.role === 'assistant') &&
            typeof message.content === 'string'
        )
      : []

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 200,
        temperature: 0.8,
        messages: [
          {
            role: 'system',
            content: GIRISH_CONTEXT,
          },
          ...safeMessages,
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error')
    }

    return NextResponse.json({
      message: data.choices?.[0]?.message?.content || 'Something went wrong, try again!',
    })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}