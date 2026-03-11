'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const next = total > 0 ? (window.scrollY / total) * 100 : 0
      setProgress(Math.min(100, Math.max(0, next)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="progress-wrap" aria-hidden="true">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  )
}
