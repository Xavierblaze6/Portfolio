'use client'

import { useState } from 'react'
import { useKeyCombo } from '@/hooks/useKeyCombo'
import MiniGame from './MiniGame'

export default function GameController() {
  const [gameOpen, setGameOpen] = useState(false)
  useKeyCombo(['g', 'm'], () => setGameOpen(true), 500)
  return gameOpen ? <MiniGame onClose={() => setGameOpen(false)} /> : null
}
