'use client'

import Link from 'next/link'
import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { dashboardT } from '@/i18n/admin-dashboard'
import { AdminIcon, type IconName } from './AdminIcon'
import { AdminShell, adminRoute } from './AdminShell'
import { AdminOverlay } from './AdminOverlay'
import './dashboard.css'

type Range = '7-days' | '30-days' | 'quarter'
type Mode = 'ready' | 'empty' | 'error'
type Counts = {
  customers: string
  customerActive: string
  customerLocked: string
  providers: string
  providerApproved: string
  providerPending: string
  appointments: readonly [string, string, string, string, string, string]
}

const countsByRange: Record<Range, Counts> = {
  '7-days': {
    customers: '1,284',
    customerActive: '1,261',
    customerLocked: '23',
    providers: '286',
    providerApproved: '241',
    providerPending: '23',
    appointments: ['186', '142', '21', '318', '29', '12'],
  },
  '30-days': {
    customers: '6,842',
    customerActive: '6,714',
    customerLocked: '128',
    providers: '1,286',
    providerApproved: '1,124',
    providerPending: '23',
    appointments: ['642', '518', '74', '1,946', '183', '41'],
  },
  quarter: {
    customers: '14,208',
    customerActive: '13,944',
    customerLocked: '264',
    providers: '2,604',
    providerApproved: '2,297',
    providerPending: '23',
    appointments: ['1,407', '1,162', '164', '5,286', '492', '108'],
  },
}

const appointmentStatuses = [
  'Pending',
  'Accepted',
  'Rejected',
  'Completed',
  'Cancelled',
  'Not Completed',
] as const

function RouteLink({
  locale,
  slug,
  filter,
  range,
  children,
  className,
}: {
  locale: Locale
  slug: string
  filter?: string
  range?: Range
  children: ReactNode
  className?: string
}) {
  return (
    <Link className={className} href={adminRoute(slug, locale, filter, range)}>
      {children}
    </Link>
  )
}

function MetricCard({
  icon,
  label,
  value,
  children,
  wide = false,
}: {
  icon: IconName
  label: string
  value: string
  children: ReactNode
  wide?: boolean
}) {
  return (
    <article
      className={`admin-metric-card${wide ? ' admin-metric-card--wide' : ''}`}
    >
      <div>
        <span className="admin-metric-card__icon">
          <AdminIcon name={icon} />
        </span>
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <footer className={wide ? 'admin-appointment-breakdown' : undefined}>
        {children}
      </footer>
    </article>
  )
}

function QueueCard({
  locale,
  icon,
  count,
  title,
  detail,
  slug,
  filter,
}: {
  locale: Locale
  icon: IconName
  count: string
  title: string
  detail: string
  slug: string
  filter: string
}) {
  return (
    <RouteLink
      locale={locale}
      slug={slug}
      filter={filter}
      className="admin-queue-card"
    >
      <span>
        <AdminIcon name={icon} />
      </span>
      <div>
        <strong>{count}</strong>
        <p>{title}</p>
        <small>{detail}</small>
      </div>
      <AdminIcon name="arrow" />
    </RouteLink>
  )
}

