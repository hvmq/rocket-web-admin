import type { Metadata } from 'next'
import { AdminUsers } from '@/components/admin/AdminUsers'
import type { Locale } from '@/i18n/admin-access'
import { usersT } from '@/i18n/admin-users'

type PageProps = {
  searchParams: Promise<{ lang?: string; state?: string; filter?: string }>
}

function localeFrom(lang?: string): Locale {
  return lang === 'vi' || lang === 'ko' ? lang : 'en'
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const locale = localeFrom((await searchParams).lang)
  return { title: `${usersT(locale, 'Unified Users')} — Rocket` }
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams
  const mode = [
    'loading',
    'empty',
    'load-error',
    'permission',
    'stale',
    'save-error',
  ].includes(params.state ?? '')
    ? (params.state as
        | 'loading'
        | 'empty'
        | 'load-error'
        | 'permission'
        | 'stale'
        | 'save-error')
    : 'ready'
  return (
    <AdminUsers
      locale={localeFrom(params.lang)}
      initialMode={mode}
      initialFilter={params.filter}
    />
  )
}
