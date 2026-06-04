'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard'

gsap.registerPlugin(ScrollTrigger)

const RING_RADIUS      = 80
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
// 83% fill for competitive programming achievement
const RING_ACTIVE_DASH  = RING_CIRCUMFERENCE * (1 - 0.83)

export function Metrics() {
  const sectionRef   = useRef<HTMLElement>(null)
  const tickerRef    = useRef<HTMLSpanElement>(null)
  const ringRef      = useRef<SVGCircleElement>(null)
  const card1Ref     = useRef<HTMLDivElement>(null)
  const card2Ref     = useRef<HTMLDivElement>(null)
  const card3Ref     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current]

      // ── Initial state ──
      gsap.set(cards, { opacity: 0, y: 60 })
      gsap.set(ringRef.current, { strokeDashoffset: RING_CIRCUMFERENCE })

      // ── Stagger reveal on scroll ──
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      // ── Numerical ticker: 0 → 100 ──
      const ticker = { val: 0 }
      gsap.to(ticker, {
        val: 100,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card2Ref.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate() {
          if (tickerRef.current) tickerRef.current.textContent = Math.round(ticker.val).toString()
        },
      })

      // ── SVG stroke ring ──
      gsap.to(ringRef.current, {
        strokeDashoffset: RING_ACTIVE_DASH,
        duration: 1.8,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: card3Ref.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#050505]"
      style={{ padding: '8rem 0' }}
    >
      <div className="container-main">

        {/* Section header */}
        <div className="mb-16 pb-8 border-b border-white/[0.06]">
          <span
            className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF8A00] mb-4 block"
          >
            Portfolio / Metrics
          </span>
          <h2
            className="font-heading font-black text-[#F5F5F7] leading-[0.9] tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            Engineering<br />Metrics
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/[0.04]">

          {/* Module 1 — Chapter Head (wide) */}
          <div ref={card1Ref} className="md:col-span-7">
            <LiquidGlassCard dark className="h-full p-10 md:p-14">
              <span
                className="font-body text-[10px] tracking-[0.3em] uppercase text-[#555] block mb-6"
              >
                01 /
              </span>
              <p
                className="font-calligraphy text-[#F5F5F7] leading-[1.1]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
              >
                Engineering
              </p>
              <p
                className="font-calligraphy text-[#FF8A00] leading-[1.1]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
              >
                Metrics
              </p>
              <p className="font-body text-[#555] text-sm mt-6 max-w-xs leading-relaxed">
                A quantified snapshot of technical output, competitive programming, and consistent engineering discipline.
              </p>
            </LiquidGlassCard>
          </div>

          {/* Module 2 — Core Metric ticker */}
          <div ref={card2Ref} className="md:col-span-5">
            <LiquidGlassCard dark className="h-full p-10 md:p-14 flex flex-col justify-between" style={{ minHeight: '280px' }}>
              <span
                className="font-body text-[10px] tracking-[0.3em] uppercase text-[#555] block"
              >
                02 / Core Metric
              </span>
              <div>
                <div className="flex items-end gap-1 leading-none">
                  <span
                    className="font-heading font-black text-[#F5F5F7]"
                    style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', lineHeight: 1 }}
                  >
                    <span ref={tickerRef}>0</span>
                  </span>
                  <span
                    className="font-heading font-black text-[#FF8A00] mb-2"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                  >
                    %
                  </span>
                </div>
                <p className="font-body text-[#555] text-xs tracking-widest uppercase mt-2">
                  Project Delivery Rate
                </p>
              </div>
            </LiquidGlassCard>
          </div>

          {/* Module 3 — Spiritual Pressure Ring */}
          <div ref={card3Ref} className="md:col-span-12">
            <LiquidGlassCard dark className="p-10 md:p-14">
              <div className="flex flex-col md:flex-row items-center gap-12">

                {/* SVG ring */}
                <div className="relative flex-shrink-0" style={{ width: 200, height: 200 }}>
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full -rotate-90"
                    style={{ filter: 'drop-shadow(0 0 16px rgba(255,138,0,0.35))' }}
                  >
                    {/* Track */}
                    <circle
                      cx="100" cy="100" r={RING_RADIUS}
                      fill="none"
                      stroke="#1a1a1a"
                      strokeWidth="3"
                    />
                    {/* Active arc */}
                    <circle
                      ref={ringRef}
                      cx="100" cy="100" r={RING_RADIUS}
                      fill="none"
                      stroke="#FF8A00"
                      strokeWidth="3"
                      strokeLinecap="butt"
                      strokeDasharray={RING_CIRCUMFERENCE}
                      strokeDashoffset={RING_CIRCUMFERENCE}
                    />
                  </svg>
                  {/* Center label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                    <span
                      className="font-heading font-black text-[#F5F5F7]"
                      style={{ fontSize: '2rem' }}
                    >
                      83%
                    </span>
                    <span className="font-body text-[10px] text-[#555] tracking-widest uppercase">
                      CP Rank
                    </span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                  {[
                    { label: 'Problems Solved', value: '300+' },
                    { label: 'LeetCode Rating', value: '1600+' },
                    { label: 'GitHub Commits', value: '500+' },
                    { label: 'Projects Shipped', value: '12' },
                  ].map(stat => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <span
                        className="font-heading font-black text-[#F5F5F7]"
                        style={{ fontSize: '2rem' }}
                      >
                        {stat.value}
                      </span>
                      <span className="font-body text-[10px] text-[#555] tracking-widest uppercase leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </LiquidGlassCard>
          </div>

        </div>
      </div>
    </section>
  )
}
