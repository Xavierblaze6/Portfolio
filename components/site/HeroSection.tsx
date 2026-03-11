"use client"

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import { useTextScramble } from '@/hooks/useTextScramble'
import DotGrid from '@/components/DotGrid'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { useGlitch } from '@/hooks/useGlitch'

const ease = [0.22, 1, 0.36, 1] as const

const codeLines = [
  { indent: '', keyText: 'const ', keyColor: '#c678dd', main: 'girish', punc: ' = {', isObjectStart: true },
  { indent: '  ', prop: 'role', value: '"AI/ML Engineer"' },
  { indent: '  ', prop: 'currently', value: '"M.S. AI @ SJSU"' },
  { indent: '  ', prop: 'building', value: '[', arrayStart: true },
  { indent: '    ', valueOnly: '"RAG Pipelines",' },
  { indent: '    ', valueOnly: '"LLM Agents",' },
  { indent: '    ', valueOnly: '"Full Stack Apps",' },
  { indent: '  ', valueOnly: '],' },
  { indent: '  ', prop: 'achievements', value: '[', arrayStart: true },
  { indent: '    ', valueOnly: '"Ex ML Intern @ Gait View",' },
  { indent: '    ', valueOnly: '"M.S. AI @ SJSU",' },
  { indent: '  ', valueOnly: '],' },
  { indent: '  ', prop: 'openTo', value: '"Full-time · Internships"' },
  { indent: '  ', prop: 'location', value: '"San Jose, CA"' },
  { indent: '', valueOnly: '}' },
]

