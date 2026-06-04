import type { GithubContribution, DSAStats, CodolioProfile } from '@/types'

const API_URL = `https://api.codolio.com/profile?userKey=${process.env.CODOLIO_USERNAME ?? 'dipesh4000'}`
const FETCH_TIMEOUT = 5000 // 5 second timeout

export async function fetchCodolioProfile(): Promise<CodolioProfile | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

    const res = await fetch(API_URL, { 
      signal: controller.signal,
      next: { revalidate: 3600 }
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      console.error(`Codolio API error: ${res.status}`)
      return null
    }
    const json = await res.json()
    return normalizeCodolioResponse(json.data)
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('Codolio API request timed out after 5s')
    } else {
      console.error('Failed to fetch Codolio profile:', err)
    }
    return null
  }
}

function normalizeCodolioResponse(data: Record<string, unknown>): CodolioProfile {
  const platforms: Record<string, unknown>[] =
    ((data?.platformProfiles as Record<string, unknown>)?.platformProfiles as Record<string, unknown>[]) ?? []

  const lc = platforms.find((p) => p.platform === 'leetcode') ?? {}
  const gfg = platforms.find((p) => p.platform === 'geeksforgeeks') ?? {}
  const cc = platforms.find((p) => p.platform === 'codechef') ?? {}

  return {
    username: (data?.profileName as string) ?? 'dipesh4000',
    githubHeatmap: extractGithubHeatmap(lc),
    dsaStats: extractDSAStats(lc, gfg, cc),
  }
}

function extractGithubHeatmap(lc: Record<string, unknown>): GithubContribution[] {
  const calendar =
    ((lc?.dailyActivityStatsResponse as Record<string, unknown>)
      ?.submissionCalendar as Record<string, number>) ?? {}

  const entries = Object.entries(calendar).map(([ts, count]) => ({
    date: new Date(Number(ts) * 1000).toISOString().split('T')[0],
    count,
  }))

  if (entries.length === 0) return []

  const max = Math.max(...entries.map((e) => e.count), 1)

  return entries.map((e) => ({
    ...e,
    level: getLevel(e.count, max),
  }))
}

function getLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  const r = count / max
  if (r < 0.25) return 1
  if (r < 0.5) return 2
  if (r < 0.75) return 3
  return 4
}

function extractDSAStats(
  lc: Record<string, unknown>,
  gfg: Record<string, unknown>,
  cc: Record<string, unknown>,
): DSAStats {
  const lcStats = (lc?.totalQuestionStats as Record<string, number>) ?? {}
  const gfgStats = (gfg?.totalQuestionStats as Record<string, number>) ?? {}
  const ccStats = (cc?.totalQuestionStats as Record<string, number>) ?? {}
  const ccUserStats = (cc?.userStats as Record<string, unknown>) ?? {}

  const lcTotal = lcStats.totalQuestionCounts ?? 0
  const gfgTotal = gfgStats.totalQuestionCounts ?? 0
  const ccTotal = ccStats.totalQuestionCounts ?? 0

  return {
    totalSolved: lcTotal + gfgTotal + ccTotal,
    easySolved: (lcStats.easyQuestionCounts ?? 0) + (gfgStats.easyQuestionCounts ?? 0),
    mediumSolved: (lcStats.mediumQuestionCounts ?? 0) + (gfgStats.mediumQuestionCounts ?? 0),
    hardSolved: (lcStats.hardQuestionCounts ?? 0) + (gfgStats.hardQuestionCounts ?? 0),
    platforms: [
      { name: 'LeetCode', solved: lcTotal, rating: (lc?.userStats as Record<string, number>)?.maxRating },
      { name: 'GeeksForGeeks', solved: gfgTotal },
      { name: 'CodeChef', solved: ccTotal, rating: (ccUserStats?.currentRating as number) ?? undefined },
    ],
  }
}
