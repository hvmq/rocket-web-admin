'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { reviewsT } from '@/i18n/admin-reviews'
import { AdminIcon } from './AdminIcon'
import { AdminShell, adminRoute } from './AdminShell'
import { ChangePasswordDialog } from './AdminDashboard'
import {
  initialReviews,
  type ReviewItem,
  type ReviewVisibility,
} from './admin-reviews-demo'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './dashboard.css'
import './reviews.css'

type T = (source: string) => string
type ModerationAction = 'dismiss' | 'hide' | 'restore' | 'remove'
type Sort = 'newest' | 'oldest' | 'highest' | 'lowest'

const actionLabels: Record<ModerationAction, string> = {
  dismiss: 'Dismiss Report',
  hide: 'Hide Review',
  restore: 'Restore Review',
  remove: 'Remove Review',
}

const actionEffects: Record<ModerationAction, string> = {
  hide: 'The review becomes nonpublic and the Provider’s public average is recalculated from currently public valid reviews.',
  restore:
    'If still eligible, the original customer review becomes public again and the Provider’s public average is recalculated.',
  remove:
    'The review is removed from public surfaces. Restricted evidence remains available for any open case under retention policy.',
  dismiss:
    'The linked report closes without editing the Customer’s stars or comment and without changing review visibility.',
}

function recalculatedAverage(item: ReviewItem, action: ModerationAction) {
  if (
    action === 'dismiss' ||
    (action === 'remove' && item.visibility === 'Hidden')
  )
    return item.providerRating
  const match = item.providerRating.match(/([0-9.]+) from (\d+) public reviews/)
  if (!match) return item.providerRating
  const average = Number(match[1])
  const count = Number(match[2])
  const restoring = action === 'restore'
  const nextCount = Math.max(count + (restoring ? 1 : -1), 0)
  if (nextCount === 0) return 'No public reviews'
  const nextTotal = average * count + (restoring ? item.rating : -item.rating)
  return `${Math.max(0, nextTotal / nextCount).toFixed(1)} from ${nextCount} public reviews`
}

function ratingSummary(value: string, t: T) {
  const match = value.match(/^([0-9.]+) from (\d+) public reviews$/)
  if (!match) return t(value)
  if (t(value) !== value) return t(value)
  return `${match[1]} ${t('from')} ${match[2]} ${t('public reviews')}`
}

