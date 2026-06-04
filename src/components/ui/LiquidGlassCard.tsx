'use client'
import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface LiquidGlassCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  dark?: boolean
}

export function LiquidGlassCard({ children, className, style, dark = false }: LiquidGlassCardProps) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)
  const lastX    = useRef(0)
  const lastY    = useRef(0)
  const velTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect   = card.getBoundingClientRect()
    const x      = e.clientX - rect.left
    const y      = e.clientY - rect.top
    const dx     = Math.abs(x - lastX.current)
    const dy     = Math.abs(y - lastY.current)
    const speed  = Math.sqrt(dx * dx + dy * dy)
    const scale  = gsap.utils.clamp(1, 2.2, 1 + speed * 0.04)

    lastX.current = x
    lastY.current = y

    gsap.to(glow, {
      left: x,
      top:  y,
      scale,
      duration: 0.25,
      ease: 'power2.out',
    })

    // reset scale to 1 when mouse slows
    if (velTimer.current) clearTimeout(velTimer.current)
    velTimer.current = setTimeout(() => {
      gsap.to(glow, { scale: 1, duration: 0.6, ease: 'power2.out' })
    }, 80)
  }, [])

  const onMouseEnter = useCallback(() => {
    gsap.to(glowRef.current, { opacity: 1, duration: 0.3 })
  }, [])

  const onMouseLeave = useCallback(() => {
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })
    if (velTimer.current) clearTimeout(velTimer.current)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'relative overflow-hidden',
        dark
          ? 'bg-white/[0.04] border border-white/[0.05]'
          : 'bg-black/[0.04] border border-black/[0.05]',
        'backdrop-blur-xl',
        className,
      )}
      style={{
        background: dark
          ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%)',
        ...style,
      }}
    >
      {/* Radial glow that tracks cursor */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none opacity-0 z-0"
        style={{
          width:  '320px',
          height: '320px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,138,0,0.18) 0%, rgba(255,138,0,0.06) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      {/* Glossy top sheen */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
        style={{
          background: dark
            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
