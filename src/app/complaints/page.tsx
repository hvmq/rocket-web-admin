import type { Metadata } from 'next'
import { AdminComplaints } from '@/components/admin/AdminComplaints'
import type { Locale } from '@/i18n/admin-access'
import { complaintsT } from '@/i18n/admin-complaints'

type PageProps = {
  searchParams: Promise<{ lang?: string; case?: string; state?: string }>
}

const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${complaintsT(localeFrom((await searchParams).lang), 'Complaints & Disputes')} — Rocket`,
  }
}

export default async function ComplaintsPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminComplaints
      locale={localeFrom(params.lang)}
      initialCase={params.case}
      initialState={params.state}
    />
  )
}
