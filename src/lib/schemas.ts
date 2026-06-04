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
  title: z.string(),
  tagline: z.string(),
  bio: z.array(z.string()),
  location: z.string(),
  available: z.boolean(),
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
  year: z.string(),
})

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  grade: z.string().optional(),
  description: z.string().optional(),
})

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  type: z.enum(['full-time', 'part-time', 'internship', 'freelance', 'contract']),
  startDate: z.string(),
  endDate: z.string(),
  description: z.array(z.string()),
  techStack: z.array(z.string()).optional(),
})

export type Social = z.infer<typeof SocialSchema>
export type SkillCategory = z.infer<typeof SkillCategorySchema>
export type Person = z.infer<typeof PersonSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Education = z.infer<typeof EducationSchema>
export type Experience = z.infer<typeof ExperienceSchema>
