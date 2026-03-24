'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type CursorState = 'default' | 'link' | 'project' | 'name' | 'chat'

const CURSOR_LABELS: Record<CursorState, string> = {
  default: '',
  link: 'OPEN',
  project: 'CASE STUDY',
  name: '👾',
  chat: 'CHAT',
}

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [state, setCursorState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.documentElement.style.cursor = 'none'

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const elementWithCursor = target.closest('[data-cursor]') as HTMLElement | null

      if (elementWithCursor?.dataset.cursor) {
        setCursorState(elementWithCursor.dataset.cursor as CursorState)
        return
      }

      if (
        target.closest('a') ||
        target.closest('button') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setCursorState('link')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [visible])

  const isExpanded = state !== 'default'
  const label = CURSOR_LABELS[state]

  return (
    <>
      <motion.div
        className="cursor-ring fixed pointer-events-none z-[99998] flex items-center justify-center"
        style={{
          left: pos.x,
          top: pos.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isExpanded ? (label.length > 2 ? 90 : 56) : 20,
          height: isExpanded ? (label.length > 2 ? 90 : 56) : 20,
          opacity: visible ? 1 : 0,
          background: isExpanded ? 'rgba(232,197,71,0.15)' : 'transparent',
          borderColor: '#e8c547',
          borderWidth: isExpanded ? 1.5 : 1,
          borderRadius: '9999px',
          backdropFilter: isExpanded ? 'blur(4px)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.5 }}
      >
        {isExpanded && label ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="select-none text-center font-mono text-[10px] font-bold leading-none tracking-widest"
            style={{ color: '#e8c547' }}
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>

      <motion.div
        className="cursor-dot fixed pointer-events-none z-[99999] h-1.5 w-1.5 rounded-full"
        style={{
          left: pos.x,
          top: pos.y,
          translateX: '-50%',
          translateY: '-50%',
          background: '#e8c547',
          boxShadow: '0 0 6px rgba(232,197,71,0.8)',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.2 }}
      />
    </>
  )
}
