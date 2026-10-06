export type BookingStatus =
  | 'Pending'
  | 'Accepted'
  | 'Rejected'
  | 'Completed'
  | 'Cancelled'
  | 'Not Completed'

export type Booking = {
  id: string
  customer: string
  provider: string
  providerType: 'Individual Therapist' | 'Massage Business'
  region: 'Ho Chi Minh City' | 'Da Nang' | 'Ha Noi'
  service: string
  scheduled: string
  day: number
  status: BookingStatus
  condition?: string
  duration?: string
  price?: string
  location?: string
  note?: string
  noShowId?: string
  complaintId?: string
  chatEligible?: boolean
  rejectionReason?: string
  cancellationReason?: string
  completedAt?: string
  cancelledAt?: string
}

export const bookings: Booking[] = [
  {
    id: 'BK-48291',
    customer: 'Jamie Rivera',
    provider: 'Maya Chen',
    providerType: 'Individual Therapist',
    region: 'Ho Chi Minh City',
    service: 'Restorative Massage',
    scheduled: 'Sep 26, 2026 · 10:30 AM ICT',
    day: 26,
    status: 'Accepted',
    duration: '90 min',
    price: '$92.00',
    location: 'District 1 · address restricted',
    note: 'Please focus on shoulder mobility.',
    complaintId: 'CP-3018',
    chatEligible: true,
  },
  {
    id: 'BK-48278',
    customer: 'Alex Morgan',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    region: 'Ho Chi Minh City',
    service: 'Deep Tissue Massage',
    scheduled: 'Sep 24, 2026 · 2:00 PM ICT',
    day: 24,
    status: 'Not Completed',
    condition: 'No-show resolved',
    noShowId: 'NS-0721',
    chatEligible: true,
  },
  {
    id: 'BK-48263',
    customer: 'Priya Shah',
    provider: 'River Spa Studio',
    providerType: 'Massage Business',
    region: 'Da Nang',
    service: 'Relaxation Massage',
    scheduled: 'Sep 22, 2026 · 5:30 PM ICT',
    day: 22,
    status: 'Completed',
    chatEligible: true,
  },
  {
    id: 'BK-48244',
    customer: 'Linh Nguyen',
    provider: 'Serene Hands',
    providerType: 'Individual Therapist',
    region: 'Ha Noi',
    service: 'Sports Recovery',
    scheduled: 'Sep 21, 2026 · 9:00 AM ICT',
    day: 21,
    status: 'Rejected',
  },
  {
    id: 'BK-48220',
    customer: 'Minh Tran',
    provider: 'An An Studio',
    providerType: 'Massage Business',
    region: 'Ho Chi Minh City',
    service: 'Aromatherapy',
    scheduled: 'Sep 19, 2026 · 4:00 PM ICT',
    day: 19,
    status: 'Cancelled',
  },
  {
    id: 'BK-48270',
    customer: 'Customer record (restricted)',
    provider: 'River Spa Studio',
    providerType: 'Massage Business',
    region: 'Da Nang',
    service: 'Service snapshot unavailable',
    scheduled: 'Sep 25, 2026 · 1:00 PM ICT',
    day: 25,
    status: 'Accepted',
    chatEligible: true,
  },
  {
    id: 'BK-48288',
    customer: 'Customer record (restricted)',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    region: 'Ho Chi Minh City',
    service: 'Service snapshot unavailable',
    scheduled: 'Sep 24, 2026 · 11:00 AM ICT',
    day: 24,
    status: 'Accepted',
    condition: 'No-show case open',
    noShowId: 'NS-0724',
    chatEligible: true,
  },
  {
    id: 'BK-48284',
    customer: 'Anh Pham',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    region: 'Ho Chi Minh City',
    service: 'Service snapshot unavailable',
    scheduled: 'Sep 24, 2026 · 1:00 PM ICT',
    day: 24,
    status: 'Accepted',
    condition: 'Complaint In Progress',
    complaintId: 'CP-3018',
    chatEligible: true,
  },
  {
    id: 'BK-48255',
    customer: 'Jamie Rivera',
    provider: 'Maya Chen',
    providerType: 'Individual Therapist',
    region: 'Ho Chi Minh City',
    service: 'Service snapshot unavailable',
    scheduled: 'Sep 22, 2026 · time unavailable',
    day: 22,
    status: 'Completed',
    chatEligible: true,
  },
  {
    id: 'BK-48192',
    customer: 'Anh Pham',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    region: 'Ho Chi Minh City',
    service: 'Service snapshot unavailable',
    scheduled: 'Sep 18, 2026 · time unavailable',
    day: 18,
    status: 'Completed',
    chatEligible: true,
  },
  {
    id: 'BK-48084',
    customer: 'Linh Nguyen',
    provider: 'Serene Hands',
    providerType: 'Individual Therapist',
    region: 'Ha Noi',
    service: 'Service snapshot unavailable',
    scheduled: 'Sep 10, 2026 · time unavailable',
    day: 10,
    status: 'Completed',
    chatEligible: true,
  },
]
