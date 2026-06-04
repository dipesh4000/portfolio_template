'use client'
import { motion } from 'framer-motion'
import { experience } from '@/data/experience'
import { format } from 'date-fns'

function fmt(d: string) {
  if (d === 'present') return 'Present'
  const [y, m] = d.split('-')
  return format(new Date(+y, +m - 1, 1), 'MMM yyyy')
}

export function Experience() {
  const techCount = experience.flatMap(e => e.techStack ?? []).filter((v, i, a) => a.indexOf(v) === i).length

  return (
    <section id="experience" className="w-full" style={{ padding: '6rem 0', background: 'var(--paper)' }}>
      <div className="container-main">

        <div className="chapter-wrap">
          <span className="chapter-label">Chapter 05</span>
          <h2 className="chapter-title">BATTLE<br /><span style={{ color: 'var(--red)' }}>HISTORY</span></h2>
          <span className="chapter-num">05</span>
        </div>

        {/* Stat panels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-12" style={{ background: 'var(--ink)', outline: '2px solid var(--ink)' }}>
          <div className="col-span-2 p-8 flex flex-col justify-between min-h-[140px]" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
            <span className="mono-label" style={{ color: 'rgba(242,237,228,0.4)' }}>Engagements</span>
            <div>
              <p className="font-brutalist leading-none" style={{ fontSize: '3.5rem', color: 'var(--paper)' }}>{experience.length}+</p>
              <p className="mono-label mt-1" style={{ color: 'rgba(242,237,228,0.4)' }}>internship &amp; freelance</p>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between min-h-[140px]" style={{ background: 'var(--paper)', color: 'var(--text)' }}>
            <span className="mono-label">Stack Depth</span>
            <div>
              <p className="font-brutalist leading-none" style={{ fontSize: '2.8rem' }}>{techCount}</p>
              <p className="mono-label mt-1">technologies</p>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between min-h-[140px]" style={{ background: 'var(--paper-dark)', color: 'var(--text)' }}>
            <span className="mono-label">Since</span>
            <div>
              <p className="font-brutalist leading-none" style={{ fontSize: '2.8rem', color: 'var(--red)' }}>
                {Math.min(...experience.map(e => parseInt(e.startDate)))}
              </p>
              <p className="mono-label mt-1">year started</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {experience.map(item => (
          <motion.div
            key={item.company}
            className="grid md:grid-cols-[180px_1fr] gap-6 lg:gap-12 py-10"
            style={{ borderBottom: 'var(--border-thin)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2 pt-1">
              <span className="font-mono text-sm block" style={{ color: 'var(--text-soft)' }}>
                {fmt(item.startDate)} — {fmt(item.endDate)}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 inline-block" style={{ border: 'var(--border-thin)', color: 'var(--text-muted)' }}>
                {item.type}
              </span>
            </div>

            <div>
              <h3 className="font-brutalist text-2xl uppercase" style={{ color: 'var(--text)' }}>{item.role}</h3>
              <span className="font-mono text-sm mt-1 block" style={{ color: 'var(--red)' }}>{item.company}</span>

              <ul className="mt-5 space-y-3">
                {item.description.map((pt, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="font-brutalist text-base flex-shrink-0" style={{ color: 'var(--red)' }}>▸</span>
                    <span className="font-mono leading-[1.7]" style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>{pt}</span>
                  </li>
                ))}
              </ul>

              {item.techStack && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {item.techStack.map(t => (
                    <span key={t} className="font-mono text-xs px-2 py-1" style={{ border: 'var(--border-thin)', color: 'var(--text-muted)' }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  )
}
