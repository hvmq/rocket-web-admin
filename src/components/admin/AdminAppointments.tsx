'use client'

import Link from 'next/link'
import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { appointmentT } from '@/i18n/admin-appointments'
import { AdminIcon } from './AdminIcon'
import { AdminShell, adminRoute } from './AdminShell'
import { ChangePasswordDialog } from './AdminDashboard'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import {
  bookings,
  type Booking,
  type BookingStatus,
} from './admin-appointments-demo'
import './dashboard.css'
import './appointments.css'

type T = (source: string) => string
type Filter = {
  search: string
  date: string
  status: string
  providerType: string
  region: string
}
const defaultFilter: Filter = {
  search: '',
  date: '30-days',
  status: 'all',
  providerType: 'all',
  region: 'all',
}
const statuses: BookingStatus[] = [
  'Pending',
  'Accepted',
  'Rejected',
  'Completed',
  'Cancelled',
  'Not Completed',
]
const regions = ['Ho Chi Minh City', 'Da Nang', 'Ha Noi']
const types = ['Individual Therapist', 'Massage Business']

function FilterSelect({
  label,
  value,
  options,
  onChange,
  t,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  t: T
}) {
  return (
    <label className="appointment-filter-select">
      <span>{t(label)}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </label>
  )
}

function StatusBadge({ status, t }: { status: string; t: T }) {
  const tone =
    status === 'Accepted' || status === 'Completed'
      ? 'positive'
      : status === 'Pending' ||
          status.includes('open') ||
          status.includes('Progress')
        ? 'attention'
        : 'neutral'
  return (
    <span className={`appointment-status appointment-status--${tone}`}>
      <i />
      {t(status)}
    </span>
  )
}

function DetailList({ rows, t }: { rows: [string, ReactNode][]; t: T }) {
  return (
    <dl className="appointment-detail-list">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{t(label)}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function BookingDrawer({
  booking,
  locale,
  onClose,
  closing,
  t,
}: {
  booking: Booking
  locale: Locale
  onClose: () => void
  closing: boolean
  t: T
}) {
  const [tab, setTab] = useState<'Details' | 'History'>('Details')
  const unavailable = t('Unavailable in demo')
  const history = [
    {
      event:
        booking.status === 'Cancelled'
          ? 'Appointment cancelled'
          : booking.condition || 'Current booking state',
      actor: 'System',
      before: 'Unavailable',
      after: booking.status,
      reason:
        booking.rejectionReason ||
        booking.cancellationReason ||
        booking.condition ||
        'State from booking record',
    },
    ...(booking.chatEligible
      ? [
          {
            event: 'Booking accepted',
            actor: booking.provider,
            before: 'Pending',
            after: 'Accepted',
            reason: 'Provider response',
          },
        ]
      : []),
    {
      event: 'Booking requested',
      actor: booking.customer,
      before: '—',
      after: 'Pending',
      reason: 'Customer request',
    },
  ]
  const userLink = (name: string) =>
    name === 'Customer record (restricted)' ? (
      t(name)
    ) : (
      <Link
        href={`${adminRoute('users', locale)}&search=${encodeURIComponent(name)}`}
      >
        {t(name)}
      </Link>
    )

  return (
    <aside
      className={`appointment-drawer admin-motion-drawer${closing ? ' is-closing' : ''}`}
      aria-label={t('Booking details')}
      inert={closing}
    >
      <header>
        <div>
          <p className="appointment-kicker">
            {booking.id} · {t('Immutable snapshot')}
          </p>
          <h2>{t(booking.service)}</h2>
          <p>{t(booking.scheduled)}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('Close booking details')}
        >
          <AdminIcon name="close" />
        </button>
      </header>
      <div className="appointment-drawer-scroll">
        <div
          className="appointment-tabs"
          role="tablist"
          aria-label={t('Booking details')}
        >
          {(['Details', 'History'] as const).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              className={tab === item ? 'is-active' : ''}
              onClick={() => setTab(item)}
            >
              {t(item)}
            </button>
          ))}
        </div>
        {tab === 'Details' ? (
          <>
            <section className="appointment-status-card">
              <div>
                <small>{t('Current valid status')}</small>
                <StatusBadge status={booking.status} t={t} />
              </div>
              {booking.condition && (
                <div>
                  <small>{t('In-progress condition')}</small>
                  <StatusBadge status={booking.condition} t={t} />
                </div>
              )}
            </section>
            <section>
              <h3>{t('Parties')}</h3>
              <DetailList
                t={t}
                rows={[
                  ['Customer', userLink(booking.customer)],
                  ['Service Provider', userLink(booking.provider)],
                  ['Provider type', t(booking.providerType)],
                ]}
              />
            </section>
            <section>
              <h3>{t('Booking snapshot')}</h3>
              <DetailList
                t={t}
                rows={[
                  ['Service', t(booking.service)],
                  [
                    'Duration',
                    booking.duration ? t(booking.duration) : unavailable,
                  ],
                  ['Price at booking', booking.price || unavailable],
                  ['Scheduled', t(booking.scheduled)],
                  [
                    'Location',
                    booking.location ? t(booking.location) : unavailable,
                  ],
                  ...(booking.completedAt
                    ? [
                        ['Completed', t(booking.completedAt)] as [
                          string,
                          ReactNode,
                        ],
                      ]
                    : []),
                  ...(booking.cancelledAt
                    ? [
                        ['Cancelled', t(booking.cancelledAt)] as [
                          string,
                          ReactNode,
                        ],
                      ]
                    : []),
                ]}
              />
              <p className="appointment-note">
                {t(booking.note || 'No booking note was provided.')}
              </p>
            </section>
            {(booking.rejectionReason || booking.cancellationReason) && (
              <section>
                <h3>{t('Recorded reason')}</h3>
                <p className="appointment-note">
                  {t(
                    booking.rejectionReason || booking.cancellationReason || '',
                  )}
                </p>
              </section>
            )}
            <section>
              <h3>{t('Associated records')}</h3>
              <div className="appointment-related">
                {booking.noShowId && (
                  <Link
                    href={`${adminRoute('no-show', locale)}&case=${booking.noShowId}`}
                  >
                    <span>{t('No-show case')}</span>
                    <strong>{booking.noShowId}</strong>
                    <AdminIcon name="arrow" />
                  </Link>
                )}
                {booking.complaintId && (
                  <Link
                    href={`${adminRoute('complaints', locale)}&case=${booking.complaintId}`}
                  >
                    <span>{t('Complaint')}</span>
                    <strong>{booking.complaintId}</strong>
                    <AdminIcon name="arrow" />
                  </Link>
                )}
                {!booking.noShowId && !booking.complaintId && (
                  <p>{t('No associated cases.')}</p>
                )}
              </div>
            </section>
          </>
        ) : (
          <div className="appointment-history-list">
            {history.map((entry, index) => (
              <article key={`${entry.event}-${index}`}>
                <div>
                  <strong>{t(entry.event)}</strong>
                  <StatusBadge status={entry.after} t={t} />
                </div>
                <p>
                  {t(entry.actor)} · {t('Time unavailable in demo')}
                </p>
                <DetailList
                  t={t}
                  rows={[
                    [
                      'State',
                      <>
                        {t(entry.before)} → {t(entry.after)}
                      </>,
                    ],
                    ['Reason', t(entry.reason)],
                    ['Notification', t('Unavailable in demo')],
                  ]}
                />
              </article>
            ))}
          </div>
        )}
      </div>
      {!booking.chatEligible && (
        <footer>
          <span>
            {t('Chat is unavailable because this booking was never Accepted.')}
          </span>
        </footer>
      )}
    </aside>
  )
}

