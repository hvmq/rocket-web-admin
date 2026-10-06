import type { Metadata } from 'next'
import { AdminNotifications } from '@/components/admin/AdminNotifications'
import type { Locale } from '@/i18n/admin-access'
import { notificationsT } from '@/i18n/admin-notifications'

type PageProps = { searchParams: Promise<{ lang?: string }> }
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${notificationsT(localeFrom((await searchParams).lang), 'Compose and Schedule Notification')} — Rocket`,
  }
}

export default async function NotificationsPage({ searchParams }: PageProps) {
  return <AdminNotifications locale={localeFrom((await searchParams).lang)} />
}
