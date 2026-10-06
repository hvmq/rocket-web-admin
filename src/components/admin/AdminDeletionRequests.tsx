'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { deletionT } from '@/i18n/admin-deletion-requests'
import { AdminShell, adminRoute } from './AdminShell'
import { AdminIcon } from './AdminIcon'
import { AdminDetailPanel } from './AdminDetailPanel'
import { AdminListState } from './AdminListState'
import { AdminPagination } from './AdminPagination'
import { ChangePasswordDialog } from './AdminDashboard'
import {
  demoDeletionRequests,
  filterDeletionRequests,
  type DeletionDateFilter,
  type DeletionMode,
  type DemoDeletionRequest,
} from './admin-deletion-requests-demo'
import './dashboard.css'
import './deletion-requests.css'

type Translate = (source: string) => string
const dates: Record<DeletionDateFilter, string> = {
  all: 'Any time',
  today: 'Today',
  '7-days': 'Last 7 days',
  '30-days': 'Last 30 days',
}

function RequestStatus({ status, t }: { status: string; t: Translate }) {
  return (
    <span className="deletion-status">
      <i aria-hidden="true" />
      {t(status)}
    </span>
  )
}

function RequestDetails({
  request,
  locale,
  t,
  onClose,
}: {
  request: DemoDeletionRequest
  locale: Locale
  t: Translate
  onClose: () => void
}) {
  const bookingId = request.bookings[0]?.match(/^BK-\d+/)?.[0]
  const facts = (rows: [string, string][]) => (
    <dl className="admin-detail-facts">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{t(label)}</dt>
          <dd>{t(value)}</dd>
        </div>
      ))}
    </dl>
  )
  return (
    <AdminDetailPanel
      reference={request.id}
      title={t('Deletion request')}
      label={t('Deletion request details')}
      closeLabel={t('Close request details')}
      onClose={onClose}
      actions={
        <Link
          className="admin-secondary-button"
          href={`${adminRoute('users', locale)}&user=${encodeURIComponent(request.requesterId)}`}
        >
          {t('View Requester')}
        </Link>
      }
    >
      <div className="deletion-detail-stack">
        <section className="deletion-policy admin-motion-enter">
          <AdminIcon name="shieldWarning" />
          <div>
            <strong>{t('Policy Required')}</strong>
            <p>
              {t('Deletion policy not configured. This request is read-only.')}
            </p>
          </div>
        </section>
        <section className="deletion-card admin-motion-enter">
          <div className="deletion-card-heading">
            <div>
              <p className="admin-kicker">{request.id}</p>
              <h2>{t('Request detail')}</h2>
            </div>
            <RequestStatus status={request.status} t={t} />
          </div>
          {facts([
            ['Requester', request.requester],
            ['Account', request.account],
            ['Requested', request.requested],
            ['Policy reference', 'Not supplied'],
          ])}
        </section>
        <section className="deletion-card admin-motion-enter">
          <h3>{t('Related active bookings')}</h3>
          {request.bookings.length ? (
            request.bookings.map((booking) => <p key={booking}>{t(booking)}</p>)
          ) : (
            <p>{t('No active booking linked.')}</p>
          )}
          {bookingId && (
            <Link
              className="admin-secondary-button"
              href={`${adminRoute('appointments', locale)}&search=${encodeURIComponent(bookingId)}`}
            >
              {t('View Booking {reference}').replace('{reference}', bookingId)}
            </Link>
          )}
        </section>
        <section className="deletion-card admin-motion-enter">
          <h3>{t('Open cases and preservation')}</h3>
          {request.cases.length ? (
            request.cases.map((item) => <p key={item}>{t(item)}</p>)
          ) : (
            <p>{t('No open case linked.')}</p>
          )}
        </section>
        <section className="deletion-card admin-motion-enter">
          <h3>{t('Decision history')}</h3>
          <ol className="deletion-timeline">
            {request.history.map((event) => (
              <li key={event}>{t(event)}</li>
            ))}
          </ol>
        </section>
        <section className="deletion-card admin-motion-enter">
          <h3>{t('Awaiting approved workflow')}</h3>
          {facts([
            ['Request status', request.status],
            [
              'Preservation review',
              request.cases.length
                ? 'Open cases flagged'
                : 'No open case linked',
            ],
            ['Policy reference', 'Required'],
          ])}
        </section>
      </div>
    </AdminDetailPanel>
  )
}

