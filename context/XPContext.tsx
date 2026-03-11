'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'

interface Achievement {
  title: string
  emoji: string
  desc: string
  xpEarned: number
  id: number
}

interface XPContextType {
  xp: number
  level: number
  addXP: (amount: number, achievement?: Omit<Achievement, 'xpEarned' | 'id'>) => void
  toasts: Achievement[]
  removeToast: (id: number) => void
  unlockedEvents: Set<string>
  markEventUnlocked: (event: string) => void
  setXpEnabled: (enabled: boolean) => void
}

const XPContext = createContext<XPContextType | null>(null)

const MAX_XP = 800
const LEVELS = [
  { min: 0,   max: 200, label: "Lurker" },
  { min: 200, max: 400, label: "Interested" },
  { min: 400, max: 600, label: "Impressed" },
  { min: 600, max: 750, label: "Convinced" },
  { min: 750, max: 800, label: "Ready to Hire" },
]

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXP] = useState(0)
  const [xpEnabled, setXpEnabled] = useState(true)
  const [toasts, setToasts] = useState<Achievement[]>([])
  const toastIdRef = useRef(0)
  const unlockedEvents = useRef<Set<string>>(new Set())

  const addXP = useCallback((amount: number, achievement?: Omit<Achievement, 'xpEarned' | 'id'>) => {
    if (!xpEnabled) return
    setXP(prev => Math.min(prev + amount, MAX_XP))
    if (achievement) {
      const id = ++toastIdRef.current
      const toast = { ...achievement, xpEarned: amount, id }
      setToasts(prev => [...prev, toast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 4000)
    }
  }, [xpEnabled])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const markEventUnlocked = useCallback((event: string) => {
    unlockedEvents.current.add(event)
  }, [])

  const levelIndex = LEVELS.findIndex(l => xp >= l.min && xp < l.max)
  const level = Math.max(0, levelIndex)

  return (
    <XPContext.Provider value={{
      xp,
      level,
      addXP,
      toasts,
      removeToast,
      unlockedEvents: unlockedEvents.current,
      markEventUnlocked,
      setXpEnabled,
    }}>
      {children}
    </XPContext.Provider>
  )
}

export const useXP = () => {
  const ctx = useContext(XPContext)
  if (!ctx) throw new Error('useXP must be used within XPProvider')
  return ctx
}
