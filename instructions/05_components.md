# 05 — Components

Build in the order listed. Each section depends on the ones above it.

---

## 5.1 Navbar — `src/components/layout/Navbar.tsx`

**Behaviour:**
- Fixed top, `z-50`
- Transparent on hero, opaque `bg-bg-primary/90 backdrop-blur` after scroll
- Scroll-spy: highlights the active section link
- On mobile: collapse to hamburger → slide-down menu

**Structure:**
```
<nav fixed>
  <div container-main>
    <Logo />          ← your initials, styled with font-display + accent color
    <NavLinks />      ← horizontal on desktop, hidden on mobile
    <HamburgerBtn />  ← visible only on mobile
  </div>
  <MobileMenu />      ← conditional, slides in from top
</nav>
```

**Nav links (in order):**
`About` | `Projects` | `Experience` | `Education` | `GitHub` | `DSA`

Each link is an `<a href="#section-id">` — pure anchor scroll, no router.

**Scroll-spy logic:**
```ts
// Use IntersectionObserver on each section element.
// When a section is >40% visible, mark its nav link as active.
// Active link style: color: var(--accent), no underline, no border.
```

**Logo:**
```tsx
<span style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: '1.4rem' }}>
  D.
</span>
```

**Key Framer Motion usage:**
- `motion.nav` with `animate={{ backdropFilter }}` on scroll
- Mobile menu: `AnimatePresence` + `motion.div` with `y: -20 → 0` entrance

---

## 5.2 Hero — `src/components/sections/Hero.tsx`

**This is the most important section. Take the most time here.**

**Layout (full viewport height):**
```
<section height: 100dvh, position: relative, overflow: hidden>
  <ReiatsuParticles />          ← absolute, behind everything
  
  <div container-main, flex column, justify center>
    
    <SectionLabel>              ← "SOFTWARE DEVELOPER"
    
    <GlitchText as="h1">        ← your name, heading-xl class
      Dipesh
    </GlitchText>
    
    <h2 heading-lg>             ← tagline from config
      I build things that work.
    </h2>
    
    <p text-secondary>          ← 1 sentence about what you do
    
    <div flex gap>
      <a href="#projects">      ← primary CTA, accent border
        View Work
      </a>
      <a href="#contact">       ← secondary CTA, ghost
        Get in Touch
      </a>
    </div>
    
  </div>
  
  <ScrollIndicator />           ← bottom center, animated arrow
  
  <!-- Diagonal slash line — purely decorative SVG -->
  <SlashDecoration />
</section>
```

**SlashDecoration (inline SVG, not a component):**
```tsx
<svg
  className="absolute right-0 top-0 h-full w-auto opacity-[0.03] pointer-events-none"
  viewBox="0 0 200 800"
  fill="none"
>
  <line x1="180" y1="0" x2="20" y2="800" stroke="white" strokeWidth="1"/>
  <line x1="160" y1="0" x2="0" y2="800" stroke="white" strokeWidth="0.5"/>
</svg>
```

**Entrance animation (Framer Motion, staggered):**
```
SectionLabel:  delay 0.1s, fadeUp
h1 (name):     delay 0.2s, fadeUp + slight scale from 0.97
h2 (tagline):  delay 0.35s, fadeUp
p (subtitle):  delay 0.45s, fadeUp
CTA buttons:   delay 0.55s, fadeUp
```
All use `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}`.

**Available badge (conditional on `person.available`):**
```tsx
{person.available && (
  <span className="inline-flex items-center gap-2 text-xs font-mono text-accent border border-accent/30 px-3 py-1 rounded-sm">
    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
    Available for work
  </span>
)}
```

---

## 5.3 About — `src/components/sections/About.tsx`

**Includes:** bio paragraphs + skill categories grid

**Layout:**
```
<section id="about">
  <div container-main>
    <SectionLabel>About</SectionLabel>
    <SwordDivider />
    
    <div grid 2-col on desktop, 1-col on mobile>
      
      <!-- Left col: Bio -->
      <div>
        <h2 heading-lg>Behind the blade.</h2>
        {person.bio.map(para => <p>{para}</p>)}
      </div>
      
      <!-- Right col: Skills -->
      <div>
        {person.skillCategories.map(cat => (
          <div key={cat.category}>
            <span mono-sm>{cat.category}</span>
            <div flex-wrap gap-2>
              {cat.skills.map(skill => (
                <SkillPill key={skill}>{skill}</SkillPill>
              ))}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  </div>
</section>
```

**SkillPill (inline, not a separate component):**
```tsx
<span className="text-xs font-mono px-2 py-1 border border-white/10 text-text-secondary 
                  hover:border-accent/40 hover:text-accent transition-colors duration-200">
  {skill}
</span>
```

