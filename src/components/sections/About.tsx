'use client'
import { motion } from 'framer-motion'
import { person } from '@/data/config'

export function About() {
  return (
    <section id="about" className="w-full" style={{ padding: '6rem 0', background: 'var(--paper-alt)' }}>
      <div className="container-main">

        <div className="chapter-wrap">
          <span className="chapter-label">Chapter 02</span>
          <h2 className="chapter-title">
            WHO<br />
            <span style={{ color: 'var(--red)' }}>AM I</span>
          </h2>
          <span className="chapter-num">02</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Bio */}
          <motion.div className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>

            <div className="flex gap-5">
              {/* Red vertical ink drip */}
              <div style={{ width: '3px', background: 'var(--red)', opacity: 0.6, flexShrink: 0 }} />
              <div className="space-y-5">
                {person.bio.map((para, i) => (
                  <p key={i} className="font-mono leading-[1.9]"
                    style={{ fontSize: '0.9rem', color: 'var(--text-soft)' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="font-mono text-xs px-3 py-1.5 uppercase tracking-widest"
                style={{ border: '1px solid rgba(10,10,10,0.2)', color: 'var(--text-muted)' }}>
                📍 {person.location}
              </span>
              <span className="font-mono text-xs px-3 py-1.5 uppercase tracking-widest"
                style={{ border: '1px solid var(--red)', color: 'var(--red)', background: 'var(--red-dim)' }}>
                ● Open to Work
              </span>
              <span className="font-mono text-xs px-3 py-1.5 uppercase tracking-widest"
                style={{ border: '1px solid rgba(10,10,10,0.2)', color: 'var(--text-muted)' }}>
                B.Tech CSE 2028
              </span>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-3 pt-2">
              {person.socials.map(s => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs px-4 py-2 uppercase tracking-widest"
                  style={{ border: '2px solid var(--ink)', color: 'var(--ink)', background: 'transparent' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--ink)'; el.style.color = 'var(--paper)' }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--ink)' }}>
                  {s.label} ↗
                </a>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div className="lg:col-span-2 space-y-7"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>

            <div className="ink-panel-action p-6">
              <span className="mono-label block mb-4" style={{ color: 'var(--red)' }}>Tech Arsenal</span>
              {person.skillCategories.map(cat => (
                <div key={cat.category} className="mb-5 last:mb-0">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-1.5 h-1.5" style={{ background: 'var(--red)' }} />
                    <span className="font-brutalist text-xs uppercase tracking-widest"
                      style={{ color: 'var(--text-muted)' }}>
                      {cat.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
