import type { Metadata } from 'next'
import { AdminRegions } from '@/components/admin/AdminRegions'
import type { Locale } from '@/i18n/admin-access'
import { regionsT } from '@/i18n/admin-regions'

type PageProps = {
  searchParams: Promise<{ lang?: string; state?: string; region?: string }>
}

const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${regionsT(localeFrom((await searchParams).lang), 'Region Management')} — Rocket`,
  }
}

export default async function RegionsPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminRegions
      locale={localeFrom(params.lang)}
      initialMode={params.state}
      initialRegion={params.region}
    />
  )
}
