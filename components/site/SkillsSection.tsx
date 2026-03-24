"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useXP } from '@/context/XPContext'

type Proficiency = 'Expert' | 'Advanced' | 'Proficient' | 'Familiar'

const proficiencyColor: Record<Proficiency, string> = {
  Expert: '#22c55e',
  Advanced: '#e8c547',
  Proficient: '#60a5fa',
  Familiar: '#666666',
}

type Skill = {
  name: string
  icon: string | null
  proficiency: Proficiency
}

const row1: Skill[] = [
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python', proficiency: 'Expert' },
  { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain', proficiency: 'Expert' },
  { name: 'OpenAI', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg', proficiency: 'Advanced' },
  { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi', proficiency: 'Advanced' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs', proficiency: 'Proficient' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', proficiency: 'Proficient' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb', proficiency: 'Advanced' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', proficiency: 'Familiar' },
  { name: 'HuggingFace', icon: 'https://cdn.simpleicons.org/huggingface', proficiency: 'Advanced' },
  { name: 'FAISS', icon: null, proficiency: 'Advanced' },
  { name: 'RAG', icon: null, proficiency: 'Expert' },
  { name: 'LangGraph', icon: null, proficiency: 'Advanced' },
]

const row2: Skill[] = [
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff', proficiency: 'Advanced' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react', proficiency: 'Advanced' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', proficiency: 'Advanced' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript', proficiency: 'Expert' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', proficiency: 'Proficient' },
  { name: 'Framer Motion', icon: 'https://cdn.simpleicons.org/framer/ffffff', proficiency: 'Proficient' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git', proficiency: 'Advanced' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/ffffff', proficiency: 'Proficient' },
  { name: 'Streamlit', icon: 'https://cdn.simpleicons.org/streamlit', proficiency: 'Familiar' },
  { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff', proficiency: 'Proficient' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/visualstudiocode.svg', proficiency: 'Expert' },
  { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman', proficiency: 'Advanced' },
]

const row1Skills = [...row1, ...row1, ...row1, ...row1]
const row2Skills = [...row2, ...row2, ...row2, ...row2]

export default function SkillsSection() {
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !unlockedEvents.has('VISITED_SKILLS')) {
            markEventUnlocked('VISITED_SKILLS')
            addXP(100, { title: 'Tech Scouting', emoji: '⚙️', desc: 'Reviewed the stack' })
          }
        },
        { threshold: 0.3 }
      )
      if (sectionRef.current) observer.observe(sectionRef.current)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="border-t border-[var(--border)] py-32 overflow-hidden">
      <motion.div
        className="max-w-container"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
          / skills
        </p>
        <div className="text-4xl font-extrabold leading-tight text-[var(--text)] md:text-[52px]" style={{ fontFamily: 'var(--font-heading)' }}>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            What I
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            work with<span className="text-[var(--accent)]">.</span>
          </motion.h2>
        </div>
        <p className="mt-5 max-w-[500px] text-base leading-relaxed text-[var(--text-muted)]">
          Across AI/ML, backend, frontend, and deployment - these are the tools I reach for.
        </p>
      </motion.div>

      <div className="marquee-wrapper mt-16 space-y-4">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <MarqueeRow skills={row1Skills} direction="left" />
        </motion.div>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          <MarqueeRow skills={row2Skills} direction="right" />
        </motion.div>
      </div>

      <div className="max-w-container mt-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#333333]" style={{ fontFamily: 'var(--font-mono)' }}>
          AI / ML <span className="mx-2 text-[var(--border)]">.</span> Backend <span className="mx-2 text-[var(--border)]">.</span> Frontend <span className="mx-2 text-[var(--border)]">.</span> DevOps <span className="mx-2 text-[var(--border)]">.</span> Tools
        </p>
      </div>
    </section>
  )
}

function MarqueeRow({ skills, direction }: { skills: Skill[]; direction: 'left' | 'right' }) {
  return (
    <div className="marquee-outer relative">
      <div className="overflow-hidden">
        <div className={`marquee-track ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}>
          {skills.map((skill, index) => (
            <SkillPill key={`${direction}-${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillPill({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false)
  const color = proficiencyColor[skill.proficiency]

  return (
    <div className="marquee-pill" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {skill.icon ? (
        <img src={skill.icon} alt="" width={18} height={18} loading="lazy" className="marquee-pill-icon" aria-hidden="true" />
      ) : (
        <span className="marquee-pill-dot" aria-hidden="true" />
      )}
      <span className="marquee-pill-label" style={{ color: hovered ? '#f0ede6' : undefined }}>{skill.name}</span>
      <motion.span
        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
        animate={hovered ? { opacity: 1, width: 'auto', marginLeft: 4 } : { opacity: 0, width: 0, marginLeft: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden whitespace-nowrap text-[11px]"
        style={{ color, fontFamily: 'var(--font-mono)' }}
      >
        {skill.proficiency}
      </motion.span>
    </div>
  )
}
