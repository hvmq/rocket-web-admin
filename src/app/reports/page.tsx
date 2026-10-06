import type { Metadata } from 'next'
import { AdminReports } from '@/components/admin/AdminReports'
import type { Locale } from '@/i18n/admin-access'
import { reportsT } from '@/i18n/admin-reports'

type PageProps = {
  searchParams: Promise<{ lang?: string; case?: string; state?: string }>
}
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${reportsT(localeFrom((await searchParams).lang), 'Reports Inbox & Case Detail')} — Rocket`,
  }
}

export default async function ReportsPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminReports
      locale={localeFrom(params.lang)}
      initialCase={params.case}
      initialState={params.state}
    />
  )
}
