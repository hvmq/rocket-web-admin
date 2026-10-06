import type { Metadata } from 'next'
import { AdminTeam } from '@/components/admin/AdminTeam'
import type { Locale } from '@/i18n/admin-access'
import { teamT } from '@/i18n/admin-team'

type PageProps = { searchParams: Promise<{ lang?: string }> }
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${teamT(localeFrom((await searchParams).lang), 'Admin Accounts & Roles')} — Rocket`,
  }
}

export default async function TeamPage({ searchParams }: PageProps) {
  const locale = localeFrom((await searchParams).lang)
  return <AdminTeam key={locale} locale={locale} />
}
