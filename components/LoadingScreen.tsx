'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'loading' | 'ready' | 'exit' | 'done'>('loading')
  const [btnVisible, setBtnVisible] = useState(false)

  useEffect(() => {
    const btnTimer = setTimeout(() => setBtnVisible(true), 2300)
    const readyTimer = setTimeout(() => setPhase('ready'), 100)

    return () => {
      clearTimeout(btnTimer)
      clearTimeout(readyTimer)
    }
  }, [])

  const handleExplore = () => {
    setPhase('exit')
    setTimeout(() => setPhase('done'), 1000)
  }

  if (phase === 'done') return null

  const nameLetters = 'GIRISH MANNE'.split('')
  const letterDelays = [0.9, 0.95, 1.0, 1.05, 1.12, 1.2, 1.35, 1.4, 1.46, 1.52, 1.58, 1.64]
  const letterEasings = [
    [0.22, 1, 0.36, 1],
    [0.34, 1.56, 0.64, 1],
    [0.22, 1, 0.36, 1],
    [0.34, 1.56, 0.64, 1],
    [0.22, 1, 0.36, 1],
    [0.34, 1.2, 0.64, 1],
    [0.22, 1, 0.36, 1],
    [0.34, 1.56, 0.64, 1],
    [0.22, 1, 0.36, 1],
    [0.22, 1, 0.36, 1],
    [0.34, 1.56, 0.64, 1],
    [0.22, 1, 0.36, 1],
  ]

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden">
      {phase === 'exit' && (
        <>
          <motion.div
            className="absolute top-0 left-0 right-0 z-[100]"
            style={{ height: '50vh', background: '#0a0a0a' }}
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[100]"
            style={{ height: '50vh', background: '#0a0a0a' }}
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-[99]"
            style={{ background: '#0a0a0a' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <motion.span
              className="font-mono text-[12px] tracking-[0.4em]"
              style={{ color: '#e8c547' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              WELCOME ✦
            </motion.span>
          </motion.div>
        </>
      )}

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ background: '#0a0a0a' }}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232,197,71,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,197,71,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, #0a0a0a 100%)',
          }}
        />

        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(232,197,71,0.04) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {[
          { top: '20px', left: '20px', borderTop: '1px solid rgba(232,197,71,0.25)', borderLeft: '1px solid rgba(232,197,71,0.25)' },
          { top: '20px', right: '20px', borderTop: '1px solid rgba(232,197,71,0.25)', borderRight: '1px solid rgba(232,197,71,0.25)' },
          { bottom: '20px', left: '20px', borderBottom: '1px solid rgba(232,197,71,0.25)', borderLeft: '1px solid rgba(232,197,71,0.25)' },
          { bottom: '20px', right: '20px', borderBottom: '1px solid rgba(232,197,71,0.25)', borderRight: '1px solid rgba(232,197,71,0.25)' },
        ].map((style, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ width: '20px', height: '20px', ...style }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
        ))}

        <motion.div
          className="relative flex items-center justify-center mb-8"
          style={{ width: '180px', height: '180px' }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            className="absolute inset-0"
          >
            <defs>
              <filter id="ring-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx="90"
              cy="90"
              r="80"
              stroke="rgba(232,197,71,0.06)"
              strokeWidth="1"
              fill="none"
            />

            <motion.circle
              cx="90"
              cy="90"
              r="80"
              stroke="rgba(232,197,71,0.2)"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#ring-glow)"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1, rotate: -90 }}
              style={{ originX: '90px', originY: '90px' }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />

            <motion.circle
              cx="90"
              cy="90"
              r="60"
              stroke="#e8c547"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#ring-glow)"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1, rotate: -90 }}
              style={{ originX: '90px', originY: '90px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            />

            <motion.circle
              cx="90"
              cy="90"
              r="30"
              stroke="rgba(232,197,71,0.35)"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="15 5"
              initial={{ pathLength: 0, rotate: 45 }}
              animate={{ pathLength: 1, rotate: 45 }}
              style={{ originX: '90px', originY: '90px' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
            />

            {[
              { x1: 90, y1: 10, x2: 90, y2: 26 },
              { x1: 90, y1: 154, x2: 90, y2: 170 },
              { x1: 10, y1: 90, x2: 26, y2: 90 },
              { x1: 154, y1: 90, x2: 170, y2: 90 },
            ].map((line, i) => (
              <motion.line
                key={i}
                {...line}
                stroke="rgba(232,197,71,0.2)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </svg>

          <motion.div
            className="absolute rounded-full"
            style={{
              width: '8px',
              height: '8px',
              background: '#e8c547',
              boxShadow: '0 0 20px rgba(232,197,71,0.8), 0 0 40px rgba(232,197,71,0.4)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </motion.div>

        <div className="flex mb-3 overflow-hidden" style={{ zIndex: 2 }}>
          {nameLetters.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{
                fontFamily: 'var(--font-syne, Syne, sans-serif)',
                fontWeight: 800,
                fontSize: '36px',
                color: '#f0ede6',
                letterSpacing: '0.12em',
                width: char === ' ' ? '14px' : 'auto',
              }}
              initial={{ opacity: 0, y: 40, scaleY: 1.2 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              transition={{
                delay: letterDelays[i] || 0.9 + i * 0.06,
                duration: 0.5,
                ease: letterEasings[i] || [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="font-mono text-center mb-10"
          style={{
            fontSize: '10px',
            letterSpacing: '0.35em',
            color: '#444',
            textTransform: 'uppercase',
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        >
          AI Engineer &nbsp;·&nbsp; Full Stack Developer
        </motion.p>

        <AnimatePresence>
          {btnVisible && (
            <motion.button
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.3, 0.64, 1] }}
              onClick={handleExplore}
              className="relative overflow-hidden group"
              style={{
                zIndex: 2,
                background: 'transparent',
                border: '1px solid rgba(232,197,71,0.4)',
                color: '#e8c547',
                fontFamily: 'var(--font-mono, JetBrains Mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '12px 32px',
                cursor: 'pointer',
              }}
              whileHover={{ borderColor: '#e8c547' }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 origin-left"
                style={{ background: '#e8c547', zIndex: -1 }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative flex items-center gap-2 group-hover:text-[#0a0a0a] transition-colors duration-300">
                Explore Portfolio
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ zIndex: 2 }}>
          <div
            style={{
              width: '160px',
              height: '1px',
              background: '#1a1a1a',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                background: '#e8c547',
                boxShadow: '0 0 10px rgba(232,197,71,0.6)',
                originX: 0,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 2.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}