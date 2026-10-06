import type { Metadata } from 'next'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import type { Locale } from '@/i18n/admin-access'
import { dashboardT } from '@/i18n/admin-dashboard'

type PageProps = { searchParams: Promise<{ lang?: string; state?: string }> }

function getLocale(lang?: string): Locale {
  return lang === 'vi' || lang === 'ko' ? lang : 'en'
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const locale = getLocale((await searchParams).lang)
  return { title: `${dashboardT(locale, 'Dashboard & Operations')} — Rocket` }
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams
  const initialMode =
    params.state === 'empty' || params.state === 'error'
      ? params.state
      : 'ready'
  return (
    <AdminDashboard locale={getLocale(params.lang)} initialMode={initialMode} />
  )
}
