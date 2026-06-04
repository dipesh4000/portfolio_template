'use client'
import { useEffect, useState } from 'react'
import type { CodolioProfile } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useCodolio() {
  const [data, setData] = useState<CodolioProfile | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    setStatus('loading')
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    fetch('/api/codolio', { signal: controller.signal })
      .then(res => {
        clearTimeout(timeoutId)
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then(json => { setData(json); setStatus('success') })
      .catch(err => {
        clearTimeout(timeoutId)
        if (err instanceof Error && err.name === 'AbortError') {
          console.warn('Codolio API request timed out')
        } else {
          console.error('Failed to fetch Codolio data:', err)
        }
        setStatus('error')
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  return { data, status, isLoading: status === 'loading', isError: status === 'error' }
}
