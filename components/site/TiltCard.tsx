'use client'

import { useState } from 'react'

type TiltCardProps = {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const [style, setStyle] = useState<React.CSSProperties>({})

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const rotateY = (x - 0.5) * 8
    const rotateX = (0.5 - y) * 8

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
    })
  }

  const onLeave = () => {
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)' })
  }

  return (
    <div className="tilt-wrap">
      <div className={`tilt-card ${className}`} style={style} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </div>
    </div>
  )
}
