"use client"
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STACK_ROWS = [
  { label: 'FRONTEND', value: 'React · Next.js · TypeScript' },
  { label: 'BACKEND',  value: 'Node.js · Python · Go' },
  { label: 'DATABASE', value: 'PostgreSQL · MongoDB · Redis' },
  { label: 'CLOUD',    value: 'AWS · Docker · Kubernetes' },
  { label: 'ML / AI',  value: 'TensorFlow · PyTorch · sklearn' },
]

function Counter() {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current, start: 'top 80%', once: true,
        onEnter: () => gsap.to({ v: 0 }, {
          v: 10000, duration: 2, ease: 'power2.out',
          onUpdate: function() { setN(Math.floor(this.targets()[0].v)) },
        }),
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="ink-panel p-8 lg:p-10 h-full" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
      {/* Kanji accent */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="mono-label block mb-2" style={{ color: 'rgba(242,237,228,0.4)' }}>REIATSU OUTPUT</span>
          <h3 className="font-brutalist text-4xl md:text-5xl uppercase leading-tight" style={{ color: 'var(--paper)' }}>
            REIATSU<br />DRIVE
          </h3>
        </div>
        <span className="font-brutalist text-4xl" style={{ color: 'var(--red)', opacity: 0.4, lineHeight: 1 }}>霊</span>
      </div>
      <p className="font-mono leading-[1.8] mb-8" style={{ fontSize: '0.85rem', color: 'rgba(242,237,228,0.6)' }}>
        Soul-core AI and neural pipeline design. Spectral computation, expressive energy output.
      </p>
      <div className="pt-5" style={{ borderTop: '1px solid rgba(242,237,228,0.15)' }}>
        <span className="font-brutalist" style={{ fontSize: '3.8rem', color: 'var(--red)', lineHeight: 1 }}>
          {n.toLocaleString()}
        </span>
        <span className="mono-label block mt-1" style={{ color: 'rgba(242,237,228,0.4)' }}>OPS / SEC</span>
      </div>
    </div>
  )
}

function Stack() {
  return (
    <div className="ink-panel p-8 lg:p-10 h-full" style={{ background: 'var(--paper)' }}>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 animate-pulse-slow" style={{ background: 'var(--red)' }} />
        <span className="mono-label" style={{ color: 'var(--red)' }}>TECH ARSENAL</span>
      </div>
      {STACK_ROWS.map(r => (
        <div key={r.label} className="flex justify-between items-center py-3" style={{ borderBottom: 'var(--border-thin)' }}>
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)', width: '90px', flexShrink: 0 }}>{r.label}</span>
          <span className="font-mono text-sm" style={{ color: 'var(--text)' }}>{r.value}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 mt-5 pt-4" style={{ borderTop: 'var(--border-thin)' }}>
        <span className="w-1.5 h-1.5 animate-pulse" style={{ background: 'var(--red)' }} />
        <span className="mono-label" style={{ color: 'var(--red)' }}>OPERATIONAL</span>
      </div>
    </div>
  )
}

function Wave() {
  const pathRef = useRef<SVGPathElement>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength()
        gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len })
        ScrollTrigger.create({
          trigger: ref.current, start: 'top 75%', once: true,
          onEnter: () => gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }),
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="ink-panel p-8" style={{ background: 'var(--paper-dark)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="mono-label">COMBAT ACTIVITY WAVE</span>
        <span className="font-brutalist text-2xl" style={{ color: 'var(--red)', opacity: 0.3 }}>闘</span>
      </div>
      <svg viewBox="0 0 700 70" className="w-full h-16" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M0 55 L100 40 L175 50 L275 18 L375 30 L450 8 L550 18 L625 4 L700 10"
          fill="none" stroke="var(--ink)" strokeWidth="2.5" vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 55 L100 40 L175 50 L275 18 L375 30 L450 8 L550 18 L625 4 L700 10"
          fill="none" stroke="var(--red)" strokeWidth="1" opacity="0.4" vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

export function DataBank() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section id="databank" ref={ref} className="w-full" style={{ padding: '6rem 0', background: 'var(--paper)' }}>
      <div className="container-main">
        <div className="chapter-wrap">
          <span className="chapter-label">Chapter 03</span>
          <h2 className="chapter-title">SOUL CORE<br /><span style={{ color: 'var(--red)' }}>PROTOCOL</span></h2>
          <span className="chapter-num">03</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px mb-px" style={{ background: 'var(--ink)', outline: '2px solid var(--ink)' }}>
          <div className="lg:col-span-2"><Counter /></div>
          <div><Stack /></div>
        </div>
        <div style={{ outline: '2px solid var(--ink)', marginTop: '2px' }}><Wave /></div>
      </div>
    </section>
  )
}
