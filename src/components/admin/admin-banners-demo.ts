export type Banner = {
  id: string
  title: string
  label: string
  image: string
  destination: string
  start: string
  end: string
  order: number
  visible: boolean
  deleted: boolean
  audit: { action: string; reason?: string; time?: string }[]
}

export const bannerDestinations = [
  'Provider search',
  'Appointments',
  'Provider profile',
  'Booking chat',
  'Notifications',
]
export const bannerStates = [
  'Active',
  'Scheduled',
  'Hidden',
  'Expired',
  'Deleted',
]
export const bannerDemoNow = Date.parse('2026-10-02T12:00:00+07:00')

export const initialBanners: Banner[] = [
  {
    id: 'BN-301',
    title: 'Find care nearby',
    label: 'Find local service providers',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=82',
    destination: 'Provider search',
    start: '2026-09-20T08:00',
    end: '2026-10-10T23:00',
    order: 1,
    visible: true,
    deleted: false,
    audit: [{ action: 'Published' }],
  },
  {
    id: 'BN-302',
    title: 'Plan your next session',
    label: 'Explore appointment options',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=82',
    destination: 'Appointments',
    start: '2026-09-28T08:00',
    end: '2026-10-15T23:00',
    order: 2,
    visible: true,
    deleted: false,
    audit: [{ action: 'Published' }],
  },
  {
    id: 'BN-303',
    title: 'Your wellness space',
    label: 'View provider profiles',
    image:
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=82',
    destination: 'Provider search',
    start: '2026-09-01T08:00',
    end: '2026-10-01T23:00',
    order: 3,
    visible: false,
    deleted: false,
    audit: [{ action: 'Hidden' }],
  },
  {
    id: 'BN-304',
    title: 'Previous season',
    label: 'Browse nearby providers',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=82',
    destination: 'Provider search',
    start: '2026-08-01T08:00',
    end: '2026-08-31T23:00',
    order: 4,
    visible: true,
    deleted: false,
    audit: [{ action: 'Published' }],
  },
]

// Keep the reference screen's sample states stable when revisiting this UI demo.
export function bannerState(banner: Banner) {
  if (banner.deleted) return 'Deleted'
  if (!banner.visible) return 'Hidden'
  if (Date.parse(`${banner.start}+07:00`) > bannerDemoNow) return 'Scheduled'
  if (Date.parse(`${banner.end}+07:00`) < bannerDemoNow) return 'Expired'
  return 'Active'
}

export function validBannerImage(value: string) {
  if (value.startsWith('/assets/') && !value.includes('..')) return true
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export function validateBanner(draft: Banner, original?: Banner) {
  if (!draft.title.trim() || !draft.label.trim())
    return 'Enter a title and accessibility label.'
  if (!validBannerImage(draft.image))
    return 'Choose a valid HTTPS image or approved media reference.'
  if (!bannerDestinations.includes(draft.destination))
    return 'Choose a valid internal destination.'
  const start = Date.parse(`${draft.start}+07:00`)
  const end = Date.parse(`${draft.end}+07:00`)
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start)
    return 'End time must be after start time.'
  if (!Number.isInteger(draft.order) || draft.order < 1)
    return 'Enter a positive display order.'
  if (original?.visible && !draft.visible)
    return 'Use Hide Banner to record a required reason.'
  return ''
}
