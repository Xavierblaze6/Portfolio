'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useXP } from '@/context/XPContext'

export default function ToastContainer() {
  const { toasts, removeToast } = useXP()

  return (
    <div className="fixed bottom-6 left-6 z-[9990] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="pointer-events-auto"
            onClick={() => removeToast(toast.id)}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
              style={{
                background: '#111',
                border: '1px solid rgba(232, 197, 71, 0.3)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                minWidth: '240px',
              }}
            >
              <span className="text-2xl">{toast.emoji}</span>
              <div className="flex-1">
                <div className="font-mono text-[10px] text-[#e8c547] tracking-widest mb-0.5">
                  ACHIEVEMENT UNLOCKED
                </div>
                <div className="text-[14px] font-bold text-[#f0ede6]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {toast.title}
                </div>
                <div className="text-[11px] text-[#555] mt-0.5">
                  {toast.desc}
                </div>
              </div>
              <div
                className="font-mono text-[12px] font-bold px-2 py-1 rounded-md"
                style={{
                  background: 'rgba(232, 197, 71, 0.1)',
                  color: '#e8c547',
                  border: '1px solid rgba(232,197,71,0.2)',
                }}
              >
                +{toast.xpEarned} XP
              </div>
            </div>
            <motion.div
              className="h-[2px] rounded-full mt-1 mx-1"
              style={{ background: 'rgba(232, 197, 71, 0.3)' }}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
