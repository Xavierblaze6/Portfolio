'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import GirishChat from './GirishChat'
import { useXP } from '@/context/XPContext'

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const { setXpEnabled } = useXP()

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('openFloatingChat', handler)
    return () => window.removeEventListener('openFloatingChat', handler)
  }, [])

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[9990] w-[380px]"
            style={{
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px #1f1f1f',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: '#1f1f1f', color: '#666' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0ede6')}
              onMouseLeave={e => (e.currentTarget.style.color = '#666')}
            >
              <X size={14} />
            </button>

            {/* Reuse existing GirishChat component */}
            <GirishChat />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Avatar Button */}
      <motion.button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full"
        style={{
          position: 'fixed',
          overflow: 'hidden',
          boxShadow: open
            ? '0 0 0 3px #e8c547, 0 8px 32px rgba(232,197,71,0.3)'
            : '0 0 0 2px #1f1f1f, 0 8px 32px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.3s ease',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src="/images/avatar.png"
          alt="Girish"
          className="w-full h-full object-cover"
          style={{ borderRadius: '50%' }}
        />

        {/* Online indicator */}
        {!open && (
          <div
            className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0a]"
            style={{ background: '#22c55e' }}
          />
        )}
      </motion.button>
    </>
  )
}
