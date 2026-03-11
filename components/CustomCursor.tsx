'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const animFrame = useRef<number>()

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.documentElement.style.cursor = 'none'

    const moveDot = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }

      animFrame.current = requestAnimationFrame(animateRing)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-magnetic]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-magnetic]')) {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', moveDot)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    animFrame.current = requestAnimationFrame(animateRing)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', moveDot)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: isClicking ? '6px' : '8px',
          height: isClicking ? '6px' : '8px',
          background: '#e8c547',
          borderRadius: '50%',
          transition: 'width 0.1s, height 0.1s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          border: `1.5px solid rgba(232, 197, 71, ${isHovering ? 0.8 : 0.4})`,
          background: isHovering ? 'rgba(232, 197, 71, 0.06)' : 'transparent',
          borderRadius: '50%',
          transition: 'width 0.15s ease, height 0.15s ease, border-color 0.15s, background 0.15s',
        }}
      />
    </>
  )
}