**Section entrance:** `whileInView` on the whole grid, `once: true`, stagger children.

---

## 5.4 Projects — `src/components/sections/Projects.tsx`

**Layout:**
```
<section id="projects">
  <SectionLabel>Projects</SectionLabel>
  <SwordDivider />
  <h2>What I've built.</h2>
  
  <!-- Tag filter bar -->
  <FilterBar tags={allUniqueTags} active={activeTag} onChange={setActiveTag} />
  
  <!-- Project grid -->
  <AnimatePresence mode="wait">
    <motion.div key={activeTag} layout grid 3-col desktop / 2-col tablet / 1-col mobile>
      {filteredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
    </motion.div>
  </AnimatePresence>
</section>
```

**ProjectCard:**
```
<motion.article layout className="card p-6 flex flex-col gap-4">
  
  <div flex justify-between items-start>
    <span mono-sm>{project.year}</span>
    <div flex gap-2>
      {project.repoUrl && <a href={repo}><GitHubIcon /></a>}
      {project.liveUrl && <a href={live}><ExternalLinkIcon /></a>}
    </div>
  </div>
  
  <h3 heading-md>{project.title}</h3>
  <p text-secondary text-sm>{project.description}</p>
  
  <div flex-wrap gap-2 mt-auto>
    {project.tags.map(tag => <TagPill>{tag}</TagPill>)}
  </div>
  
</motion.article>
```

**Filter logic:**
```ts
const [activeTag, setActiveTag] = useState<string | null>(null)
const filtered = activeTag
  ? projects.filter(p => p.tags.includes(activeTag))
  : projects
```

**FilterBar pill style:** same as SkillPill but `cursor-pointer`. Active state: `border-accent text-accent`.

---

## 5.5 Experience — `src/components/sections/Experience.tsx`

**Layout: vertical timeline with SwordDivider between items.**

```
<section id="experience">
  <SectionLabel>Experience</SectionLabel>
  <SwordDivider />
  <h2>Where I've worked.</h2>
  
  <div className="relative flex flex-col gap-0">
    
    {experience.map((item, i) => (
      <>
        <TimelineItem key={item.company} item={item} index={i} />
        {i < experience.length - 1 && <SwordDivider delay={0.1} />}
      </>
    ))}
    
  </div>
</section>
```

**TimelineItem:**
```
<motion.div whileInView fadeUp className="grid md:grid-cols-[200px_1fr] gap-6 py-10">
  
  <!-- Left: date range -->
  <div>
    <span mono-sm>{formatDate(startDate)}</span>
    <span mono-sm text-muted> — </span>
    <span mono-sm>{endDate === 'present' ? 'Present' : formatDate(endDate)}</span>
    <span mono-sm block mt-1 text-accent/70>{item.type}</span>
  </div>
  
  <!-- Right: content -->
  <div>
    <h3 heading-md>{item.role}</h3>
    <span text-secondary>{item.company}</span>
    <ul mt-4 space-y-2>
      {item.description.map(point => (
        <li className="text-text-secondary text-sm flex gap-3">
          <span text-accent>—</span>
          {point}
        </li>
      ))}
    </ul>
    {item.techStack && (
      <div flex-wrap gap-2 mt-4>
        {item.techStack.map(t => <TagPill>{t}</TagPill>)}
      </div>
    )}
  </div>
  
</motion.div>
```

---

## 5.6 Education — `src/components/sections/Education.tsx`

Same structure as Experience. Reuse `TimelineItem` or duplicate with minor field changes:
- `role` → `degree + field`
- `company` → `institution`
- `description` → optional single paragraph
- Replace bullet list with `grade` if present

---

## 5.7 GitHub Activity — `src/components/sections/GitHubActivity.tsx`

**Pull data via `useCodolio()` hook.**

**Layout:**
```
<section id="github">
  <SectionLabel>GitHub Activity</SectionLabel>
  <SwordDivider />
  <h2>Spiritual energy output.</h2>
  
  {isLoading && <HeatmapSkeleton />}
  {isError && <ErrorState />}
  {data && <ContributionHeatmap contributions={data.githubHeatmap} />}
</section>
```

**ContributionHeatmap:**
The heatmap must render 52 columns × 7 rows (1 year of weeks × days).

