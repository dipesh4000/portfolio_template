# 03 — Config & Data Architecture

All visible content comes from these files. You only need to edit these — never hunt through component files for personal data.

---

## 3.1 Zod Schemas — `src/lib/schemas.ts`

Define schemas first. Types are inferred from schemas.

```ts
import { z } from 'zod'

export const SocialSchema = z.object({
  platform: z.enum(['github', 'linkedin', 'twitter', 'email', 'website']),
  url: z.string().url(),
  label: z.string(),
})

export const SkillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
})

export const PersonSchema = z.object({
  name: z.string(),
  title: z.string(),           // e.g. "Full Stack Developer"
  tagline: z.string(),         // 1 punchy line for hero
  bio: z.array(z.string()),    // Array of paragraphs for About
  location: z.string(),
  available: z.boolean(),      // Show "available for work" badge?
  avatarUrl: z.string().optional(),
  skillCategories: z.array(SkillCategorySchema),
  socials: z.array(SocialSchema),
})

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  year: z.string(),            // e.g. "2024"
})

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startDate: z.string(),       // "YYYY-MM"
  endDate: z.string(),         // "YYYY-MM" or "present"
  grade: z.string().optional(),
  description: z.string().optional(),
})

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  type: z.enum(['full-time', 'part-time', 'internship', 'freelance', 'contract']),
  startDate: z.string(),
  endDate: z.string(),         // "YYYY-MM" or "present"
  description: z.array(z.string()), // bullet points
  techStack: z.array(z.string()).optional(),
})

// Inferred types
export type Social = z.infer<typeof SocialSchema>
export type SkillCategory = z.infer<typeof SkillCategorySchema>
export type Person = z.infer<typeof PersonSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Education = z.infer<typeof EducationSchema>
export type Experience = z.infer<typeof ExperienceSchema>
```

---

## 3.2 Main Config — `src/data/config.ts`

**Fill in your real data here.**

```ts
import { z } from 'zod'
import { PersonSchema } from '@/lib/schemas'

const raw = {
  name: 'Dipesh',
  title: 'Full Stack Developer',
  tagline: 'I build things that work.',
  bio: [
    'Second paragraph about what you do, technologies you use, and your approach.',
    'Third paragraph about interests, goals, or personality. Keep it human.',
  ],
  location: 'India',
  available: true,
  skillCategories: [
    {
      category: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'C++'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'Docker', 'Vercel', 'Linux'],
    },
  ],
  socials: [
    { platform: 'github', url: 'https://github.com/dipesh4000', label: 'GitHub' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/your-handle', label: 'LinkedIn' },
    { platform: 'email', url: 'mailto:your@email.com', label: 'Email' },
  ],
}

// Validate at module load — throws at build time if data is wrong
export const person = PersonSchema.parse(raw)
```

---

## 3.3 Projects — `src/data/projects.ts`

```ts
import { z } from 'zod'
import { ProjectSchema } from '@/lib/schemas'

const raw = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'One sentence that explains what this does and why it matters.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    repoUrl: 'https://github.com/dipesh4000/project-one',
    liveUrl: 'https://project-one.vercel.app',
    featured: true,
    year: '2024',
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description: 'One sentence description.',
    tags: ['React', 'Node.js', 'MongoDB'],
    repoUrl: 'https://github.com/dipesh4000/project-two',
    featured: true,
    year: '2024',
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description: 'One sentence description.',
    tags: ['Python', 'FastAPI'],
    repoUrl: 'https://github.com/dipesh4000/project-three',
    featured: false,
    year: '2023',
  },
]

export const projects = z.array(ProjectSchema).parse(raw)
export const featuredProjects = projects.filter(p => p.featured)
```

---

## 3.4 Education — `src/data/education.ts`

```ts
import { z } from 'zod'
import { EducationSchema } from '@/lib/schemas'

const raw = [
  {
    institution: 'Your University Name',
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    startDate: '2021-08',
    endDate: '2025-05',
    grade: '8.5 CGPA',
    description: 'Optional: relevant coursework, achievements, or clubs.',
  },
]

export const education = z.array(EducationSchema).parse(raw)
```

---

## 3.5 Experience — `src/data/experience.ts`

```ts
import { z } from 'zod'
import { ExperienceSchema } from '@/lib/schemas'

const raw = [
  {
    company: 'Company Name',
    role: 'Software Engineer Intern',
    type: 'internship',
    startDate: '2024-05',
    endDate: '2024-08',
    description: [
      'Built X that improved Y by Z%.',
      'Worked on the backend service for the payment module.',
      'Collaborated with a cross-functional team of 6.',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL'],
  },
]

export const experience = z.array(ExperienceSchema).parse(raw)
```

---

## 3.6 Socials — `src/data/socials.ts`

Socials are already in `config.ts` via the `person` object. This file is for any additional link config you need (e.g. resume PDF URL).

```ts
export const resumeUrl = '/resume.pdf' // place your resume in public/

export const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/dipesh4000' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
  { label: 'Email', href: 'mailto:your@email.com' },
]
```

---

## 3.7 Types — `src/types/index.ts`

Re-export all schema types here for clean imports:

```ts
export type {
  Social,
  SkillCategory,
  Person,
  Project,
  Education,
  Experience,
} from '@/lib/schemas'

// Codolio API response types
export interface CodolioProfile {
  username: string
  githubHeatmap: GithubContribution[]
  dsaStats: DSAStats
}

export interface GithubContribution {
  date: string      // "YYYY-MM-DD"
  count: number     // number of contributions
  level: 0 | 1 | 2 | 3 | 4
}

export interface DSAStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  platforms: PlatformStat[]
}

export interface PlatformStat {
  name: string         // "LeetCode", "Codeforces", etc.
  solved: number
  rating?: number
  rank?: string
}
```

---

## 3.8 Validation Checklist

Before moving to components, verify:

- [ ] `npm run build` passes with no TypeScript errors
- [ ] All Zod `.parse()` calls succeed (wrong data throws at startup, not silently)
- [ ] `person.name`, `projects[0].title`, `education[0].institution` log correctly
- [ ] All URLs in socials are valid (Zod checks this automatically)

---

Proceed to `04_api_routes.md`.
