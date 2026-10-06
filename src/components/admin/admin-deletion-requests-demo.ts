import {
  demoDeletionRequests,
  type DemoDeletionRequest,
} from './admin-users-demo'

export type DeletionDateFilter = 'all' | 'today' | '7-days' | '30-days'
export type DeletionMode =
  'ready' | 'loading' | 'empty' | 'error' | 'permission'

// Keep the sample's Sep 25 reference date so its filters remain reproducible.
const sampleDay = Date.UTC(2026, 8, 25)

export function filterDeletionRequests(
  requests: DemoDeletionRequest[],
  search: string,
  status: string,
  date: DeletionDateFilter,
  translate: (source: string) => string,
) {
  const query = search.trim().toLocaleLowerCase()
  return requests.filter((request) => {
    const searchable =
      `${request.id} ${request.requester} ${request.requesterId} ${translate(request.requester)}`.toLocaleLowerCase()
    const day = request.requested.match(/^Sep (\d+), 2026/)
    const age = day
      ? (sampleDay - Date.UTC(2026, 8, Number(day[1]))) / 86400000
      : Infinity
    const withinDate =
      date === 'all' ||
      (age >= 0 && age < (date === 'today' ? 1 : date === '7-days' ? 7 : 30))
    return (
      (!query || searchable.includes(query)) &&
      (status === 'all' || request.status === status) &&
      withinDate
    )
  })
}

export { demoDeletionRequests }
export type { DemoDeletionRequest }
