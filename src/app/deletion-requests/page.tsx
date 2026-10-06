import type { Metadata } from 'next'
import { AdminDeletionRequests } from '@/components/admin/AdminDeletionRequests'
import type { Locale } from '@/i18n/admin-access'
import { deletionT } from '@/i18n/admin-deletion-requests'

type PageProps = {
  searchParams: Promise<{
    lang?: string
    mode?: string
    state?: string
    request?: string
  }>
}
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${deletionT(localeFrom((await searchParams).lang), 'Account Deletion Requests')} — Rocket`,
  }
}

export default async function DeletionRequestsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams
  const mode = params.mode ?? params.state
  return (
    <AdminDeletionRequests
      key={`${params.lang}-${mode}-${params.request}`}
      locale={localeFrom(params.lang)}
      initialMode={mode}
      initialRequest={params.request}
    />
  )
}
