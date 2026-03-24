"use client"

import { FormEvent, useMemo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Loader2, Mail, FileText } from 'lucide-react'
import { profile, resumeFiles } from '@/lib/profile'
import { useXP } from '@/context/XPContext'

type Status = 'idle' | 'loading' | 'success' | 'error'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactSection({ showSectionFooter = false }: { showSectionFooter?: boolean }) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !unlockedEvents.has('VISITED_CONTACT')) {
            markEventUnlocked('VISITED_CONTACT')
            addXP(200, { title: 'Ready to Hire?', emoji: '💼', desc: 'Made it to the end' })
          }
        },
        { threshold: 0.3 }
      )
      if (sectionRef.current) observer.observe(sectionRef.current)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleResumeClick = () => {
    if (!unlockedEvents.has('OPENED_RESUME')) {
      markEventUnlocked('OPENED_RESUME')
      addXP(100, { title: 'Resume Reviewed', emoji: '📄', desc: 'Downloaded the resume' })
    }
  }

  const socialLinks = useMemo(
    () => [
      {
        label: 'Email',
        subtitle: profile.email,
        href: `mailto:${profile.email}`,
        icon: Mail,
        external: true,
      },
      {
        label: 'LinkedIn',
        subtitle: 'linkedin.com/in/girish-manne',
        href: profile.linkedin,
        icon: Linkedin,
        external: true,
      },
      {
        label: 'GitHub',
        subtitle: 'github.com/girishmanne',
        href: profile.github,
        icon: Github,
        external: true,
      },
      {
        label: 'Resume',
        subtitle: 'View / Download PDF',
        href: resumeFiles[0]?.href ?? '/Resume_Main.pdf',
        icon: FileText,
        external: true,
        download: true,
      },
    ],
    []
  )

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus('error')
      setError('Please fill out all fields.')
      return
    }

    if (!emailRegex.test(form.email)) {
      setStatus('error')
      setError('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          publicKey
        )
      } else {
        console.log('EmailJS env vars missing. Simulated send:', form)
      }

      setStatus('success')
      setForm(initialForm)
    } catch (sendError) {
      console.error(sendError)
      setStatus('error')
      setError('Unable to send right now. Please try again or email me directly.')
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-32">
      <div className="max-w-container px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
            / contact
          </p>
          <h2 className="text-5xl font-extrabold leading-[0.95] text-[var(--text)] md:text-[64px]" style={{ fontFamily: 'var(--font-heading)' }}>
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s build
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              something<span className="text-[var(--accent)]">.</span>
            </motion.span>
          </h2>
          <p className="mt-6 max-w-[480px] text-base leading-relaxed text-[var(--text-muted)]">
            I&apos;m currently open to full-time roles, internships, and interesting collaborations. Response time:
            usually within 24 hours.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[55%_45%]">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
              <FieldLabel htmlFor="name" label="Your name" />
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="contact-input"
              />

              <FieldLabel htmlFor="email" label="Your email" />
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="contact-input"
              />

              <FieldLabel htmlFor="subject" label="What&apos;s this about?" />
              <input
                id="subject"
                type="text"
                required
                placeholder="Job opportunity · Collaboration · Just saying hi"
                value={form.subject}
                onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
                className="contact-input"
              />

              <FieldLabel htmlFor="message" label="Message" />
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                className="contact-input min-h-[150px] resize-none"
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`contact-submit ${status === 'success' ? 'contact-submit--success' : ''}`}
              >
                {status === 'loading' ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : status === 'success' ? (
                  'Message sent! ✓'
                ) : (
                  'Send Message ->'
                )}
              </button>

              {status === 'error' && error ? <p className="text-sm text-[#ef4444]">{error}</p> : null}
            </form>
          </motion.div>

          <motion.div
            className="flex flex-col gap-8"
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            <div>
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                const Arrow = link.download ? ArrowDown : ArrowUpRight
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    onClick={link.download ? handleResumeClick : undefined}
                    className="contact-social-row"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-[18px] w-[18px] text-[#555555]" />
                      <div>
                        <p className="text-[15px] text-[var(--text)]">{link.label}</p>
                        <p className="text-xs text-[#444444]">{link.subtitle}</p>
                      </div>
                    </div>
                    <Arrow className="contact-social-arrow h-4 w-4 text-[#333333]" />
                  </motion.a>
                )
              })}
            </div>

            <div className="mt-auto flex items-start gap-3 pt-6 text-[13px] text-[#555555]">
              <span className="pulse-dot mt-[3px]" aria-hidden="true" />
              <p>
                Currently available for full-time & internships
                <br />
                Based in San Jose, CA · Open to remote
              </p>
            </div>
          </motion.div>
        </div>

        {showSectionFooter ? (
          <div className="mt-16 border-t border-[var(--border)] py-8 text-center text-[13px] text-[#333333]">
            <p>
              Designed & built by {profile.name} · Next.js + Tailwind
              <br />
              © 2025
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function FieldLabel({ htmlFor, label }: { htmlFor: string; label: string }) {
  return (
    <label htmlFor={htmlFor} className="-mb-3 block text-[11px] uppercase tracking-[0.15em] text-[#555555]" style={{ fontFamily: 'var(--font-mono)' }}>
      {label}
    </label>
  )
}
