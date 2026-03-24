"use client"

import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Tilt from 'react-parallax-tilt'
import { profile } from '@/lib/profile'
import ProjectModal, { CaseStudy } from '@/components/ProjectModal'
import { useXP } from '@/context/XPContext'

type Project = {
  id: number
  name: string
  tagline: string
  description: string
  tech: string[]
  type: 'AI/ML' | 'Full Stack'
  featured?: boolean
  github: string
  demo?: string
  gradient: string
  caseStudy: CaseStudy
}

const projects: Project[] = [
  {
    id: 1,
    name: 'TruthSeeker',
    tagline: 'AI-Powered Misinformation Detection Engine',
    description:
      'Built an end-to-end RAG pipeline that fact-checks claims in real-time using LangChain, vector search, and LLM reasoning. Deployed as a full web app with source citation and confidence scoring.',
    tech: ['Python', 'LangChain', 'RAG', 'OpenAI', 'FAISS', 'FastAPI', 'React'],
    type: 'AI/ML',
    featured: true,
    github: '#',
    demo: '#',
    gradient:
      'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.25) 0%, rgba(59,130,246,0.1) 50%, transparent 80%), #0f0f1a',
    caseStudy: {
      problem:
        'Misinformation spreads faster than fact-checkers can respond. Manual fact-checking is slow, inconsistent, and does not scale.',
      solution:
        'Built an automated RAG pipeline that retrieves relevant source documents, reasons over them with an LLM, and returns a verdict with cited evidence and a confidence score.',
      techDecisions: [
        'Chose FAISS over Pinecone for zero-cost local vector storage during development',
        'Used LangChain ReAct agent pattern for multi-step reasoning chains',
        'FastAPI backend for async handling of concurrent fact-check requests',
        'React frontend with real-time streaming of the reasoning process',
      ],
      outcome:
        'Achieved 87% accuracy on a curated dataset of 200 known true/false claims and deployed a publicly accessible demo.',
      learnings:
        'Reliable RAG quality depends as much on retrieval quality as prompt quality. Better context beats clever prompting.',
    },
  },
  {
    id: 2,
    name: 'Agentic RAG System',
    tagline: 'Multi-Agent Document Intelligence',
    description:
      'Designed a multi-agent orchestration system where autonomous agents retrieve, reason, and synthesize answers from large document corpora. Built with LangGraph and LangChain.',
    tech: ['Python', 'LangGraph', 'LangChain', 'ChromaDB', 'Streamlit'],
    type: 'AI/ML',
    github: '#',
    gradient:
      'radial-gradient(ellipse at 70% 30%, rgba(16,185,129,0.2) 0%, rgba(6,182,212,0.08) 60%, transparent 85%), #0a0f0e',
    caseStudy: {
      problem:
        'Single-retrieval RAG fails on complex multi-part questions that require synthesis across several documents.',
      solution:
        'Designed a LangGraph-based multi-agent system where a planner agent decomposes questions, retriever agents fetch targeted context, and a synthesizer agent assembles the final answer.',
      techDecisions: [
        'LangGraph for stateful orchestration with conditional routing',
        'ChromaDB for persistent vector storage with metadata filtering',
        'Streamlit for rapid internal prototyping and iteration',
      ],
      outcome:
        'Outperformed single-pass RAG on multi-hop QA benchmarks and is being refined for SJSU BAT Lab research workflows.',
      learnings:
        'Agent systems need explicit guardrails and termination conditions to avoid loops and unstable reasoning paths.',
    },
  },
  {
    id: 4,
    name: 'AI Compliance Agent',
    tagline: 'Automated Regulatory Compliance Checker',
    description:
      'Intelligent agent that scans documents for regulatory compliance gaps using LLM reasoning and domain-specific knowledge bases. Reduces manual compliance review time significantly.',
    tech: ['Python', 'LangChain', 'GPT-4', 'FastAPI', 'React'],
    type: 'AI/ML',
    github: '#',
    gradient:
      'radial-gradient(ellipse at 60% 40%, rgba(245,158,11,0.15) 0%, rgba(234,179,8,0.08) 60%, transparent 85%), #0f0e0a',
    caseStudy: {
      problem:
        'Manual compliance reviews are expensive and slow, especially for smaller teams with limited legal bandwidth.',
      solution:
        'Built an LLM-assisted compliance agent that ingests policy documents and flags non-compliant clauses with mapped regulation references.',
      techDecisions: [
        'Domain knowledge base assembled from regulatory text',
        'LLM reasoning pipeline tuned for nuanced legal language',
        'Structured output design for actionable compliance reports',
        'FastAPI + React interface for upload-and-review workflows',
      ],
      outcome:
        'Reduced initial review cycles from hours to minutes for GDPR and privacy-focused document checks.',
      learnings:
        'The hardest part is not model output formatting but selecting the right regulation set for each document context.',
    },
  },
  {
    id: 3,
    name: 'Sukhibava',
    tagline: 'Mental Wellness Platform with AI Support',
    description:
      'Full-stack wellness app with AI-powered mood tracking, journaling, and personalized mental health insights. Built with Next.js frontend and Node.js/Express backend.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'OpenAI', 'Tailwind CSS'],
    type: 'Full Stack',
    github: '#',
    demo: '#',
    gradient:
      'radial-gradient(ellipse at 50% 40%, rgba(244,114,182,0.15) 0%, rgba(167,139,250,0.1) 60%, transparent 85%), #0f0a0f',
    caseStudy: {
      problem:
        'Most mental wellness apps feel either overly clinical or too shallow for day-to-day use.',
      solution:
        'Built a full-stack wellness app with AI-guided journaling, mood pattern tracking, and personalized micro-interventions.',
      techDecisions: [
        'Next.js App Router for robust rendering and secure data flow',
        'MongoDB for schema flexibility during rapid product iteration',
        'OpenAI for journaling analysis and suggestions',
        'Privacy-first handling with minimal retention of sensitive text',
      ],
      outcome:
        'Live deployment with a conversational check-in experience designed to feel supportive instead of clinical.',
      learnings:
        'In wellness products, emotional UX quality determines adoption far more than model sophistication alone.',
    },
  },
]

