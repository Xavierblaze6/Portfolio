'use client'

import { motion } from 'framer-motion'
import { useXP } from '@/context/XPContext'

const MAX_XP = 800
const LEVELS = ["Lurker", "Interested", "Impressed", "Convinced", "Ready to Hire"]

export default function XPBar() {
  const { xp } = useXP()
  const percentage = (xp / MAX_XP) * 100
  const levelIndex = Math.min(Math.floor(percentage / 20), LEVELS.length - 1)
  const levelLabel = LEVELS[levelIndex]

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000]">
      <div className="h-[3px] bg-[#111] w-full">
        <motion.div
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(to right, #e8c547, #f0d050)',
            boxShadow: '0 0 8px rgba(232, 197, 71, 0.6)',
          }}
          animate={{ scaleX: percentage / 100 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {xp > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-4"
          style={{ top: '6px' }}
        >
          <span className="font-mono text-[10px] text-[#e8c547]/60 tracking-widest">
            {xp} XP · {levelLabel}
          </span>
        </motion.div>
      )}
    </div>
  )
}
