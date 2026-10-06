'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import type { Locale } from '@/i18n/admin-access'
import { complaintsT } from '@/i18n/admin-complaints'
import { AdminIcon } from './AdminIcon'
import { AdminShell, adminRoute } from './AdminShell'
import { ChangePasswordDialog } from './AdminDashboard'
import {
  initialComplaints,
  type Complaint,
  type ComplaintEvidence,
  type ComplaintStatus,
} from './admin-complaints-demo'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './dashboard.css'
import './complaints.css'

type T = (source: string) => string
type DialogKind = 'info' | 'close'
type PageState = 'ready' | 'loading' | 'load-error' | 'stale'

function StatusBadge({ state, t }: { state: ComplaintStatus; t: T }) {
  return (
    <span
      className={`complaint-status complaint-status--${state.toLowerCase().replace(' ', '-')}`}
    >
      <i />
      {t(state)}
    </span>
  )
}

function Modal({
  title,
  children,
  onClose,
  className = '',
}: {
  title: string
  children: ReactNode | ((dismiss: () => void) => ReactNode)
  onClose: () => void
  className?: string
}) {
  const { closing, dismiss } = useAnimatedDismiss(onClose)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dismiss])
  return (
    <div
      className={`complaint-backdrop admin-motion-backdrop${closing ? ' is-closing' : ''}`}
      inert={closing}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <section
        className={`complaint-modal admin-motion-dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {typeof children === 'function' ? children(dismiss) : children}
      </section>
    </div>
  )
}

function EvidenceImage({
  entry,
  t,
  thumbnail = false,
}: {
  entry: ComplaintEvidence
  t: T
  thumbnail?: boolean
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return thumbnail ? (
      <AdminIcon name="image" />
    ) : (
      <p className="complaint-image-error" role="status">
        {t('Unable to load this image. Close and reopen it to try again.')}
      </p>
    )
  }
  return (
    <Image
      className={thumbnail ? undefined : 'complaint-full-image'}
      src={entry.imageSrc}
      alt={thumbnail ? '' : t(entry.imageAlt)}
      width={thumbnail ? 88 : entry.width}
      height={thumbnail ? 66 : entry.height}
      unoptimized
      onError={() => setFailed(true)}
    />
  )
}

function ComplaintDrawer({
  item,
  locale,
  t,
  closing,
  pageState,
  notice,
  onClose,
  onEvidence,
  onStart,
  onAction,
}: {
  item: Complaint
  locale: Locale
  t: T
  closing: boolean
  pageState: PageState
  notice: string
  onClose: () => void
  onEvidence: (entry: ComplaintEvidence) => void
  onStart: () => void
  onAction: (kind: DialogKind) => void
}) {
  return (
    <aside
      className={`complaint-drawer admin-motion-drawer${closing ? ' is-closing' : ''}`}
      inert={closing}
      aria-label={`${t('Case')} ${item.id}`}
    >
      <header>
        <div>
          <p className="complaint-kicker">
            {item.id} · {item.bookingId}
          </p>
          <h2>{t('Complaint Details')}</h2>
          <p>
            {t(item.complainant)} · {t(item.issueType)}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('Close case details')}
        >
          <AdminIcon name="close" />
        </button>
      </header>
      <div className="complaint-drawer-scroll">
        {notice && (
          <div className="complaint-notice" role="status">
            <AdminIcon name="check" />
            <div>
              <strong>{t('Case updated')}</strong>
              <p>{t(notice)}</p>
            </div>
          </div>
        )}
        <section className="complaint-summary">
          <div>
            <small>{t('Case state')}</small>
            <StatusBadge state={item.state} t={t} />
          </div>
          <div>
            <small>{t('Assigned Admin')}</small>
            <strong>{t(item.assignee)}</strong>
          </div>
        </section>
        <section>
          <h3>{t('Submission')}</h3>
          <p className="complaint-copy">{t(item.submittedText)}</p>
          {item.evidence.length ? (
            <div className="complaint-evidence-list">
              {item.evidence.map((entry) => (
                <button
                  type="button"
                  key={entry.id}
                  onClick={() => onEvidence(entry)}
                  aria-label={`${t('View image')}: ${entry.fileName}`}
                >
                  <span className="complaint-evidence-thumbnail">
                    <EvidenceImage entry={entry} t={t} thumbnail />
                  </span>
                  <span className="complaint-evidence-copy">
                    <strong>{entry.fileName}</strong>
                    <small>{t(entry.access)}</small>
                  </span>
                  <span className="complaint-evidence-open">
                    {t('View image')}
                    <AdminIcon name="arrow" />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="complaint-evidence-empty">
              <AdminIcon name="image" />
              {t('No evidence was submitted.')}
            </p>
          )}
        </section>
        <section>
          <h3>{t('Related context')}</h3>
          <dl className="complaint-detail-list">
            <div>
              <dt>{t('Booking')}</dt>
              <dd>{item.bookingId}</dd>
            </div>
            <div>
              <dt>{t('Other party')}</dt>
              <dd>{t(item.otherParty)}</dd>
            </div>
          </dl>
          <Link
            className="complaint-secondary complaint-booking-link"
            href={`${adminRoute('appointments', locale)}&search=${encodeURIComponent(item.bookingId)}`}
          >
            {t('View Booking')} {item.bookingId}
          </Link>
        </section>
        <section className="complaint-public-section">
          <div className="complaint-section-heading">
            <h3>{t('Messages to Complainant')}</h3>
            <span>{t('Visible externally')}</span>
          </div>
          <ul className="complaint-message-list">
            {item.publicMessages.map((message, index) => (
              <li key={`${index}-${message}`}>{t(message)}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>{t('Activity Timeline')}</h3>
          <ol className="complaint-timeline">
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
        {item.state === 'New' ? (
          <button
            type="button"
            className="complaint-primary"
            disabled={pageState === 'stale'}
            onClick={onStart}
          >
            {t('Start Review')}
          </button>
        ) : item.state === 'In Progress' ? (
          <>
            <button
              type="button"
              className="complaint-secondary"
              disabled={pageState === 'stale'}
              onClick={() => onAction('info')}
            >
              {t('Request More Information')}
            </button>
            <button
              type="button"
              className="complaint-primary"
              disabled={pageState === 'stale'}
              onClick={() => onAction('close')}
            >
              {t('Close Complaint')}
            </button>
          </>
        ) : (
          <span>{t('Closed complaints are read-only.')}</span>
        )}
      </footer>
    </aside>
  )
}

export function AdminComplaints({
  locale,
  initialCase,
  initialState,
}: {
  locale: Locale
  initialCase?: string
  initialState?: string
}) {
  const t = (value: string) => complaintsT(locale, value)
  const [cases, setCases] = useState(initialComplaints)
  const initialSelection = initialComplaints.find(
    (item) => item.id === initialCase,
  )
  const [tab, setTab] = useState<ComplaintStatus>(
    initialSelection?.state ?? initialComplaints[0].state,
  )
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelection?.id ?? null,
  )
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('30-days')
  const [issue, setIssue] = useState('all')
  const [assignee, setAssignee] = useState('all')
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest')
  const [pageState, setPageState] = useState<PageState>(
    initialState === 'loading' ||
      initialState === 'load-error' ||
      initialState === 'stale'
      ? initialState
      : 'ready',
  )
  const [dialog, setDialog] = useState<DialogKind | null>(null)
  const [dialogDraft, setDialogDraft] = useState('')
  const [evidence, setEvidence] = useState<ComplaintEvidence | null>(null)
  const [notice, setNotice] = useState('')
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('RocketAdmin2026!')
  const { closing, dismiss, cancel } = useAnimatedDismiss(() =>
    setSelectedId(null),
  )

  const selected = cases.find((item) => item.id === selectedId)
  const filtered = useMemo(
    () =>
      cases
        .filter((item) => {
          const query = search.trim().toLocaleLowerCase()
          const day = Number(item.updated.match(/Sep (\d+)/)?.[1] || 0)
          return (
            item.state === tab &&
            (date !== '7-days' || day >= 23) &&
            (issue === 'all' || item.issueType === issue) &&
            (assignee === 'all' || item.assignee === assignee) &&
            (!query ||
              [item.id, item.complainant, item.bookingId].some((value) =>
                value.toLocaleLowerCase().includes(query),
              ))
          )
        })
        .sort((a, b) =>
          sort === 'newest'
            ? b.id.localeCompare(a.id)
            : a.id.localeCompare(b.id),
        ),
    [cases, tab, date, issue, assignee, search, sort],
  )

  function selectTab(value: ComplaintStatus) {
    cancel()
    setTab(value)
    setSelectedId(null)
    setNotice('')
    setPageState('ready')
  }
  function startReview() {
    if (!selected || selected.state !== 'New') {
      setPageState('stale')
      return
    }
    setCases((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              state: 'In Progress',
              assignee: 'Ava Morgan',
              updated: 'Sep 24 · 4:32 PM ICT',
              timeline: [
                'Review started · Ava Morgan · Sep 24, 4:32 PM ICT',
                ...item.timeline,
              ],
            }
          : item,
      ),
    )
    setTab('In Progress')
    setNotice('Review started with actor and timestamp recorded.')
  }
  function submitDialog(event: FormEvent) {
    event.preventDefault()
    const value = dialogDraft.trim()
    if (!selected || selected.state !== 'In Progress' || !value) {
      setDialog(null)
      setPageState('stale')
      return
    }
    const isClose = dialog === 'close'
    setCases((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              state: isClose ? 'Closed' : item.state,
              updated: 'Sep 24 · 4:32 PM ICT',
              publicMessages: [
                `${isClose ? 'Outcome' : 'More information requested'}: ${value} · Sep 24, 4:32 PM ICT`,
                ...item.publicMessages,
              ],
              timeline: [
                isClose
                  ? 'Complaint closed · Complainant notified'
                  : 'More information requested · Ava Morgan',
                ...item.timeline,
              ],
            }
          : item,
      ),
    )
    setNotice(
      isClose
        ? 'Complaint closed. Outcome and notification were recorded; booking status was unchanged.'
        : 'Question sent to the complainant. The case remains In Progress.',
    )
    setDialog(null)
    setDialogDraft('')
  }
  function resetFilters() {
    setSearch('')
    setDate('30-days')
    setIssue('all')
    setAssignee('all')
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title={t('Complaints & Disputes')}
        active="complaints"
        onChangePassword={() => setPasswordOpen(true)}
      >
        <div className="complaint-page">
          {pageState === 'stale' && (
            <div className="complaint-alert" role="alert">
              <AdminIcon name="warning" />
              <div>
                <strong>{t('Record changed')}</strong>
                <p>
                  {t(
                    'This complaint changed after it was opened. Reload before making a case decision.',
                  )}
                </p>
              </div>
              <button type="button" onClick={() => setPageState('ready')}>
                {t('Reload Details')}
              </button>
            </div>
          )}
          {pageState === 'loading' ? (
            <section className="complaint-state" role="status" aria-busy="true">
              <h2>{t('Loading complaints')}</h2>
              <div className="complaint-skeleton" />
            </section>
          ) : pageState === 'load-error' ? (
            <section className="complaint-state" role="alert">
              <AdminIcon name="warning" />
              <h2>{t('Unable to Load')}</h2>
              <p>
                {t(
                  "We couldn't load complaints. No count or result has been verified.",
                )}
              </p>
              <button
                type="button"
                className="complaint-secondary"
                onClick={() => setPageState('ready')}
              >
                {t('Try Again')}
              </button>
            </section>
          ) : (
            <section className="complaint-panel admin-motion-enter">
              <div
                className="complaint-tabs"
                role="tablist"
                aria-label={t('Case state')}
              >
                {(['New', 'In Progress', 'Closed'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={tab === value}
                    className={tab === value ? 'is-active' : ''}
                    onClick={() => selectTab(value)}
                  >
                    {t(value)}
                    <small>
                      {cases.filter((item) => item.state === value).length}
                    </small>
                  </button>
                ))}
              </div>
              <form
                className="complaint-filters"
                onSubmit={(event) => event.preventDefault()}
              >
                <label className="complaint-search">
                  <AdminIcon name="search" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={t('Search case, person or booking')}
                    aria-label={t('Search case, person or booking')}
                  />
                </label>
                <label>
                  <span>{t('Date')}</span>
                  <select
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  >
                    <option value="30-days">{t('Last 30 days')}</option>
                    <option value="7-days">{t('Last 7 days')}</option>
                  </select>
                </label>
                <label>
                  <span>{t('Issue type')}</span>
                  <select
                    value={issue}
                    onChange={(event) => setIssue(event.target.value)}
                  >
                    <option value="all">{t('All configured types')}</option>
                    {[
                      'Service details',
                      'Communication',
                      'Service experience',
                    ].map((value) => (
                      <option key={value} value={value}>
                        {t(value)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>{t('Assignee')}</span>
                  <select
                    value={assignee}
                    onChange={(event) => setAssignee(event.target.value)}
                  >
                    <option value="all">{t('All assignees')}</option>
                    <option value="Unassigned">{t('Unassigned')}</option>
                    <option value="Ava Morgan">{t('Ava Morgan')}</option>
                  </select>
                </label>
              </form>
              {filtered.length ? (
                <div className="complaint-table-scroll">
                  <div
                    className="complaint-table"
                    role="table"
                    aria-label={t('Complaints & Disputes')}
                  >
                    <div className="complaint-table-head" role="row">
                      {['Case', 'Complainant', 'Linked booking', 'State'].map(
                        (value) => (
                          <span role="columnheader" key={value}>
                            {t(value)}
                          </span>
                        ),
                      )}
                      <button
                        type="button"
                        role="columnheader"
                        onClick={() =>
                          setSort((value) =>
                            value === 'newest' ? 'oldest' : 'newest',
                          )
                        }
                        aria-label={`${t('Last update')}: ${sort === 'newest' ? t('newest first') : t('oldest first')}`}
                      >
                        {t('Last update')} {sort === 'newest' ? '↓' : '↑'}
                      </button>
                      <span role="columnheader" />
                    </div>
                    {filtered.map((item) => (
                      <div
                        key={item.id}
                        role="row"
                        className={selectedId === item.id ? 'is-selected' : ''}
                      >
                        <strong role="cell">{item.id}</strong>
                        <span role="cell">{t(item.complainant)}</span>
                        <span role="cell">{item.bookingId}</span>
                        <span role="cell">
                          <StatusBadge state={item.state} t={t} />
                        </span>
                        <span role="cell">{t(item.updated)}</span>
                        <button
                          type="button"
                          onClick={() => {
                            cancel()
                            setSelectedId(item.id)
                            setNotice('')
                          }}
                        >
                          {t('Review')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="complaint-empty">
                  <AdminIcon name="search" />
                  <h2>{t('No complaints match this view')}</h2>
                  <button
                    type="button"
                    className="complaint-secondary"
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
      {selected && pageState !== 'loading' && pageState !== 'load-error' && (
        <ComplaintDrawer
          key={selected.id}
          item={selected}
          locale={locale}
          t={t}
          closing={closing}
          pageState={pageState}
          notice={notice}
          onClose={dismiss}
          onEvidence={setEvidence}
          onStart={startReview}
          onAction={(kind) => {
            setDialog(kind)
            setDialogDraft('')
          }}
        />
      )}
      {selected && dialog && (
        <Modal
          title={t(
            dialog === 'close' ? 'Close Complaint' : 'Request More Information',
          )}
          onClose={() => setDialog(null)}
        >
          <span className="complaint-modal-icon">
            <AdminIcon name={dialog === 'close' ? 'check' : 'notes'} />
          </span>
          <p className="complaint-kicker">
            {selected.id} · {t('complainant-visible message')}
          </p>
          <h2>
            {t(
              dialog === 'close'
                ? 'Close Complaint'
                : 'Request More Information',
            )}
            ?
          </h2>
          <p>
            {t(
              dialog === 'close'
                ? 'The outcome is visible to the complainant. Closing this complaint does not change the linked booking status or create a financial remedy.'
                : 'The question is sent to the complainant and their response will append to this same case timeline.',
            )}
          </p>
          <form onSubmit={submitDialog}>
            <label>
              <span>
                {t(
                  dialog === 'close'
                    ? 'User-visible outcome'
                    : 'Question to complainant',
                )}{' '}
                <b>{t('Required')}</b>
              </span>
              <textarea
                rows={4}
                value={dialogDraft}
                onChange={(event) => setDialogDraft(event.target.value)}
                placeholder={t('Write clear, neutral case communication')}
                autoFocus
              />
            </label>
            <div className="complaint-message-preview">
              <AdminIcon name="notification" />
              <span>
                <strong>{t('Message preview')}</strong>
                <small>
                  {t('The complainant will be notified and can open')}{' '}
                  {selected.id}.
                </small>
              </span>
            </div>
            <div className="complaint-modal-actions">
              <button
                type="button"
                className="complaint-secondary"
                onClick={() => setDialog(null)}
              >
                {t('Go Back')}
              </button>
              <button
                type="submit"
                className="complaint-primary"
                disabled={!dialogDraft.trim()}
              >
                {t(dialog === 'close' ? 'Confirm Close' : 'Send Request')}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {evidence && (
        <Modal
          key={evidence.id}
          title={t('Evidence preview')}
          onClose={() => setEvidence(null)}
          className="complaint-evidence-modal"
        >
          {(dismissEvidence) => (
            <>
              <header>
                <div>
                  <h2>{evidence.fileName}</h2>
                  <p>{t(evidence.access)}</p>
                </div>
                <button
                  type="button"
                  onClick={dismissEvidence}
                  aria-label={t('Close evidence viewer')}
                  autoFocus
                >
                  <AdminIcon name="close" />
                </button>
              </header>
              <div className="complaint-preview">
                <EvidenceImage entry={evidence} t={t} />
              </div>
              <footer>
                <span>
                  <AdminIcon name="shield" />
                  {t(
                    'Read-only · access is checked again for every open request',
                  )}
                </span>
                <button
                  type="button"
                  className="complaint-secondary"
                  onClick={dismissEvidence}
                >
                  {t('Close Viewer')}
                </button>
              </footer>
            </>
          )}
        </Modal>
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
