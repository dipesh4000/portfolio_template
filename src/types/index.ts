export type {
  Social,
  SkillCategory,
  Person,
  Project,
  Education,
  Experience,
} from '@/lib/schemas'

export interface CodolioProfile {
  username: string
  githubHeatmap: GithubContribution[]
  dsaStats: DSAStats
}

export interface GithubContribution {
  date: string
  count: number
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
  name: string
  solved: number
  rating?: number
  rank?: string
}
