"use client"

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useXP } from '@/context/XPContext'

type ExperienceEntry = {
  id: number
  type: 'work' | 'leadership'
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
  tags: string[]
  accent: string
}

const experiences: ExperienceEntry[] = [
  {
    id: 1,
    type: 'work',
    role: 'Machine Learning Intern',
    company: 'Gait View Technophiles Pvt. Ltd',
    period: 'Oct 2024 — Jul 2025',
    location: 'Remote',
    bullets: [
      'Engineered neural networks for real-time face detection on 10K+ image samples, applying pruning and quantization to reduce model size and latency by 30%',
      'Benchmarked model performance across CPU, GPU, and edge devices, achieving 25% throughput improvement while maintaining accuracy',
      'Built scalable data pipelines for preprocessing and model training, reducing iteration time by ~20% and enabling faster proof-of-concept deployments',
    ],
    tags: ['PyTorch', 'Computer Vision', 'MLOps', 'Edge Deployment'],
    accent: '#e8c547',
  },
  {
    id: 2,
    type: 'work',
    role: 'Data Analytics Intern',
    company: 'VoiceGate Technologies',
    period: 'Jun 2023 — Aug 2023',
    location: 'Remote',
    bullets: [
      'Analyzed 5,000+ real customer records to uncover behavioral patterns and segmentation insights, driving ~10% improvement in marketing retention',
      'Performed data cleaning, analysis, and visualization with Matplotlib and Tableau, cutting manual reporting effort by ~30%',
    ],
    tags: ['Python', 'Tableau', 'Matplotlib', 'Data Analysis'],
    accent: '#60a5fa',
  },
  {
    id: 3,
    type: 'leadership',
    role: 'Design Lead',
    company: 'Entrepreneurship Cell (E-Cell)',
    period: '2022 — 2024',
    location: 'VIT',
    bullets: [
      'Led a 15-member design and marketing team, producing campaigns that drove 500+ participants to flagship events including Mock Auctions and Mock Stock Trading',
      'Designed cross-platform campaigns that increased social media engagement by ~30%',
    ],
    tags: ['Leadership', 'Design', 'Marketing', 'Team Management'],
    accent: '#a78bfa',
  },
]

export default function ExperienceSection() {
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !unlockedEvents.has('VISITED_EXPERIENCE')) {
            markEventUnlocked('VISITED_EXPERIENCE')
            addXP(100, {
              title: 'Work History Checked',
              emoji: '💼',
              desc: "Reviewed Girish's experience",
            })
          }
        },
        { threshold: 0.25 }
      )
      if (sectionRef.current) observer.observe(sectionRef.current)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="border-t border-[var(--border)] py-32">
      <div className="max-w-container px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-[12px] tracking-[0.22em] text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            / EXPERIENCE
          </span>
          <h2
            className="mt-3 text-[42px] font-extrabold leading-none text-[var(--text)] md:text-[56px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Where I&apos;ve
            <br />
            <span>
              worked<span className="text-[var(--accent)]">.</span>
            </span>
          </h2>
          <p className="mt-4 text-[14px] text-[#666666]" style={{ fontFamily: 'var(--font-mono)' }}>
            2 internships · 1 leadership role
          </p>
        </motion.div>

        <div className="relative mt-16 pl-6 md:pl-8">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, #1f1f1f 10%, #1f1f1f 90%, transparent 100%)',
            }}
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const isOffset = index % 2 === 1
              return (
                <motion.div
                  key={exp.id}
                  className="relative"
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div
                    className="absolute -left-6 top-8 h-3 w-3 rounded-full"
                    style={{
                      background: exp.accent,
                      border: '2px solid #0a0a0a',
                      boxShadow: `0 0 12px ${exp.accent}80`,
                      transform: 'translateX(-50%)',
                    }}
                  />

                  <motion.div
                    className={`ml-8 cursor-default ${isOffset ? 'md:ml-12' : 'md:ml-8'}`}
                    style={{
                      background: '#111111',
                      border: '1px solid #1f1f1f',
                      borderRadius: '16px',
                      padding: '28px',
                    }}
                    whileHover={{
                      x: 4,
                      borderColor: `${exp.accent}40`,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="text-[20px] font-bold text-[#f0ede6]"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {exp.role}
                        </h3>
                        <p className="mt-1 text-[14px]" style={{ color: exp.accent }}>
                          {exp.company}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="text-[11px] text-[#555]" style={{ fontFamily: 'var(--font-mono)' }}>
                          {exp.period}
                        </div>
                        <div className="mt-1 text-[11px] text-[#444]" style={{ fontFamily: 'var(--font-mono)' }}>
                          {exp.location}
                        </div>
                        <div
                          className="mt-2 inline-block rounded-full border border-[#1f1f1f] px-2 py-0.5 text-[10px] text-[#444]"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {exp.type === 'work' ? '💼 Internship' : '🏆 Leadership'}
                        </div>
                      </div>
                    </div>

                    <div className="my-5 border-t border-[#1f1f1f]" />

                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex gap-3">
                          <span className="mt-1.5 shrink-0 text-[8px]" style={{ color: exp.accent }}>
                            ◆
                          </span>
                          <span className="text-[14px] leading-relaxed text-[#888]">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-md px-3 py-1 text-[11px]"
                          style={{
                            border: `1px solid ${exp.accent}30`,
                            color: exp.accent,
                            background: `${exp.accent}08`,
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}