```tsx
// Color scale — Bleach reiatsu palette
const LEVEL_COLORS = {
  0: '#1A1A1A',
  1: '#43310A',
  2: '#7A5A10',
  3: '#C48A14',
  4: '#F5A623',
} as const

function ContributionHeatmap({ contributions }: { contributions: GithubContribution[] }) {
  // Group contributions into weeks (arrays of 7)
  const weeks = groupIntoWeeks(contributions) // implement this helper

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px] min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <Tooltip key={di} content={`${day.count} contributions on ${day.date}`}>
                <div
                  className="w-[10px] h-[10px] rounded-[2px] transition-opacity duration-200 hover:opacity-80"
                  style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                />
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
      
      <!-- Legend -->
      <div className="flex items-center gap-2 mt-4 justify-end">
        <span className="mono-sm">Less</span>
        {[0,1,2,3,4].map(l => (
          <div key={l} className="w-[10px] h-[10px] rounded-[2px]"
               style={{ backgroundColor: LEVEL_COLORS[l as 0|1|2|3|4] }} />
        ))}
        <span className="mono-sm">More</span>
      </div>
    </div>
  )
}

// Helper: group flat array into weeks
function groupIntoWeeks(contributions: GithubContribution[]): GithubContribution[][] {
  const weeks: GithubContribution[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }
  return weeks
}
```

**HeatmapSkeleton:** 52 × 7 grid of `bg-bg-secondary animate-pulse` squares — same dimensions as the real heatmap.

**Month labels:** Add a row of month abbreviations above the grid. Calculate which column each month starts at based on the date array.

---

## 5.8 DSA Activity — `src/components/sections/DSAActivity.tsx`

**Layout:**
```
<section id="dsa">
  <SectionLabel>DSA Activity</SectionLabel>
  <SwordDivider />
  <h2>Problem-solving pressure.</h2>
  
  {data && (
    <div grid 2-col desktop / 1-col mobile gap-8>
      <TotalSolvedDisplay total={data.dsaStats.totalSolved} />
      <DifficultyMeters stats={data.dsaStats} />
    </div>
  )}
  
  {data?.dsaStats.platforms.map(p => (
    <PlatformCard key={p.name} platform={p} />
  ))}
</section>
```

**TotalSolvedDisplay — the "spiritual pressure meter":**
```tsx
// Large circular arc showing total solved vs estimated ceiling (e.g. 1000)
// Use SVG arc, not a standard progress bar

function TotalSolvedDisplay({ total }: { total: number }) {
  const CEILING = 1000
  const percentage = Math.min(total / CEILING, 1)
  const circumference = 2 * Math.PI * 80 // radius 80
  const strokeDashoffset = circumference * (1 - percentage)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[200px] h-[200px]">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle cx="100" cy="100" r="80"
            fill="none" stroke="#1A1A1A" strokeWidth="4" />
          {/* Progress arc */}
          <motion.circle cx="100" cy="100" r="80"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="heading-lg text-accent">{total}</span>
          <span className="mono-sm">problems solved</span>
        </div>
      </div>
    </div>
  )
}
```

**DifficultyMeters — sword-slash style bars:**
```tsx
// NOT standard <progress>. Custom animated bars with diagonal cut ends.

function DifficultyMeters({ stats }: { stats: DSAStats }) {
  const items = [
    { label: 'Easy', count: stats.easySolved, color: '#4ADE80', max: 600 },
    { label: 'Medium', count: stats.mediumSolved, color: '#FACC15', max: 350 },
    { label: 'Hard', count: stats.hardSolved, color: '#F87171', max: 150 },
  ]
  
  return (
    <div className="flex flex-col gap-6">
      {items.map(item => (
        <div key={item.label} className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="mono-sm text-text-secondary">{item.label}</span>
            <span className="mono-sm text-accent">{item.count}</span>
          </div>
          <!-- Bar with diagonal right end using clip-path -->
          <div className="relative h-[6px] bg-[#1A1A1A] w-full"
               style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{
                backgroundColor: item.color,
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)',
                opacity: 0.85
              }}
              initial={{ width: '0%' }}
              whileInView={{ width: `${(item.count / item.max) * 100}%` }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## 5.9 Footer — `src/components/layout/Footer.tsx`

Minimal. No large section padding.

```
<footer className="border-t border-border py-12">
  <div container-main flex justify-between items-center flex-wrap gap-4>
    
    <span mono-sm>
      © {currentYear} {person.name}. Built with Next.js.
    </span>
    
    <div flex gap-6>
      {footerLinks.map(link => (
        <a href={link.href} mono-sm hover:text-accent transition-colors>
          {link.label}
        </a>
      ))}
    </div>
    
  </div>
</footer>
```

---

## 5.10 Component Checklist

After building each component, verify:

- [ ] `"use client"` added on any component that uses `useState`, `useEffect`, or Framer Motion
- [ ] All data comes from config/types — no hardcoded strings
- [ ] `whileInView` has `viewport={{ once: true }}` — animations don't replay on scroll up
- [ ] Skeleton/loading states exist for `GitHubActivity` and `DSAActivity`
- [ ] All `<a>` tags to external URLs have `target="_blank" rel="noopener noreferrer"`
- [ ] Mobile layout tested at 375px width

---

Proceed to `06_page_assembly.md`.
