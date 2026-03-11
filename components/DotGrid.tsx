'use client'

import { useEffect, useRef } from 'react'

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DOT_SPACING = 28
    const DOT_RADIUS = 1
    const INFLUENCE_RADIUS = 120
    const ACCENT_COLOR = [232, 197, 71]

    let animFrameId = 0
    let dots: Array<{ x: number; y: number }> = []

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []
      for (let x = DOT_SPACING; x < width; x += DOT_SPACING) {
        for (let y = DOT_SPACING; y < height; y += DOT_SPACING) {
          dots.push({ x, y })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      dots.forEach((dot) => {
        const dx = mouseRef.current.x - dot.x
        const dy = mouseRef.current.y - dot.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS)

        const alpha = 0.12 + proximity * 0.6
        const radius = DOT_RADIUS + proximity * 2

        if (proximity > 0) {
          ctx.fillStyle = `rgba(${ACCENT_COLOR[0]}, ${ACCENT_COLOR[1]}, ${ACCENT_COLOR[2]}, ${alpha})`
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
        }

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animFrameId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-dot-grid absolute inset-0 h-full w-full"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
