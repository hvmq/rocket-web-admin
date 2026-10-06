import type { Metadata } from 'next'
import { AdminProviderVerification } from '@/components/admin/AdminProviderVerification'
import type { Locale } from '@/i18n/admin-access'
import { providerT } from '@/i18n/admin-provider-verification'

type PageProps = { searchParams: Promise<{ lang?: string; state?: string }> }

function localeFrom(value?: string): Locale {
  return value === 'vi' || value === 'ko' ? value : 'en'
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const locale = localeFrom((await searchParams).lang)
  return { title: `${providerT(locale, 'Provider Verification')} — Rocket` }
}

export default async function ProviderVerificationPage({
  searchParams,
}: PageProps) {
  const params = await searchParams
  const allowed = [
    'loading',
    'load-error',
    'permission',
    'image-error',
    'stale',
  ] as const
  const state = allowed.find((value) => value === params.state) ?? 'ready'
  return (
    <AdminProviderVerification
      locale={localeFrom(params.lang)}
      initialMode={state}
    />
  )
}
