import { useState, useCallback } from 'react'

export function useGlitch() {
  const [glitching, setGlitching] = useState(false)

  const triggerGlitch = useCallback(() => {
    if (glitching) return
    setGlitching(true)
    setTimeout(() => setGlitching(false), 600)
  }, [glitching])

  return { glitching, triggerGlitch }
}
