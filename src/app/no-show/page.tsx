import type { Metadata } from 'next'
import { AdminNoShow } from '@/components/admin/AdminNoShow'
import type { Locale } from '@/i18n/admin-access'
import { noShowT } from '@/i18n/admin-no-show'

type PageProps = {
  searchParams: Promise<{ lang?: string; case?: string; state?: string }>
}
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${noShowT(localeFrom((await searchParams).lang), 'No-Show Resolution')} — Rocket`,
  }
}

export default async function NoShowPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminNoShow
      locale={localeFrom(params.lang)}
      initialCase={params.case}
      initialState={params.state}
    />
  )
}