export function AdminAppointments({
  locale,
  initialStatus = 'all',
  initialDate = '30-days',
  initialSearch = '',
  initialMode = 'ready',
}: {
  locale: Locale
  initialStatus?: string
  initialDate?: string
  initialSearch?: string
  initialMode?: 'ready' | 'loading' | 'load-error'
}) {
  const t = (source: string) => appointmentT(locale, source)
  const [filter, setFilter] = useState<Filter>({
    ...defaultFilter,
    search: initialSearch,
    status: statuses.includes(initialStatus as BookingStatus)
      ? initialStatus
      : 'all',
    date: initialDate === '7-days' ? initialDate : '30-days',
  })
  const [selectedId, setSelectedId] = useState<string | null>(
    bookings.find((booking) => booking.id === initialSearch)?.id ?? null,
  )
  const { closing, dismiss, cancel } = useAnimatedDismiss(() =>
    setSelectedId(null),
  )
  const [mode, setMode] = useState(initialMode)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const filtered = useMemo(
    () =>
      bookings.filter((booking) => {
        const query = filter.search.trim().toLocaleLowerCase()
        return (
          (!query ||
            [
              booking.id,
              booking.customer,
              booking.provider,
              booking.service,
            ].some((value) => value.toLocaleLowerCase().includes(query))) &&
          (filter.date !== '7-days' ||
            (booking.day >= 19 && booking.day <= 25)) &&
          (filter.status === 'all' || booking.status === filter.status) &&
          (filter.providerType === 'all' ||
            booking.providerType === filter.providerType) &&
          (filter.region === 'all' || booking.region === filter.region)
        )
      }),
    [filter],
  )
  const selected = bookings.find((booking) => booking.id === selectedId)
  function updateFilter<K extends keyof Filter>(key: K, value: Filter[K]) {
    setFilter((current) => ({ ...current, [key]: value }))
    if (selectedId) dismiss()
  }
  function openBooking(id: string) {
    cancel()
    setSelectedId(id)
  }
  function reset() {
    setFilter(defaultFilter)
    if (selectedId) dismiss()
    setMode('ready')
    document.getElementById('appointment-search')?.focus()
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title={t('Appointments & Booking History')}
        active="appointments"
        onChangePassword={() => setPasswordOpen(true)}
      >
        <div className="appointment-page">
          {mode === 'loading' ? (
            <div className="appointment-state" role="status">
              <h2>{t('Loading appointments')}</h2>
              <div className="appointment-skeleton" />
            </div>
          ) : mode === 'load-error' ? (
            <div className="appointment-state" role="alert">
              <AdminIcon name="warning" />
              <h2>{t('Unable to load appointments')}</h2>
              <button
                className="appointment-secondary-button"
                type="button"
                onClick={() => setMode('ready')}
              >
                {t('Try Again')}
              </button>
            </div>
          ) : (
            <section className="appointment-panel">
              <form
                className="appointment-filters"
                onSubmit={(event: FormEvent) => event.preventDefault()}
              >
                <label className="appointment-search">
                  <AdminIcon name="search" />
                  <input
                    id="appointment-search"
                    type="search"
                    value={filter.search}
                    onChange={(event) =>
                      updateFilter('search', event.target.value)
                    }
                    placeholder={t('Search booking, person or service')}
                    aria-label={t('Search booking, person or service')}
                  />
                </label>
                <FilterSelect
                  label="Date range"
                  value={filter.date}
                  onChange={(value) => updateFilter('date', value)}
                  options={[
                    { value: '30-days', label: 'Last 30 days' },
                    { value: '7-days', label: 'Last 7 days' },
                  ]}
                  t={t}
                />
                <FilterSelect
                  label="Status"
                  value={filter.status}
                  onChange={(value) => updateFilter('status', value)}
                  options={[
                    { value: 'all', label: 'All statuses' },
                    ...statuses.map((status) => ({
                      value: status,
                      label: status,
                    })),
                  ]}
                  t={t}
                />
                <FilterSelect
                  label="Provider type"
                  value={filter.providerType}
                  onChange={(value) => updateFilter('providerType', value)}
                  options={[
                    { value: 'all', label: 'All types' },
                    ...types.map((type) => ({ value: type, label: type })),
                  ]}
                  t={t}
                />
                <FilterSelect
                  label="Region"
                  value={filter.region}
                  onChange={(value) => updateFilter('region', value)}
                  options={[
                    { value: 'all', label: 'All regions' },
                    ...regions.map((region) => ({
                      value: region,
                      label: region,
                    })),
                  ]}
                  t={t}
                />
              </form>
              {filtered.length ? (
                <div className="appointment-table-scroll">
                  <div
                    key={`${filter.date}-${filter.status}-${filter.providerType}-${filter.region}`}
                    className="appointment-table"
                    role="table"
                    aria-label={t('Appointments & Booking History')}
                  >
                    <div className="appointment-table-head" role="row">
                      {[
                        'Booking',
                        'Customer',
                        'Provider / type',
                        'Service',
                        'Scheduled',
                        'Status',
                        '',
                      ].map((heading, index) => (
                        <span role="columnheader" key={`${heading}-${index}`}>
                          {t(heading)}
                        </span>
                      ))}
                    </div>
                    {filtered.map((booking) => (
                      <div
                        role="row"
                        key={booking.id}
                        className={
                          selectedId === booking.id ? 'is-selected' : ''
                        }
                      >
                        <strong role="cell">{booking.id}</strong>
                        <span role="cell">{t(booking.customer)}</span>
                        <div role="cell">
                          <strong>{t(booking.provider)}</strong>
                          <small>{t(booking.providerType)}</small>
                        </div>
                        <span role="cell">{t(booking.service)}</span>
                        <span role="cell">{t(booking.scheduled)}</span>
                        <div role="cell">
                          <StatusBadge status={booking.status} t={t} />
                          {booking.condition && (
                            <small>{t(booking.condition)}</small>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => openBooking(booking.id)}
                        >
                          {t('View')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="appointment-empty">
                  <AdminIcon name="search" />
                  <h2>{t('No appointments match these filters')}</h2>
                  <button
                    type="button"
                    className="appointment-secondary-button"
                    onClick={reset}
                  >
                    {t('Clear Filters')}
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </AdminShell>
      {mode === 'ready' && selected && (
        <BookingDrawer
          key={selected.id}
          booking={selected}
          locale={locale}
          onClose={dismiss}
          closing={closing}
          t={t}
        />
      )}
      {passwordOpen && (
        <ChangePasswordDialog
          locale={locale}
          demoPassword={demoPassword}
          onPasswordChange={setDemoPassword}
          onClose={() => setPasswordOpen(false)}
        />
      )}
    </>
  )
}