export function ChangePasswordDialog({
  locale,
  onClose,
  demoPassword,
  onPasswordChange,
  translate,
}: {
  locale: Locale
  onClose: () => void
  demoPassword: string
  onPasswordChange: (value: string) => void
  translate?: (source: string) => string
}) {
  const t = translate ?? ((source: string) => dashboardT(locale, source))
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const currentInput = useRef<HTMLInputElement>(null)
  const newInput = useRef<HTMLInputElement>(null)
  const confirmInput = useRef<HTMLInputElement>(null)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (currentPassword !== demoPassword) {
      setError('Current password is incorrect.')
      currentInput.current?.focus()
    } else if (newPassword.length < 8) {
      setError('Use at least 8 characters for the new password.')
      newInput.current?.focus()
    } else if (newPassword === currentPassword) {
      setError('Choose a password different from your current password.')
      newInput.current?.focus()
    } else if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      confirmInput.current?.focus()
    } else {
      onPasswordChange(newPassword)
      setError('')
      setSuccess(true)
    }
  }

  return (
    <AdminOverlay
      titleId="admin-change-password-title"
      onClose={onClose}
      className="admin-change-password-dialog"
    >
      {(dismiss) => (
        <>
          <span className="admin-dialog__icon">
            <AdminIcon name="lock" />
          </span>
          <h2 id="admin-change-password-title">{t('Change Password')}</h2>
          {success ? (
            <>
              <p className="admin-change-password-success" role="status">
                {t(
                  'Password updated. Use your new password the next time you sign in.',
                )}
              </p>
              <div className="admin-dialog__actions">
                <button
                  className="admin-primary-button"
                  type="button"
                  onClick={dismiss}
                  autoFocus
                >
                  {t('Done')}
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{t('Enter your current password and choose a new one.')}</p>
              <form
                className="admin-change-password-form"
                onSubmit={submit}
                noValidate
              >
                <label className="admin-field">
                  <span>{t('Current Password')}</span>
                  <input
                    ref={currentInput}
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    type="password"
                    autoComplete="current-password"
                  />
                </label>
                {demoPassword === 'Rocket2026!' && (
                  <small className="admin-demo-hint">
                    {t('Demo current password: Rocket2026!')}
                  </small>
                )}
                <label className="admin-field">
                  <span>{t('New Password')}</span>
                  <input
                    ref={newInput}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    type="password"
                    autoComplete="new-password"
                  />
                </label>
                <label className="admin-field">
                  <span>{t('Confirm New Password')}</span>
                  <input
                    ref={confirmInput}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    type="password"
                    autoComplete="new-password"
                  />
                </label>
                {error && (
                  <p className="admin-dialog-error" role="alert">
                    {t(error)}
                  </p>
                )}
                <div className="admin-dialog__actions">
                  <button
                    className="admin-secondary-button"
                    type="button"
                    onClick={dismiss}
                  >
                    {t('Cancel')}
                  </button>
                  <button className="admin-primary-button" type="submit">
                    {t('Save Password')}
                  </button>
                </div>
              </form>
            </>
          )}
        </>
      )}
    </AdminOverlay>
  )
}

