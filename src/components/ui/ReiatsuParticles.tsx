'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; size: number
  speedX: number; speedY: number
  opacity: number; opacityDelta: number
}

export function ReiatsuParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * (canvas?.width ?? 0),
        y: Math.random() * (canvas?.height ?? 0),
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        opacityDelta: (Math.random() - 0.5) * 0.005,
      }
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.speedX
        p.y += p.speedY
        p.opacity += p.opacityDelta
        if (p.opacity <= 0.05 || p.opacity >= 0.5) p.opacityDelta *= -1
        if (p.y < -10) particles[i] = createParticle()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 172, 28, ${p.opacity})`
        ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }

    resize()
    particles = Array.from({ length: 60 }, createParticle)
    draw()
    window.addEventListener('resize', resize)
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationId) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}
