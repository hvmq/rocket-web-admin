'use client'

import Link from 'next/link'
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import type { Locale } from '@/i18n/admin-access'
import { reportsT } from '@/i18n/admin-reports'
import { AdminIcon } from './AdminIcon'
import { AdminChatEvidenceDialog } from './AdminChatEvidenceDialog'
import { AdminShell, adminRoute } from './AdminShell'
import { ChangePasswordDialog } from './AdminDashboard'
import {
  initialReports,
  type ReportCase,
  type ReportStatus,
  type ReportType,
} from './admin-reports-demo'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './dashboard.css'
import './reports.css'

type T = (source: string) => string
type Action = 'request' | 'dismiss' | 'resolve'
type PageState =
  'ready' | 'loading' | 'load-error' | 'permission' | 'stale' | 'save-error'

function ReportBadge({ status, t }: { status: ReportStatus; t: T }) {
  return (
    <span className={`report-badge report-badge--${status.toLowerCase()}`}>
      <i />
      {t(status)}
    </span>
  )
}

function ReportModal({
  title,
  children,
  onClose,
  className = '',
}: {
  title: string
  children: ReactNode
  onClose: () => void
  className?: string
}) {
  const { closing, dismiss } = useAnimatedDismiss(onClose)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dismiss])
  return (
    <div
      className={`report-backdrop admin-motion-backdrop${closing ? ' is-closing' : ''}`}
      inert={closing}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <section
        className={`report-dialog admin-motion-dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {children}
      </section>
    </div>
  )
}

function ReportDrawer({
  item,
  locale,
  t,
  closing,
  notice,
  note,
  onNote,
  onClose,
  onEvidence,
  onChatEvidence,
  onClassification,
  onAssignee,
  onSaveNote,
  onAction,
}: {
  item: ReportCase
  locale: Locale
  t: T
  closing: boolean
  notice: string
  note: string
  onNote: (value: string) => void
  onClose: () => void
  onEvidence: (value: string) => void
  onChatEvidence: () => void
  onClassification: (value: string) => void
  onAssignee: (value: string) => void
  onSaveNote: (event: FormEvent) => void
  onAction: (action: Action) => void
}) {
  const resolved = item.status === 'Resolved'
  return (
    <aside
      className={`report-drawer admin-motion-drawer${closing ? ' is-closing' : ''}`}
      inert={closing}
      aria-label={`${t('Report')} ${item.id}`}
    >
      <header>
        <div>
          <p className="report-kicker">
            {item.id} · {t(item.targetType)}
          </p>
          <h2>{t(item.target)}</h2>
          <p>
            {t('Reported by')} {t(item.reporter)} · {t(item.submitted)}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('Close report details')}
        >
          <AdminIcon name="close" />
        </button>
      </header>
      <div className="report-drawer-scroll">
        {notice && (
          <div className="report-notice" role="status">
            <AdminIcon name="check" />
            <div>
              <strong>{t('Case updated')}</strong>
              <p>{t(notice)}</p>
            </div>
          </div>
        )}
        <section className="report-summary">
          <div>
            <small>{t('Handling status')}</small>
            <ReportBadge status={item.status} t={t} />
          </div>
          <div>
            <small>{t('Target current state')}</small>
            <strong>{t(item.targetState)}</strong>
          </div>
        </section>
        <section>
          <h3>{t('Original report')}</h3>
          <p className="report-user-copy">
            <strong>{t(item.reason)}</strong>
            <br />
            {t(item.description)}
          </p>
        </section>
        <section>
          <div className="report-section-heading">
            <h3>{t('Submitted evidence')}</h3>
            <span className="report-badge report-badge--restricted">
              <i />
              {t('Restricted')}
            </span>
          </div>
          {item.evidence.length ? (
            <div className="report-evidence-list">
              {item.evidence.map((entry) => {
                const [name, access] = entry.split(' · ')
                return (
                  <button
                    type="button"
                    key={entry}
                    onClick={() => onEvidence(entry)}
                  >
                    <AdminIcon name="image" />
                    <span>
                      <strong>{t(name)}</strong>
                      <small>{t(access || 'Restricted')}</small>
                    </span>
                    <AdminIcon name="arrow" />
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="report-empty-evidence">
              {t('No evidence was submitted.')}
            </p>
          )}
        </section>
        {item.bookingId && (
          <Link
            className="report-secondary report-booking"
            href={`${adminRoute('appointments', locale)}&search=${encodeURIComponent(item.bookingId)}`}
          >
            {t('View Booking')} {item.bookingId}
          </Link>
        )}
        <section>
          <h3>{t('Linked context')}</h3>
          <dl className="report-detail-list">
            <div>
              <dt>{t('Target type')}</dt>
              <dd>{t(item.targetType)}</dd>
            </div>
            <div>
              <dt>{t('Linked booking')}</dt>
              <dd>{item.bookingId || t('Not applicable')}</dd>
            </div>
            <div>
              <dt>{t('Current classification')}</dt>
              <dd>{t(item.classification)}</dd>
            </div>
          </dl>
          {item.targetType === 'Chat Message' ? (
            <button
              type="button"
              className="report-secondary report-block-button"
              onClick={onChatEvidence}
            >
              {t('View Chat Evidence')}
            </button>
          ) : (
            <Link
              className="report-secondary report-block-button"
              href={`${adminRoute('users', locale)}&search=${encodeURIComponent(item.targetId || item.target)}`}
            >
              {t(
                item.targetType === 'Photo'
                  ? 'View Photo Owner'
                  : 'View Target Account',
              )}
            </Link>
          )}
        </section>
        <section>
          <h3>{t('Case routing')}</h3>
          <div className="report-routing">
            <label>
              <span>{t('Classification')}</span>
              <select
                value={item.classification}
                disabled={resolved}
                onChange={(event) => onClassification(event.target.value)}
              >
                {[
                  'Not yet classified',
                  'Harassment',
                  'Misleading Information',
                  'Inappropriate Content',
                ].map((value) => (
                  <option key={value} value={value}>
                    {t(value)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{t('Assigned Admin')}</span>
              <select
                value={item.assignee}
                disabled={resolved}
                onChange={(event) => onAssignee(event.target.value)}
              >
                {['Unassigned', 'Ava Morgan'].map((value) => (
                  <option key={value} value={value}>
                    {t(value)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
        <section>
          <div className="report-section-heading">
            <h3>{t('Private Admin Notes')}</h3>
            <small>{t('Never visible to users')}</small>
          </div>
          <ul className="report-notes">
            {item.privateNotes.length ? (
              item.privateNotes.map((entry, index) => (
                <li key={`${index}-${entry}`}>{t(entry)}</li>
              ))
            ) : (
              <li>{t('No private notes yet.')}</li>
            )}
          </ul>
          {!resolved && (
            <form className="report-note-form" onSubmit={onSaveNote}>
              <textarea
                rows={3}
                value={note}
                onChange={(event) => onNote(event.target.value)}
                placeholder={t('Add an internal note only')}
                aria-label={t('Add an internal note only')}
              />
              <button
                className="report-secondary"
                type="submit"
                disabled={!note.trim()}
              >
                {t('Save Note')}
              </button>
            </form>
          )}
        </section>
        {item.outcome && (
          <section>
            <h3>{t('Reporter-visible outcome')}</h3>
            <p className="report-user-copy">{item.outcome}</p>
          </section>
        )}
        <section>
          <h3>{t('Handling timeline')}</h3>
          <ol className="report-timeline">
            {item.timeline.map((event, index) => (
              <li key={`${index}-${event}`}>
                <i />
                <div>
                  <strong>{t(event)}</strong>
                  <small>
                    {t(index ? 'Recorded in case history' : 'Latest activity')}
                  </small>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <footer>
        {resolved ? (
          <span>
            {t(
              'Resolved reports are read-only. Evidence remains permission restricted.',
            )}
          </span>
        ) : (
          <>
            <button
              type="button"
              className="report-secondary"
              onClick={() => onAction('request')}
            >
              {t('Request More Information')}
            </button>
            <button
              type="button"
              className="report-secondary"
              onClick={() => onAction('dismiss')}
            >
              {t('Dismiss Report')}
            </button>
            <button
              type="button"
              className="report-primary"
              onClick={() => onAction('resolve')}
            >
              {t('Resolve Report')}
            </button>
          </>
        )}
      </footer>
    </aside>
  )
}

export function AdminReports({
  locale,
  initialCase,
  initialState,
}: {
  locale: Locale
  initialCase?: string
  initialState?: string
}) {
  const t = (value: string) => reportsT(locale, value)
  const [reports, setReports] = useState(initialReports)
  const [selectedId, setSelectedId] = useState<string | null>(
    initialReports.find((item) => item.id === initialCase)?.id ?? null,
  )
  const [search, setSearch] = useState('')
  const [type, setType] = useState<ReportType | 'all'>('all')
  const [status, setStatus] = useState<ReportStatus | 'all'>('all')
  const [date, setDate] = useState('30-days')
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest')
  const [pageState, setPageState] = useState<PageState>(
    ['loading', 'load-error', 'permission', 'stale', 'save-error'].includes(
      initialState || '',
    )
      ? (initialState as PageState)
      : 'ready',
  )
  const [note, setNote] = useState('')
  const [notice, setNotice] = useState('')
  const [action, setAction] = useState<Action | null>(null)
  const [reason, setReason] = useState('')
  const [outcome, setOutcome] = useState('')
  const [evidence, setEvidence] = useState<string | null>(null)
  const [chatEvidenceId, setChatEvidenceId] = useState<string | null>(null)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('RocketAdmin2026!')
  const { closing, dismiss, cancel } = useAnimatedDismiss(() =>
    setSelectedId(null),
  )
  const selected = reports.find((item) => item.id === selectedId)
  const chatEvidenceReport = reports.find((item) => item.id === chatEvidenceId)
  const filtered = useMemo(
    () =>
      reports
        .filter((item) => {
          const query = search.trim().toLocaleLowerCase()
          const order = { today: 1, '7-days': 2, '30-days': 3 }
          return (
            (!query ||
              [
                item.id,
                item.reporter,
                item.target,
                item.reason,
                item.bookingId || '',
              ].some((value) => value.toLocaleLowerCase().includes(query))) &&
            (type === 'all' || item.targetType === type) &&
            (status === 'all' || item.status === status) &&
            order[item.dateKey] <= order[date as keyof typeof order]
          )
        })
        .sort((a, b) =>
          sort === 'newest'
            ? b.id.localeCompare(a.id)
            : a.id.localeCompare(b.id),
        ),
    [reports, search, type, status, date, sort],
  )

  function updateSelected(change: (item: ReportCase) => ReportCase) {
    if (!selected || selected.status !== 'Open' || pageState === 'stale') {
      setPageState('stale')
      return false
    }
    setReports((current) =>
      current.map((item) => (item.id === selected.id ? change(item) : item)),
    )
    return true
  }
  function openReport(id: string) {
    cancel()
    setSelectedId(id)
    setNote('')
    setNotice('')
  }
  function resetFilters() {
    setSearch('')
    setType('all')
    setStatus('all')
    setDate('30-days')
    setSort('newest')
    setPageState('ready')
  }
  function saveNote(event: FormEvent) {
    event.preventDefault()
    const value = note.trim()
    if (!value) return
    if (pageState === 'save-error') return
    if (
      !updateSelected((item) => ({
        ...item,
        privateNotes: [value, ...item.privateNotes],
        timeline: ['Private note saved · Ava Morgan', ...item.timeline],
      }))
    )
      return
    setNote('')
    setNotice('Private note saved for authorized Admins only.')
  }
  function submitAction(event: FormEvent) {
    event.preventDefault()
    if (!selected || selected.status !== 'Open' || pageState === 'stale') {
      setAction(null)
      setPageState('stale')
      return
    }
    if (pageState === 'save-error') return
    if (!reason.trim() || (action !== 'request' && !outcome.trim())) return
    const active = action
    updateSelected((item) =>
      active === 'request'
        ? {
            ...item,
            timeline: [
              `More information requested from ${item.reporter} · case remains Open`,
              ...item.timeline,
            ],
          }
        : {
            ...item,
            status: 'Resolved',
            outcome: outcome.trim(),
            timeline: [
              `Report ${active === 'dismiss' ? 'dismissed' : 'resolved'} · internal reason and user-visible result recorded · reporter notification requested`,
              ...item.timeline,
            ],
          },
    )
    setNotice(
      active === 'request'
        ? 'The request was sent to the reporter and recorded in the case timeline.'
        : `${active === 'dismiss' ? 'Dismissal' : 'Resolution'} recorded. The reporter-visible outcome is separate from the internal reason; the target state was not silently changed.`,
    )
    setAction(null)
    setReason('')
    setOutcome('')
  }
  const actionTitle =
    action === 'request'
      ? 'Request More Information'
      : action === 'dismiss'
        ? 'Dismiss Report'
        : 'Resolve Report'

  return (
    <>
      <AdminShell
        locale={locale}
        title={t('Reports Inbox')}
        active="reports"
        onChangePassword={() => setPasswordOpen(true)}
        actions={
          <div className="report-open-count">
            <i />
            <small>{t('Open reports')}</small>
            <strong>
              {reports.filter((item) => item.status === 'Open').length}{' '}
              {t('require review')}
            </strong>
          </div>
        }
      >
        {pageState === 'permission' ? (
          <section
            className="report-page-state admin-motion-enter"
            role="alert"
          >
            <AdminIcon name="shieldWarning" />
            <h2>{t('Action Unavailable')}</h2>
            <p>
              {t(
                'Your access to reports changed. Restricted details and actions have been removed.',
              )}
            </p>
            <Link
              className="report-secondary"
              href={adminRoute('dashboard', locale)}
            >
              {t('Back to Dashboard')}
            </Link>
          </section>
        ) : (
          <div className="report-page">
            {pageState === 'stale' && (
              <div className="report-alert" role="alert">
                <AdminIcon name="warning" />
                <div>
                  <strong>{t('Record changed')}</strong>
                  <p>
                    {t(
                      'This report changed after it was opened. Reload before adding notes or recording a decision.',
                    )}
                  </p>
                </div>
                <button type="button" onClick={() => setPageState('ready')}>
                  {t('Reload Details')}
                </button>
              </div>
            )}
            {pageState === 'save-error' && (
              <div className="report-alert" role="alert">
                <AdminIcon name="warning" />
                <div>
                  <strong>{t('Unable to Save')}</strong>
                  <p>
                    {t(
                      'Changes in reports were not saved. Your form text remains available to retry.',
                    )}
                  </p>
                </div>
                <button type="button" onClick={() => setPageState('ready')}>
                  {t('Try Again')}
                </button>
              </div>
            )}
            {pageState === 'loading' ? (
              <section
                className="report-page-state admin-motion-enter"
                role="status"
                aria-busy="true"
              >
                <h2>{t('Loading reports…')}</h2>
                <div className="report-skeleton" />
              </section>
            ) : pageState === 'load-error' ? (
              <section
                className="report-page-state admin-motion-enter"
                role="alert"
              >
                <AdminIcon name="warning" />
                <h2>{t('Unable to Load')}</h2>
                <p>
                  {t(
                    "We couldn't load reports. No count or result has been verified.",
                  )}
                </p>
                <button
                  type="button"
                  className="report-secondary"
                  onClick={() => setPageState('ready')}
                >
                  {t('Try Again')}
                </button>
              </section>
            ) : (
              <section className="report-table-panel admin-motion-enter">
                <form
                  className="report-filters"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <label className="report-search">
                    <AdminIcon name="search" />
                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder={t('Search report, reporter or target')}
                      aria-label={t('Search reports')}
                    />
                  </label>
                  <label>
                    <span>{t('Target type')}</span>
                    <select
                      value={type}
                      onChange={(event) =>
                        setType(event.target.value as ReportType | 'all')
                      }
                    >
                      <option value="all">{t('All target types')}</option>
                      {(
                        ['User', 'Provider', 'Photo', 'Chat Message'] as const
                      ).map((value) => (
                        <option key={value} value={value}>
                          {t(value)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>{t('Handling status')}</span>
                    <select
                      value={status}
                      onChange={(event) =>
                        setStatus(event.target.value as ReportStatus | 'all')
                      }
                    >
                      <option value="all">{t('All statuses')}</option>
                      {(['Open', 'Resolved'] as const).map((value) => (
                        <option key={value} value={value}>
                          {t(value)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>{t('Submitted')}</span>
                    <select
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    >
                      <option value="today">{t('Today')}</option>
                      <option value="7-days">{t('Last 7 days')}</option>
                      <option value="30-days">{t('Last 30 days')}</option>
                    </select>
                  </label>
                </form>
                {filtered.length ? (
                  <div className="report-table-scroll">
                    <div
                      className="report-table"
                      role="table"
                      aria-label={t('Reports inbox')}
                    >
                      <div className="report-table-head" role="row">
                        <span role="columnheader">{t('Report')}</span>
                        <span role="columnheader">{t('Reporter')}</span>
                        <span role="columnheader">{t('Target')}</span>
                        <span role="columnheader">{t('Reason')}</span>
                        <button
                          type="button"
                          role="columnheader"
                          onClick={() =>
                            setSort(sort === 'newest' ? 'oldest' : 'newest')
                          }
                          aria-label={`${t('Submitted')}, ${t(sort === 'newest' ? 'newest first' : 'oldest first')}`}
                        >
                          {t('Submitted')} {sort === 'newest' ? '↓' : '↑'}
                        </button>
                        <span role="columnheader">{t('Status')}</span>
                        <span role="columnheader" />
                      </div>
                      {filtered.map((item) => (
                        <div
                          key={item.id}
                          role="row"
                          className={
                            item.id === selectedId ? 'is-selected' : ''
                          }
                        >
                          <strong role="cell">{item.id}</strong>
                          <span role="cell">{t(item.reporter)}</span>
                          <div role="cell">
                            <strong>{t(item.target)}</strong>
                            <small>{t(item.targetType)}</small>
                          </div>
                          <span role="cell">{t(item.reason)}</span>
                          <span role="cell">{t(item.submitted)}</span>
                          <span role="cell">
                            <ReportBadge status={item.status} t={t} />
                          </span>
                          <button
                            type="button"
                            onClick={() => openReport(item.id)}
                          >
                            {t('Review')}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="report-table-empty">
                    <AdminIcon name="search" />
                    <h2>{t('No reports match this view')}</h2>
                    <button
                      type="button"
                      className="report-secondary"
                      onClick={resetFilters}
                    >
                      {t('Clear Filters')}
                    </button>
                  </div>
                )}
              </section>
            )}
            {selected &&
              pageState !== 'loading' &&
              pageState !== 'load-error' && (
                <ReportDrawer
                  item={selected}
                  locale={locale}
                  t={t}
                  closing={closing}
                  notice={notice}
                  note={note}
                  onNote={setNote}
                  onClose={dismiss}
                  onEvidence={(value) => {
                    if (selected.targetType === 'Chat Message') {
                      setChatEvidenceId(selected.id)
                    } else {
                      setEvidence(value)
                    }
                  }}
                  onChatEvidence={() => setChatEvidenceId(selected.id)}
                  onClassification={(value) => {
                    if (
                      !updateSelected((item) => ({
                        ...item,
                        classification: value,
                        timeline: [
                          `Classification updated to ${value} · Ava Morgan`,
                          ...item.timeline,
                        ],
                      }))
                    )
                      return
                    setNotice(
                      'Classification and audit event recorded from the configured workflow.',
                    )
                  }}
                  onAssignee={(value) => {
                    if (
                      !updateSelected((item) => ({
                        ...item,
                        assignee: value,
                        timeline: [
                          `Assigned to ${value} · Ava Morgan`,
                          ...item.timeline,
                        ],
                      }))
                    )
                      return
                    setNotice('Assignment and audit event recorded.')
                  }}
                  onSaveNote={saveNote}
                  onAction={(value) => {
                    setAction(value)
                    setReason('')
                    setOutcome('')
                    setNotice('')
                  }}
                />
              )}
          </div>
        )}
      </AdminShell>
      {action && selected && (
        <ReportModal title={t(actionTitle)} onClose={() => setAction(null)}>
          <span className="report-dialog-icon">
            <AdminIcon name={action === 'request' ? 'notes' : 'report'} />
          </span>
          <p className="report-kicker">
            {selected.id} · {t('current state checked on confirmation')}
          </p>
          <h2>{t(actionTitle)}?</h2>
          <p>
            {t(
              action === 'request'
                ? 'The question goes to the reporter and this case stays open.'
                : 'The report decision is separate from any action on the target. The reporter sees only the outcome below, never the internal reason.',
            )}
          </p>
          <form onSubmit={submitAction}>
            <div className="report-confirm-target">
              <AdminIcon name="report" />
              <div>
                <small>{t('Exact case target')}</small>
                <strong>{t(selected.target)}</strong>
                <p>
                  {t(selected.targetType)} · {t(selected.targetState)}
                </p>
              </div>
            </div>
            {action !== 'request' && (
              <label>
                <span>
                  {t('Outcome shown to reporter')} <b>{t('Required')}</b>
                </span>
                <textarea
                  rows={3}
                  value={outcome}
                  onChange={(event) => setOutcome(event.target.value)}
                  placeholder={t('Explain the result in user-facing language')}
                />
              </label>
            )}
            <label>
              <span>
                {t(
                  action === 'request'
                    ? 'Question to reporter'
                    : 'Internal decision reason',
                )}{' '}
                <b>{t('Required')}</b>
              </span>
              <textarea
                rows={3}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder={t(
                  action === 'request'
                    ? 'Ask for the specific information needed'
                    : 'Record the evidence-based reason for this decision',
                )}
              />
            </label>
            <div className="report-notification">
              <AdminIcon name="notification" />
              <span>
                <strong>
                  {t(
                    action === 'request'
                      ? 'Information request'
                      : 'Result notification',
                  )}
                </strong>
                <small>
                  {t(selected.reporter)} {t('can open')} {selected.id}{' '}
                  {t('after the request is recorded.')}
                </small>
              </span>
            </div>
            <div className="report-dialog-actions">
              <button
                type="button"
                className="report-secondary"
                onClick={() => setAction(null)}
              >
                {t('Go Back')}
              </button>
              <button
                type="submit"
                className="report-primary"
                disabled={
                  !reason.trim() || (action !== 'request' && !outcome.trim())
                }
              >
                {t(
                  action === 'request'
                    ? 'Send Request'
                    : action === 'dismiss'
                      ? 'Confirm Dismissal'
                      : 'Confirm Resolution',
                )}
              </button>
            </div>
          </form>
        </ReportModal>
      )}
      {evidence && (
        <ReportModal
          title={t('Evidence preview')}
          onClose={() => setEvidence(null)}
          className="report-evidence-dialog"
        >
          <header>
            <div>
              <h2>{t(evidence.split(' · ')[0])}</h2>
              <p>{t(evidence.split(' · ')[1] || 'Restricted case evidence')}</p>
            </div>
            <button
              type="button"
              onClick={() => setEvidence(null)}
              aria-label={t('Close')}
            >
              <AdminIcon name="close" />
            </button>
          </header>
          <div className="report-evidence-preview">
            <AdminIcon name="image" />
            <strong>{t('Evidence preview')}</strong>
          </div>
          <footer>
            <span>
              <AdminIcon name="shield" />
              {t('Read-only · access is checked again for every open request')}
            </span>
            <button
              type="button"
              className="report-secondary"
              onClick={() => setEvidence(null)}
            >
              {t('Close Viewer')}
            </button>
          </footer>
        </ReportModal>
      )}
      {chatEvidenceReport && (
        <AdminChatEvidenceDialog
          locale={locale}
          report={chatEvidenceReport}
          onClose={() => setChatEvidenceId(null)}
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