export function AdminDeletionRequests({
  locale,
  initialMode,
  initialRequest,
}: {
  locale: Locale
  initialMode?: string
  initialRequest?: string
}) {
  const t = (source: string) => deletionT(locale, source)
  const [mode, setMode] = useState<DeletionMode>(
    initialMode === 'loading' ||
      initialMode === 'empty' ||
      initialMode === 'permission'
      ? initialMode
      : initialMode === 'error' || initialMode === 'load-error'
        ? 'error'
        : 'ready',
  )
  const [search, setSearch] = useState(
    initialMode === 'no-results' ? 'no matching request' : '',
  )
  const [status, setStatus] = useState('all')
  const [date, setDate] = useState<DeletionDateFilter>('all')
  const [page, setPage] = useState(initialRequest === 'DEL-1022' ? 2 : 1)
  const [selectedId, setSelectedId] = useState(initialRequest ?? '')
  const [passwordOpen, setPasswordOpen] = useState(initialMode === 'password')
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')

  useEffect(() => {
    if (mode !== 'loading') return
    const timer = setTimeout(() => setMode('ready'), 650)
    return () => clearTimeout(timer)
  }, [mode])

  const requests = filterDeletionRequests(
    mode === 'empty' ? [] : demoDeletionRequests,
    search,
    status,
    date,
    t,
  )
  const pageCount = Math.max(1, Math.ceil(requests.length / 2))
  const currentPage = Math.min(page, pageCount)
  const visible = requests.slice((currentPage - 1) * 2, currentPage * 2)
  const selected =
    mode === 'ready'
      ? visible.find((request) => request.id === selectedId)
      : undefined
  const activeFilters = search.trim() || status !== 'all' || date !== 'all'
  function resetView() {
    setPage(1)
    setSelectedId('')
  }
  function clearFilters() {
    setSearch('')
    setStatus('all')
    setDate('all')
    resetView()
    document.getElementById('deletion-search')?.focus()
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title="Account Deletion Requests"
        active="deletion-requests"
        translate={t}
        onChangePassword={() => setPasswordOpen(true)}
      >
        <div className="deletion-page">
          {mode === 'permission' ? (
            <AdminListState
              icon="shieldWarning"
              label={t('deletion requests')}
              title={t('Action Unavailable')}
              description={t(
                'Your access to deletion requests changed. Restricted details and actions have been removed.',
              )}
            >
              <Link
                className="admin-secondary-button"
                href={adminRoute('dashboard', locale)}
              >
                {t('Back to Dashboard')}
              </Link>
            </AdminListState>
          ) : mode === 'error' ? (
            <AdminListState
              icon="warning"
              label={t('deletion requests')}
              title={t('Unable to Load')}
              description={t(
                "We couldn't load deletion requests. No count or result has been verified.",
              )}
            >
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setMode('loading')}
              >
                {t('Try Again')}
              </button>
            </AdminListState>
          ) : mode === 'loading' ? (
            <section
              className="deletion-loading admin-motion-enter"
              aria-busy="true"
              aria-label={t('Loading deletion requests')}
            >
              <div className="deletion-skeleton">
                {[0, 1, 2, 3].map((index) => (
                  <span key={index} />
                ))}
              </div>
              <p role="status">{t('Loading deletion requests…')}</p>
            </section>
          ) : (
            <div className="deletion-stack">
              <section className="deletion-panel admin-motion-enter">
                <div className="deletion-heading">
                  <h2>{t('Account deletion requests')}</h2>
                  <span role="status">
                    {t('{count} requests in this view').replace(
                      '{count}',
                      String(requests.length),
                    )}
                  </span>
                </div>
                <form
                  className="deletion-filters"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <label className="deletion-search">
                    <AdminIcon name="search" />
                    <input
                      id="deletion-search"
                      type="search"
                      value={search}
                      placeholder={t('Search reference or requester')}
                      aria-label={t('Search deletion requests')}
                      onChange={(event) => {
                        setSearch(event.target.value)
                        resetView()
                      }}
                    />
                  </label>
                  <label className="deletion-filter">
                    <span>{t('Status')}</span>
                    <select
                      value={status}
                      onChange={(event) => {
                        setStatus(event.target.value)
                        resetView()
                      }}
                    >
                      <option value="all">{t('All statuses')}</option>
                      {[
                        ...new Set(
                          demoDeletionRequests.map((request) => request.status),
                        ),
                      ].map((value) => (
                        <option key={value} value={value}>
                          {t(value)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="deletion-filter">
                    <span>{t('Requested')}</span>
                    <select
                      value={date}
                      onChange={(event) => {
                        setDate(event.target.value as DeletionDateFilter)
                        resetView()
                      }}
                    >
                      {Object.entries(dates).map(([value, label]) => (
                        <option key={value} value={value}>
                          {t(label)}
                        </option>
                      ))}
                    </select>
                  </label>
                </form>
                {requests.length ? (
                  <div className="deletion-table-scroll">
                    <table
                      className="deletion-table"
                      aria-label={t('Account deletion requests')}
                    >
                      <thead>
                        <tr>
                          {[
                            'Reference',
                            'Requester',
                            'Requested',
                            'Status',
                            'Actions',
                          ].map((label) => (
                            <th key={label} scope="col">
                              {label === 'Actions' ? (
                                <span className="deletion-sr-only">
                                  {t(label)}
                                </span>
                              ) : (
                                t(label)
                              )}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody key={`${currentPage}-${search}-${status}-${date}`}>
                        {visible.map((request, index) => (
                          <tr
                            key={request.id}
                            className={`admin-motion-enter${selectedId === request.id ? ' is-selected' : ''}`}
                            style={{
                              animationDelay: `var(--admin-motion-stagger-${index})`,
                            }}
                          >
                            <td>
                              <strong>{request.id}</strong>
                            </td>
                            <td>
                              <strong>{t(request.requester)}</strong>
                              <small>{t(request.account)}</small>
                            </td>
                            <td>{t(request.requested)}</td>
                            <td>
                              <RequestStatus status={request.status} t={t} />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="deletion-view"
                                aria-label={`${t('View Request')} ${request.id}`}
                                onClick={() => setSelectedId(request.id)}
                              >
                                {t('View Request')}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <AdminListState
                    icon={activeFilters ? 'search' : 'document'}
                    label={t('deletion requests')}
                    title={t(
                      activeFilters
                        ? 'No Results Found'
                        : 'Nothing in This Queue',
                    )}
                    description={t(
                      activeFilters
                        ? 'No matching items in deletion requests. Your filters are preserved.'
                        : 'There is no work in deletion requests to review right now.',
                    )}
                  >
                    {activeFilters && (
                      <>
                        <small>
                          {t('Active filters')}: {t('Status')}:{' '}
                          {t(status === 'all' ? 'All statuses' : status)} ·{' '}
                          {t('Requested')}: {t(dates[date])}
                          {search.trim() &&
                            ` · ${t('Search')}: ${search.trim()}`}
                        </small>
                        <button
                          className="admin-secondary-button"
                          type="button"
                          onClick={clearFilters}
                        >
                          {t('Clear Filters')}
                        </button>
                      </>
                    )}
                  </AdminListState>
                )}
              </section>
              {requests.length > 0 && (
                <AdminPagination
                  page={currentPage}
                  pageCount={pageCount}
                  label={t('Request pages')}
                  summary={t(
                    'Page {page} of {pages} · {count} matching requests',
                  )
                    .replace('{page}', String(currentPage))
                    .replace('{pages}', String(pageCount))
                    .replace('{count}', String(requests.length))}
                  previousLabel={t('Previous')}
                  nextLabel={t('Next')}
                  onPageChange={(next) => {
                    setPage(next)
                    setSelectedId('')
                  }}
                />
              )}
            </div>
          )}
          {selected && !passwordOpen && (
            <RequestDetails
              key={selected.id}
              request={selected}
              locale={locale}
              t={t}
              onClose={() => setSelectedId('')}
            />
          )}
        </div>
      </AdminShell>
      {passwordOpen && (
        <ChangePasswordDialog
          locale={locale}
          translate={t}
          onClose={() => setPasswordOpen(false)}
          demoPassword={demoPassword}
          onPasswordChange={setDemoPassword}
        />
      )}
    </>
  )
}