export function AdminDashboard({
  locale,
  initialMode = 'ready',
}: {
  locale: Locale
  initialMode?: Mode
}) {
  const t = (source: string) => dashboardT(locale, source)
  const [range, setRange] = useState<Range>('30-days')
  const [tab, setTab] = useState<'overview' | 'statistics'>('overview')
  const [mode, setMode] = useState<Mode>(initialMode)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const counts = countsByRange[range]
  const totalAppointments = counts.appointments
    .reduce((sum, count) => sum + Number(count.replaceAll(',', '')), 0)
    .toLocaleString('en-US')

  return (
    <>
      <AdminShell
        locale={locale}
        title="Dashboard"
        onChangePassword={() => setPasswordOpen(true)}
        actions={
          <label className="admin-compact-field">
            <span>{t('Date range')}</span>
            <select
              id="admin-date-range"
              value={range}
              onChange={(event) => {
                setRange(event.target.value as Range)
                setMode('ready')
              }}
            >
              <option value="7-days">{t('Last 7 days')}</option>
              <option value="30-days">{t('Last 30 days')}</option>
              <option value="quarter">{t('This quarter')}</option>
            </select>
          </label>
        }
      >
        {mode === 'ready' ? (
          <>
            <div
              className="admin-segmented"
              role="tablist"
              aria-label={t('Dashboard view')}
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'overview'}
                className={tab === 'overview' ? 'is-active' : ''}
                onClick={() => setTab('overview')}
              >
                {t('Overview')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'statistics'}
                className={tab === 'statistics' ? 'is-active' : ''}
                onClick={() => setTab('statistics')}
              >
                {t('Statistics')}
              </button>
            </div>
            {tab === 'overview' ? (
              <>
                <section
                  className="admin-metric-grid"
                  key={range}
                  aria-label={t('Overview')}
                >
                  <MetricCard
                    icon="user"
                    label={t('Customers')}
                    value={counts.customers}
                  >
                    <RouteLink locale={locale} slug="users" filter="Active">
                      <b>{counts.customerActive}</b> {t('Active')}
                    </RouteLink>
                    <RouteLink locale={locale} slug="users" filter="Locked">
                      <b>{counts.customerLocked}</b> {t('Locked')}
                    </RouteLink>
                  </MetricCard>
                  <MetricCard
                    icon="briefcase"
                    label={t('Service Providers')}
                    value={counts.providers}
                  >
                    <span>
                      <b>{counts.providerApproved}</b> {t('Approved')}
                    </span>
                    <RouteLink
                      locale={locale}
                      slug="provider-verification"
                      filter="Pending"
                    >
                      <b>{counts.providerPending}</b> {t('Pending')}
                    </RouteLink>
                  </MetricCard>
                  <MetricCard
                    icon="calendar"
                    label={t('Appointments')}
                    value={totalAppointments}
                    wide
                  >
                    {appointmentStatuses.map((status, index) => (
                      <RouteLink
                        key={status}
                        locale={locale}
                        slug="appointments"
                        filter={status}
                        range={range}
                      >
                        <b>{counts.appointments[index]}</b>
                        {t(status)}
                      </RouteLink>
                    ))}
                  </MetricCard>
                </section>
                <section className="admin-queue-section">
                  <h2>{t('Operational queues')}</h2>
                  <div className="admin-queue-grid">
                    <QueueCard
                      locale={locale}
                      icon="shield"
                      count="23"
                      title={t('Provider reviews')}
                      detail={t('6 waiting over 24 hours')}
                      slug="provider-verification"
                      filter="Pending"
                    />
                    <QueueCard
                      locale={locale}
                      icon="clock"
                      count="5"
                      title={t('No-show cases')}
                      detail={t('Evidence review required')}
                      slug="no-show"
                      filter="Open"
                    />
                    <QueueCard
                      locale={locale}
                      icon="notes"
                      count="14"
                      title={t('Complaints')}
                      detail={t('4 new since last sign in')}
                      slug="complaints"
                      filter="New"
                    />
                  </div>
                </section>
              </>
            ) : (
              <section className="admin-statistics-panel" key={range}>
                <h2>{t('Operational statistics')}</h2>
                <div
                  className="admin-breakdown-table"
                  role="table"
                  aria-label={t('Operational statistics')}
                >
                  <div role="row" className="admin-breakdown-table__head">
                    <span>{t('Area')}</span>
                    <span>{t('Status')}</span>
                    <span>{t('Value')}</span>
                    <span>{t('Underlying records')}</span>
                  </div>
                  <div role="row">
                    <strong>{t('Customers')}</strong>
                    <span>{t('Active accounts')}</span>
                    <b>{counts.customerActive}</b>
                    <RouteLink locale={locale} slug="users" filter="Active">
                      {t('View users')}
                    </RouteLink>
                  </div>
                  <div role="row">
                    <strong>{t('Service Providers')}</strong>
                    <span>{t('Pending Review')}</span>
                    <b>{counts.providerPending}</b>
                    <RouteLink
                      locale={locale}
                      slug="provider-verification"
                      filter="Pending"
                    >
                      {t('View queue')}
                    </RouteLink>
                  </div>
                  <div role="row">
                    <strong>{t('Appointments')}</strong>
                    <span>{t('Completed')}</span>
                    <b>{counts.appointments[3]}</b>
                    <RouteLink
                      locale={locale}
                      slug="appointments"
                      filter="Completed"
                      range={range}
                    >
                      {t('View appointments')}
                    </RouteLink>
                  </div>
                  <div role="row">
                    <strong>{t('Cases')}</strong>
                    <span>{t('Open complaints')}</span>
                    <b>14</b>
                    <RouteLink locale={locale} slug="complaints" filter="New">
                      {t('View cases')}
                    </RouteLink>
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="admin-state-panel">
            <AdminIcon name={mode === 'empty' ? 'calendar' : 'warning'} />
            <h2>
              {t(
                mode === 'empty'
                  ? 'No data for this period'
                  : 'Statistics Unavailable',
              )}
            </h2>
            <button
              className={
                mode === 'empty'
                  ? 'admin-secondary-button'
                  : 'admin-primary-button'
              }
              type="button"
              onClick={() => {
                setMode('ready')
                if (mode === 'empty') {
                  setRange('30-days')
                  document.getElementById('admin-date-range')?.focus()
                }
              }}
            >
              {t(mode === 'empty' ? 'Change Date Range' : 'Try Again')}
            </button>
          </section>
        )}
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
