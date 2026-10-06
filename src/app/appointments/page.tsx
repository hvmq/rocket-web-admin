import type { Metadata } from 'next'
import { AdminAppointments } from '@/components/admin/AdminAppointments'
import type { Locale } from '@/i18n/admin-access'
import { appointmentT } from '@/i18n/admin-appointments'

type PageProps = {
  searchParams: Promise<{
    lang?: string
    filter?: string
    range?: string
    state?: string
    search?: string
  }>
}
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${appointmentT(localeFrom((await searchParams).lang), 'Appointments & Booking History')} — Rocket`,
  }
}

export default async function AppointmentsPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminAppointments
      locale={localeFrom(params.lang)}
      initialStatus={params.filter}
      initialDate={params.range}
      initialSearch={params.search}
      initialMode={
        params.state === 'loading' || params.state === 'load-error'
          ? params.state
          : 'ready'
      }
    />
  )
}
