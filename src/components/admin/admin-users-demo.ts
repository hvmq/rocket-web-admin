// Screen 153's related records from rocket-ui/app.js. These are local UI samples.
export type DemoBooking = {
  id: string
  customer: string
  provider: string
  providerType: string
  service: string
  duration: string
  price: string
  scheduled: string
  location: string
  note: string
  status: string
  rejectionReason?: string
  cancellationReason?: string
  completedAt?: string
  cancelledAt?: string
  noShowId?: string
  complaintId?: string
  chatEligible: boolean
}

export const demoBookings: DemoBooking[] = [
  {
    id: 'BK-48291',
    customer: 'Jamie Rivera',
    provider: 'Maya Chen',
    providerType: 'Individual Therapist',
    service: 'Restorative Massage',
    duration: '90 min',
    price: '$92.00',
    scheduled: 'Sep 26, 2026 · 10:30 AM ICT',
    location: 'District 1 · address restricted',
    note: 'Please focus on shoulder mobility.',
    status: 'Accepted',
    complaintId: 'CP-3018',
    chatEligible: true,
  },
  {
    id: 'BK-48278',
    customer: 'Alex Morgan',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    service: 'Deep Tissue Massage',
    duration: '60 min',
    price: '$78.00',
    scheduled: 'Sep 24, 2026 · 2:00 PM ICT',
    location: 'Hai Chau · permitted booking address',
    note: 'First visit.',
    status: 'Not Completed',
    noShowId: 'NS-0721',
    chatEligible: true,
  },
  {
    id: 'BK-48263',
    customer: 'Priya Shah',
    provider: 'River Spa Studio',
    providerType: 'Massage Business',
    service: 'Relaxation Massage',
    duration: '60 min',
    price: '$65.00',
    scheduled: 'Sep 22, 2026 · 5:30 PM ICT',
    location: 'Son Tra · permitted booking address',
    note: 'No additional note.',
    status: 'Completed',
    completedAt: 'Sep 22, 2026 · 6:34 PM ICT',
    complaintId: 'CP-3016',
    chatEligible: true,
  },
  {
    id: 'BK-48244',
    customer: 'Linh Nguyen',
    provider: 'Serene Hands',
    providerType: 'Individual Therapist',
    service: 'Sports Recovery',
    duration: '75 min',
    price: '$84.00',
    scheduled: 'Sep 21, 2026 · 9:00 AM ICT',
    location: 'Ba Dinh · address restricted',
    note: '',
    status: 'Rejected',
    rejectionReason: 'Provider was unavailable for the requested time.',
    chatEligible: false,
  },
  {
    id: 'BK-48220',
    customer: 'Minh Tran',
    provider: 'An An Studio',
    providerType: 'Massage Business',
    service: 'Aromatherapy',
    duration: '60 min',
    price: '$71.00',
    scheduled: 'Sep 19, 2026 · 4:00 PM ICT',
    location: 'District 3 · permitted booking address',
    note: '',
    status: 'Cancelled',
    cancellationReason: 'Schedule conflict after acceptance.',
    cancelledAt: 'Sep 18, 2026 · 9:12 AM ICT',
    chatEligible: true,
  },
  {
    id: 'BK-48270',
    customer: 'Customer record (restricted)',
    provider: 'River Spa Studio',
    providerType: 'Massage Business',
    service: 'Service snapshot unavailable',
    duration: 'Unavailable',
    price: 'Unavailable',
    scheduled: 'Sep 25, 2026 · 1:00 PM ICT',
    location: 'Restricted',
    note: '',
    status: 'Accepted',
    chatEligible: true,
  },
  {
    id: 'BK-48288',
    customer: 'Customer record (restricted)',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    service: 'Service snapshot unavailable',
    duration: 'Unavailable',
    price: 'Unavailable',
    scheduled: 'Sep 24, 2026 · 11:00 AM ICT',
    location: 'Restricted',
    note: '',
    status: 'Accepted',
    noShowId: 'NS-0724',
    chatEligible: true,
  },
  {
    id: 'BK-48284',
    customer: 'Anh Pham',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    service: 'Service snapshot unavailable',
    duration: 'Unavailable',
    price: 'Unavailable',
    scheduled: 'Sep 24, 2026 · 1:00 PM ICT',
    location: 'Restricted',
    note: '',
    status: 'Accepted',
    complaintId: 'CP-3017',
    chatEligible: true,
  },
  {
    id: 'BK-48255',
    customer: 'Jamie Rivera',
    provider: 'Maya Chen',
    providerType: 'Individual Therapist',
    service: 'Service snapshot unavailable',
    duration: 'Unavailable',
    price: 'Unavailable',
    scheduled: 'Sep 22, 2026 · time unavailable',
    location: 'Restricted',
    note: '',
    status: 'Completed',
    completedAt: 'Sep 22, 2026',
    chatEligible: true,
  },
  {
    id: 'BK-48192',
    customer: 'Anh Pham',
    provider: 'Lotus Wellness',
    providerType: 'Massage Business',
    service: 'Service snapshot unavailable',
    duration: 'Unavailable',
    price: 'Unavailable',
    scheduled: 'Sep 18, 2026 · time unavailable',
    location: 'Restricted',
    note: '',
    status: 'Completed',
    completedAt: 'Sep 18, 2026',
    chatEligible: true,
  },
  {
    id: 'BK-48084',
    customer: 'Linh Nguyen',
    provider: 'Serene Hands',
    providerType: 'Individual Therapist',
    service: 'Service snapshot unavailable',
    duration: 'Unavailable',
    price: 'Unavailable',
    scheduled: 'Sep 10, 2026 · time unavailable',
    location: 'Restricted',
    note: '',
    status: 'Completed',
    completedAt: 'Sep 10, 2026',
    chatEligible: true,
  },
]

