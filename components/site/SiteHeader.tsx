"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { profile, resumeFiles } from '@/lib/profile'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { useXP } from '@/context/XPContext'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const resumeButtonRef = useMagneticEffect<HTMLAnchorElement>(0.25)
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleResumeClick = () => {
    if (!unlockedEvents.has('OPENED_RESUME')) {
      markEventUnlocked('OPENED_RESUME')
      addXP(100, { title: 'Resume Reviewed', emoji: '📄', desc: 'Downloaded the resume' })
    }
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1f1f1f' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-container flex h-16 items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-[Syne] font-bold text-[#f0ede6] hover:text-[#e8c547] transition-colors"
        >
          {profile.name}
        </button>
        <nav className="flex items-center gap-5 text-sm text-[var(--text-muted)]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--accent)] transition-colors">
              {item.label}
            </Link>
          ))}
          <div className="-m-2 inline-block p-2">
            <a
              ref={resumeButtonRef}
              data-magnetic
              href={resumeFiles[0].href}
              target="_blank"
              rel="noreferrer"
              onClick={handleResumeClick}
              className="rounded-full border border-[var(--accent)] px-3 py-1 text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-black"
            >
              Resume
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
