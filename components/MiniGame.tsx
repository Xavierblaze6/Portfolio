'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useXP } from '@/context/XPContext'

const GAME_WIDTH = 800
const GAME_HEIGHT = 500
const PLAYER_SIZE = 40
const OBSTACLE_SIZE = 30
const SKILL_SIZE = 25
const GRAVITY = 0.5
const JUMP_FORCE = -12
const GAME_SPEED_INITIAL = 4
const SKILLS = ['⚡', '🐍', '🤖', '🧠', '🔗']

interface GameObject {
  x: number
  y: number
  id: number
}

export default function MiniGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef({
    running: false,
    score: 0,
    playerY: GAME_HEIGHT / 2,
    playerVY: 0,
    obstacles: [] as (GameObject & { type: 'bug' })[],
    skills: [] as (GameObject & { label: string })[],
    frameCount: 0,
    speed: GAME_SPEED_INITIAL,
    highScore:
      typeof window !== 'undefined'
        ? parseInt(localStorage.getItem('portfolio-game-hs') || '0')
        : 0,
  })
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'dead' | 'win'>('intro')
  const [score, setScore] = useState(0)
  const [highScore] = useState(() =>
    typeof window !== 'undefined'
      ? parseInt(localStorage.getItem('portfolio-game-hs') || '0')
      : 0
  )
  const animFrameRef = useRef<number>()
  const { addXP, unlockedEvents, markEventUnlocked } = useXP()
  const idCounter = useRef(0)

  const jump = useCallback(() => {
    if (gameStateRef.current.running) {
      gameStateRef.current.playerVY = JUMP_FORCE
    }
  }, [])

  const startGame = useCallback(() => {
    const gs = gameStateRef.current
    gs.running = true
    gs.score = 0
    gs.playerY = GAME_HEIGHT / 2
    gs.playerVY = 0
    gs.obstacles = []
    gs.skills = []
    gs.frameCount = 0
    gs.speed = GAME_SPEED_INITIAL
    setScore(0)
    setGamePhase('playing')
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
      if (e.code === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [jump, onClose])

  // Game loop
  useEffect(() => {
    if (gamePhase !== 'playing') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const gs = gameStateRef.current

    const gameLoop = () => {
      gs.frameCount++
      gs.speed = GAME_SPEED_INITIAL + gs.score / 200

      // Physics
      gs.playerVY += GRAVITY
      gs.playerY += gs.playerVY
      gs.playerY = Math.max(
        PLAYER_SIZE / 2,
        Math.min(GAME_HEIGHT - PLAYER_SIZE / 2, gs.playerY)
      )
      if (
        gs.playerY <= PLAYER_SIZE / 2 ||
        gs.playerY >= GAME_HEIGHT - PLAYER_SIZE / 2
      ) {
        gs.playerVY *= -0.5
      }

      // Spawn obstacles
      if (gs.frameCount % 90 === 0) {
        gs.obstacles.push({
          x: GAME_WIDTH + 50,
          y: Math.random() * (GAME_HEIGHT - 80) + 40,
          id: idCounter.current++,
          type: 'bug',
        })
      }

      // Spawn skills
      if (gs.frameCount % 120 === 0) {
        gs.skills.push({
          x: GAME_WIDTH + 50,
          y: Math.random() * (GAME_HEIGHT - 80) + 40,
          id: idCounter.current++,
          label: SKILLS[Math.floor(Math.random() * SKILLS.length)],
        })
      }

      // Move objects
      gs.obstacles = gs.obstacles
        .map(o => ({ ...o, x: o.x - gs.speed }))
        .filter(o => o.x > -50)
      gs.skills = gs.skills
        .map(s => ({ ...s, x: s.x - gs.speed }))
        .filter(s => s.x > -50)

      // Collision — bugs
      const playerX = 80
      for (const obs of gs.obstacles) {
        const dx = Math.abs(playerX - obs.x)
        const dy = Math.abs(gs.playerY - obs.y)
        if (
          dx < (PLAYER_SIZE + OBSTACLE_SIZE) / 2 - 5 &&
          dy < (PLAYER_SIZE + OBSTACLE_SIZE) / 2 - 5
        ) {
          gs.running = false
          const finalScore = Math.floor(gs.score)
          if (finalScore > gs.highScore) {
            gs.highScore = finalScore
            localStorage.setItem('portfolio-game-hs', String(finalScore))
          }
          setScore(finalScore)
          setGamePhase(finalScore >= 500 ? 'win' : 'dead')
          return
        }
      }

      // Collect skills
      gs.skills = gs.skills.filter(skill => {
        const dx = Math.abs(playerX - skill.x)
        const dy = Math.abs(gs.playerY - skill.y)
        if (dx < (PLAYER_SIZE + SKILL_SIZE) / 2 && dy < (PLAYER_SIZE + SKILL_SIZE) / 2) {
          gs.score += 50
          return false
        }
        return true
      })

      gs.score += 0.1
      setScore(Math.floor(gs.score))

      // ── RENDER ──
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Background
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      ctx.lineWidth = 1
      for (let x = 0; x < GAME_WIDTH; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, GAME_HEIGHT); ctx.stroke()
      }
      for (let y = 0; y < GAME_HEIGHT; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(GAME_WIDTH, y); ctx.stroke()
      }

      // Player
      ctx.font = 'bold 28px JetBrains Mono, monospace'
      ctx.fillStyle = '#e8c547'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = 'rgba(232,197,71,0.5)'
      ctx.shadowBlur = 12
      ctx.fillText('</>', playerX, gs.playerY)
      ctx.shadowBlur = 0

      // Obstacles
      gs.obstacles.forEach(obs => {
        ctx.font = '24px serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('🐛', obs.x, obs.y)
      })

      // Skills
      gs.skills.forEach(skill => {
        ctx.font = '22px serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(skill.label, skill.x, skill.y)
        ctx.strokeStyle = 'rgba(232,197,71,0.3)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(skill.x, skill.y, 18, 0, Math.PI * 2)
        ctx.stroke()
      })

      // HUD
      ctx.font = '14px JetBrains Mono, monospace'
      ctx.fillStyle = 'rgba(232,197,71,0.6)'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.fillText(`SCORE: ${Math.floor(gs.score)}`, 16, 16)
      ctx.fillText(`BEST: ${gs.highScore}`, 16, 36)

      animFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animFrameRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [gamePhase])

  // Award XP for playing
  useEffect(() => {
    if (
      (gamePhase === 'dead' || gamePhase === 'win') &&
      !unlockedEvents.has('PLAYED_GAME')
    ) {
      markEventUnlocked('PLAYED_GAME')
      addXP(200, {
        title: 'Bug Slayer',
        emoji: '🎮',
        desc: 'Played the portfolio game',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePhase])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          style={{
            border: '1px solid #1f1f1f',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(232,197,71,0.1)',
          }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: '#111', borderBottom: '1px solid #1f1f1f' }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[12px] text-[#555]">
              girish-portfolio.game
            </span>
            <button
              onClick={onClose}
              className="font-mono text-[12px] text-[#555] hover:text-[#f0ede6] transition-colors"
            >
              ESC to close
            </button>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            onClick={jump}
            style={{
              display: gamePhase === 'playing' ? 'block' : 'none',
              cursor: 'pointer',
            }}
          />

          {/* Intro */}
          {gamePhase === 'intro' && (
            <div
              className="flex flex-col items-center justify-center gap-6 text-center"
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT, background: '#0a0a0a' }}
            >
              <div className="font-mono text-[#e8c547] text-[11px] tracking-widest">
                SECRET UNLOCKED
              </div>
              <div
                className="text-5xl font-black text-[#f0ede6]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Bug Dodger
              </div>
              <div className="text-[#555] text-[14px] max-w-[340px] leading-relaxed">
                Dodge the bugs 🐛, collect skills ⚡
                <br />
                Hit <span className="text-[#e8c547]">500 points</span> for a special reward.
              </div>
              <div className="text-[#333] text-[12px] font-mono">
                SPACE / CLICK to fly · ESC to exit
              </div>
              {highScore > 0 && (
                <div className="text-[#e8c547]/50 text-[12px] font-mono">
                  Your best: {highScore} pts
                </div>
              )}
              <button
                onClick={startGame}
                className="px-8 py-3 rounded-full font-semibold text-[#0a0a0a] text-[15px] transition-all hover:scale-105"
                style={{ background: '#e8c547', boxShadow: '0 0 20px rgba(232,197,71,0.4)' }}
              >
                Start Game →
              </button>
            </div>
          )}

          {/* Dead */}
          {gamePhase === 'dead' && (
            <div
              className="flex flex-col items-center justify-center gap-5 text-center"
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT, background: '#0a0a0a' }}
            >
              <div className="font-mono text-[#ff5f57] text-[11px] tracking-widest">
                GAME OVER
              </div>
              <div
                className="text-5xl font-black text-[#f0ede6]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {score} pts
              </div>
              {score > highScore && (
                <div className="text-[#e8c547] text-[13px] font-mono">🏆 New High Score!</div>
              )}
              <div className="text-[#555] text-[13px] font-mono">
                Need 500 pts for the secret ending
              </div>
              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-full text-[14px] text-[#0a0a0a] font-semibold"
                  style={{ background: '#e8c547' }}
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-[14px] text-[#888] border border-[#1f1f1f]"
                >
                  Exit
                </button>
              </div>
            </div>
          )}

          {/* Win */}
          {gamePhase === 'win' && (
            <div
              className="flex flex-col items-center justify-center gap-5 text-center"
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT, background: '#0a0a0a' }}
            >
              <div className="font-mono text-[#22c55e] text-[11px] tracking-widest animate-pulse">
                🏆 ACHIEVEMENT UNLOCKED
              </div>
              <div
                className="text-5xl font-black"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#e8c547',
                  textShadow: '0 0 40px rgba(232,197,71,0.5)',
                }}
              >
                HIRE ME.
              </div>
              <div className="text-[#888] text-[14px] max-w-[360px] leading-relaxed">
                You beat the game. Honestly at this point you have no choice — let&apos;s work together.
              </div>
              <div className="font-mono text-[12px] text-[#e8c547]/60">
                Score: {score} pts · +200 XP earned
              </div>
              <div className="flex gap-3">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-[14px] text-[#0a0a0a] font-semibold"
                  style={{ background: '#e8c547' }}
                >
                  Actually Hire Me ↓
                </a>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-full text-[14px] text-[#888] border border-[#1f1f1f]"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
