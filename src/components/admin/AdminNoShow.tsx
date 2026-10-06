'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { noShowT } from '@/i18n/admin-no-show'
import { AdminIcon } from './AdminIcon'
import { AdminShell, adminRoute } from './AdminShell'
import { ChangePasswordDialog } from './AdminDashboard'
import {
  initialNoShowCases,
  type NoShowCase,
  type NoShowEvidence,
} from './admin-no-show-demo'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './dashboard.css'
import './no-show.css'

type T = (value: string) => string
type State = 'ready' | 'loading' | 'load-error' | 'permission' | 'stale'

function StatusBadge({ status, t }: { status: NoShowCase['status']; t: T }) {
  return (
    <span className={`no-show-status no-show-status--${status.toLowerCase()}`}>
      <i />
      {t(status)}
    </span>
  )
}

function CaseDrawer({
  item,
  locale,
  t,
  mode,
  notice,
  closing,
  onClose,
  onEvidence,
  onDecision,
}: {
  item: NoShowCase
  locale: Locale
  t: T
  mode: State
  notice: boolean
  closing: boolean
  onClose: () => void
  onEvidence: (entry: NoShowEvidence) => void
  onDecision: () => void
}) {
  const permissionLost = mode === 'permission'
  return (
    <aside
      className={`no-show-drawer admin-motion-drawer${closing ? ' is-closing' : ''}`}
      aria-label={`${t('Case')} ${item.id}`}
      inert={closing}
    >
      <header>
        <div>
          <p className="no-show-kicker">
            {t('Restricted case')} · {item.id}
          </p>
          <h2>{item.bookingId}</h2>
          <p>{t(item.reporter)}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('Close case details')}
        >
          <AdminIcon name="close" />
        </button>
      </header>
      <div className="no-show-drawer-scroll">
        {notice && (
          <div className="no-show-result" role="status">
            <AdminIcon name="check" />
            <div>
              <strong>{t('Final decision recorded')}</strong>
              <p>{t('Decision saved. The booking is Not Completed.')}</p>
            </div>
          </div>
        )}
        <section className="no-show-summary">
          <div>
            <small>{t('Case')}</small>
            <StatusBadge status={item.status} t={t} />
          </div>
          <div>
            <small>{t('Handling deadline (48 hours)')}</small>
            <strong>{t(item.deadline)}</strong>
          </div>
        </section>
        <section>
          <h3>{t('Reporter statement')}</h3>
          <p className="no-show-copy">{t(item.description)}</p>
          <dl className="no-show-detail-list">
            <div>
              <dt>{t('Incident time')}</dt>
              <dd>{t(item.incident)}</dd>
            </div>
            <div>
              <dt>{t('Submitted')}</dt>
              <dd>{t(item.submitted)}</dd>
            </div>
          </dl>
        </section>
        <Link
          className="no-show-secondary"
          href={`${adminRoute('appointments', locale)}&search=${encodeURIComponent(item.bookingId)}`}
        >
          {t('View Booking')} {item.bookingId}
        </Link>
        <section>
          <h3>{t('Reporter attachments')}</h3>
          {item.evidence.length ? (
            <div className="no-show-evidence-list">
              {item.evidence.map((entry) => (
                <button
                  type="button"
                  key={entry.id}
                  disabled={permissionLost}
                  onClick={() => onEvidence(entry)}
                  aria-label={`${t('View image')}: ${entry.fileName}`}
                >
                  <span className="no-show-evidence-thumbnail">
                    {permissionLost ? (
                      <AdminIcon name="shield" />
                    ) : (
                      <Image
                        src={entry.imageSrc}
                        alt=""
                        width={88}
                        height={66}
                        unoptimized
                      />
                    )}
                  </span>
                  <strong>{entry.fileName}</strong>
                  {permissionLost ? (
                    <span className="no-show-restricted">
                      {t('Restricted')}
                    </span>
                  ) : (
                    <span className="no-show-evidence-open">
                      {t('View image')}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="no-show-copy">{t('No evidence was submitted.')}</p>
          )}
          {permissionLost && (
            <p className="no-show-permission-note">
              {t(
                'Evidence access was removed. Sensitive previews are no longer rendered.',
              )}
            </p>
          )}
        </section>
        {item.decision && (
          <section className="no-show-final-decision">
            <small>{t('Final decision')}</small>
            <strong>{t(item.decision)}</strong>
            <p>{t(item.decisionReason || '')}</p>
            <span>{t('Audit recorded · Notification request delivered')}</span>
          </section>
        )}
        <section>
          <h3>{t('Case timeline')}</h3>
          <ol className="no-show-timeline">
            {item.timeline.map((event, index) => (
              <li key={`${event}-${index}`}>
                <i />
                <div>
                  <strong>{t(event)}</strong>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <footer>
        {item.status === 'Open' && mode === 'ready' ? (
          <button
            className="no-show-primary"
            type="button"
            onClick={onDecision}
          >
            {t('Make Decision')}
          </button>
        ) : (
          <span>
            {t(
              permissionLost
                ? 'Decision unavailable without case evidence permission.'
                : mode === 'stale'
                  ? 'Reload details before making a decision.'
                  : 'Resolved cases are read-only.',
            )}
          </span>
        )}
      </footer>
    </aside>
  )
}

function EvidenceViewer({
  entry,
  t,
  onClose,
}: {
  entry: NoShowEvidence
  t: T
  onClose: () => void
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const closeButton = useRef<HTMLButtonElement>(null)
  const { closing, dismiss } = useAnimatedDismiss(onClose)
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    closeButton.current?.focus()
    return () => previousFocus?.focus()
  }, [])
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dismiss])
  return (
    <div
      className={`no-show-backdrop admin-motion-backdrop${closing ? ' is-closing' : ''}`}
      inert={closing}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <section
        className="no-show-viewer admin-motion-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="no-show-evidence-title"
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return
          const buttons =
            event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
          const first = buttons[0]
          const last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}
      >
        <header>
          <div>
            <h2 id="no-show-evidence-title">{entry.fileName}</h2>
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={dismiss}
            aria-label={t('Close evidence viewer')}
          >
            <AdminIcon name="close" />
          </button>
        </header>
        <div className="no-show-preview">
          {imageFailed ? (
            <p className="no-show-image-error" role="status">
              {t(
                'Unable to load this image. Close and reopen it to try again.',
              )}
            </p>
          ) : (
            <Image
              className="no-show-full-image"
              src={entry.imageSrc}
              alt={t(entry.imageAlt)}
              width={entry.width}
              height={entry.height}
              unoptimized
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <footer>
          <button className="no-show-secondary" type="button" onClick={dismiss}>
            {t('Close Viewer')}
          </button>
        </footer>
      </section>
    </div>
  )
}

function DecisionDialog({
  item,
  t,
  onClose,
  onConfirm,
}: {
  item: NoShowCase
  t: T
  onClose: () => void
  onConfirm: (decision: string, reason: string) => void
}) {
  const [decision, setDecision] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState(false)
  const pendingDecision = useRef<{ decision: string; reason: string } | null>(
    null,
  )
  const { closing, dismiss } = useAnimatedDismiss(() => {
    if (pendingDecision.current) {
      onConfirm(
        pendingDecision.current.decision,
        pendingDecision.current.reason,
      )
    } else {
      onClose()
    }
  })
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dismiss])
  const choices = [
    'Not Completed — Customer',
    'Not Completed — Service Provider',
  ]
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!decision || !reason.trim()) {
      setError(true)
      return
    }
    pendingDecision.current = { decision, reason: reason.trim() }
    dismiss()
  }
  return (
    <div
      className={`no-show-backdrop admin-motion-backdrop${closing ? ' is-closing' : ''}`}
      inert={closing}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <section
        className="no-show-decision-dialog admin-motion-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="no-show-decision-title"
      >
        <span className="no-show-dialog-icon">
          <AdminIcon name="clock" />
        </span>
        <p className="no-show-kicker">
          {item.id} · {t('no automatic location decision')}
        </p>
        <h2 id="no-show-decision-title">{t('Make No-Show Decision')}</h2>
        <p>
          {t(
            'Choose exactly one responsible party. The booking will become Not Completed and both parties will be notified after current-record validation.',
          )}
        </p>
        <form onSubmit={submit} noValidate>
          <div className="no-show-decision-options">
            {choices.map((choice) => (
              <label key={choice}>
                <input
                  type="radio"
                  name="no-show-outcome"
                  value={choice}
                  checked={decision === choice}
                  onChange={() => {
                    setDecision(choice)
                    setError(false)
                  }}
                />
                <span>
                  <strong>{t(choice)}</strong>
                  <small>
                    {t(
                      choice === choices[0]
                        ? 'Record the Customer as the party that did not complete.'
                        : 'Record the Service Provider as the party that did not complete.',
                    )}
                  </small>
                </span>
              </label>
            ))}
          </div>
          <label className="no-show-reason">
            <span>
              {t('Decision Reason')} <b>{t('Required')}</b>
            </span>
            <textarea
              rows={3}
              value={reason}
              onChange={(event) => {
                setReason(event.target.value)
                setError(false)
              }}
              placeholder={t('Explain the reviewed decision')}
            />
          </label>
          {error && (
            <p className="no-show-error" role="alert">
              {t('Decision must include a responsible party and a reason.')}
            </p>
          )}
          <div className="no-show-notification">
            <AdminIcon name="notification" />
            <span>
              <strong>{t('Notification preview')}</strong>
              <small>
                {t(
                  'Both parties receive the final decision; delivery outcome is logged separately.',
                )}
              </small>
            </span>
          </div>
          <div className="no-show-dialog-actions">
            <button
              className="no-show-secondary"
              type="button"
              onClick={dismiss}
            >
              {t('Go Back')}
            </button>
            <button
              className="no-show-primary"
              type="submit"
              disabled={!decision || !reason.trim()}
            >
              {t('Confirm Decision')}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export function AdminNoShow({
  locale,
  initialCase,
  initialState,
}: {
  locale: Locale
  initialCase?: string
  initialState?: string
}) {
  const t = (source: string) => noShowT(locale, source)
  const [cases, setCases] = useState<NoShowCase[]>(initialNoShowCases)
  const [tab, setTab] = useState<'Open' | 'Resolved'>(
    initialState === 'resolved' ? 'Resolved' : 'Open',
  )
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('30-days')
  const [status, setStatus] = useState('all')
  const [selectedId, setSelectedId] = useState<string | null>(
    initialNoShowCases.find((item) => item.id === initialCase)?.id ?? null,
  )
  const [mode, setMode] = useState<State>(
    initialState === 'permission' ||
      initialState === 'stale' ||
      initialState === 'loading' ||
      initialState === 'load-error'
      ? initialState
      : 'ready',
  )
  const [decisionOpen, setDecisionOpen] = useState(initialState === 'decision')
  const [evidence, setEvidence] = useState<NoShowEvidence | null>(null)
  const [noticeId, setNoticeId] = useState<string | null>(null)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const { closing, dismiss, cancel } = useAnimatedDismiss(() =>
    setSelectedId(null),
  )
  const selected = cases.find((item) => item.id === selectedId)
  const filtered = useMemo(
    () =>
      cases.filter((item) => {
        const query = search.trim().toLocaleLowerCase()
        const day = Number(item.submitted.match(/Sep\s+(\d+)/)?.[1] || 0)
        return (
          item.status === tab &&
          (status === 'all' || item.status === status) &&
          (date !== '7-days' || (day >= 23 && day <= 29)) &&
          (!query ||
            [item.id, item.bookingId, item.reporter].some((value) =>
              value.toLocaleLowerCase().includes(query),
            ))
        )
      }),
    [cases, tab, search, date, status],
  )

  function switchTab(next: 'Open' | 'Resolved') {
    cancel()
    setTab(next)
    setSelectedId(null)
    setNoticeId(null)
    setMode('ready')
  }
  function confirmDecision(decision: string, reason: string) {
    if (!selected || selected.status !== 'Open') {
      setMode('stale')
      setDecisionOpen(false)
      return
    }
    setCases((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              status: 'Resolved',
              decision,
              decisionReason: reason,
              timeline: [
                'Final decision recorded · Ava Morgan',
                ...item.timeline,
              ],
            }
          : item,
      ),
    )
    setDecisionOpen(false)
    setNoticeId(selected.id)
  }
  function resetFilters() {
    setSearch('')
    setDate('30-days')
    setStatus('all')
    setMode('ready')
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title={t('No-Show Resolution')}
        active="no-show"
        onChangePassword={() => setPasswordOpen(true)}
      >
        <div className="no-show-page">
          {mode === 'stale' && (
            <div className="no-show-stale" role="alert">
              <AdminIcon name="warning" />
              <div>
                <strong>{t('Record changed')}</strong>
                <p>
                  {t(
                    'This case changed before confirmation. No decision or success audit was written.',
                  )}
                </p>
              </div>
              <button type="button" onClick={() => setMode('ready')}>
                {t('Reload Details')}
              </button>
            </div>
          )}
          {mode === 'loading' ? (
            <div className="no-show-state" role="status">
              <h2>{t('Loading no-show cases')}</h2>
              <div className="no-show-skeleton" />
            </div>
          ) : mode === 'load-error' ? (
            <div className="no-show-state" role="alert">
              <AdminIcon name="warning" />
              <h2>{t('Unable to load no-show cases')}</h2>
              <button
                className="no-show-secondary"
                type="button"
                onClick={() => setMode('ready')}
              >
                {t('Try Again')}
              </button>
            </div>
          ) : (
            <section className="no-show-panel">
              <div
                className="no-show-segmented"
                role="tablist"
                aria-label={t('Status')}
              >
                {(['Open', 'Resolved'] as const).map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={tab === name}
                    className={tab === name ? 'is-active' : ''}
                    onClick={() => switchTab(name)}
                  >
                    {t(name)}
                    <small>
                      {cases.filter((item) => item.status === name).length}
                    </small>
                  </button>
                ))}
              </div>
              <form
                className="no-show-filters"
                onSubmit={(event) => event.preventDefault()}
              >
                <label className="no-show-search">
                  <AdminIcon name="search" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={t('Search case, booking or reporter')}
                    aria-label={t('Search case, booking or reporter')}
                  />
                </label>
                <label>
                  <span>{t('Date')}</span>
                  <select
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value)
                      dismiss()
                    }}
                  >
                    <option value="30-days">{t('Last 30 days')}</option>
                    <option value="7-days">{t('Last 7 days')}</option>
                  </select>
                </label>
                <label>
                  <span>{t('Status')}</span>
                  <select
                    value={status}
                    onChange={(event) => {
                      setStatus(event.target.value)
                      dismiss()
                    }}
                  >
                    <option value="all">{t('All statuses')}</option>
                    <option value="Open">{t('Open')}</option>
                    <option value="Resolved">{t('Resolved')}</option>
                  </select>
                </label>
              </form>
              {filtered.length ? (
                <div className="no-show-table-scroll">
                  <div
                    className="no-show-table"
                    role="table"
                    aria-label={t('No-Show Resolution')}
                  >
                    <div className="no-show-table-head" role="row">
                      {[
                        'Case / booking',
                        'Reporter',
                        'Incident',
                        'Submitted',
                        'Handling deadline (48 hours)',
                        'Status',
                        '',
                      ].map((heading, index) => (
                        <span role="columnheader" key={`${heading}-${index}`}>
                          {t(heading)}
                        </span>
                      ))}
                    </div>
                    {filtered.map((item) => (
                      <div
                        key={item.id}
                        role="row"
                        className={selectedId === item.id ? 'is-selected' : ''}
                      >
                        <div role="cell">
                          <strong>{item.id}</strong>
                          <small>{item.bookingId}</small>
                        </div>
                        <span role="cell">{t(item.reporter)}</span>
                        <span role="cell">{t(item.incident)}</span>
                        <span role="cell">{t(item.submitted)}</span>
                        <span role="cell">{t(item.deadline)}</span>
                        <span role="cell">
                          <StatusBadge status={item.status} t={t} />
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            cancel()
                            setSelectedId(item.id)
                            setNoticeId(null)
                          }}
                        >
                          {t('Review')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-show-empty">
                  <AdminIcon name="search" />
                  <h2>{t('No no-show cases here')}</h2>
                  <button
                    className="no-show-secondary"
                    type="button"
                    onClick={resetFilters}
                  >
                    {t('Clear Filters')}
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </AdminShell>
      {mode !== 'loading' && mode !== 'load-error' && selected && (
        <CaseDrawer
          key={selected.id}
          item={selected}
          locale={locale}
          t={t}
          mode={mode}
          notice={noticeId === selected.id}
          closing={closing}
          onClose={dismiss}
          onEvidence={setEvidence}
          onDecision={() => setDecisionOpen(true)}
        />
      )}
      {selected && decisionOpen && (
        <DecisionDialog
          item={selected}
          t={t}
          onClose={() => setDecisionOpen(false)}
          onConfirm={confirmDecision}
        />
      )}
      {evidence &&
        selected &&
        mode !== 'permission' &&
        selected.evidence.some((entry) => entry.id === evidence.id) && (
          <EvidenceViewer
            entry={evidence}
            t={t}
            onClose={() => setEvidence(null)}
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
