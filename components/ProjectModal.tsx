'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, X } from 'lucide-react'
import { useEffect } from 'react'
import { useXP } from '@/context/XPContext'

export type CaseStudy = {
  problem: string
  solution: string
  techDecisions: string[]
  outcome: string
  learnings: string
}

export type ProjectModalData = {
  id: number
  name: string
  tagline: string
  type: 'AI/ML' | 'Full Stack'
  tech: string[]
  github: string
  demo?: string
  caseStudy: CaseStudy
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectModalData
  onClose: () => void
}) {
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()

  useEffect(() => {
    if (!unlockedEvents.has('OPENED_CASE_STUDY')) {
      markEventUnlocked('OPENED_CASE_STUDY')
      addXP(125, { title: 'Deep Dive', emoji: '🧠', desc: 'Opened a case study' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl border-t border-[#1f1f1f] bg-[#0f0f0f]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="flex justify-center pb-2 pt-4">
          <div className="h-1 w-12 rounded-full bg-[#1f1f1f]" />
        </div>

        <div className="mx-auto max-w-[800px] px-8 pb-16">
          <div className="mb-8 flex items-start justify-between pt-4">
            <div>
              <span className="text-[11px] tracking-widest text-[#e8c547]" style={{ fontFamily: 'var(--font-mono)' }}>
                {project.type}
              </span>
              <h2 className="mt-1 text-4xl font-black text-[#f0ede6]" style={{ fontFamily: 'var(--font-heading)' }}>
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-[#e8c547]">{project.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-[#1f1f1f] p-2 transition-colors hover:border-[#e8c547]/30"
              aria-label="Close project case study"
            >
              <X size={18} className="text-[#666666]" />
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-[11px] tracking-widest text-[#555555]" style={{ fontFamily: 'var(--font-mono)' }}>
                THE PROBLEM
              </h3>
              <p className="text-[15px] leading-relaxed text-[#888888]">{project.caseStudy.problem}</p>
            </div>

            <div className="border-t border-[#1f1f1f]" />

            <div>
              <h3 className="mb-3 text-[11px] tracking-widest text-[#555555]" style={{ fontFamily: 'var(--font-mono)' }}>
                WHAT I BUILT
              </h3>
              <p className="text-[15px] leading-relaxed text-[#f0ede6]">{project.caseStudy.solution}</p>
            </div>

            <div>
              <h3 className="mb-3 text-[11px] tracking-widest text-[#555555]" style={{ fontFamily: 'var(--font-mono)' }}>
                TECHNICAL DECISIONS
              </h3>
              <ul className="space-y-3">
                {project.caseStudy.techDecisions.map((decision, i) => (
                  <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-[#888888]">
                    <ArrowRight size={14} className="mt-1 shrink-0 text-[#e8c547]" />
                    {decision}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-r-xl border border-[#1f1f1f] border-l-2 border-l-[#e8c547] bg-[#111111] p-6">
              <h3 className="mb-3 text-[11px] tracking-widest text-[#e8c547]" style={{ fontFamily: 'var(--font-mono)' }}>
                OUTCOME
              </h3>
              <p className="text-[15px] leading-relaxed text-[#f0ede6]">{project.caseStudy.outcome}</p>
            </div>

            <div>
              <h3 className="mb-3 text-[11px] tracking-widest text-[#555555]" style={{ fontFamily: 'var(--font-mono)' }}>
                KEY LEARNING
              </h3>
              <p className="text-[14px] italic leading-relaxed text-[#666666]">&quot;{project.caseStudy.learnings}&quot;</p>
            </div>

            <div>
              <h3 className="mb-3 text-[11px] tracking-widest text-[#555555]" style={{ fontFamily: 'var(--font-mono)' }}>
                STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="rounded-md border border-[#1f1f1f] px-3 py-1 text-[12px] text-[#666666]" style={{ fontFamily: 'var(--font-mono)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {project.github && project.github !== '#' ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[14px] text-[#888888] transition-colors hover:text-[#f0ede6]"
                >
                  <Github size={16} /> View on GitHub
                </a>
              ) : null}
              {project.demo && project.demo !== '#' ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-[#e8c547]/30 px-6 py-3 text-[14px] text-[#e8c547] transition-colors hover:bg-[#e8c547]/10"
                >
                  <ExternalLink size={14} /> Live Demo ↗
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