type ProjectsSectionProps = {
  showSectionLabel?: boolean
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const isFeatured = !!project.featured

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.02}
      transitionSpeed={400}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor="#e8c547"
      glarePosition="all"
      glareBorderRadius="20px"
      className={`${isFeatured ? 'lg:row-span-2' : ''} ${project.id === 3 ? 'lg:col-span-2' : ''}`}
      style={{ borderRadius: '20px', overflow: 'hidden' }}
    >
      <motion.article
        data-cursor="project"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-[var(--border)] bg-[#111111] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(232,197,71,0.25)]"
        onClick={onClick}
      >
        <div
          className={`project-cover relative w-full overflow-hidden ${isFeatured ? 'min-h-[220px]' : 'h-[160px]'}`}
          style={{ background: project.gradient }}
        >
          <div className="project-shimmer absolute inset-0" />

          {isFeatured ? (
            <>
              <span className="floating-dot left-[14%] top-[20%] h-[5px] w-[5px]" />
              <span className="floating-dot left-[30%] top-[64%] h-[4px] w-[4px] [animation-delay:0.6s]" />
              <span className="floating-dot left-[56%] top-[28%] h-[6px] w-[6px] [animation-delay:1.1s]" />
              <span className="floating-dot left-[72%] top-[70%] h-[4px] w-[4px] [animation-delay:1.6s]" />
              <span className="floating-dot left-[85%] top-[40%] h-[5px] w-[5px] [animation-delay:2s]" />
            </>
          ) : null}

          <span
            className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] text-[var(--text)]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {project.type}
          </span>

          <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExternalLink size={16} className="text-[var(--text)]" />
          </span>
        </div>

        <div className={project.id === 1 ? 'flex flex-col justify-between h-full p-6' : 'space-y-3 p-6'}>
          <p className="text-[13px] text-[var(--accent)]">{project.tagline}</p>
          <h3
            className={`font-bold text-[var(--text)] ${isFeatured ? 'text-[26px]' : 'text-[20px]'}`}
            style={{ fontFamily: 'Syne, DM Sans, sans-serif' }}
          >
            {project.name}
          </h3>

          <p className={`text-[14px] leading-[1.7] text-[#888888] ${isFeatured ? '' : 'clamp-2'}`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border)] px-2.5 py-[3px] text-[11px] text-[var(--text-muted)] transition-colors duration-200 hover:border-[rgba(232,197,71,0.3)] hover:text-[var(--accent)]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[13px] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)]"
            >
              <Github size={14} />
              GitHub
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(232,197,71,0.4)] px-4 py-1.5 text-[13px] text-[var(--accent)] transition-colors duration-200 hover:bg-[rgba(232,197,71,0.1)]"
              >
                Live Demo
                <ArrowUpRight size={14} />
              </a>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5 mt-4 pt-4" style={{ borderTop: '1px solid #1f1f1f' }}>
            <span className="font-mono text-[10px] tracking-widest text-[#333] group-hover:text-[#e8c547] transition-colors">
              CLICK FOR CASE STUDY
            </span>
            <span className="text-[#333] text-[10px] transition-colors group-hover:text-[#e8c547]">
              →
            </span>
          </div>
        </div>
      </motion.article>
    </Tilt>
  )
}

export default function ProjectsSection({ showSectionLabel = true }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !unlockedEvents.has('VISITED_PROJECTS')) {
            markEventUnlocked('VISITED_PROJECTS')
            addXP(150, { title: 'Portfolio Dive', emoji: '🚀', desc: 'Explored the projects' })
          }
        },
        { threshold: 0.3 }
      )
      if (sectionRef.current) observer.observe(sectionRef.current)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="border-t border-[var(--border)] py-32">
      <div className="max-w-container">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {showSectionLabel ? (
            <p
              className="mb-3 text-[12px] tracking-[0.2em] text-[var(--accent)]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              / SELECTED WORK
            </p>
          ) : null}

          <h2 className="text-[42px] font-extrabold leading-none text-[var(--text)] md:text-[56px]" style={{ fontFamily: 'Syne, DM Sans, sans-serif' }}>
            Projects<span className="text-[var(--accent)]">.</span>
          </h2>

          <p className="mt-4 text-[14px] text-[var(--text-muted)]">
            4 projects built
            <span className="mx-2 text-[var(--border)]">·</span>
            3 AI/ML
            <span className="mx-2 text-[var(--border)]">·</span>
            1 Full Stack
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr_1fr] lg:grid-rows-[auto_auto]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 border-t border-[var(--border)]" />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(232,197,71,0.3)] px-5 py-2 text-[14px] text-[var(--accent)] transition-colors duration-200 hover:bg-[rgba(232,197,71,0.1)]"
          >
            View all on GitHub
            <ArrowUpRight size={15} />
          </a>
          <div className="h-px flex-1 border-t border-[var(--border)]" />
        </div>

        {selectedProject ? <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} /> : null}
      </div>
    </section>
  )
}
