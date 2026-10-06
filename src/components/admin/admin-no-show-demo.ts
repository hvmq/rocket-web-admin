export type NoShowEvidence = {
  id: string
  fileName: string
  imageSrc: string
  imageAlt: string
  width: number
  height: number
}

export type NoShowCase = {
  id: string
  bookingId: string
  reporter: string
  incident: string
  submitted: string
  deadline: string
  status: 'Open' | 'Resolved'
  description: string
  evidence: NoShowEvidence[]
  timeline: string[]
  decision?: string
  decisionReason?: string
}

export const initialNoShowCases: NoShowCase[] = [
  {
    id: 'NS-0724',
    bookingId: 'BK-48288',
    reporter: 'Lotus Wellness · Provider',
    incident: 'Sep 24 · 11:00 AM ICT',
    submitted: 'Sep 24 · 11:24 AM ICT',
    deadline: 'Sep 26 · 11:24 AM ICT',
    status: 'Open',
    description:
      'The Customer did not arrive and did not reply in the booking chat.',
    evidence: [
      {
        id: 'EV-0724-01',
        fileName: 'anh_quay_le_tan.jpg',
        imageSrc: '/assets/images/no-show/spa-space.jpg',
        imageAlt: 'Reception desk and beauty salon interior',
        width: 1124,
        height: 750,
      },
      {
        id: 'EV-0724-02',
        fileName: 'anh_chup_tro_chuyen.png',
        imageSrc: '/assets/images/no-show/booking-chat.png',
        imageAlt: 'Booking messages in Vietnamese',
        width: 760,
        height: 900,
      },
    ],
    timeline: [
      'Incident reported · Lotus Wellness',
      'Evidence access verified',
      'Case assigned · Ava Morgan',
    ],
  },
  {
    id: 'NS-0721',
    bookingId: 'BK-48278',
    reporter: 'Alex Morgan · Customer',
    incident: 'Sep 24 · 2:00 PM ICT',
    submitted: 'Sep 24 · 2:31 PM ICT',
    deadline: 'Sep 26 · 2:31 PM ICT',
    status: 'Resolved',
    description:
      'The Service Provider did not arrive at the confirmed location.',
    evidence: [
      {
        id: 'EV-0721-01',
        fileName: 'anh_khu_vuc_cho.jpg',
        imageSrc: '/assets/images/no-show/service-location.jpg',
        imageAlt: 'Empty spa waiting area with armchairs and plants',
        width: 1061,
        height: 750,
      },
    ],
    decision: 'Not Completed — Service Provider',
    decisionReason:
      'The permitted evidence and booking communication support the reported non-arrival.',
    timeline: [
      'Incident reported · Alex Morgan',
      'Evidence reviewed · Ava Morgan',
      'Final decision recorded · Both parties notified',
    ],
  },
]
