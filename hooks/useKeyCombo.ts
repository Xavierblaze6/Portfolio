import { useEffect, useRef } from 'react'

export function useKeyCombo(
  keys: string[],
  callback: () => void,
  timeWindow: number = 500
) {
  const pressedKeys = useRef<{ key: string; time: number }[]>([])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const now = Date.now()
      pressedKeys.current.push({ key: e.key.toLowerCase(), time: now })
      pressedKeys.current = pressedKeys.current.filter(k => now - k.time < timeWindow)

      const recentKeys = pressedKeys.current.map(k => k.key)
      const matches = keys.every(
        (k, i) => recentKeys[recentKeys.length - keys.length + i] === k
      )

      if (matches) {
        pressedKeys.current = []
        callback()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [keys, callback, timeWindow])
}
