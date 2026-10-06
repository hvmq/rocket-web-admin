import type { Metadata } from 'next'
import { AdminBanners } from '@/components/admin/AdminBanners'
import type { Locale } from '@/i18n/admin-access'
import { bannersT } from '@/i18n/admin-banners'

type PageProps = {
  searchParams: Promise<{ lang?: string; mode?: string; banner?: string }>
}
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${bannersT(localeFrom((await searchParams).lang), 'Banner Management')} — Rocket`,
  }
}
export default async function BannersPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminBanners
      key={`${params.lang}-${params.mode}-${params.banner}`}
      locale={localeFrom(params.lang)}
      initialMode={params.mode}
      initialBanner={params.banner}
    />
  )
}
