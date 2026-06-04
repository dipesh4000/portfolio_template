# 04 — API Routes

## 4.1 Understanding the Codolio API

Codolio exposes a public profile API. For username `dipesh4000`, the base URL is:

```
https://codolio.com/api/profile/dipesh4000
```

Before building the route, fetch this URL manually in your browser or with curl and inspect the response shape:

```bash
curl https://codolio.com/api/profile/dipesh4000
```

Map the actual response fields to the `CodolioProfile` type you defined in `src/types/index.ts`. The field names below are **approximate** — verify against the real response.

---

## 4.2 Codolio Data Helper — `src/lib/codolio.ts`

This file handles raw fetching and response normalization. Keep all Codolio-specific logic here so components never import fetch directly.

```ts
import type { GithubContribution, DSAStats, CodolioProfile } from '@/types'

const BASE_URL = 'https://codolio.com/api/profile'
const USERNAME = process.env.CODOLIO_USERNAME ?? 'dipesh4000'

// ─── Raw fetch (server-side only) ────────────────────────────────────────────

export async function fetchCodolioProfile(): Promise<CodolioProfile | null> {
  try {
    const res = await fetch(`${BASE_URL}/${USERNAME}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      console.error(`Codolio API error: ${res.status}`)
      return null
    }

    const data = await res.json()
    return normalizeCodolioResponse(data)
  } catch (err) {
    console.error('Failed to fetch Codolio profile:', err)
    return null
  }
}

// ─── Normalize raw API response ───────────────────────────────────────────────
// IMPORTANT: Inspect the actual API response and update these field paths.
// The structure below is a best guess — verify against real data.

function normalizeCodolioResponse(raw: Record<string, unknown>): CodolioProfile {
  // After inspecting the real API response, update this function.
  // Common patterns: raw.data, raw.profile, raw.user, etc.

  const heatmap = extractGithubHeatmap(raw)
  const dsaStats = extractDSAStats(raw)

  return {
    username: USERNAME,
    githubHeatmap: heatmap,
    dsaStats,
  }
}

function extractGithubHeatmap(raw: Record<string, unknown>): GithubContribution[] {
  // TODO: Update the path after inspecting real API response.
  // Expected shape: array of { date: "YYYY-MM-DD", count: number }
  //
  // Example paths to try:
  //   raw.githubStats?.contributions
  //   raw.data?.github?.heatmap
  //   raw.contributions
  //
  // The level (0-4) is derived from count using the thresholds below.

  const contributions = (raw as any)?.githubStats?.contributions ?? []

  if (!Array.isArray(contributions)) return []

  const counts = contributions.map((c: any) => c.count as number)
  const max = Math.max(...counts, 1)

  return contributions.map((c: any) => ({
    date: c.date,
    count: c.count ?? 0,
    level: getContributionLevel(c.count ?? 0, max),
  }))
}

function getContributionLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  const ratio = count / max
  if (ratio < 0.25) return 1
  if (ratio < 0.5) return 2
  if (ratio < 0.75) return 3
  return 4
}

function extractDSAStats(raw: Record<string, unknown>): DSAStats {
  // TODO: Update the path after inspecting real API response.
  // Common paths: raw.leetcode, raw.dsaStats, raw.codingStats

  const lc = (raw as any)?.leetcode ?? {}
  const cf = (raw as any)?.codeforces ?? {}

  return {
    totalSolved: lc.totalSolved ?? 0,
    easySolved: lc.easySolved ?? 0,
    mediumSolved: lc.mediumSolved ?? 0,
    hardSolved: lc.hardSolved ?? 0,
    platforms: [
      {
        name: 'LeetCode',
        solved: lc.totalSolved ?? 0,
        rating: lc.rating,
        rank: lc.ranking ? `#${lc.ranking}` : undefined,
      },
      cf.rating != null && {
        name: 'Codeforces',
        solved: cf.solved ?? 0,
        rating: cf.rating,
        rank: cf.rank,
      },
    ].filter(Boolean) as any[],
  }
}
```

---

## 4.3 API Route — `src/app/api/codolio/route.ts`

This is the endpoint your client components call. It proxies the Codolio API server-side, keeping your data-fetching logic off the client and allowing caching.

```ts
import { NextResponse } from 'next/server'
import { fetchCodolioProfile } from '@/lib/codolio'

export const revalidate = 3600 // ISR: re-fetch every 1 hour

export async function GET() {
  const profile = await fetchCodolioProfile()

  if (!profile) {
    return NextResponse.json(
      { error: 'Failed to fetch Codolio data' },
      { status: 502 }
    )
  }

  return NextResponse.json(profile)
}
```

---

## 4.4 Client-Side Hook — for use in components

Create `src/lib/hooks/useCodolio.ts`:

```ts
'use client'
import { useEffect, useState } from 'react'
import type { CodolioProfile } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useCodolio() {
  const [data, setData] = useState<CodolioProfile | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    setStatus('loading')
    fetch('/api/codolio')
      .then(res => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then(json => {
        setData(json)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  return { data, status, isLoading: status === 'loading', isError: status === 'error' }
}
```

Also create `src/lib/hooks/` directory:
```bash
mkdir -p src/lib/hooks
touch src/lib/hooks/useCodolio.ts
```

---

## 4.5 Testing the API Route

After setting up:

1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000/api/codolio`
3. Inspect the JSON response in your browser
4. If you see `{ error: "Failed to fetch Codolio data" }`:
   - Check `CODOLIO_USERNAME` is set in `.env.local`
   - Run the curl command from §4.1 to verify the API is reachable
   - Check the console for the actual error message
5. If you see data but fields are `0` or `[]`:
   - The normalization paths in `codolio.ts` are wrong
   - Log `raw` in `normalizeCodolioResponse` and find the correct field paths
   - Update `extractGithubHeatmap` and `extractDSAStats` accordingly

---

## 4.6 Fallback Data (for development without internet)

Create `src/lib/codolio-mock.ts` for use when the real API is unavailable:

```ts
import type { CodolioProfile } from '@/types'

export const mockProfile: CodolioProfile = {
  username: 'dipesh4000',
  githubHeatmap: Array.from({ length: 365 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (364 - i))
    const count = Math.random() < 0.4 ? 0 : Math.floor(Math.random() * 12)
    return {
      date: date.toISOString().split('T')[0],
      count,
      level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4,
    }
  }),
  dsaStats: {
    totalSolved: 347,
    easySolved: 145,
    mediumSolved: 168,
    hardSolved: 34,
    platforms: [
      { name: 'LeetCode', solved: 347, rating: 1680, rank: '#45231' },
      { name: 'Codeforces', solved: 112, rating: 1420, rank: 'Specialist' },
    ],
  },
}
```

In `route.ts`, you can temporarily swap `fetchCodolioProfile()` with `mockProfile` during development if the API is slow.

---

Proceed to `05_components.md`.
