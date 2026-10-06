export type AuditEvent = {
  id: string
  time: string
  date: string
  actor: string
  action: string
  type: string
  target: string
  before: string
  after: string
  reason: string
  notification: string
  route: string
}

export const auditEvents: AuditEvent[] = [
  {
    id: 'AUD-7842',
    time: 'Sep 25, 2026 · 09:42 ICT',
    date: '2026-09-25',
    actor: 'Ava Morgan',
    action: 'Approve profile',
    type: 'Provider',
    target: 'PV-2039',
    before: 'Pending Review',
    after: 'Approved',
    reason: 'Submitted service details verified.',
    notification: 'Send request accepted',
    route: 'provider-verification',
  },
  {
    id: 'AUD-7841',
    time: 'Sep 24, 2026 · 17:10 ICT',
    date: '2026-09-24',
    actor: 'Ava Morgan',
    action: 'Lock account',
    type: 'Account',
    target: 'alex-morgan',
    before: 'Active',
    after: 'Locked',
    reason: 'Account policy violation confirmed.',
    notification: 'Send request accepted',
    route: 'users',
  },
  {
    id: 'AUD-7839',
    time: 'Sep 24, 2026 · 15:56 ICT',
    date: '2026-09-24',
    actor: 'Ava Morgan',
    action: 'Resolve no-show',
    type: 'No-show',
    target: 'NS-0721',
    before: 'Open',
    after: 'Resolved',
    reason: 'Appointment evidence reviewed.',
    notification: 'Send request accepted',
    route: 'no-show',
  },
  {
    id: 'AUD-7838',
    time: 'Sep 23, 2026 · 10:15 ICT',
    date: '2026-09-23',
    actor: 'Ava Morgan',
    action: 'Close complaint',
    type: 'Complaint',
    target: 'CP-3016',
    before: 'In Progress',
    after: 'Closed',
    reason: 'Complaint resolution confirmed.',
    notification: 'Send request accepted',
    route: 'complaints',
  },
  {
    id: 'AUD-7837',
    time: 'Sep 22, 2026 · 14:08 ICT',
    date: '2026-09-22',
    actor: 'Ava Morgan',
    action: 'Hide review',
    type: 'Review',
    target: 'RV-6198',
    before: 'Visible',
    after: 'Hidden',
    reason: 'Review policy violation confirmed.',
    notification: 'Not applicable',
    route: 'reviews',
  },
  {
    id: 'AUD-7836',
    time: 'Sep 22, 2026 · 11:27 ICT',
    date: '2026-09-22',
    actor: 'Ava Morgan',
    action: 'Dismiss report',
    type: 'Report',
    target: 'RPT-4101',
    before: 'Open',
    after: 'Resolved',
    reason: 'Report evidence reviewed.',
    notification: 'Not applicable',
    route: 'reports',
  },
  {
    id: 'AUD-7835',
    time: 'Sep 21, 2026 · 13:40 ICT',
    date: '2026-09-21',
    actor: 'Ava Morgan',
    action: 'Deactivate region',
    type: 'Region',
    target: 'anhai',
    before: 'Active',
    after: 'Inactive',
    reason: 'Region is no longer serviced.',
    notification: 'Not applicable',
    route: 'regions',
  },
  {
    id: 'AUD-7834',
    time: 'Sep 21, 2026 · 09:15 ICT',
    date: '2026-09-21',
    actor: 'Ava Morgan',
    action: 'Schedule notification',
    type: 'Notification',
    target: 'NT-2047',
    before: 'Draft',
    after: 'Scheduled',
    reason: 'Notification schedule confirmed.',
    notification: 'Send request accepted',
    route: 'notifications',
  },
  {
    id: 'AUD-7833',
    time: 'Sep 20, 2026 · 16:05 ICT',
    date: '2026-09-20',
    actor: 'Ava Morgan',
    action: 'Hide banner',
    type: 'Banner',
    target: 'BN-303',
    before: 'Active',
    after: 'Hidden',
    reason: 'Banner campaign ended.',
    notification: 'Not applicable',
    route: 'banners',
  },
]

export type AuditFilters = {
  search: string
  actor: string
  action: string
  type: string
  from: string
  to: string
}
export const emptyAuditFilters: AuditFilters = {
  search: '',
  actor: 'all',
  action: 'all',
  type: 'all',
  from: '',
  to: '',
}

export function filterAuditEvents(
  events: AuditEvent[],
  filters: AuditFilters,
  t: (source: string) => string,
) {
  const query = filters.search.trim().toLocaleLowerCase()
  return events.filter((event) => {
    const searchable = [
      event.id,
      event.actor,
      event.action,
      event.type,
      event.target,
    ]
    return (
      (!query ||
        [...searchable, ...searchable.map(t)]
          .join(' ')
          .toLocaleLowerCase()
          .includes(query)) &&
      (filters.actor === 'all' || event.actor === filters.actor) &&
      (filters.action === 'all' || event.action === filters.action) &&
      (filters.type === 'all' || event.type === filters.type) &&
      (!filters.from || event.date >= filters.from) &&
      (!filters.to || event.date <= filters.to)
    )
  })
}
