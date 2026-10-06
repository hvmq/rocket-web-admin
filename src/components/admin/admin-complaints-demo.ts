export type ComplaintStatus = 'New' | 'In Progress' | 'Closed'

export type ComplaintEvidence = {
  id: string
  fileName: string
  imageSrc: string
  imageAlt: string
  width: number
  height: number
  access: string
}

export type Complaint = {
  id: string
  complainant: string
  bookingId: string
  state: ComplaintStatus
  updated: string
  issueType: string
  assignee: string
  submittedText: string
  evidence: ComplaintEvidence[]
  otherParty: string
  publicMessages: string[]
  timeline: string[]
}

export const initialComplaints: Complaint[] = [
  {
    id: 'CP-3018',
    complainant: 'Jamie Rivera',
    bookingId: 'BK-48291',
    state: 'New',
    updated: 'Sep 24 · 4:08 PM ICT',
    issueType: 'Service details',
    assignee: 'Unassigned',
    submittedText:
      'The session description changed after I booked. I want the original booking details reviewed.',
    evidence: [
      {
        id: 'EV-3018-01',
        fileName: 'booking-snapshot.png',
        imageSrc: '/assets/images/complaints/booking-snapshot.png',
        imageAlt: 'Accepted booking details for BK-48291',
        width: 532,
        height: 680,
        access: 'permission granted',
      },
    ],
    otherParty: 'Maya Chen',
    publicMessages: ['Complaint received · Sep 24, 4:08 PM ICT'],
    timeline: [
      'Complaint submitted · Jamie Rivera',
      'Evidence retained while case is open',
    ],
  },
  {
    id: 'CP-3017',
    complainant: 'Anh Pham',
    bookingId: 'BK-48284',
    state: 'In Progress',
    updated: 'Sep 24 · 1:22 PM ICT',
    issueType: 'Communication',
    assignee: 'Ava Morgan',
    submittedText:
      'I need clarification about messages sent before the booking.',
    evidence: [
      {
        id: 'EV-3017-01',
        fileName: 'booking-chat.png',
        imageSrc: '/assets/images/no-show/booking-chat.png',
        imageAlt: 'Booking messages in Vietnamese',
        width: 760,
        height: 900,
        access: 'permission granted',
      },
    ],
    otherParty: 'Lotus Wellness',
    publicMessages: ['Review started · Sep 24, 1:22 PM ICT'],
    timeline: ['Complaint submitted · Anh Pham', 'Review started · Ava Morgan'],
  },
  {
    id: 'CP-3016',
    complainant: 'Priya Shah',
    bookingId: 'BK-48263',
    state: 'Closed',
    updated: 'Sep 23 · 10:15 AM ICT',
    issueType: 'Service experience',
    assignee: 'Ava Morgan',
    submittedText:
      'I asked the review team to document a concern about the completed service.',
    evidence: [],
    otherParty: 'River Spa Studio',
    publicMessages: [
      'Outcome: The concern was reviewed and documented. · Sep 23, 10:15 AM ICT',
    ],
    timeline: [
      'Complaint submitted',
      'Review started',
      'Complaint closed · Complainant notified',
    ],
  },
]