export type DemoDeletionRequest = {
  id: string
  requesterId: string
  requester: string
  account: string
  requested: string
  status: string
  bookings: string[]
  cases: string[]
  history: string[]
}

export const demoDeletionRequests: DemoDeletionRequest[] = [
  {
    id: 'DEL-1024',
    requesterId: 'jamie-rivera',
    requester: 'Jamie Rivera',
    account: 'Customer · Active',
    requested: 'Sep 24, 2026 · 18:12 ICT',
    status: 'Received · policy review required',
    bookings: ['BK-48291 · Accepted · cancellation review open'],
    cases: ['CP-3018 · New complaint', 'CN-1084 · Pending cancellation'],
    history: [
      'Sep 24, 2026 · 18:12 ICT — Request received',
      'Sep 24, 2026 · 18:12 ICT — Open booking and cases flagged for review',
    ],
  },
  {
    id: 'DEL-1023',
    requesterId: 'lotus-wellness',
    requester: 'Lotus Wellness',
    account: 'Service Provider · Active',
    requested: 'Sep 18, 2026 · 09:30 ICT',
    status: 'Received · policy review required',
    bookings: [],
    cases: [],
    history: [
      'Sep 18, 2026 · 09:30 ICT — Request received',
      'Sep 18, 2026 · 09:30 ICT — Awaiting approved handling policy',
    ],
  },
  {
    id: 'DEL-1022',
    requesterId: 'maya-chen',
    requester: 'Maya Chen',
    account: 'Service Provider · Active',
    requested: 'Sep 10, 2026 · 08:15 ICT',
    status: 'Received · policy review required',
    bookings: ['BK-48291 · Accepted'],
    cases: [],
    history: [
      'Sep 10, 2026 · 08:15 ICT — Request received',
      'Sep 10, 2026 · 08:15 ICT — Linked booking flagged for review',
    ],
  },
]

export type DemoSubmission = {
  id: string
  version: string
  providerId: string
  status: string
  avatar: string
  submissionType: string
  submitted: string
  region: string
}

export const demoSubmissions: DemoSubmission[] = [
  {
    id: 'PV-2048',
    version: 'v3',
    providerId: 'maya-chen',
    status: 'Pending',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=1200&q=82',
    submissionType: 'Profile Update',
    submitted: 'Sep 24, 2026 · 09:18 ICT',
    region: 'Ho Chi Minh City',
  },
  {
    id: 'PV-2046',
    version: 'v1',
    providerId: 'river-spa',
    status: 'Pending',
    avatar:
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=82',
    submissionType: 'New Profile',
    submitted: 'Sep 23, 2026 · 16:42 ICT',
    region: 'Da Nang',
  },
  {
    id: 'PV-2039',
    version: 'v2',
    providerId: 'serene-hands',
    status: 'Approved',
    avatar:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&crop=faces&w=1200&q=82',
    submissionType: 'Profile Update',
    submitted: 'Sep 21, 2026 · 11:04 ICT',
    region: 'Ha Noi',
  },
  {
    id: 'PV-2034',
    version: 'v1',
    providerId: 'an-an-studio',
    status: 'Rejected',
    avatar:
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=82',
    submissionType: 'Profile Update',
    submitted: 'Sep 19, 2026 · 14:26 ICT',
    region: 'Ho Chi Minh City',
  },
]
