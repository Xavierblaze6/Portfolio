'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionProgress() {
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9000] flex flex-col gap-4 items-center">
      {SECTIONS.map(({ id, label }) => (
        <div
          key={id}
          className="relative flex items-center justify-end gap-3 cursor-pointer"
          onClick={() => scrollToSection(id)}
          onMouseEnter={() => setHoveredDot(id)}
          onMouseLeave={() => setHoveredDot(null)}
        >
          <AnimatePresence>
            {hoveredDot === id && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-[11px] text-[#888] whitespace-nowrap select-none"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              width: activeSection === id ? 20 : 6,
              background: activeSection === id ? '#e8c547' : '#333',
              boxShadow: activeSection === id
                ? '0 0 8px rgba(232,197,71,0.6)'
                : 'none',
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: 6,
              borderRadius: 9999,
            }}
          />
        </div>
      ))}
    </div>
  )
}
