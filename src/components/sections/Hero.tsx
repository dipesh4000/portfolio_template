"use client"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { person } from '@/data/config'

export function Hero() {
  const leftRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLDivElement>(null)
  const ref     = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'power4.out', delay: 0.15 }
      )
      gsap.fromTo(imgRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'power4.out', delay: 0.3 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: 'var(--paper)' }}
    >
      {/* Outer panel frame */}
      <div className="absolute inset-4 lg:inset-8 pointer-events-none"
        style={{ border: '1px solid rgba(10,10,10,0.1)' }} />

      {/* Red kanji top-left */}
      <div className="absolute top-12 left-6 lg:left-12 pointer-events-none select-none" aria-hidden>
        <span className="font-brutalist" style={{
          fontSize: 'clamp(2.5rem,6vw,5rem)', color: 'var(--red)',
          opacity: 0.12, writingMode: 'vertical-rl', lineHeight: 1, letterSpacing: '0.1em'
        }}>死神</span>
      </div>

      {/* Main two-column layout */}
      <div className="container-main min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-0 px-4 lg:px-0">

        {/* ── LEFT — intro ── */}
        <div ref={leftRef} className="relative z-10 py-28 lg:py-0 lg:pr-16">

          {/* Chapter tag */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5" style={{ background: 'var(--red)' }} />
            <span className="mono-label" style={{ color: 'var(--red)' }}>Chapter 01 · Portfolio</span>
          </div>

          {/* Name */}
          <h1 className="font-brutalist font-black uppercase leading-[0.85] mb-5"
            style={{ fontSize: 'clamp(4rem, 10vw, 8.5rem)', color: 'var(--ink)' }}>
            {person.name.split(' ')[0]}
            <br />
            <span className="brush-red">{person.name.split(' ')[1]}</span>
          </h1>

          {/* Role badge */}
          <div className="inline-block px-4 py-2.5 mb-6 font-brutalist text-base uppercase tracking-[0.18em]"
            style={{ background: 'var(--ink)', color: 'var(--paper)', border: '2px solid var(--ink)' }}>
            {person.title}
          </div>

          {/* Bio */}
          <p className="font-mono leading-[1.85] mb-8 max-w-md"
            style={{ fontSize: '0.88rem', color: 'var(--text-soft)' }}>
            {person.bio[0]}
          </p>

          {/* Quick stat row */}
          <div className="flex gap-px mb-8" style={{ border: '2px solid var(--ink)', width: 'fit-content' }}>
            {[
              { label: 'Location', value: person.location },
              { label: 'Status',   value: 'Available' },
              { label: 'Focus',    value: 'Full Stack' },
            ].map((s, i) => (
              <div key={i} className="px-5 py-3"
                style={{
                  background: i === 1 ? 'var(--ink)' : 'var(--paper)',
                  borderRight: i < 2 ? '2px solid var(--ink)' : 'none',
                }}>
                <span className="mono-label block mb-0.5"
                  style={{ color: i === 1 ? 'rgba(244,240,232,0.4)' : 'var(--text-muted)' }}>
                  {s.label}
                </span>
                <span className="font-brutalist text-sm uppercase"
                  style={{ color: i === 1 ? 'var(--red)' : 'var(--ink)' }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3">
            {person.socials.map(s => (
              <a key={s.platform} href={s.url}
                target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs px-4 py-2 uppercase tracking-widest transition-all"
                style={{ border: '1px solid rgba(10,10,10,0.3)', color: 'var(--text-soft)' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--ink)'; el.style.color = 'var(--paper)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--text-soft)' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Ichigo image ── */}
        <div ref={imgRef} className="relative hidden lg:flex items-end justify-center h-screen">

          {/* Red kanji behind image — 剣八 style */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
            <span className="font-brutalist"
              style={{ fontSize: '28vw', color: 'var(--red)', opacity: 0.04, lineHeight: 1, letterSpacing: '-0.05em' }}>
              護
            </span>
          </div>

          {/* Ink splatter circles behind image */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden>
            <svg viewBox="0 0 600 300" className="w-full" style={{ opacity: 0.06 }}>
              <ellipse cx="300" cy="280" rx="280" ry="60" fill="var(--ink)" />
              <ellipse cx="150" cy="268" rx="100" ry="25" fill="var(--ink)" />
              <ellipse cx="460" cy="272" rx="80" ry="20" fill="var(--ink)" />
              <circle cx="80"  cy="255" r="8"  fill="var(--ink)" />
              <circle cx="530" cy="258" r="6"  fill="var(--ink)" />
              <circle cx="340" cy="250" r="5"  fill="var(--ink)" />
              <rect x="118" y="220" width="4" height="45" fill="var(--ink)" opacity="0.7" />
              <rect x="310" y="210" width="3" height="50" fill="var(--ink)" opacity="0.6" />
              <rect x="480" y="225" width="4" height="40" fill="var(--ink)" opacity="0.7" />
            </svg>
          </div>

          {/* Ichigo image — flush bottom */}
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Vertical red line accent */}
            <div className="absolute left-8 top-1/4 bottom-0 w-0.5 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--red), transparent)', opacity: 0.3 }} />

            <img
              src="/ichigo.png"
              alt="Ichigo Kurosaki"
              className="object-contain object-bottom w-auto select-none"
              style={{
                maxHeight: '90vh',
                filter: 'contrast(1.05)',
                mixBlendMode: 'multiply',   /* cream bg shows through white areas */
              }}
              draggable={false}
            />

            {/* Name watermark over image */}
            <div className="absolute bottom-12 right-6 text-right pointer-events-none select-none" aria-hidden>
              <span className="font-brutalist block"
                style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--ink)', opacity: 0.08, lineHeight: 1 }}>
                KUROSAKI
              </span>
              <span className="font-brutalist block"
                style={{ fontSize: 'clamp(1rem,2vw,1.6rem)', color: 'var(--red)', opacity: 0.12 }}>
                一護
              </span>
            </div>

            {/* Top panel border accent */}
            <div className="absolute top-16 right-0 w-16 h-16 pointer-events-none"
              style={{ borderTop: '3px solid var(--red)', borderRight: '3px solid var(--red)', opacity: 0.4 }} />
            <div className="absolute bottom-16 left-0 w-10 h-10 pointer-events-none"
              style={{ borderBottom: '2px solid var(--ink)', borderLeft: '2px solid var(--ink)', opacity: 0.3 }} />
          </div>
        </div>

      </div>

      {/* Bottom ink bleed */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--ink)', opacity: 0.15 }} />
    </section>
  )
}
