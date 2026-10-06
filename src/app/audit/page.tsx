import type { Metadata } from 'next'
import { AdminAudit } from '@/components/admin/AdminAudit'
import type { Locale } from '@/i18n/admin-access'
import { auditT } from '@/i18n/admin-audit'

type PageProps = {
  searchParams: Promise<{ lang?: string; mode?: string; event?: string }>
}
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${auditT(localeFrom((await searchParams).lang), 'Audit Log')} — Rocket`,
  }
}

export default async function AuditPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminAudit
      key={`${params.lang}-${params.mode}-${params.event}`}
      locale={localeFrom(params.lang)}
      initialMode={params.mode}
      initialEvent={params.event}
    />
  )
}
