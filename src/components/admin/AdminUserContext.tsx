'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { usersT } from '@/i18n/admin-users'
import { AdminIcon } from './AdminIcon'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import {
  demoBookings,
  demoDeletionRequests,
  demoSubmissions,
} from './admin-users-demo'

export type ContextView = 'bookings' | 'deletion' | 'profile'

type ContextUser = {
  id: string
  name: string
  role: 'Customer' | 'Service Provider'
  providerType?: string
  region: string
  accountStatus: string
  profileStatus?: string
  avatar: string
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function Badge({
  value,
  tone = 'neutral',
  t,
}: {
  value: string
  tone?: 'neutral' | 'positive' | 'attention'
  t: (source: string) => string
}) {
  return (
    <span className={`admin-status admin-status--${tone}`}>
      <span />
      {t(value)}
    </span>
  )
}

export function AdminUserContext({
  user,
  locale,
  initialView,
  onClose,
}: {
  user: ContextUser
  locale: Locale
  initialView: ContextView
  onClose: (view: ContextView) => void
}) {
  const t = (source: string) => usersT(locale, source)
  const bookings = demoBookings.filter(
    (item) => item.customer === user.name || item.provider === user.name,
  )
  const request = demoDeletionRequests.find(
    (item) => item.requesterId === user.id,
  )
  const submission = demoSubmissions.find((item) => item.providerId === user.id)
  const views: ContextView[] = [
    ...(bookings.length ? ['bookings' as const] : []),
    ...(request ? ['deletion' as const] : []),
    ...(user.role === 'Service Provider' ? ['profile' as const] : []),
  ]
  const [view, setView] = useState<ContextView>(
    views.includes(initialView) ? initialView : views[0],
  )
  const [bookingId, setBookingId] = useState(bookings[0]?.id ?? '')
  const [expanded, setExpanded] = useState(false)
  const closingView = useRef<ContextView>(view)
  const { closing, dismiss } = useAnimatedDismiss(() =>
    onClose(closingView.current),
  )
  const headingRef = useRef<HTMLHeadingElement>(null)
  const booking = bookings.find((item) => item.id === bookingId) ?? bookings[0]

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  function close(viewToClose: ContextView) {
    closingView.current = viewToClose
    dismiss()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      close(view)
      return
    }
    if (event.key !== 'Tab') return
    const controls = [
      ...event.currentTarget.querySelectorAll<HTMLButtonElement>(
        'button:not([disabled])',
      ),
    ]
    if (!controls.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (
      event.shiftKey &&
      (document.activeElement === first ||
        document.activeElement === headingRef.current)
    ) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      className={`admin-modal-backdrop admin-user-context-backdrop admin-motion-backdrop${expanded ? ' is-expanded' : ''}${closing ? ' is-closing' : ''}`}
      lang={locale}
      inert={closing}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close(view)
      }}
    >
      <section
        className={`admin-user-context admin-motion-dialog${expanded ? ' is-expanded' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-user-context-title"
        onKeyDown={handleKeyDown}
      >
        <header>
          <div>
            <p className="admin-users-kicker">
              {t(user.name)} · {t('Related records')}
            </p>
            <h2 id="admin-user-context-title" ref={headingRef} tabIndex={-1}>
              {t(
                view === 'bookings'
                  ? 'Bookings'
                  : view === 'deletion'
                    ? 'Deletion request'
                    : 'Provider profile',
              )}
            </h2>
          </div>
          <div className="admin-user-context__header-actions">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-label={t(
                expanded
                  ? 'Restore dialog size'
                  : 'Expand dialog to full screen',
              )}
              title={t(expanded ? 'Restore' : 'Expand')}
              aria-pressed={expanded}
            >
              <AdminIcon name={expanded ? 'minimize' : 'maximize'} />
            </button>
            <button
              type="button"
              onClick={() => close(view)}
              aria-label={t('Close related records')}
            >
              <AdminIcon name="close" />
            </button>
          </div>
        </header>
        <nav
          className="admin-user-context__tabs"
          aria-label={t('Related records')}
        >
          {views.map((item) => (
            <button
              type="button"
              key={item}
              className={view === item ? 'is-active' : ''}
              aria-current={view === item ? 'true' : undefined}
              onClick={() => setView(item)}
            >
              {t(
                item === 'bookings'
                  ? 'Bookings'
                  : item === 'deletion'
                    ? 'Deletion request'
                    : 'Provider profile',
              )}
            </button>
          ))}
        </nav>
        <div className="admin-user-context__body" key={view}>
          {view === 'bookings' && (
            <div className="admin-user-context__booking-layout">
              <div className="admin-user-context__booking-list">
                <h3>
                  {locale === 'vi'
                    ? `${bookings.length} lịch hẹn có trong bản mẫu`
                    : locale === 'ko'
                      ? `데모 예약 ${bookings.length}건`
                      : `${bookings.length} booking${bookings.length === 1 ? '' : 's'} available in demo`}
                </h3>
                {bookings.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`admin-user-context__booking${booking?.id === item.id ? ' is-selected' : ''}`}
                    aria-pressed={booking?.id === item.id}
                    onClick={() => setBookingId(item.id)}
                  >
                    <span>
                      <strong>{item.id}</strong>
                      <small>{t(item.scheduled)}</small>
                    </span>
                    <Badge
                      value={item.status}
                      tone={
                        item.status === 'Accepted' ||
                        item.status === 'Completed'
                          ? 'positive'
                          : 'neutral'
                      }
                      t={t}
                    />
                  </button>
                ))}
              </div>
              {booking && (
                <div className="admin-user-context__detail" key={booking.id}>
                  <div className="admin-user-context__section-heading">
                    <div>
                      <p className="admin-users-kicker">
                        {booking.id} ·{' '}
                        {locale === 'en'
                          ? 'booking snapshot'
                          : t('Booking snapshot')}
                      </p>
                      <h3>{t(booking.service)}</h3>
                    </div>
                    <Badge
                      value={booking.status}
                      tone={
                        booking.status === 'Accepted' ||
                        booking.status === 'Completed'
                          ? 'positive'
                          : 'neutral'
                      }
                      t={t}
                    />
                  </div>
                  <dl className="admin-detail-list">
                    <Field label={t('Customer')} value={t(booking.customer)} />
                    <Field
                      label={t('Service Provider')}
                      value={t(booking.provider)}
                    />
                    <Field
                      label={t('Provider type')}
                      value={t(booking.providerType)}
                    />
                    <Field label={t('Duration')} value={t(booking.duration)} />
                    <Field
                      label={t('Price at booking')}
                      value={t(booking.price)}
                    />
                    <Field
                      label={t('Scheduled')}
                      value={t(booking.scheduled)}
                    />
                    <Field label={t('Location')} value={t(booking.location)} />
                    {booking.completedAt && (
                      <Field
                        label={t('Completed')}
                        value={t(booking.completedAt)}
                      />
                    )}
                    {booking.cancelledAt && (
                      <Field
                        label={t('Cancelled')}
                        value={t(booking.cancelledAt)}
                      />
                    )}
                  </dl>
                  <section>
                    <h4>{t('Booking note')}</h4>
                    <p>{t(booking.note || 'No booking note was provided.')}</p>
                  </section>
                  {(booking.rejectionReason || booking.cancellationReason) && (
                    <section>
                      <h4>{t('Recorded reason')}</h4>
                      <p>
                        {t(
                          booking.rejectionReason ||
                            booking.cancellationReason ||
                            '',
                        )}
                      </p>
                    </section>
                  )}
                  <section>
                    <h4>{t('Associated records')}</h4>
                    <p>
                      {[booking.noShowId, booking.complaintId]
                        .filter(Boolean)
                        .join(' · ') || t('No associated cases.')}
                    </p>
                  </section>
                  <section>
                    <h4>{t('State history')}</h4>
                    <ol>
                      <li>
                        {t(booking.customer)}{' '}
                        {t('requested this booking · time unavailable in demo')}
                      </li>
                      {booking.chatEligible && (
                        <li>
                          {t(booking.provider)}{' '}
                          {t(
                            'accepted this booking · time unavailable in demo',
                          )}
                        </li>
                      )}
                      <li>
                        {t('Current state:')} {t(booking.status)} ·{' '}
                        {t('time unavailable in demo')}
                      </li>
                    </ol>
                  </section>
                </div>
              )}
            </div>
          )}
          {view === 'deletion' && request && (
            <div className="admin-user-context__detail">
              <div className="admin-five-info">
                <AdminIcon name="shieldWarning" />
                <div>
                  <strong>{t('Policy Required')}</strong>
                  <p>
                    {t(
                      'Deletion policy not configured. This request is read-only.',
                    )}
                  </p>
                </div>
              </div>
              <div className="admin-user-context__section-heading">
                <div>
                  <p className="admin-users-kicker">{request.id}</p>
                  <h3>{t('Request detail')}</h3>
                </div>
                <Badge value={request.status} tone="attention" t={t} />
              </div>
              <dl className="admin-detail-list">
                <Field label={t('Requester')} value={t(request.requester)} />
                <Field label={t('Account')} value={t(request.account)} />
                <Field label={t('Requested')} value={t(request.requested)} />
                <Field
                  label={t('Policy reference')}
                  value={t('Not supplied')}
                />
              </dl>
              <section>
                <h4>{t('Related active bookings')}</h4>
                {request.bookings.length ? (
                  request.bookings.map((item) => <p key={item}>{t(item)}</p>)
                ) : (
                  <p>{t('No active booking linked.')}</p>
                )}
              </section>
              <section>
                <h4>{t('Open cases and preservation')}</h4>
                {request.cases.length ? (
                  request.cases.map((item) => <p key={item}>{t(item)}</p>)
                ) : (
                  <p>{t('No open case linked.')}</p>
                )}
              </section>
              <section>
                <h4>{t('Decision history')}</h4>
                <ol>
                  {request.history.map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ol>
              </section>
            </div>
          )}
          {view === 'profile' && (
            <div className="admin-user-context__detail">
              <div className="admin-user-context__section-heading">
                <div>
                  <p className="admin-users-kicker">
                    {submission
                      ? `${submission.id} · ${submission.version}`
                      : t('Provider account')}
                  </p>
                  <h3>{t(user.name)}</h3>
                </div>
                <Badge
                  value={submission?.status ?? user.profileStatus ?? '—'}
                  tone={
                    submission?.status === 'Pending' ? 'attention' : 'neutral'
                  }
                  t={t}
                />
              </div>
              <div className="admin-user-context__profile">
                <Image
                  unoptimized
                  src={submission?.avatar ?? user.avatar}
                  width={140}
                  height={140}
                  alt=""
                />
                <dl className="admin-detail-list">
                  <Field
                    label={t('Provider type')}
                    value={t(user.providerType ?? '—')}
                  />
                  <Field label={t('Region')} value={t(user.region)} />
                  <Field label={t('Account')} value={t(user.accountStatus)} />
                  <Field
                    label={t('Profile')}
                    value={t(user.profileStatus ?? '—')}
                  />
                  {submission && (
                    <>
                      <Field
                        label={t('Submission')}
                        value={t(submission.submissionType)}
                      />
                      <Field
                        label={t('Submitted')}
                        value={t(submission.submitted)}
                      />
                    </>
                  )}
                </dl>
              </div>
              {submission ? (
                <section>
                  <h4>{t('Review context')}</h4>
                  <p>
                    {t(
                      submission.submissionType === 'Profile Update'
                        ? 'The proposed profile version is awaiting review against the currently published version.'
                        : 'This new provider profile has no published version yet.',
                    )}
                  </p>
                  <dl className="admin-detail-list">
                    <Field
                      label={t('Images')}
                      value={t(
                        '4 submitted · portrait, workspace, service environment',
                      )}
                    />
                    <Field
                      label={t('Services & prices')}
                      value={t('3 services · $68–$120 · 45–90 minutes')}
                    />
                    <Field
                      label={t('Working hours')}
                      value={t('Monday–Friday · 09:00–17:00')}
                    />
                    <Field
                      label={t('Service region')}
                      value={t(submission.region)}
                    />
                  </dl>
                </section>
              ) : (
                <section>
                  <h4>{t('Profile context')}</h4>
                  <p>
                    {t(
                      'No verification submission is linked to this account. The current profile state is shown above.',
                    )}
                  </p>
                </section>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
