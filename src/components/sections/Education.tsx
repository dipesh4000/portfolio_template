'use client'
import { motion } from 'framer-motion'
import { education } from '@/data/education'
import { format } from 'date-fns'
import { person } from '@/data/config'

function fmt(d: string) {
  if (d === 'present') return 'Present'
  const [y, m] = d.split('-')
  return format(new Date(+y, +m - 1, 1), 'MMM yyyy')
}

const goals = [
  'Build production systems at scale',
  'Master distributed systems & low-latency design',
  'Contribute to open-source infrastructure',
  'Ship products that reach real users',
]

export function Education() {
  return (
    <section id="education" className="w-full" style={{ padding: '6rem 0', background: 'var(--paper-dark)' }}>
      <div className="container-main">

        <div className="chapter-wrap">
          <span className="chapter-label">Chapter 06</span>
          <h2 className="chapter-title">THE<br /><span style={{ color: 'var(--red)' }}>BACKGROUND</span></h2>
          <span className="chapter-num">06</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h3 className="font-brutalist text-xl uppercase mb-6 pb-3" style={{ color: 'var(--text)', borderBottom: '2px solid var(--ink)' }}>Education</h3>
            <div className="space-y-7">
              {education.map(item => (
                <div key={item.institution} className="pl-4" style={{ borderLeft: '3px solid var(--ink)' }}>
                  <span className="mono-label block mb-1">{fmt(item.startDate)} — {fmt(item.endDate)}</span>
                  <p className="font-brutalist text-base" style={{ color: 'var(--text)' }}>{item.degree}</p>
                  <p className="font-mono text-sm mt-0.5" style={{ color: 'var(--text-soft)' }}>{item.field}</p>
                  <p className="font-mono text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.institution}</p>
                  {item.grade && (
                    <span className="font-mono text-xs mt-2 inline-block px-2 py-0.5" style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>{item.grade}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <h3 className="font-brutalist text-xl uppercase mb-6 pb-3" style={{ color: 'var(--text)', borderBottom: '2px solid var(--ink)' }}>Goals</h3>
            <div className="ink-panel-dark p-6 space-y-4">
              {goals.map((g, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="font-brutalist text-sm flex-shrink-0 mt-0.5" style={{ color: 'var(--red)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-mono leading-[1.7]" style={{ fontSize: '0.85rem', color: 'rgba(242,237,228,0.7)' }}>{g}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <h3 className="font-brutalist text-xl uppercase mb-6 pb-3" style={{ color: 'var(--text)', borderBottom: '2px solid var(--ink)' }}>Facts</h3>
            <div className="ink-panel p-6 space-y-5" style={{ background: 'var(--paper)' }}>
              <p className="font-mono leading-[1.8]" style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>{person.bio[1]}</p>
              <div className="space-y-2 pt-4" style={{ borderTop: 'var(--border-thin)' }}>
                {person.skillCategories.map(cat => (
                  <div key={cat.category} className="flex justify-between items-center py-1">
                    <span className="mono-label">{cat.category}</span>
                    <span className="font-brutalist text-lg" style={{ color: 'var(--red)' }}>{cat.skills.length}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
