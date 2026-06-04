'use client'
import dynamic from 'next/dynamic'

export const GitHubActivity = dynamic(
  () => import('@/components/sections/GitHubActivity').then(m => m.GitHubActivity),
  {
    loading: () => <div className="h-64 bg-[#f5f5f5] animate-pulse" />,
    ssr: false,
  }
)

export const DSAActivity = dynamic(
  () => import('@/components/sections/DSAActivity').then(m => m.DSAActivity),
  {
    loading: () => <div className="h-64 bg-[#0a0a0a] animate-pulse" />,
    ssr: false,
  }
)
