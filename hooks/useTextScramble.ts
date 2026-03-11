import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%'

function getDeterministicScramble(text: string) {
  return text
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' '
      const seed = (text.charCodeAt(index) + index * 17) % CHARS.length
      return CHARS[seed]
    })
    .join('')
}

export function useTextScramble(text: string, startDelay: number = 300) {
  const [displayText, setDisplayText] = useState(() => getDeterministicScramble(text))
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined
    const timeoutId = setTimeout(() => {
      let iteration = 0
      const totalChars = text.length

      intervalId = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < iteration) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )

        iteration += 0.4

        if (iteration >= totalChars) {
          setDisplayText(text)
          setIsComplete(true)
          if (intervalId) clearInterval(intervalId)
        }
      }, 40)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, startDelay])

  return { displayText, isComplete }
}
