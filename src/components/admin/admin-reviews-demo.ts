export type ReviewVisibility = 'Visible' | 'Hidden' | 'Removed'
export type ReviewProviderType = 'Individual Therapist' | 'Massage Business'

export type ReviewItem = {
  id: string
  reviewer: string
  provider: string
  providerType: ReviewProviderType
  booking: string
  rating: number
  text: string
  visibility: ReviewVisibility
  reports: string[]
  date: string
  dateLabel: string
  providerRating: string
  timeline: string[]
  lastDecisionReason?: string
}

export const initialReviews: ReviewItem[] = [
  {
    id: 'RV-6208',
    reviewer: 'Priya Shah',
    provider: 'River Spa Studio',
    providerType: 'Massage Business',
    booking: 'BK-48263',
    rating: 5,
    text: 'Calm space and a thoughtful session from start to finish.',
    visibility: 'Visible',
    reports: ['Misleading Information', 'Inappropriate Content'],
    date: '2026-09-23',
    dateLabel: 'Sep 23, 2026',
    providerRating: '4.7 from 86 public reviews',
    timeline: [
      'Review submitted · Priya Shah',
      'Report received · Customer',
      'Second report linked · Customer',
    ],
  },
  {
    id: 'RV-6205',
    reviewer: 'Jamie Rivera',
    provider: 'Maya Chen',
    providerType: 'Individual Therapist',
    booking: 'BK-48255',
    rating: 4,
    text: 'The session was professional and the booking details were clear.',
    visibility: 'Visible',
    reports: [],
    date: '2026-09-22',
    dateLabel: 'Sep 22, 2026',
    providerRating: '4.8 from 38 public reviews',
    timeline: [
      'Review submitted · Jamie Rivera',
      'Published after booking completion',
    ],
  },
  {
    id: 'RV-6198',
    reviewer: 'Anh Pham',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    booking: 'BK-48192',
    rating: 2,
    text: 'The public description did not match my appointment experience.',
    visibility: 'Hidden',
    reports: ['Harassment'],
    date: '2026-09-18',
    dateLabel: 'Sep 18, 2026',
    providerRating: '4.6 from 123 public reviews',
    timeline: [
      'Review submitted · Anh Pham',
      'Report received',
      'Review hidden · Ava Morgan · evidence retained',
    ],
  },
  {
    id: 'RV-6172',
    reviewer: 'Linh Nguyen',
    provider: 'Serene Hands',
    providerType: 'Individual Therapist',
    booking: 'BK-48084',
    rating: 1,
    text: 'Removed review retained only in restricted moderation evidence.',
    visibility: 'Removed',
    reports: ['Inappropriate Content'],
    date: '2026-09-10',
    dateLabel: 'Sep 10, 2026',
    providerRating: '4.9 from 47 public reviews',
    timeline: [
      'Review submitted · Linh Nguyen',
      'Review removed · Ava Morgan',
      'Reporter and affected user notification requests recorded',
    ],
  },
]
