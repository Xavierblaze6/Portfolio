"use client"

import { motion } from 'framer-motion'
import { ExternalLink, Github, Trophy } from 'lucide-react'
import { profile, resumeFiles } from '@/lib/profile'
import { useCountUp } from '@/hooks/useCountUp'
import { useEffect, useRef } from 'react'
import { useXP } from '@/context/XPContext'

const leftItem = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
}

const rightItem = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
}

type AboutSectionProps = {
  showReadMore?: boolean
}

export default function AboutSection({ showReadMore = true }: AboutSectionProps) {
  const reposCounter = useCountUp(profile.stats.publicRepos, 1500)
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !unlockedEvents.has('VISITED_ABOUT')) {
            markEventUnlocked('VISITED_ABOUT')
            addXP(75, { title: 'Background Check', emoji: '🔍', desc: 'Learned about Girish' })
          }
        },
        { threshold: 0.3 }
      )
      if (sectionRef.current) observer.observe(sectionRef.current)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const interests = ['LLM Fine-tuning', 'Agentic AI', 'Full Stack', 'Open Source', 'RAG Systems']
  const stackItems = ['LangChain', 'Next.js', 'Python', 'RAG Systems']

  const films = [
    {
      title: 'Fight Club',
      year: '1999',
      poster: 'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      rating: 5,
    },
    {
      title: 'Jersey',
      year: '2019',
      poster: 'https://image.tmdb.org/t/p/original/dv3CMrUL06OkZWpY6rWyB9cxY6y.jpg',
      rating: 5,
    },
    {
      title: 'Dead Poets Society',
      year: '1989',
      poster: 'https://image.tmdb.org/t/p/original/uGa3NexFBtk12KT9vAoweVmN4k6.jpg',
      rating: 5,
    },
    {
      title: 'Dune: Part Two',
      year: '2024',
      poster: 'https://image.tmdb.org/t/p/w300/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      rating: 5,
    },
  ]

  return (
    <motion.section
      ref={sectionRef as any}
      id="about"
      className="border-t border-[var(--border)] py-32"
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      <div className="max-w-container">
        <motion.p
          variants={leftItem}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-[12px] tracking-[0.22em] text-[var(--accent)]"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          / ABOUT
        </motion.p>

        <div className="mt-6 grid grid-cols-1 gap-16 lg:grid-cols-[55%_45%]">
          <motion.div
            variants={leftItem}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              variants={leftItem}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] font-extrabold leading-none text-[var(--text)] md:text-[64px]"
              style={{ fontFamily: 'Syne, DM Sans, sans-serif' }}
            >
              Girish Manne
            </motion.h2>

            <motion.p
              variants={leftItem}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 border-l-2 border-[var(--accent)] pl-4 text-[20px] text-[var(--accent)]"
              style={{ fontFamily: 'Syne, DM Sans, sans-serif' }}
            >
              AI/ML Engineer &amp; Full Stack Developer
            </motion.p>

            <div className="my-8 border-t border-[var(--border)]" />

            <div className="max-w-[480px] space-y-6 text-[16px] leading-[1.8] text-[#a0a0a0]">
              <p>
                From Hyderabad, Telangana — now based in San José building
                things at the intersection of AI and software engineering.
                I did my B.Tech in CSE with AI &amp; ML at VIT Chennai, which
                is where I fell deep into machine learning and never looked back.
              </p>
              <p>
                Now I&apos;m doing my Master&apos;s in AI at SJSU, working on LLMs,
                RAG pipelines, and agentic systems that actually ship.
                I&apos;ve interned as an ML engineer, been a Google Hackathon
                finalist, and I genuinely love the craft of building
                intelligent systems that feel like magic to use.
              </p>
            </div>

            <div className="mt-8">
              <p
                className="mb-3 text-[11px] text-[var(--text-muted)]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Currently interested in
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--text-muted)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[resumeFiles[0], resumeFiles[1], resumeFiles[2]].map((resume, idx) => {
                const label = idx === 0 ? 'Main Resume' : idx === 1 ? 'SDE Resume' : 'AI Resume'
                return (
                  <a
                    key={resume.href}
                    href={resume.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-transparent px-5 py-2.5 text-[14px] text-[var(--text)] transition-all duration-200 hover:border-[var(--accent)] hover:bg-[rgba(232,197,71,0.05)] hover:text-[var(--accent)]"
                  >
                    {label}
                    <ExternalLink size={14} />
                  </a>
                )
              })}
            </div>

          </motion.div>

          <div className="grid grid-cols-2 gap-4 content-start">
            <motion.div
              variants={rightItem}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="about-card"
              style={{
                background:
                  'radial-gradient(circle at top left, rgba(232,197,71,0.04) 0%, transparent 70%), #111111',
              }}
            >
              <p
                ref={reposCounter.ref as any}
                className="text-[48px] font-extrabold leading-none text-[var(--accent)]"
                style={{ fontFamily: 'Syne, DM Sans, sans-serif' }}
              >
                {reposCounter.count}+
              </p>
              <p className="mt-4 text-[13px] leading-5 text-[var(--text-muted)]">
                Public Repos
                <br />
                on GitHub
              </p>
              <div className="mt-6 flex justify-end text-[var(--text-muted)]">
                <Github size={20} />
              </div>
            </motion.div>

            <motion.div
              variants={rightItem}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="about-card"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(100,149,237,0.05) 0%, transparent 70%), #111111',
              }}
            >
              <p className="text-[32px] font-bold leading-tight text-[var(--text)]" style={{ fontFamily: 'Syne, DM Sans, sans-serif' }}>
                M.S.
                <br />
                Artificial
                <br />
                Intelligence
              </p>
              <p className="mt-4 text-[13px] text-[var(--text-muted)]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                SJSU · 2027
              </p>
            </motion.div>

            <motion.div
              variants={rightItem}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="about-achievement col-span-2"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(232,197,71,0.06) 0%, transparent 65%), #131313',
              }}
            >
              <p className="mb-4 inline-flex items-center gap-2 text-[15px] text-[var(--text)]">
                <Trophy size={17} className="text-[var(--accent)]" />
                Achievements
              </p>
              <ul className="space-y-1 text-[15px] leading-8 text-[var(--text)]">
                <li>🏆 Google Hackathon Finalist — 2nd of 50+ teams</li>
                <li>🎓 B.Tech CSE (AI &amp; ML) — VIT Chennai</li>
                <li>🔬 ICON-DEEPCOM 2025 Research Presenter</li>
              </ul>
              <div className="mt-4 flex items-center justify-between text-[var(--text-muted)]">
                <div className="h-px w-[70%] bg-[var(--border)]" />
                <span className="text-[var(--accent)]">✦</span>
              </div>
            </motion.div>

            <motion.div
              variants={rightItem}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="about-card"
            >
              <p className="inline-flex items-center gap-2 text-[18px] text-[var(--text)]">
                <span className="pulse-dot" />
                Open to Work
              </p>
              <p className="mt-4 text-[13px] leading-5 text-[var(--text-muted)]">
                Full-time &amp;
                <br />
                Internships
              </p>
            </motion.div>

            <motion.div
              variants={rightItem}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="about-card"
            >
              <p className="text-[13px] text-[var(--text-muted)]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Core Stack
              </p>
              <ul className="mt-3 space-y-1 text-[14px] text-[var(--text)]">
                {stackItems.map((item) => (
                  <li key={item}>
                    <span className="mr-2 text-[var(--accent)]">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={rightItem}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="about-card col-span-2"
              style={{
                background: '#111',
                border: '1px solid #1f1f1f',
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <div className="font-mono text-[10px] text-[#555] tracking-widest mb-3">BASED IN</div>
              <div className="font-[Syne] text-[16px] font-bold text-[#f0ede6]">San José, CA</div>
              <div className="font-mono text-[11px] text-[#444] mt-1">Originally from Hyderabad 🇮🇳</div>
            </motion.div>

            {/* Letterboxd Card — col-span-2, full width */}
            <motion.div
              variants={rightItem}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-2"
              style={{
                background: '#111111',
                border: '1px solid #1f1f1f',
                borderRadius: '16px',
                padding: '20px',
                transition: 'border-color 200ms',
              }}
              whileHover={{ borderColor: 'rgba(232,197,71,0.2)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#00C030' }} />
                  <span className="font-mono text-[11px] text-[#555] tracking-widest uppercase">
                    When Not Coding
                  </span>
                </div>
                <a
                  href="https://letterboxd.com/Xavierblaze/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] transition-colors"
                  style={{ color: '#333' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e8c547')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#333')}
                >
                  View profile ↗
                </a>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {films.map((film, i) => (
                  <div key={i} className="group relative">
                    <div
                      className="relative overflow-hidden"
                      style={{ borderRadius: '8px', aspectRatio: '2/3' }}
                    >
                      <img
                        src={film.poster}
                        alt={film.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                        }}
                      >
                        <div
                          className="text-[11px] font-bold text-[#f0ede6] leading-tight"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {film.title}
                        </div>
                        <div className="font-mono text-[9px] text-[#666] mt-0.5">
                          {film.year}
                        </div>
                        <div className="flex gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <span
                              key={star}
                              className="text-[10px]"
                              style={{ color: star <= film.rating ? '#e8c547' : '#333' }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="font-mono text-[10px] truncate" style={{ color: '#444' }}>
                        {film.title}
                      </div>
                      <div className="flex gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            className="text-[9px]"
                            style={{ color: star <= film.rating ? '#e8c547' : '#222' }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[10px] text-[#333] mt-3 text-center">
                also: one piece · soccer · cricket · basketball 🏀
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
