'use client'
import { motion } from 'framer-motion'
import { useCodolio } from '@/lib/hooks/useCodolio'
import type { DSAStats, PlatformStat } from '@/types'

function Ring({ total }: { total: number }) {
  const r = 78, circ = 2 * Math.PI * r
  const pct = Math.min(total / 300, 1)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 192 192" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle cx="96" cy="96" r={r} fill="none" stroke="rgba(184,0,0,0.1)" strokeWidth="5" />
          {/* Blood red fill */}
          <motion.circle
            cx="96" cy="96" r={r}
            fill="none"
            stroke="var(--red)"
            strokeWidth="5"
            strokeLinecap="butt"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ * (1 - pct) }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          />
          {/* Tick marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
            const x1 = 96 + (r - 10) * Math.cos(angle)
            const y1 = 96 + (r - 10) * Math.sin(angle)
            const x2 = 96 + (r + 2) * Math.cos(angle)
            const y2 = 96 + (r + 2) * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(10,10,10,0.15)" strokeWidth="1" />
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-brutalist" style={{ fontSize: '2.8rem', color: 'var(--red)', lineHeight: 1 }}>{total}</span>
          <span className="mono-label mt-1">Problems</span>
          <span className="mono-label">Solved</span>
        </div>
      </div>
      <div className="ink-panel px-5 py-2 text-center">
        <span className="mono-label">out of 300 target</span>
      </div>
    </div>
  )
}

function Bars({ stats }: { stats: DSAStats }) {
  const items = [
    { label: 'Easy',   count: stats.easySolved,  max: 200 },
    { label: 'Medium', count: stats.mediumSolved, max: 100 },
    { label: 'Hard',   count: stats.hardSolved,   max: 30  },
  ]
  return (
    <div className="flex flex-col gap-8 justify-center">
      {items.map((b, i) => (
        <div key={b.label}>
          <div className="flex justify-between items-baseline mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 flex-shrink-0"
                style={{ background: i === 0 ? 'var(--gold)' : 'var(--red)', opacity: i === 0 ? 0.8 : 1 }} />
              <span className="font-brutalist text-lg uppercase tracking-wide" style={{ color: 'var(--ink)' }}>
                {b.label}
              </span>
            </div>
            <span className="font-brutalist text-3xl" style={{ color: 'var(--red)' }}>{b.count}</span>
          </div>
          <div className="blood-bar-track">
            <motion.div
              className="blood-bar-fill"
              initial={{ width: '0%' }}
              whileInView={{ width: `${Math.min((b.count / b.max) * 100, 100)}%` }}
              transition={{ duration: 1.3, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="mono-label">0</span>
            <span className="mono-label">{b.max}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function PlatformCard({ p }: { p: PlatformStat }) {
  return (
    <div className="ink-panel p-7">
      <span className="mono-label block mb-4">{p.name}</span>
      <span className="font-brutalist block leading-none mb-1"
        style={{ fontSize: '3rem', color: 'var(--red)' }}>{p.solved}</span>
      <span className="mono-label">problems solved</span>
      {p.rating != null && (
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(10,10,10,0.1)' }}>
          <span className="mono-label block mb-1">Rating</span>
          <span className="font-brutalist text-2xl" style={{ color: 'var(--gold)' }}>{p.rating}</span>
        </div>
      )}
    </div>
  )
}

export function DSAActivity() {
  const { data, isLoading, isError } = useCodolio()

  return (
    <section id="dsa" className="w-full" style={{ padding: '6rem 0', background: 'var(--paper)' }}>
      <div className="container-main">

        <div className="chapter-wrap">
          <span className="chapter-label">Chapter 07</span>
          <h2 className="chapter-title">
            COMBAT<br />
            <span style={{ color: 'var(--red)' }}>STATS</span>
          </h2>
          <span className="chapter-num">07</span>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="h-64 animate-pulse ink-panel" style={{ background: 'var(--paper-alt)' }} />
            <div className="h-64 animate-pulse ink-panel" style={{ background: 'var(--paper-alt)' }} />
          </div>
        )}

        {isError && (
          <div className="ink-panel p-8">
            <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              Could not load DSA stats — check your Codolio API config.
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Total + bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-12 items-center">
              <Ring total={data.dsaStats.totalSolved} />
              <Bars stats={data.dsaStats} />
            </div>

            {/* Divider */}
            <div className="ink-line mb-10" />

            {/* Platform cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: 'var(--ink)', outline: '2px solid var(--ink)' }}>
              {data.dsaStats.platforms.map(p => <PlatformCard key={p.name} p={p} />)}
            </div>
          </>
        )}

      </div>
    </section>
  )
}
