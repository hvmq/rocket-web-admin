import type { Metadata } from 'next'
import { AdminReviews } from '@/components/admin/AdminReviews'
import type { Locale } from '@/i18n/admin-access'
import { reviewsT } from '@/i18n/admin-reviews'

type PageProps = {
  searchParams: Promise<{ lang?: string; state?: string; review?: string }>
}
const localeFrom = (value?: string): Locale =>
  value === 'vi' || value === 'ko' ? value : 'en'

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `${reviewsT(localeFrom((await searchParams).lang), 'Review Moderation')} — Rocket`,
  }
}

export default async function ReviewsPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <AdminReviews
      locale={localeFrom(params.lang)}
      initialState={params.state}
      initialReview={params.review}
    />
  )
}
