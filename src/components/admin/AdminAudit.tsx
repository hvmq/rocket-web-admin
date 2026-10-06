'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { auditT } from '@/i18n/admin-audit'
import { AdminShell, adminRoute } from './AdminShell'
import { AdminIcon } from './AdminIcon'
import { AdminListState } from './AdminListState'
import { AdminDetailPanel } from './AdminDetailPanel'
import { ChangePasswordDialog } from './AdminDashboard'
import {
  auditEvents,
  emptyAuditFilters,
  filterAuditEvents,
  type AuditEvent,
  type AuditFilters,
} from './admin-audit-demo'
import './dashboard.css'
import './audit.css'

type Translate = (source: string) => string
type Mode = 'ready' | 'loading' | 'empty' | 'error' | 'permission'

function AuditFilterBar({
  filters,
  t,
  onChange,
}: {
  filters: AuditFilters
  t: Translate
  onChange: (key: keyof AuditFilters, value: string) => void
}) {
  return (
    <div className="audit-filters">
      <label className="audit-search">
        <AdminIcon name="search" />
        <input
          id="audit-search"
          type="search"
          value={filters.search}
          placeholder={t('Search event or target reference')}
          aria-label={t('Search audit events')}
          onChange={(event) => onChange('search', event.target.value)}
        />
      </label>
      {(
        [
          ['actor', 'Actor', 'All actors', 'actor'],
          ['action', 'Action', 'All actions', 'action'],
          ['type', 'Target type', 'All targets', 'type'],
        ] as const
      ).map(([key, label, all, field]) => (
        <label key={key} className="audit-filter">
          <span>{t(label)}</span>
          <select
            id={`audit-${key}`}
            aria-label={t(label)}
            value={filters[key]}
            onChange={(event) => onChange(key, event.target.value)}
          >
            <option value="all">{t(all)}</option>
            {[...new Set(auditEvents.map((event) => event[field]))].map(
              (value) => (
                <option key={value} value={value}>
                  {t(value)}
                </option>
              ),
            )}
          </select>
        </label>
      ))}
      {(['from', 'to'] as const).map((key) => (
        <label className="audit-filter" key={key}>
          <span>{t(key === 'from' ? 'From' : 'To')}</span>
          <input
            id={`audit-${key}`}
            type="date"
            value={filters[key]}
            onChange={(event) => onChange(key, event.target.value)}
            aria-invalid={
              !!(filters.from && filters.to && filters.from > filters.to)
            }
            aria-describedby={
              filters.from && filters.to && filters.from > filters.to
                ? 'audit-date-error'
                : undefined
            }
          />
        </label>
      ))}
    </div>
  )
}