function ReviewStars({ rating, t }: { rating: number; t: T }) {
  return (
    <span className="review-stars" aria-label={t(`${rating} out of 5 stars`)}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

function ReviewStatus({
  visibility,
  t,
}: {
  visibility: ReviewVisibility
  t: T
}) {
  return (
    <span
      className={`review-status review-status--${visibility.toLowerCase()}`}
    >
      <i />
      {t(visibility)}
    </span>
  )
}

function ReviewFilter({
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
    <label className="review-filter">
      <span>{t(label)}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </label>
  )
}

function ReviewDrawer({
  item,
  locale,
  t,
  notice,
  closing,
  onClose,
  onAction,
}: {
  item: ReviewItem
  locale: Locale
  t: T
  notice: string
  closing: boolean
  onClose: () => void
  onAction: (action: ModerationAction) => void
}) {
  return (
    <aside
      className={`review-drawer admin-motion-drawer${closing ? ' is-closing' : ''}`}
      inert={closing}
      aria-label={`${t('Review details')} ${item.id}`}
    >
      <header>
        <div>
          <p className="review-kicker">
            {item.id} · {item.booking}
          </p>
          <h2>
            {item.id === 'RV-6208'
              ? t('Priya Shah’s review')
              : `${t('Review by')} ${t(item.reviewer)}`}
          </h2>
          <p>
            {item.id === 'RV-6208'
              ? t('For River Spa Studio · Sep 23, 2026')
              : `${t('For')} ${t(item.provider)} · ${item.dateLabel}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('Close review details')}
        >
          <AdminIcon name="close" />
        </button>
      </header>
      <div className="review-drawer-scroll">
        {notice && (
          <div className="review-notice" role="status">
            <AdminIcon name="check" />
            <div>
              <strong>{t('Moderation recorded')}</strong>
              <p>{notice}</p>
            </div>
          </div>
        )}
        <section className="review-original">
          <div>
            <ReviewStars rating={item.rating} t={t} />
            <ReviewStatus visibility={item.visibility} t={t} />
          </div>
          <blockquote>{t(item.text)}</blockquote>
        </section>
        <section>
          <h3>{t('Linked records')}</h3>
          <div className="review-related-links">
            <Link
              href={`${adminRoute('appointments', locale)}&search=${encodeURIComponent(item.booking)}`}
            >
              <span className="review-related-icon">
                <AdminIcon name="calendar" />
              </span>
              <span>
                <small>{t('Completed booking')}</small>
                <strong>{item.booking}</strong>
              </span>
              <AdminIcon name="arrow" />
            </Link>
            <Link
              href={`${adminRoute('users', locale)}&search=${encodeURIComponent(item.provider)}`}
            >
              <span className="review-related-icon">
                <AdminIcon name="briefcase" />
              </span>
              <span>
                <small>{t(item.providerType)}</small>
                <strong>{t(item.provider)}</strong>
              </span>
              <AdminIcon name="arrow" />
            </Link>
          </div>
        </section>
        <section>
          <div className="review-section-heading">
            <div>
              <h3>{t('Reports')}</h3>
              <p>
                {item.reports.length === 0
                  ? t('No linked reports')
                  : item.reports.length === 1
                    ? t('1 linked report')
                    : t('2 linked reports')}
              </p>
            </div>
            <span
              className={`review-report-count${item.reports.length === 0 ? ' is-clear' : ''}`}
            >
              <i />
              {item.reports.length}
            </span>
          </div>
          {item.reports.length > 0 && (
            <ul className="review-message-list">
              {item.reports.map((reason) => (
                <li key={reason}>{t(reason)}</li>
              ))}
            </ul>
          )}
        </section>
        <section className="review-rating-impact">
          <small>{t('Provider public rating')}</small>
          <strong>{ratingSummary(item.providerRating, t)}</strong>
        </section>
        <section>
          <h3>{t('Moderation timeline')}</h3>
          <ol className="review-timeline">
            {item.timeline.map((event, index) => (
              <li key={`${index}-${event}`}>
                <i />
                <div>
                  <strong>{t(event)}</strong>
                  <small>
                    {t(
                      index === 0
                        ? 'Latest activity'
                        : 'Recorded in case history',
                    )}
                  </small>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <footer>
        {item.visibility === 'Removed' ? (
          <span className="review-readonly">
            {t('Removed reviews cannot be restored or edited.')}
          </span>
        ) : (
          <>
            {item.reports.length > 0 && (
              <button
                type="button"
                className="review-secondary"
                onClick={() => onAction('dismiss')}
              >
                {t('Dismiss Report')}
              </button>
            )}
            {item.visibility === 'Hidden' ? (
              <button
                type="button"
                className="review-secondary"
                onClick={() => onAction('restore')}
              >
                {t('Restore Review')}
              </button>
            ) : (
              <button
                type="button"
                className="review-secondary"
                onClick={() => onAction('hide')}
              >
                {t('Hide Review')}
              </button>
            )}
            <button
              type="button"
              className="review-primary"
              onClick={() => onAction('remove')}
            >
              {t('Remove Review')}
            </button>
          </>
        )}
      </footer>
    </aside>
  )
}

function ReviewActionDialog({
  action,
  item,
  t,
  onClose,
  onConfirm,
}: {
  action: ModerationAction
  item: ReviewItem
  t: T
  onClose: () => void
  onConfirm: (reason: string) => void
}) {
  const [reason, setReason] = useState('')
  const [error, setError] = useState(false)
  const { closing, dismiss } = useAnimatedDismiss(onClose)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dismiss])
  function submit(event: FormEvent) {
    event.preventDefault()
    if (!reason.trim()) {
      setError(true)
      return
    }
    onConfirm(reason.trim())
  }
  return (
    <div
      className={`review-backdrop admin-motion-backdrop${closing ? ' is-closing' : ''}`}
      inert={closing}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <section
        className="review-dialog review-dialog--wide admin-motion-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-action-title"
      >
        <span className="review-dialog-icon">
          <AdminIcon
            name={
              action === 'remove'
                ? 'trash'
                : action === 'dismiss'
                  ? 'check'
                  : 'star'
            }
          />
        </span>
        <p className="review-kicker">
          {item.id} · {t('current state')} {t(item.visibility)}
        </p>
        <h2 id="review-action-title">{t(actionLabels[action])}?</h2>
        <p>{t(actionEffects[action])}</p>
        <form onSubmit={submit} noValidate>
          <div className="review-confirm-target">
            <span>
              <AdminIcon name="star" />
            </span>
            <div>
              <small>{t('Exact review target')}</small>
              <strong>
                {t(item.reviewer)} → {t(item.provider)}
              </strong>
              <p>
                {item.rating} {t('stars')} · {item.booking} ·{' '}
                {t('original content stays immutable')}
              </p>
            </div>
          </div>
          <label>
            <span>
              {t('Decision Reason')} <b>{t('Required')}</b>
            </span>
            <textarea
              value={reason}
              onChange={(event) => {
                setReason(event.target.value)
                setError(false)
              }}
              placeholder={t('Record the reason for this moderation decision')}
              rows={4}
              autoFocus
            />
          </label>
          <div className="review-notification-preview">
            <AdminIcon name="notification" />
            <span>
              <strong>{t('Recorded after current-state check')}</strong>
              <small>
                {t(
                  'Visibility, report timeline, audit event, rating recalculation, and applicable notification requests update together.',
                )}
              </small>
            </span>
          </div>
          {error && (
            <p className="review-dialog-error" role="alert">
              {t('A reason is required.')}
            </p>
          )}
          <div className="review-dialog-actions">
            <button
              type="button"
              className="review-secondary"
              onClick={dismiss}
            >
              {t('Go Back')}
            </button>
            <button
              type="submit"
              className="review-primary"
              disabled={!reason.trim()}
            >
              {t('Confirm')} {t(actionLabels[action])}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export function AdminReviews({
  locale,
  initialState,
  initialReview,
}: {
  locale: Locale
  initialState?: string
  initialReview?: string
}) {
  const t = (source: string) => reviewsT(locale, source)
  const [reviews, setReviews] = useState(initialReviews)
  const [selectedId, setSelectedId] = useState<string | null>(
    initialState === 'empty'
      ? null
      : (initialReviews.find((item) => item.id === initialReview)?.id ?? null),
  )
  const [search, setSearch] = useState('')
  const [rating, setRating] = useState('all')
  const [date, setDate] = useState('30-days')
  const [reported, setReported] = useState('all')
  const [visibility, setVisibility] = useState('all')
  const [providerType, setProviderType] = useState('all')
  const [sort, setSort] = useState<Sort>('newest')
  const [error, setError] = useState(initialState === 'error')
  const [stale, setStale] = useState(initialState === 'stale')
  const [forcedEmpty, setForcedEmpty] = useState(initialState === 'empty')
  const [notice, setNotice] = useState('')
  const [action, setAction] = useState<ModerationAction | null>(null)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const { closing, dismiss, cancel } = useAnimatedDismiss(() =>
    setSelectedId(null),
  )
  const selected = reviews.find((item) => item.id === selectedId)
  const filtered = useMemo(
    () =>
      (forcedEmpty ? [] : reviews)
        .filter((item) => {
          const query = search.trim().toLocaleLowerCase()
          const minDate = date === '7-days' ? '2026-09-22' : '2026-08-30'
          return (
            (!query ||
              [
                item.id,
                item.reviewer,
                item.provider,
                item.booking,
                item.text,
              ].some((value) => value.toLocaleLowerCase().includes(query))) &&
            (rating === 'all' || item.rating === Number(rating)) &&
            item.date >= minDate &&
            (reported === 'all' ||
              (reported === 'reported'
                ? item.reports.length > 0
                : item.reports.length === 0)) &&
            (visibility === 'all' || item.visibility === visibility) &&
            (providerType === 'all' || item.providerType === providerType)
          )
        })
        .sort((a, b) =>
          sort === 'newest'
            ? b.date.localeCompare(a.date)
            : sort === 'oldest'
              ? a.date.localeCompare(b.date)
              : sort === 'highest'
                ? b.rating - a.rating
                : a.rating - b.rating,
        ),
    [
      reviews,
      forcedEmpty,
      search,
      rating,
      date,
      reported,
      visibility,
      providerType,
      sort,
    ],
  )

  function clearFilters() {
    setSearch('')
    setRating('all')
    setDate('30-days')
    setReported('all')
    setVisibility('all')
    setProviderType('all')
    setSort('newest')
    setForcedEmpty(false)
  }
  function openReview(id: string) {
    cancel()
    setSelectedId(id)
    setNotice('')
  }
  function confirmAction(reason: string) {
    if (!selected || !action) return
    const valid =
      action === 'dismiss'
        ? selected.reports.length > 0
        : action === 'hide'
          ? selected.visibility === 'Visible'
          : action === 'restore'
            ? selected.visibility === 'Hidden'
            : selected.visibility !== 'Removed'
    if (!valid || stale) {
      setAction(null)
      setStale(true)
      return
    }
    const nextVisibility =
      action === 'restore'
        ? 'Visible'
        : action === 'hide'
          ? 'Hidden'
          : action === 'remove'
            ? 'Removed'
            : selected.visibility
    const nextAverage = recalculatedAverage(selected, action)
    const timelineEvent =
      action === 'dismiss'
        ? 'Review report dismissed · reason audited · reporter notification requested'
        : `${t(nextVisibility)} ${t('from')} ${t(selected.visibility)} · Ava Morgan · ${t('reason audited')}`
    setReviews((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              visibility: nextVisibility,
              providerRating: nextAverage,
              lastDecisionReason: reason,
              reports:
                action === 'dismiss' ? item.reports.slice(1) : item.reports,
              timeline: [timelineEvent, ...item.timeline],
            }
          : item,
      ),
    )
    setAction(null)
    setNotice(
      action === 'dismiss'
        ? t(
            'Report dismissed after current-state validation. The original review and public visibility were unchanged.',
          )
        : `${t(`Review ${nextVisibility.toLowerCase()}.`)} ${t('The Provider’s public average is now')} ${ratingSummary(nextAverage, t)}; ${t('audit and applicable notification requests were recorded.')}`,
    )
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title="Review Moderation"
        active="reviews"
        onChangePassword={() => setPasswordOpen(true)}
      >
        <section className="review-page admin-motion-enter">
          {stale && (
            <div className="review-stale" role="alert">
              <AdminIcon name="warning" />
              <p>
                {t(
                  'This review or its report state changed after the detail opened. Reload before recording a decision.',
                )}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStale(false)
                  setAction(null)
                }}
              >
                {t('Reload Details')}
              </button>
            </div>
          )}
          <div className="review-table-panel">
            <form
              className="review-filters"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="review-search">
                <AdminIcon name="search" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t('Search review, person or booking')}
                  aria-label={t('Search reviews')}
                />
              </label>
              <ReviewFilter
                label="Rating"
                value={rating}
                onChange={setRating}
                t={t}
                options={[
                  { value: 'all', label: 'All ratings' },
                  ...[5, 4, 3, 2, 1].map((n) => ({
                    value: String(n),
                    label: `${n} stars`,
                  })),
                ]}
              />
              <ReviewFilter
                label="Date"
                value={date}
                onChange={setDate}
                t={t}
                options={[
                  { value: '7-days', label: 'Last 7 days' },
                  { value: '30-days', label: 'Last 30 days' },
                ]}
              />
              <ReviewFilter
                label="Reports"
                value={reported}
                onChange={setReported}
                t={t}
                options={[
                  { value: 'all', label: 'All reviews' },
                  { value: 'reported', label: 'Reported only' },
                  { value: 'clear', label: 'No reports' },
                ]}
              />
              <ReviewFilter
                label="Visibility"
                value={visibility}
                onChange={setVisibility}
                t={t}
                options={[
                  { value: 'all', label: 'All states' },
                  { value: 'Visible', label: 'Visible' },
                  { value: 'Hidden', label: 'Hidden' },
                  { value: 'Removed', label: 'Removed' },
                ]}
              />
              <ReviewFilter
                label="Provider type"
                value={providerType}
                onChange={setProviderType}
                t={t}
                options={[
                  { value: 'all', label: 'All types' },
                  {
                    value: 'Individual Therapist',
                    label: 'Individual Therapist',
                  },
                  { value: 'Massage Business', label: 'Massage Business' },
                ]}
              />
              <ReviewFilter
                label="Sort by"
                value={sort}
                onChange={(value) => setSort(value as Sort)}
                t={t}
                options={[
                  { value: 'newest', label: 'Newest first' },
                  { value: 'oldest', label: 'Oldest first' },
                  { value: 'highest', label: 'Highest rating' },
                  { value: 'lowest', label: 'Lowest rating' },
                ]}
              />
            </form>
            {error ? (
              <div className="review-empty" role="alert">
                <AdminIcon name="warning" />
                <h2>{t('Unable to load reviews')}</h2>
                <button
                  type="button"
                  className="review-primary"
                  onClick={() => setError(false)}
                >
                  {t('Try Again')}
                </button>
              </div>
            ) : (
              <div className="review-table-scroll">
                <div
                  className="review-table"
                  role="table"
                  aria-label={t('Review moderation')}
                >
                  <div className="review-table-head" role="row">
                    <span>{t('Reviewer')}</span>
                    <span>{t('Provider')}</span>
                    <span>{t('Completed booking')}</span>
                    <span>{t('Review')}</span>
                    <span>{t('Public state')}</span>
                    <span>{t('Reports')}</span>
                    <span />
                  </div>
                  {filtered.map((item, index) => (
                    <div
                      className={`review-row${selectedId === item.id ? ' is-selected' : ''}`}
                      role="row"
                      key={item.id}
                      style={{
                        animationDelay: `var(--admin-motion-stagger-${Math.min(index, 4)})`,
                      }}
                    >
                      <strong>{t(item.reviewer)}</strong>
                      <div>
                        <strong>{t(item.provider)}</strong>
                        <small>{t(item.providerType)}</small>
                      </div>
                      <span>{item.booking}</span>
                      <div>
                        <ReviewStars rating={item.rating} t={t} />
                        <small>{t(item.text)}</small>
                      </div>
                      <span>
                        <ReviewStatus visibility={item.visibility} t={t} />
                      </span>
                      <span>{item.reports.length}</span>
                      <button type="button" onClick={() => openReview(item.id)}>
                        {t('View Review')}
                      </button>
                    </div>
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="review-empty">
                    <AdminIcon name="search" />
                    <h2>{t('No reviews match these filters')}</h2>
                    <button
                      type="button"
                      className="review-secondary"
                      onClick={clearFilters}
                    >
                      {t('Clear Filters')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </AdminShell>
      {selected && !error && (
        <ReviewDrawer
          item={selected}
          locale={locale}
          t={t}
          notice={notice}
          closing={closing}
          onClose={dismiss}
          onAction={(value) => {
            setAction(value)
            setNotice('')
          }}
        />
      )}
      {action && (
        <ReviewActionDialog
          action={action}
          item={selected!}
          t={t}
          onClose={() => setAction(null)}
          onConfirm={confirmAction}
        />
      )}
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
