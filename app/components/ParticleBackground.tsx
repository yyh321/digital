'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const COLORS = ['#0ea5e9', '#06b6d4', '#6366f1', '#8b5cf6']
const PARTICLE_COUNT = 100
const CONNECTION_DISTANCE = 120
const MAX_CONNECTIONS = 3
const MOUSE_RADIUS = 150
const MOUSE_FORCE = 0.02

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

    const particles: Particle[] = []

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 1.2 + 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    const resize = () => {
      width = window.innerWidth * dpr
      height = window.innerHeight * dpr
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const mouse = mouseRef.current

      // Update positions & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse attraction
        const dx = mouse.x - p.x / dpr
        const dy = mouse.y - p.y / dpr
        const distMouse = Math.sqrt(dx * dx + dy * dy)
        if (distMouse < MOUSE_RADIUS && distMouse > 0) {
          const force = (MOUSE_RADIUS - distMouse) / MOUSE_RADIUS
          p.vx += (dx / distMouse) * force * MOUSE_FORCE
          p.vy += (dy / distMouse) * force * MOUSE_FORCE
        }

        p.x += p.vx * dpr
        p.y += p.vy * dpr

        // Boundary bounce with slight randomization to avoid patterns
        if (p.x < 0) {
          p.x = 0
          p.vx = Math.abs(p.vx) + Math.random() * 0.05
        }
        if (p.x > width) {
          p.x = width
          p.vx = -(Math.abs(p.vx) + Math.random() * 0.05)
        }
        if (p.y < 0) {
          p.y = 0
          p.vy = Math.abs(p.vy) + Math.random() * 0.05
        }
        if (p.y > height) {
          p.y = height
          p.vy = -(Math.abs(p.vy) + Math.random() * 0.05)
        }

        // Dampen velocity
        p.vx *= 0.999
        p.vy *= 0.999

        // Keep minimum movement
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.02
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.02

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x / dpr, p.y / dpr, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        let connections = 0
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE * dpr) {
            const opacity = (1 - dist / (CONNECTION_DISTANCE * dpr)) * 0.3
            ctx.beginPath()
            ctx.moveTo(p1.x / dpr, p1.y / dpr)
            ctx.lineTo(p2.x / dpr, p2.y / dpr)
            ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
            connections++
            if (connections >= MAX_CONNECTIONS) break
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