function AuditTable({
  events,
  t,
  selectedId,
  onView,
}: {
  events: AuditEvent[]
  t: Translate
  selectedId?: string
  onView: (id: string) => void
}) {
  return (
    <div className="audit-table-wrap">
      <table className="audit-table" aria-label={t('Audit events')}>
        <thead>
          <tr>
            {[
              'Event time',
              'Admin actor',
              'Action',
              'Target',
              'Before → After',
              '',
            ].map((label, index) => (
              <th key={index} scope="col">
                {label ? (
                  t(label)
                ) : (
                  <span className="audit-sr-only">{t('View Event')}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr
              key={event.id}
              className={`admin-motion-enter${selectedId === event.id ? ' is-selected' : ''}`}
              style={{
                animationDelay: `var(--admin-motion-stagger-${Math.min(index, 4)})`,
              }}
            >
              <td>{event.time}</td>
              <td>{event.actor}</td>
              <td>
                <strong>{t(event.action)}</strong>
              </td>
              <td>
                <small>{t(event.type)}</small>
                {event.target}
              </td>
              <td>{t(`${event.before} → ${event.after}`)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => onView(event.id)}
                  aria-expanded={selectedId === event.id}
                  aria-label={`${t('View Event')} ${event.id}`}
                >
                  {t('View Event')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AuditEventDetails({
  event,
  locale,
  t,
  onClose,
}: {
  event: AuditEvent
  locale: Locale
  t: Translate
  onClose: () => void
}) {
  const params = new URLSearchParams({ lang: locale })
  const selectionParam: Record<string, string> = {
    Provider: 'submission',
    Account: 'user',
    'No-show': 'case',
    Complaint: 'case',
    Report: 'case',
    Review: 'review',
    Region: 'region',
    Notification: 'notification',
    Banner: 'banner',
  }
  params.set(selectionParam[event.type], event.target)
  return (
    <AdminDetailPanel
      reference={event.id}
      title={t('Event details')}
      label={t('Audit event details')}
      closeLabel={t('Close event details')}
      onClose={onClose}
      actions={
        <Link
          className="admin-secondary-button"
          href={`/${event.route}?${params.toString()}`}
        >
          {t('Open Related Item')}
        </Link>
      }
    >
      <dl className="admin-detail-facts">
        {[
          ['Actor', event.actor],
          ['Event time', event.time],
          ['Action', t(event.action)],
          [
            'Target',
            t(`${event.type} · ${event.target}`) !==
            `${event.type} · ${event.target}`
              ? t(`${event.type} · ${event.target}`)
              : `${t(event.type)} · ${event.target}`,
          ],
          ['Decision reason', t(event.reason)],
          ['Before', t(event.before)],
          ['After', t(event.after)],
          ['Notification request', t(event.notification)],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{t(label)}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </AdminDetailPanel>
  )
}

export function AdminAudit({
  locale,
  initialMode,
  initialEvent,
}: {
  locale: Locale
  initialMode?: string
  initialEvent?: string
}) {
  const t = (source: string) => auditT(locale, source)
  const [mode, setMode] = useState<Mode>(
    initialMode === 'loading' ||
      initialMode === 'empty' ||
      initialMode === 'permission'
      ? initialMode
      : initialMode === 'error' || initialMode === 'load-error'
        ? 'error'
        : 'ready',
  )
  const [filters, setFilters] = useState<AuditFilters>({
    ...emptyAuditFilters,
    search: initialMode === 'no-results' ? 'no matching event' : '',
  })
  const [selectedId, setSelectedId] = useState(initialEvent ?? '')
  const [passwordOpen, setPasswordOpen] = useState(initialMode === 'password')
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  useEffect(() => {
    if (mode !== 'loading') return
    const timer = setTimeout(() => setMode('ready'), 650)
    return () => clearTimeout(timer)
  }, [mode])

  const events = filterAuditEvents(
    mode === 'empty' ? [] : auditEvents,
    filters,
    t,
  )
  const selected =
    mode === 'ready'
      ? events.find((event) => event.id === selectedId)
      : undefined
  const invalidDates = !!(
    filters.from &&
    filters.to &&
    filters.from > filters.to
  )
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => value && (key === 'search' || value !== 'all'))
    .map(
      ([key, value]) =>
        `${t(({ search: 'Search', actor: 'Actor', action: 'Action', type: 'Target', from: 'From', to: 'To' } as Record<string, string>)[key])}: ${t(value)}`,
    )
    .join(' · ')
  function clearFilters() {
    setFilters({ ...emptyAuditFilters })
    setSelectedId('')
    document.getElementById('audit-search')?.focus()
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title="Audit Log"
        active="audit"
        translate={t}
        onChangePassword={() => setPasswordOpen(true)}
      >
        <div className="audit-page">
          {mode === 'permission' ? (
            <AdminListState
              icon="shieldWarning"
              label={t('audit events')}
              title={t('Action Unavailable')}
              description={t(
                'Your access to audit events changed. Restricted details and actions have been removed.',
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
              label={t('audit events')}
              title={t('Unable to Load')}
              description={t(
                "We couldn't load audit events. No count or result has been verified.",
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
              className="audit-loading admin-motion-enter"
              aria-busy="true"
              aria-label={t('Loading audit events')}
            >
              <div className="audit-skeleton">
                {[0, 1, 2, 3].map((index) => (
                  <span key={index} />
                ))}
              </div>
              <p>{t('Loading audit events…')}</p>
            </section>
          ) : (
            <section className="audit-panel admin-motion-enter">
              <AuditFilterBar
                filters={filters}
                t={t}
                onChange={(key, value) => {
                  setFilters((previous) => ({ ...previous, [key]: value }))
                  setSelectedId('')
                }}
              />
              {invalidDates ? (
                <div
                  className="audit-date-error"
                  id="audit-date-error"
                  role="alert"
                >
                  {t('From date must be on or before To date.')}
                </div>
              ) : events.length ? (
                <AuditTable
                  events={events}
                  t={t}
                  selectedId={selectedId}
                  onView={setSelectedId}
                />
              ) : (
                <AdminListState
                  icon={activeFilters ? 'search' : 'document'}
                  label={t('audit events')}
                  title={t(
                    activeFilters
                      ? 'No Results Found'
                      : 'Nothing in This Queue',
                  )}
                  description={t(
                    activeFilters
                      ? 'No matching items in audit events. Your filters are preserved.'
                      : 'There is no work in audit events to review right now.',
                  )}
                >
                  {activeFilters && (
                    <>
                      <small>
                        {t('Active filters')}: {activeFilters}
                      </small>
                      <button
                        type="button"
                        className="admin-secondary-button"
                        onClick={clearFilters}
                      >
                        {t('Clear Filters')}
                      </button>
                    </>
                  )}
                </AdminListState>
              )}
            </section>
          )}
          {selected && !passwordOpen && (
            <AuditEventDetails
              key={selected.id}
              event={selected}
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
          onClose={() => setPasswordOpen(false)}
          demoPassword={demoPassword}
          onPasswordChange={setDemoPassword}
        />
      )}
    </>
  )
}
