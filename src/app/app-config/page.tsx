import type { Metadata } from 'next'
import { AdminAppConfig } from '@/components/admin/AdminAppConfig'
import type { Locale } from '@/i18n/admin-access'
import { appConfigT } from '@/i18n/admin-app-config'

type PageProps = { searchParams: Promise<{ lang?: string }> }
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${appConfigT(localeFrom((await searchParams).lang), 'App Update')} — Rocket`,
  }
}
export default async function AppConfigPage({ searchParams }: PageProps) {
  const locale = localeFrom((await searchParams).lang)
  return <AdminAppConfig key={locale} locale={locale} />
}
