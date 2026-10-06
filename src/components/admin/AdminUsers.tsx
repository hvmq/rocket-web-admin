'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { usersT } from '@/i18n/admin-users'
import { AdminIcon } from './AdminIcon'
import { AdminShell, adminRoute } from './AdminShell'
import { ChangePasswordDialog } from './AdminDashboard'
import { AdminUserContext, type ContextView } from './AdminUserContext'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import { demoBookings, demoDeletionRequests } from './admin-users-demo'
import './dashboard.css'
import './users.css'

type AccountStatus = 'Active' | 'Locked' | 'Deleted'
type Role = 'Customer' | 'Service Provider'
type User = {
  id: string
  name: string
  role: Role
  providerType?: 'Individual Therapist' | 'Massage Business'
  region: 'Ho Chi Minh City' | 'Da Nang' | 'Ha Noi'
  accountStatus: AccountStatus
  profileStatus?: 'Pending Review' | 'Approved' | 'Rejected'
  joined: string
  avatar: string
  email: string
  phone: string
  bookings: string
  cases: string
  deletedAt?: string
}
type Mode =
  | 'ready'
  | 'loading'
  | 'empty'
  | 'load-error'
  | 'permission'
  | 'stale'
  | 'save-error'

const photos = {
  maya: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=1200&q=82',
  lotus:
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=82',
  river:
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=82',
  serene:
    'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&crop=faces&w=1200&q=82',
  anan: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=82',
  alex: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=1200&q=82',
}

const initialUsers: User[] = [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    role: 'Service Provider',
    providerType: 'Individual Therapist',
    region: 'Ho Chi Minh City',
    accountStatus: 'Active',
    profileStatus: 'Pending Review',
    joined: 'Sep 18, 2026',
    avatar: photos.maya,
    email: 'maya@rocket.demo',
    phone: '+84 ••• ••• 678',
    bookings: '38 total · 2 upcoming',
    cases: '1 open verification',
  },
  {
    id: 'lotus-wellness',
    name: 'Lotus Wellness',
    role: 'Service Provider',
    providerType: 'Massage Business',
    region: 'Da Nang',
    accountStatus: 'Active',
    profileStatus: 'Approved',
    joined: 'Aug 04, 2026',
    avatar: photos.lotus,
    email: 'team@lotus.demo',
    phone: '+84 ••• ••• 104',
    bookings: '124 total · 8 upcoming',
    cases: 'No open cases',
  },
  {
    id: 'river-spa',
    name: 'River Spa Studio',
    role: 'Service Provider',
    providerType: 'Massage Business',
    region: 'Da Nang',
    accountStatus: 'Active',
    profileStatus: 'Pending Review',
    joined: 'Unavailable in demo',
    avatar: photos.river,
    email: 'Unavailable in demo',
    phone: 'Unavailable in demo',
    bookings: 'Linked booking BK-48270',
    cases: 'New profile review pending',
  },
  {
    id: 'serene-hands',
    name: 'Serene Hands',
    role: 'Service Provider',
    providerType: 'Individual Therapist',
    region: 'Ha Noi',
    accountStatus: 'Active',
    profileStatus: 'Approved',
    joined: 'Unavailable in demo',
    avatar: photos.serene,
    email: 'Unavailable in demo',
    phone: 'Unavailable in demo',
    bookings: 'Linked booking BK-48084',
    cases: 'No open cases',
  },
  {
    id: 'an-an-studio',
    name: 'An An Studio',
    role: 'Service Provider',
    providerType: 'Massage Business',
    region: 'Ho Chi Minh City',
    accountStatus: 'Active',
    profileStatus: 'Rejected',
    joined: 'Unavailable in demo',
    avatar: photos.anan,
    email: 'Unavailable in demo',
    phone: 'Unavailable in demo',
    bookings: 'Linked booking BK-48220',
    cases: 'Profile proposal rejected',
  },
  {
    id: 'jamie-rivera',
    name: 'Jamie Rivera',
    role: 'Customer',
    region: 'Ho Chi Minh City',
    accountStatus: 'Active',
    joined: 'Jul 22, 2026',
    avatar: photos.serene,
    email: 'jamie@rocket.demo',
    phone: '+84 ••• ••• 521',
    bookings: '12 total · 1 upcoming',
    cases: '1 complaint in progress',
  },
  {
    id: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Customer',
    region: 'Ha Noi',
    accountStatus: 'Locked',
    joined: 'Jun 11, 2026',
    avatar: photos.alex,
    email: 'alex@rocket.demo',
    phone: '+84 ••• ••• 805',
    bookings: '7 total · none upcoming',
    cases: 'Lock reviewed Sep 21',
  },
  {
    id: 'linh-nguyen',
    name: 'Linh Nguyen',
    role: 'Customer',
    region: 'Ha Noi',
    accountStatus: 'Deleted',
    joined: 'May 08, 2026',
    avatar: photos.serene,
    email: 'Unavailable in demo',
    phone: 'Unavailable in demo',
    bookings: '2 historical bookings · none upcoming',
    cases: 'No open cases',
    deletedAt: 'Sep 24, 2026 · 3:48 PM ICT',
  },
]