export default function HeroSection() {
  const firstTarget = 'Girish'
  const secondTarget = 'Manne.'
  const { displayText: firstLine } = useTextScramble(firstTarget, 400)
  const { displayText: secondLine } = useTextScramble(secondTarget, 900)
  const projectsButtonRef = useMagneticEffect<HTMLAnchorElement>(0.25)
  const talkButtonRef = useMagneticEffect<HTMLAnchorElement>(0.25)
  const { glitching: glitching1, triggerGlitch: triggerGlitch1 } = useGlitch()
  const { glitching: glitching2, triggerGlitch: triggerGlitch2 } = useGlitch()

  useEffect(() => {
    if (window.location.hash) return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    const timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, 50)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(timeoutId)
    }
  }, [])
  return (
    <section id="home" className="hero-surface relative min-h-screen flex items-center overflow-hidden pt-[80px]">
      <DotGrid />
      <div className="max-w-container relative z-10 w-full py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[60%_40%]">
          <div className="flex min-h-[70vh] flex-col justify-center">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(34,197,94,0.05)] px-4 py-2"
            >
              <span className="hero-pulse-dot" />
              <span className="text-[12px] tracking-[0.12em] text-[#888]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Available for work
              </span>
            </motion.div>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className={`glitch-wrapper text-[48px] font-extrabold leading-[0.95] text-[var(--text)] md:text-[64px] lg:text-[96px] ${glitching1 ? 'glitching' : ''}`}
              style={{ fontFamily: 'Syne, DM Sans, sans-serif', cursor: 'default' }}
              data-text="Girish"
              onMouseEnter={triggerGlitch1}
            >
              {firstLine.split('').map((char, i) => (
                <span key={`first-${i}`} className={char !== firstTarget[i] ? 'text-[#e8c547]/60' : ''}>
                  {char}
                </span>
              ))}
            </motion.h1>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className={`glitch-wrapper text-[48px] font-extrabold leading-[0.95] text-[var(--text)] md:text-[64px] lg:text-[96px] ${glitching2 ? 'glitching' : ''}`}
              style={{ fontFamily: 'Syne, DM Sans, sans-serif', cursor: 'default' }}
              data-text="Manne."
              onMouseEnter={triggerGlitch2}
            >
              {secondLine.split('').map((char, i) => (
                <span
                  key={`second-${i}`}
                  className={
                    char !== secondTarget[i]
                      ? 'text-[#e8c547]/60'
                      : secondTarget[i] === '.'
                        ? 'text-[var(--accent)]'
                        : ''
                  }
                >
                  {char}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1 }}
              className="mt-4 text-[18px] text-[var(--text-muted)]"
            >
              AI/ML Engineer <span className="text-[var(--accent)]">·</span> Full Stack Developer
            </motion.p>

            <motion.p
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="my-8 max-w-[620px] border-l-[3px] border-[var(--accent)] pl-5 text-[22px] italic text-[rgba(240,237,230,0.6)]"
              style={{ fontFamily: 'Syne, DM Sans, sans-serif' }}
            >
              I build intelligent systems that ship.
            </motion.p>

            <motion.p
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
              className="mb-10 text-[13px] text-[var(--text-muted)]"
            >
              San José, CA
              <span className="mx-2 text-[var(--accent)]">·</span>
              M.S. AI @ SJSU
              <span className="mx-2 text-[var(--accent)]">·</span>
              Interested in AI
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="flex flex-wrap gap-4"
            >
              <div className="-m-4 inline-block p-4">
                <a
                  ref={projectsButtonRef}
                  data-magnetic
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-[15px] font-semibold text-[#0a0a0a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f0d050] hover:shadow-[0_8px_30px_rgba(232,197,71,0.3)]"
                >
                  View Projects
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="-m-4 inline-block p-4">
                <a
                  ref={talkButtonRef}
                  data-magnetic
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-8 py-3.5 text-[15px] text-[var(--text)] transition-all duration-200 hover:border-[rgba(232,197,71,0.4)] hover:text-[var(--accent)]"
                >
                  Let&apos;s Talk
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>

            {/* Chat teaser — below CTA buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-4"
            >
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openFloatingChat'))}
                className="font-mono text-[12px] transition-colors group"
                style={{ color: '#444' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e8c547')}
                onMouseLeave={e => (e.currentTarget.style.color = '#444')}
              >
                or just{' '}
                <span className="underline underline-offset-4 group-hover:text-[#e8c547]">
                  chat with my AI
                </span>
                {' '}↗
              </button>
            </motion.div>

            <motion.p
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              ↓ scroll to explore
            </motion.p>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="relative flex items-center justify-center"
          >
            <div className="hero-terminal-glow" />

            <div className="hero-terminal w-full max-w-[480px] overflow-hidden rounded-[20px] border border-[var(--border)] bg-[#0d0d0d] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="flex h-[44px] items-center border-b border-[var(--border)] bg-[#161616] px-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <p className="mx-auto text-[12px] text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  girish.config.ts
                </p>
                <p className="text-[12px] text-[#333]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  ─ □ ×
                </p>
              </div>

              <div className="space-y-1 px-6 py-6 text-[13px] leading-[1.8]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {codeLines.map((line, idx) => (
                  <motion.p
                    key={`${line.prop ?? line.valueOnly ?? line.main}-${idx}`}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.5 + idx * 0.3, ease }}
                    className="whitespace-pre"
                  >
                    <span className="text-[#abb2bf]">{line.indent}</span>
                    {line.keyText ? <span style={{ color: line.keyColor }}>{line.keyText}</span> : null}
                    {line.main ? <span className="text-[#e06c75]">{line.main}</span> : null}
                    {line.isObjectStart ? <span className="text-[#abb2bf]">{line.punc}</span> : null}
                    {line.prop ? <span className="text-[#e06c75]">{line.prop}</span> : null}
                    {line.prop ? <span className="text-[#abb2bf]">: </span> : null}
                    {line.arrayStart ? <span className="text-[#abb2bf]">[</span> : null}
                    {line.value && !line.arrayStart ? <span className="text-[#98c379]">{line.value}</span> : null}
                    {line.value && !line.arrayStart && idx < codeLines.length - 2 && line.value !== '}' ? (
                      <span className="text-[#abb2bf]">,</span>
                    ) : null}
                    {line.valueOnly ? <span className="text-[#98c379]">{line.valueOnly.includes(']') || line.valueOnly === '}' ? '' : ''}{line.valueOnly}</span> : null}
                  </motion.p>
                ))}
                <motion.span
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + codeLines.length * 0.3 + 0.2, duration: 0.25 }}
                  className="hero-blink-cursor inline-block"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
