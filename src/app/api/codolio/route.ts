import { NextResponse } from 'next/server'
import { fetchCodolioProfile } from '@/lib/codolio'

export const revalidate = 3600

export async function GET() {
  const profile = await fetchCodolioProfile()
  if (!profile) {
    return NextResponse.json({ error: 'Failed to fetch Codolio data' }, { status: 502 })
  }
  return NextResponse.json(profile)
}