function Avatar({ user, large = false }: { user: User; large?: boolean }) {
  return (
    <span className={`admin-avatar${large ? ' admin-avatar--large' : ''}`}>
      <Image
        unoptimized
        src={user.avatar}
        alt=""
        width={large ? 50 : 34}
        height={large ? 50 : 34}
      />
    </span>
  )
}

function Status({
  value,
  t,
}: {
  value?: string
  t: (source: string) => string
}) {
  if (!value) return <span>—</span>
  const tone =
    value === 'Active'
      ? 'positive'
      : value === 'Pending Review' || value === 'Locked'
        ? 'attention'
        : 'neutral'
  return (
    <span
      className={`admin-status admin-status--${tone} admin-status--${value.toLowerCase().replaceAll(' ', '-')}`}
    >
      <span />
      {t(value)}
    </span>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export function AdminUsers({
  locale,
  initialMode = 'ready',
  initialFilter,
}: {
  locale: Locale
  initialMode?: Mode
  initialFilter?: string
}) {
  const t = (source: string) => usersT(locale, source)
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState(
    initialFilter === 'Active' || initialFilter === 'Locked'
      ? 'Customer'
      : 'all',
  )
  const [providerType, setProviderType] = useState('all')
  const [status, setStatus] = useState(
    initialFilter === 'Locked' ||
      initialFilter === 'Active' ||
      initialFilter === 'Deleted'
      ? initialFilter
      : 'all',
  )
  const [region, setRegion] = useState('all')
  const [selectedId, setSelectedId] = useState('')
  const [mode, setMode] = useState<Mode>(initialMode)
  const [notice, setNotice] = useState('')
  const [decision, setDecision] = useState<'lock' | 'unlock' | null>(null)
  const [reason, setReason] = useState('')
  const [context, setContext] = useState<ContextView | null>(null)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [password, setPassword] = useState('Rocket2026!')
  const {
    closing: drawerClosing,
    dismiss: dismissDrawer,
    cancel: cancelDrawerDismiss,
  } = useAnimatedDismiss(() => {
    setSelectedId('')
    setContext(null)
  })
  const {
    closing: decisionClosing,
    dismiss: dismissDecision,
    cancel: cancelDecisionDismiss,
  } = useAnimatedDismiss(() => setDecision(null))
  const reasonRef = useRef<HTMLTextAreaElement>(null)
  const bookingsButtonRef = useRef<HTMLButtonElement>(null)
  const deletionButtonRef = useRef<HTMLButtonElement>(null)
  const profileButtonRef = useRef<HTMLButtonElement>(null)
  const contextReturnFocusRef = useRef<ContextView | null>(null)
  const selected = users.find((user) => user.id === selectedId)
  const filtered = useMemo(
    () =>
      mode === 'empty'
        ? []
        : users.filter((user) => {
            const query = search.trim().toLowerCase()
            return (
              (!query ||
                `${user.name} ${user.region}`.toLowerCase().includes(query)) &&
              (role === 'all' || user.role === role) &&
              (providerType === 'all' ||
                role !== 'Service Provider' ||
                user.providerType === providerType) &&
              (status === 'all' || user.accountStatus === status) &&
              (region === 'all' || user.region === region)
            )
          }),
    [users, mode, search, role, providerType, status, region],
  )

  useEffect(() => {
    if (decision) reasonRef.current?.focus()
  }, [decision])
  useEffect(() => {
    if (context || !contextReturnFocusRef.current) return
    const view = contextReturnFocusRef.current
    contextReturnFocusRef.current = null
    const target =
      view === 'bookings'
        ? bookingsButtonRef
        : view === 'deletion'
          ? deletionButtonRef
          : profileButtonRef
    target.current?.focus()
  }, [context])
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (passwordOpen) return
      if (context) return
      if (decision) dismissDecision()
      else if (selectedId) dismissDrawer()
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [
    context,
    decision,
    dismissDecision,
    dismissDrawer,
    passwordOpen,
    selectedId,
  ])

  function clearFilters() {
    setSearch('')
    setRole('all')
    setProviderType('all')
    setStatus('all')
    setRegion('all')
    setMode('ready')
    setSelectedId('')
  }
  function submitDecision(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected || !decision || !reason.trim()) return
    const expected = decision === 'lock' ? 'Active' : 'Locked'
    if (selected.accountStatus !== expected) {
      setMode('stale')
      setDecision(null)
      return
    }
    const next = decision === 'lock' ? 'Locked' : 'Active'
    setUsers((current) =>
      current.map((user) =>
        user.id === selected.id ? { ...user, accountStatus: next } : user,
      ),
    )
    setNotice(
      `${selected.name} is now ${next}. The reason and before/after state were added to the audit history.`,
    )
    setDecision(null)
    setReason('')
    setMode('ready')
  }

  return (
    <>
      <AdminShell
        locale={locale}
        active="users"
        title="Unified Users"
        onChangePassword={() => setPasswordOpen(true)}
        actions={
          <Link
            className="admin-icon-action"
            href={adminRoute('deletion-requests', locale)}
          >
            <AdminIcon name="document" />
            <span>{t('Deletion Requests')}</span>
          </Link>
        }
      >
        {mode === 'permission' ? (
          <section className="admin-users-state">
            <AdminIcon name="warning" />
            <p>{t('Action Permission Lost')}</p>
            <h2>{t('Action Permission Lost')}</h2>
            <span>
              {t(
                'Your access changed during this session. Sensitive user details and actions have been removed.',
              )}
            </span>
            <Link
              className="admin-secondary-button"
              href={adminRoute('dashboard', locale)}
            >
              {t('Back to Dashboard')}
            </Link>
          </section>
        ) : (
          <>
            {mode === 'stale' && (
              <div className="admin-users-alert">
                <AdminIcon name="warning" />
                <div>
                  <strong>{t('Record changed')}</strong>
                  <p>
                    {t(
                      'This user changed after you opened the details. Reload before making a decision.',
                    )}
                  </p>
                </div>
                <button type="button" onClick={() => setMode('ready')}>
                  {t('Reload Details')}
                </button>
              </div>
            )}
            {notice && (
              <div className="admin-users-notice" role="status">
                <AdminIcon name="check" />
                {t(notice)}
              </div>
            )}
            <section className="admin-table-panel">
              {mode === 'loading' ? (
                <div className="admin-users-loading" aria-busy="true">
                  <div />
                  <div />
                  <div />
                  <div />
                  <p>{t('Loading users…')}</p>
                  <button
                    className="admin-secondary-button"
                    type="button"
                    onClick={() => setMode('ready')}
                  >
                    {t('Try Again')}
                  </button>
                </div>
              ) : mode === 'load-error' ? (
                <div className="admin-users-empty">
                  <AdminIcon name="warning" />
                  <h2>{t('Unable to Load')}</h2>
                  <p>
                    {t(
                      "We couldn't load users. No count or result has been verified.",
                    )}
                  </p>
                  <button
                    className="admin-secondary-button"
                    type="button"
                    onClick={() => setMode('ready')}
                  >
                    {t('Try Again')}
                  </button>
                </div>
              ) : (
                <>
                  <form
                    className="admin-filter-bar"
                    onSubmit={(event) => event.preventDefault()}
                  >
                    <label className="admin-search-field">
                      <AdminIcon name="search" />
                      <input
                        type="search"
                        value={search}
                        onChange={(event) => {
                          setSearch(event.target.value)
                          if (mode === 'empty') setMode('ready')
                        }}
                        placeholder={t('Search name or region')}
                        aria-label={t('Search users')}
                      />
                    </label>
                    <label>
                      <span>{t('Role')}</span>
                      <select
                        value={role}
                        onChange={(event) => {
                          setRole(event.target.value)
                          setSelectedId('')
                        }}
                      >
                        <option value="all">{t('All roles')}</option>
                        <option value="Customer">{t('Customer')}</option>
                        <option value="Service Provider">
                          {t('Service Provider')}
                        </option>
                      </select>
                    </label>
                    {role === 'Service Provider' && (
                      <label>
                        <span>{t('Provider type')}</span>
                        <select
                          value={providerType}
                          onChange={(event) => {
                            setProviderType(event.target.value)
                            setSelectedId('')
                          }}
                        >
                          <option value="all">{t('All types')}</option>
                          <option value="Individual Therapist">
                            {t('Individual Therapist')}
                          </option>
                          <option value="Massage Business">
                            {t('Massage Business')}
                          </option>
                        </select>
                      </label>
                    )}
                    <label>
                      <span>{t('Account')}</span>
                      <select
                        value={status}
                        onChange={(event) => {
                          setStatus(event.target.value)
                          setSelectedId('')
                        }}
                      >
                        <option value="all">{t('All statuses')}</option>
                        {(['Active', 'Locked', 'Deleted'] as const).map(
                          (value) => (
                            <option key={value} value={value}>
                              {t(value)}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                    <label>
                      <span>{t('Region')}</span>
                      <select
                        value={region}
                        onChange={(event) => {
                          setRegion(event.target.value)
                          setSelectedId('')
                        }}
                      >
                        <option value="all">{t('All regions')}</option>
                        {(
                          ['Ho Chi Minh City', 'Da Nang', 'Ha Noi'] as const
                        ).map((value) => (
                          <option key={value} value={value}>
                            {t(value)}
                          </option>
                        ))}
                      </select>
                    </label>
                  </form>
                  {filtered.length ? (
                    <div
                      className="admin-data-table admin-users-table"
                      role="table"
                      aria-label={t('Users')}
                    >
                      <div className="admin-data-table__head" role="row">
                        {[
                          'Name',
                          'Role / type',
                          'Region',
                          'Account',
                          'Provider profile',
                          'Joined',
                          '',
                        ].map((label, index) => (
                          <span key={index}>{t(label)}</span>
                        ))}
                      </div>
                      {filtered.map((user, index) => (
                        <div
                          key={user.id}
                          role="row"
                          style={{
                            animationDelay: `var(--admin-motion-stagger-${Math.min(index, 4)})`,
                          }}
                        >
                          <div className="admin-user-cell">
                            <Avatar user={user} />
                            <strong>{t(user.name)}</strong>
                          </div>
                          <div>
                            <strong>{t(user.role)}</strong>
                            <small>
                              {user.providerType ? t(user.providerType) : '—'}
                            </small>
                          </div>
                          <span>{t(user.region)}</span>
                          <Status value={user.accountStatus} t={t} />
                          <Status value={user.profileStatus} t={t} />
                          <span>{t(user.joined)}</span>
                          <button
                            type="button"
                            onClick={() => {
                              cancelDrawerDismiss()
                              setSelectedId(user.id)
                              setNotice('')
                              setContext(null)
                            }}
                          >
                            {t('View Details')}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="admin-users-empty">
                      <AdminIcon name="search" />
                      <h2>{t('No users match these filters')}</h2>
                      <button
                        className="admin-secondary-button"
                        type="button"
                        onClick={clearFilters}
                      >
                        {t('Clear Filters')}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
        {selected && mode !== 'permission' && (
          <aside
            className={`admin-detail-drawer admin-motion-drawer${drawerClosing ? ' is-closing' : ''}`}
            aria-label={t('User details')}
            inert={drawerClosing}
            key={selected.id}
          >
            <header>
              <Avatar user={selected} large />
              <div>
                <h2>{t(selected.name)}</h2>
                <span>
                  {t(selected.role)}
                  {selected.providerType
                    ? ` · ${t(selected.providerType)}`
                    : ''}
                </span>
              </div>
              <button
                type="button"
                aria-label={t('Close details')}
                onClick={dismissDrawer}
              >
                <AdminIcon name="close" />
              </button>
            </header>
            <div className="admin-detail-drawer__body">
              <section>
                <h3>{t('Access & profile states')}</h3>
                <div className="admin-state-pair">
                  <div>
                    <small>{t('Account')}</small>
                    <Status value={selected.accountStatus} t={t} />
                  </div>
                  <div>
                    <small>{t('Provider profile')}</small>
                    <Status
                      value={selected.profileStatus ?? 'Not applicable'}
                      t={t}
                    />
                  </div>
                </div>
                {selected.accountStatus === 'Deleted' && (
                  <p>
                    {t(
                      'Deleted accounts are read-only and cannot be restored.',
                    )}
                  </p>
                )}
              </section>
              <section>
                <h3>{t('Permitted contact details')}</h3>
                <dl className="admin-detail-list">
                  <DetailItem label={t('Email')} value={t(selected.email)} />
                  <DetailItem label={t('Phone')} value={t(selected.phone)} />
                  <DetailItem label={t('Region')} value={t(selected.region)} />
                  <DetailItem label={t('Joined')} value={t(selected.joined)} />
                </dl>
              </section>
              <section>
                <h3>{t('Related activity')}</h3>
                <dl className="admin-detail-list">
                  <DetailItem
                    label={t('Bookings')}
                    value={t(selected.bookings)}
                  />
                  <DetailItem label={t('Cases')} value={t(selected.cases)} />
                </dl>
                {demoBookings.some(
                  (item) =>
                    item.customer === selected.name ||
                    item.provider === selected.name,
                ) && (
                  <button
                    ref={bookingsButtonRef}
                    className="admin-secondary-button"
                    type="button"
                    onClick={() => setContext('bookings')}
                  >
                    {t('View Bookings')}
                  </button>
                )}
              </section>
              {demoDeletionRequests.some(
                (item) => item.requesterId === selected.id,
              ) && (
                <section>
                  <h3>{t('Account deletion')}</h3>
                  <p>
                    {t(
                      'A deletion request is awaiting an approved handling policy.',
                    )}
                  </p>
                  <button
                    ref={deletionButtonRef}
                    className="admin-secondary-button"
                    type="button"
                    onClick={() => setContext('deletion')}
                  >
                    {t('View Deletion Request')}
                  </button>
                </section>
              )}
              <section>
                <h3>{t('Recent Admin actions')}</h3>
                <div className="admin-audit-snippet">
                  <span />
                  <div>
                    <strong>
                      {t(
                        selected.accountStatus === 'Deleted'
                          ? 'Account deleted'
                          : selected.accountStatus === 'Locked'
                            ? 'Account locked'
                            : 'Profile opened for review',
                      )}
                    </strong>
                    <p>
                      {t(
                        selected.accountStatus === 'Deleted'
                          ? 'Account deletion completed'
                          : selected.accountStatus === 'Locked'
                            ? 'Reason recorded by Ava Morgan'
                            : 'No account changes made',
                      )}
                    </p>
                    <small>
                      {t(selected.deletedAt ?? 'Sep 24, 2026 · 3:48 PM ICT')}
                    </small>
                  </div>
                </div>
              </section>
            </div>
            {selected.accountStatus !== 'Deleted' && (
              <footer>
                <button
                  ref={profileButtonRef}
                  className="admin-secondary-button"
                  type="button"
                  disabled={selected.role !== 'Service Provider'}
                  onClick={() => setContext('profile')}
                >
                  {t('Open Provider Profile')}
                </button>
                <button
                  className="admin-primary-button"
                  type="button"
                  onClick={() => {
                    cancelDecisionDismiss()
                    setDecision(
                      selected.accountStatus === 'Locked' ? 'unlock' : 'lock',
                    )
                    setReason('')
                  }}
                >
                  {t(
                    selected.accountStatus === 'Locked'
                      ? 'Unlock Account'
                      : 'Lock Account',
                  )}
                </button>
              </footer>
            )}
          </aside>
        )}
      </AdminShell>
      {selected && context && (
        <AdminUserContext
          key={selected.id}
          user={selected}
          locale={locale}
          initialView={context}
          onClose={(view) => {
            contextReturnFocusRef.current = view
            setContext(null)
          }}
        />
      )}
      {selected && decision && (
        <div
          className={`admin-modal-backdrop admin-motion-backdrop${decisionClosing ? ' is-closing' : ''}`}
          inert={decisionClosing}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) dismissDecision()
          }}
        >
          <section
            className="admin-dialog admin-motion-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-user-dialog-title"
          >
            <span className="admin-dialog__icon">
              <AdminIcon name={decision === 'lock' ? 'lock' : 'check'} />
            </span>
            <p className="admin-users-kicker">
              {t('Confirm account decision')}
            </p>
            <h2 id="admin-user-dialog-title">
              {t(decision === 'lock' ? 'Lock' : 'Unlock')} {t(selected.name)}?
            </h2>
            <p>
              {t(
                decision === 'lock'
                  ? 'This prevents sign-in and new actions. Existing bookings, chat, and evidence remain available under policy.'
                  : 'This restores sign-in under current permissions. It does not approve a pending Provider profile.',
              )}
            </p>
            <form onSubmit={submitDecision}>
              <label className="admin-users-reason">
                <span>
                  {t('Reason')} <b>{t('Required')}</b>
                </span>
                <textarea
                  ref={reasonRef}
                  rows={3}
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder={t('Record the reason for this decision')}
                />
              </label>
              {mode === 'save-error' && (
                <p className="admin-dialog-error" role="alert">
                  {t(
                    'We couldn’t save this decision. Your reason is preserved. Try again.',
                  )}
                </p>
              )}
              <div className="admin-dialog__actions">
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={dismissDecision}
                >
                  {t('Go Back')}
                </button>
                <button
                  className="admin-primary-button"
                  type="submit"
                  disabled={!reason.trim()}
                >
                  {t(decision === 'lock' ? 'Confirm Lock' : 'Confirm Unlock')}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      {passwordOpen && (
        <ChangePasswordDialog
          locale={locale}
          demoPassword={password}
          onPasswordChange={setPassword}
          onClose={() => setPasswordOpen(false)}
        />
      )}
    </>
  )
}
