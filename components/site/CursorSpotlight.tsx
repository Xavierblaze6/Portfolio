'use client'

import { useEffect } from 'react'

export default function CursorSpotlight() {
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`)
      document.documentElement.style.setProperty('--my', `${event.clientY}px`)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div className="cursor-spotlight" aria-hidden="true" />
}
