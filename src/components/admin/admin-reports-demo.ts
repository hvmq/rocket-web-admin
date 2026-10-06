export type ReportStatus = 'Open' | 'Resolved'
export type ReportType = 'Provider' | 'Photo' | 'Chat Message' | 'User'

export type ReportCase = {
  id: string
  reporter: string
  target: string
  targetType: ReportType
  reason: string
  submitted: string
  dateKey: 'today' | '7-days' | '30-days'
  status: ReportStatus
  targetState: string
  description: string
  evidence: string[]
  bookingId?: string
  targetId?: string
  classification: string
  assignee: string
  privateNotes: string[]
  timeline: string[]
  outcome?: string
}

export const initialReports: ReportCase[] = [
  {
    id: 'RPT-4108',
    reporter: 'Jamie Rivera',
    target: 'Maya Chen',
    targetType: 'Provider',
    reason: 'Misleading Information',
    submitted: 'Sep 25, 2026 · 9:42 AM ICT',
    dateKey: '7-days',
    status: 'Open',
    targetState: 'Account Active · Profile Approved · Public',
    description:
      'The public profile lists experience that did not match the accepted booking conversation.',
    evidence: [
      'profile-capture.png · restricted',
      'Booking message excerpt · restricted',
    ],
    bookingId: 'BK-48291',
    targetId: 'Maya Chen',
    classification: 'Not yet classified',
    assignee: 'Ava Morgan',
    privateNotes: [
      'Compare the public profile snapshot with the accepted booking snapshot.',
    ],
    timeline: [
      'Report received · Jamie Rivera',
      'Evidence retained for open case',
      'Assigned to Ava Morgan',
    ],
  },
  {
    id: 'RPT-4107',
    reporter: 'Anh Pham',
    target: 'Lotus Wellness · Gallery photo',
    targetType: 'Photo',
    reason: 'Inappropriate Content',
    submitted: 'Sep 24, 2026 · 5:18 PM ICT',
    dateKey: '7-days',
    status: 'Open',
    targetState: 'Photo Public · Provider Active',
    description:
      'The gallery photo contains content that may be inappropriate for a public provider profile.',
    evidence: ['Gallery photo · restricted'],
    targetId: 'Lotus Wellness',
    classification: 'Not yet classified',
    assignee: 'Unassigned',
    privateNotes: [],
    timeline: ['Report received · Anh Pham', 'Evidence retained for open case'],
  },
  {
    id: 'RPT-4106',
    reporter: 'Maya Chen',
    target: 'Message from Jamie Rivera',
    targetType: 'Chat Message',
    reason: 'Harassment',
    submitted: 'Sep 24, 2026 · 3:36 PM ICT',
    dateKey: '7-days',
    status: 'Open',
    targetState: 'Message retained · Conversation restricted',
    description:
      'A message in the booking conversation was reported as harassment.',
    evidence: ['Chat message excerpt · restricted'],
    bookingId: 'BK-48291',
    classification: 'Not yet classified',
    assignee: 'Unassigned',
    privateNotes: [],
    timeline: [
      'Report received · Maya Chen',
      'Evidence retained for open case',
    ],
  },
  {
    id: 'RPT-4101',
    reporter: 'Linh Nguyen',
    target: 'Alex Morgan',
    targetType: 'User',
    reason: 'Harassment',
    submitted: 'Sep 21, 2026 · 11:10 AM ICT',
    dateKey: '30-days',
    status: 'Resolved',
    targetState: 'Account Locked · Profile not applicable',
    description: 'Reported conduct connected to a completed booking.',
    evidence: ['Booking context · restricted'],
    bookingId: 'BK-48278',
    targetId: 'Alex Morgan',
    classification: 'Harassment',
    assignee: 'Ava Morgan',
    privateNotes: [
      'Account decision was completed in Unified Users with a separate reason and audit event.',
    ],
    timeline: [
      'Report received · Linh Nguyen',
      'Review completed · Ava Morgan',
      'Report dismissed · reporter notified',
    ],
  },
]
