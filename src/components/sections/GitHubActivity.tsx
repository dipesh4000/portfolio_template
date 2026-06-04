'use client'
import { useCodolio } from '@/lib/hooks/useCodolio'
import type { GithubContribution } from '@/types'

// Blood red scale — cream → light pink → red → deep blood
const LEVELS: Record<0|1|2|3|4, string> = {
  0: '#EDE8DE',   // paper — no activity
  1: '#E8B4A0',   // faint pink
  2: '#CC5030',   // orange-red
  3: '#A01010',   // blood red
  4: '#6A0000',   // deep crimson
}

function groupWeeks(cs: GithubContribution[]) {
  const s = [...cs].sort((a, b) => a.date.localeCompare(b.date))
  const w: GithubContribution[][] = []
  for (let i = 0; i < s.length; i += 7) w.push(s.slice(i, i + 7))
  return w
}

export function GitHubActivity() {
  const { data, isLoading, isError } = useCodolio()

  return (
    <section id="github" className="w-full" style={{ padding: '6rem 0', background: 'var(--paper-alt)' }}>
      <div className="container-main">

        <div className="chapter-wrap">
          <span className="chapter-label">Chapter 08</span>
          <h2 className="chapter-title">
            GITHUB<br />
            <span style={{ color: 'var(--red)' }}>ACTIVITY</span>
          </h2>
          <span className="chapter-num">08</span>
        </div>

        {isLoading && (
          <div className="flex gap-1.5 overflow-hidden">
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="w-3.5 h-3.5 animate-pulse"
                    style={{ background: 'rgba(10,10,10,0.08)' }} />
                ))}
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="ink-panel p-8">
            <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              Could not load GitHub activity.
            </p>
          </div>
        )}

        {data && data.githubHeatmap.length > 0 && (
          <div className="ink-panel p-8" style={{ background: 'var(--paper)' }}>
            {/* Legend */}
            <div className="flex items-center justify-between mb-6">
              <span className="mono-label">Contribution activity — past year</span>
              <div className="flex items-center gap-2">
                <span className="mono-label">None</span>
                {([0,1,2,3,4] as const).map(l => (
                  <div key={l} className="w-3.5 h-3.5" style={{ background: LEVELS[l], border: '1px solid rgba(10,10,10,0.1)' }} />
                ))}
                <span className="mono-label">High</span>
              </div>
            </div>

            {/* Heatmap grid */}
            <div className="overflow-x-auto">
              <div className="flex gap-1.5 min-w-max pb-2">
                {groupWeeks(data.githubHeatmap).map((wk, wi) => (
                  <div key={wi} className="flex flex-col gap-1.5">
                    {wk.map((day, di) => (
                      <div
                        key={di}
                        className="heat-cell w-3.5 h-3.5"
                        title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`}
                        style={{ background: LEVELS[day.level], border: '1px solid rgba(10,10,10,0.06)' }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Total count */}
            <div className="mt-6 pt-5 flex items-center gap-6"
              style={{ borderTop: '1px solid rgba(10,10,10,0.1)' }}>
              <div>
                <span className="font-brutalist text-3xl" style={{ color: 'var(--red)' }}>
                  {data.githubHeatmap.reduce((s, d) => s + d.count, 0)}
                </span>
                <span className="mono-label block mt-0.5">total contributions</span>
              </div>
              <div className="ink-line flex-1" />
              <div>
                <span className="font-brutalist text-3xl" style={{ color: 'var(--ink)' }}>
                  {data.githubHeatmap.filter(d => d.count > 0).length}
                </span>
                <span className="mono-label block mt-0.5">active days</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
