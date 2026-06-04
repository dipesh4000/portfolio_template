'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/data/projects'
import type { Project } from '@/types'

const allTags = Array.from(new Set(projects.flatMap(p => p.tags)))

function Card({ project, index }: { project: Project; index: number }) {
  const dark = index % 4 === 0
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="p-7 flex flex-col gap-4"
      style={{
        border: '2px solid var(--ink)',
        background: dark ? 'var(--ink)' : 'var(--paper)',
        color: dark ? 'var(--paper)' : 'var(--text)',
        borderLeft: dark ? `5px solid var(--red)` : `5px solid var(--ink)`,
      }}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs" style={{ color: dark ? 'rgba(242,237,228,0.4)' : 'var(--text-muted)' }}>
          {project.year}
        </span>
        <div className="flex gap-3">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              className="opacity-40 hover:opacity-80 transition-opacity"
              style={{ color: 'inherit' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="opacity-40 hover:opacity-80 transition-opacity"
              style={{ color: 'inherit' }}>
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-brutalist text-xl leading-tight">{project.title}</h3>

      <p className="font-mono leading-[1.8] flex-1" style={{ fontSize: '0.82rem', color: dark ? 'rgba(242,237,228,0.65)' : 'var(--text-soft)' }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-3" style={{ borderTop: `1px solid ${dark ? 'rgba(242,237,228,0.15)' : 'rgba(13,13,13,0.15)'}` }}>
        {project.tags.map(t => (
          <span key={t} className="font-mono text-xs px-2 py-0.5"
            style={{ border: `1px solid ${dark ? 'rgba(242,237,228,0.2)' : 'rgba(13,13,13,0.2)'}`, color: dark ? 'rgba(242,237,228,0.5)' : 'var(--text-muted)' }}>
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [tag, setTag] = useState<string | null>(null)
  const filtered = tag ? projects.filter(p => p.tags.includes(tag)) : projects

  return (
    <section id="projects" className="w-full" style={{ padding: '6rem 0', background: 'var(--paper-dark)' }}>
      <div className="container-main">

        <div className="chapter-wrap">
          <span className="chapter-label">Chapter 04</span>
          <h2 className="chapter-title">COMBAT<br /><span style={{ color: 'var(--red)' }}>RECORD</span></h2>
          <span className="chapter-num">04</span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[null, ...allTags].map(t => (
            <button
              key={t ?? 'all'}
              onClick={() => setTag(t === tag ? null : t)}
              className="font-mono text-xs px-3 py-1.5 uppercase tracking-widest transition-all"
              style={{
                border: '1px solid var(--ink)',
                background: tag === t ? 'var(--ink)' : 'transparent',
                color: tag === t ? 'var(--paper)' : 'var(--text-muted)',
              }}
            >
              {t ?? 'All'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tag ?? 'all'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'var(--ink)', outline: '2px solid var(--ink)' }}
          >
            {filtered.map((p, i) => <Card key={p.id} project={p} index={i} />)}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
