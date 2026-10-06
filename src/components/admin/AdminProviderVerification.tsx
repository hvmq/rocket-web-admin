'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import type { Locale } from '@/i18n/admin-access'
import { providerT } from '@/i18n/admin-provider-verification'
import { AdminIcon } from './AdminIcon'
import { AdminShell, adminRoute } from './AdminShell'
import { ChangePasswordDialog } from './AdminDashboard'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './dashboard.css'
import './provider-verification.css'

type Status = 'Pending' | 'Approved' | 'Rejected'
type ProviderType = 'Individual Therapist' | 'Massage Business'
type Region = 'Ho Chi Minh City' | 'Da Nang' | 'Ha Noi'
type Photo = { label: string; url: string }
type Service = { name: string; duration: string; price: string }
type Profile = {
  headline: string
  description: string
  location: string
  images: Photo[]
  services: Service[]
  hours: { days: string; time: string }[]
}
type Published = {
  headline: string
  description: string
  location: string
  service: string
}
type Submission = {
  id: string
  version: string
  name: string
  type: ProviderType
  region: Region
  submissionType: 'Profile Update' | 'New Profile'
  submitted: string
  submittedAt: string
  status: Status
  avatar: string
  profile: Profile
  published?: Published
  history: string[]
  decision?: { actor: string; at: string; reason: string }
}
type Mode =
  'ready' | 'loading' | 'load-error' | 'permission' | 'image-error' | 'stale'

const photos = {
  maya: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=1200&q=82',
  river:
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=82',
  room: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=82',
  massage:
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=82',
  studio:
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=82',
  serene:
    'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&crop=faces&w=1200&q=82',
  anan: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=82',
}

const initialSubmissions: Submission[] = [
  {
    id: 'PV-2048',
    version: 'v3',
    name: 'Maya Chen',
    type: 'Individual Therapist',
    region: 'Ho Chi Minh City',
    submissionType: 'Profile Update',
    submitted: 'Sep 24, 2026 · 09:18 ICT',
    submittedAt: '2026-09-24T09:18:00+07:00',
    status: 'Pending',
    avatar: photos.maya,
    published: {
      headline: 'Restorative massage therapist',
      description:
        'Grounded, attentive sessions focused on mobility and everyday comfort.',
      location: 'District 1, Ho Chi Minh City',
      service: 'Relaxation Massage · $85',
    },
    profile: {
      headline: 'Restorative massage & mobility care',
      description:
        'Personalized sessions for recovery, movement, and lasting ease. Each visit is adapted to your comfort and mobility goals.',
      location: 'District 1 & District 3, Ho Chi Minh City',
      images: [
        { label: 'Profile portrait', url: photos.maya },
        { label: 'Treatment room', url: photos.room },
        { label: 'Massage session', url: photos.massage },
        { label: 'Studio details', url: photos.studio },
      ],
      services: [
        { name: 'Relaxation Massage', duration: '60 min', price: '$92' },
        { name: 'Mobility Recovery', duration: '90 min', price: '$120' },
        { name: 'Focused Shoulder Care', duration: '45 min', price: '$68' },
      ],
      hours: [
        { days: 'Monday–Friday', time: '09:00–17:00' },
        { days: 'Saturday–Sunday', time: 'Closed' },
      ],
    },
    history: [
      'v3 submitted · Sep 24, 2026 · 09:18 ICT',
      'v2 approved · Sep 18, 2026',
    ],
  },
  {
    id: 'PV-2046',
    version: 'v1',
    name: 'River Spa Studio',
    type: 'Massage Business',
    region: 'Da Nang',
    submissionType: 'New Profile',
    submitted: 'Sep 23, 2026 · 16:42 ICT',
    submittedAt: '2026-09-23T16:42:00+07:00',
    status: 'Pending',
    avatar: photos.river,
    profile: {
      headline: 'River Spa Studio',
      description: 'Relaxing massage sessions in a calm studio setting.',
      location: 'Da Nang',
      images: [
        { label: 'Studio details', url: photos.river },
        { label: 'Treatment room', url: photos.room },
        { label: 'Massage session', url: photos.massage },
      ],
      services: [
        { name: 'Relaxation Massage', duration: '60 min', price: '$85' },
      ],
      hours: [
        { days: 'Monday–Friday', time: '09:00–17:00' },
        { days: 'Saturday–Sunday', time: 'Closed' },
      ],
    },
    history: ['v1 submitted · Sep 23, 2026 · 16:42 ICT'],
  },
  {
    id: 'PV-2039',
    version: 'v2',
    name: 'Serene Hands',
    type: 'Individual Therapist',
    region: 'Ha Noi',
    submissionType: 'Profile Update',
    submitted: 'Sep 21, 2026 · 11:04 ICT',
    submittedAt: '2026-09-21T11:04:00+07:00',
    status: 'Approved',
    avatar: photos.serene,
    published: {
      headline: 'Serene Hands',
      description: 'Personalized massage for everyday comfort.',
      location: 'Ha Noi',
      service: 'Relaxation Massage · $85',
    },
    profile: {
      headline: 'Serene Hands',
      description: 'Personalized massage for everyday comfort.',
      location: 'Ha Noi',
      images: [{ label: 'Profile portrait', url: photos.serene }],
      services: [
        { name: 'Relaxation Massage', duration: '60 min', price: '$85' },
      ],
      hours: [{ days: 'Monday–Friday', time: '09:00–17:00' }],
    },
    history: ['v2 approved · Sep 21, 2026 · 11:04 ICT'],
    decision: {
      actor: 'Ava Morgan',
      at: 'Sep 21, 2026 · 11:04 ICT',
      reason: '',
    },
  },
  {
    id: 'PV-2034',
    version: 'v1',
    name: 'An An Studio',
    type: 'Massage Business',
    region: 'Ho Chi Minh City',
    submissionType: 'New Profile',
    submitted: 'Sep 19, 2026 · 14:26 ICT',
    submittedAt: '2026-09-19T14:26:00+07:00',
    status: 'Rejected',
    avatar: photos.anan,
    profile: {
      headline: 'An An Studio',
      description: 'Massage and wellness treatments.',
      location: 'Ho Chi Minh City',
      images: [{ label: 'Studio details', url: photos.anan }],
      services: [
        { name: 'Relaxation Massage', duration: '60 min', price: '$85' },
      ],
      hours: [{ days: 'Monday–Friday', time: '09:00–17:00' }],
    },
    history: ['v1 rejected · Sep 19, 2026 · 14:26 ICT'],
    decision: {
      actor: 'Ava Morgan',
      at: 'Sep 19, 2026 · 14:26 ICT',
      reason: 'Please provide a clearer service photo.',
    },
  },
]

function Badge({ value, t }: { value: string; t: (value: string) => string }) {
  const tone =
    value === 'Pending'
      ? 'attention'
      : value === 'Approved'
        ? 'positive'
        : 'neutral'
  return (
    <span className={`admin-status admin-status--${tone}`}>
      <span />
      {t(value)}
    </span>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  t,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  t: (value: string) => string
}) {
  return (
    <label>
      <span>{t(label)}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {t(option)}
          </option>
        ))}
      </select>
    </label>
  )
}

function DetailSection({
  kicker,
  title,
  children,
  t,
}: {
  kicker?: string
  title: string
  children: ReactNode
  t: (value: string) => string
}) {
  return (
    <section className="admin-provider-detail-section">
      <div className="admin-section-heading">
        <div>
          {kicker && <p className="admin-kicker">{t(kicker)}</p>}
          <h3>{t(title)}</h3>
        </div>
      </div>
      {children}
    </section>
  )
}

function Picture({
  src,
  alt,
  fallback,
  className = '',
}: {
  src: string
  alt: string
  fallback: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <span className="admin-provider-image-unavailable">
      <AdminIcon name="image" />
      <small>{fallback}</small>
    </span>
  ) : (
    <Image
      unoptimized
      src={src}
      alt={alt}
      width={640}
      height={480}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

function ReviewPanel({
  submission,
  locale,
  imageError,
  onClose,
  onImage,
  onDecision,
  closing,
}: {
  submission: Submission
  locale: Locale
  imageError: boolean
  onClose: () => void
  onImage: (index: number) => void
  onDecision: (action: 'approve' | 'reject') => void
  closing: boolean
}) {
  const t = (source: string) => providerT(locale, source)
  const { profile, published } = submission
  const firstService = profile.services[0]
    ? `${profile.services[0].name} · ${profile.services[0].price}`
    : 'No services submitted'
  const submittedVersion = t(`Submitted ${submission.version}`)
  return (
    <aside
      className={`admin-review-panel admin-motion-drawer${closing ? ' is-closing' : ''}`}
      aria-label={t('Provider review')}
      inert={closing}
    >
      <header>
        <div>
          <p className="admin-kicker">
            {submission.id} · {submission.version}
          </p>
          <h2>{t(submission.name)}</h2>
          <p>
            {t(submission.type)} · {t(submission.region)}
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label={t('Close review')}>
          <AdminIcon name="close" />
        </button>
      </header>
      <div className="admin-review-panel__scroll">
        <section className="admin-review-summary">
          <div className="admin-review-photo">
            {imageError ? (
              <span className="admin-provider-image-unavailable">
                <AdminIcon name="image" />
                <small>{t('Image unavailable')}</small>
              </span>
            ) : (
              <Picture
                src={submission.avatar}
                alt={t('Submitted profile')}
                fallback={t('Image unavailable')}
              />
            )}
          </div>
          <div>
            <small>{t('Submitted identity')}</small>
            <strong>{t(submission.name)}</strong>
            <Badge value={submission.status} t={t} />
          </div>
        </section>
        {published ? (
          <section className="admin-comparison">
            <div className="admin-section-heading">
              <div>
                <p className="admin-kicker">{t('Version comparison')}</p>
                <h3>{t('Currently Published & Proposed Changes')}</h3>
              </div>
              <span className="admin-change-key">
                <i />
                {t('Changed field')}
              </span>
            </div>
            <div className="admin-comparison-grid">
              <article>
                <small>{t('Currently Published')}</small>
                <h4>{t(published.headline)}</h4>
                <p>{t(published.description)}</p>
                <dl>
                  <div>
                    <dt>{t('Region')}</dt>
                    <dd>{t(published.location)}</dd>
                  </div>
                  <div>
                    <dt>{t('Service')}</dt>
                    <dd>{t(published.service)}</dd>
                  </div>
                </dl>
              </article>
              <article className="is-proposed">
                <small>{submittedVersion}</small>
                <h4
                  className={
                    published.headline !== profile.headline ? 'is-changed' : ''
                  }
                >
                  {t(profile.headline)}
                </h4>
                <p
                  className={
                    published.description !== profile.description
                      ? 'is-changed'
                      : ''
                  }
                >
                  {t(profile.description)}
                </p>
                <dl>
                  <div
                    className={
                      published.location !== profile.location
                        ? 'is-changed'
                        : ''
                    }
                  >
                    <dt>{t('Region')}</dt>
                    <dd>{t(profile.location)}</dd>
                  </div>
                  <div
                    className={
                      published.service !== firstService ? 'is-changed' : ''
                    }
                  >
                    <dt>{t('Service')}</dt>
                    <dd>{t(firstService)}</dd>
                  </div>
                </dl>
              </article>
            </div>
          </section>
        ) : (
          <section className="admin-new-profile">
            <p className="admin-kicker">{t('New Profile')}</p>
            <h3>{t('Public profile proposal')}</h3>
            <p>
              {t(
                'This is the first submitted version. No version is currently published.',
              )}
            </p>
          </section>
        )}
        <DetailSection
          kicker={`Submitted ${submission.version}`}
          title="Profile description"
          t={t}
        >
          <h4>{t(profile.headline)}</h4>
          <p>{t(profile.description)}</p>
        </DetailSection>
        <DetailSection
          kicker={`${profile.images.length} submitted`}
          title="Images"
          t={t}
        >
          <div className="admin-provider-gallery">
            {profile.images.map((photo, index) => (
              <button
                key={`${photo.label}-${index}`}
                type="button"
                onClick={() => onImage(index)}
                disabled={imageError}
                aria-label={t(photo.label)}
              >
                <span className="admin-provider-gallery__visual">
                  {imageError ? (
                    <span className="admin-provider-image-unavailable">
                      <AdminIcon name="image" />
                      <small>{t('Image unavailable')}</small>
                    </span>
                  ) : (
                    <Picture
                      src={photo.url}
                      alt={t(photo.label)}
                      fallback={t('Image unavailable')}
                    />
                  )}
                </span>
                <strong>{t(photo.label)}</strong>
              </button>
            ))}
          </div>
        </DetailSection>
        <DetailSection
          kicker={`${profile.services.length} submitted`}
          title="Services & prices"
          t={t}
        >
          <div className="admin-provider-service-list">
            {profile.services.map((service) => (
              <div key={service.name}>
                <strong>{t(service.name)}</strong>
                <span>{t(service.duration)}</span>
                <b>{service.price}</b>
              </div>
            ))}
          </div>
        </DetailSection>
        <DetailSection title="Working hours" t={t}>
          <dl className="admin-detail-list">
            {profile.hours.map((hours) => (
              <div key={hours.days}>
                <dt>{t(hours.days)}</dt>
                <dd>{t(hours.time)}</dd>
              </div>
            ))}
          </dl>
        </DetailSection>
        <DetailSection title="Service region" t={t}>
          <p>{t(profile.location)}</p>
          <small>
            {t('Public service area; exact coordinates remain private.')}
          </small>
        </DetailSection>
        <DetailSection title="Review history" t={t}>
          <ol className="admin-case-timeline">
            {submission.history.map((entry, index) => (
              <li key={`${entry}-${index}`}>
                <span />
                <div>
                  <strong>{t(entry)}</strong>
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
        </DetailSection>
        {submission.status !== 'Pending' && (
          <div className="admin-decision-result">
            <AdminIcon name="check" />
            <div>
              <strong>{t('Decision already recorded')}</strong>
              <p>
                {t(submission.status)} · {submission.decision?.actor} ·{' '}
                {submission.decision?.at}
              </p>
              {submission.decision?.reason && (
                <p>
                  {t('Reason:')} {submission.decision.reason}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <footer>
        {submission.status === 'Pending' ? (
          <>
            <button
              className="admin-secondary-button"
              type="button"
              onClick={() => onDecision('reject')}
            >
              {t('Reject')}
            </button>
            <button
              className="admin-primary-button"
              type="button"
              onClick={() => onDecision('approve')}
            >
              {t('Approve')}
            </button>
          </>
        ) : (
          <Link
            className="admin-secondary-button"
            href={adminRoute('users', locale)}
          >
            {t('View Provider Account')}
          </Link>
        )}
      </footer>
    </aside>
  )
}

export function AdminProviderVerification({
  locale,
  initialMode = 'ready',
}: {
  locale: Locale
  initialMode?: Mode
}) {
  const t = (source: string) => providerT(locale, source)
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [tab, setTab] = useState<Status>('Pending')
  const [search, setSearch] = useState('')
  const [providerType, setProviderType] = useState('All types')
  const [region, setRegion] = useState('All regions')
  const [dateRange, setDateRange] = useState('Last 30 days')
  const [selectedId, setSelectedId] = useState('')
  const [imageIndex, setImageIndex] = useState<number | null>(null)
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null)
  const [reason, setReason] = useState('')
  const [notice, setNotice] = useState('')
  const [mode, setMode] = useState<Mode>(initialMode)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const reasonRef = useRef<HTMLTextAreaElement>(null)
  const decisionAccepted = useRef(false)
  const {
    closing: reviewClosing,
    dismiss: dismissReview,
    cancel: cancelReview,
  } = useAnimatedDismiss(() => setSelectedId(''))
  const {
    closing: imageClosing,
    dismiss: dismissImage,
    cancel: cancelImage,
  } = useAnimatedDismiss(() => setImageIndex(null))
  const {
    closing: decisionClosing,
    dismiss: dismissDecision,
    cancel: cancelDecision,
  } = useAnimatedDismiss(() => {
    setDecision(null)
    setReason('')
    if (decisionAccepted.current) {
      decisionAccepted.current = false
      cancelReview()
      setSelectedId('')
    }
  })
  const selected = submissions.find(
    (submission) => submission.id === selectedId,
  )
  const visible = useMemo(
    () =>
      submissions.filter((submission) => {
        if (submission.status !== tab) return false
        if (
          search.trim() &&
          !`${submission.name} ${submission.id}`
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        )
          return false
        if (providerType !== 'All types' && submission.type !== providerType)
          return false
        if (region !== 'All regions' && submission.region !== region)
          return false
        const days = dateRange === 'Last 7 days' ? 7 : 30
        return (
          Date.parse(submission.submittedAt) >=
          Date.parse('2026-09-26T00:00:00+07:00') - days * 86400000
        )
      }),
    [submissions, tab, search, providerType, region, dateRange],
  )

  useEffect(() => {
    if (decision === 'reject') reasonRef.current?.focus()
  }, [decision])
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (passwordOpen) return
      if (decision) dismissDecision()
      else if (imageIndex !== null) dismissImage()
      else if (selectedId) dismissReview()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [
    decision,
    dismissDecision,
    dismissImage,
    dismissReview,
    imageIndex,
    passwordOpen,
    selectedId,
  ])

  function clearFilters() {
    setSearch('')
    setProviderType('All types')
    setRegion('All regions')
    setDateRange('Last 30 days')
    dismissReview()
  }
  function confirmDecision(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (
      !selected ||
      !decision ||
      selected.status !== 'Pending' ||
      (decision === 'reject' && !reason.trim())
    )
      return
    const status = decision === 'approve' ? 'Approved' : 'Rejected'
    const at = `${new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date())} ICT`
    setSubmissions((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              status,
              decision: { actor: 'Ava Morgan', at, reason: reason.trim() },
              history: [
                `${item.version} ${status.toLowerCase()} · ${at}`,
                ...item.history,
              ],
            }
          : item,
      ),
    )
    decisionAccepted.current = true
    dismissDecision()
    setNotice(
      `${selected.id} · ${selected.version}: ${t('Profile decision recorded')}`,
    )
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title="Provider Verification"
        active="provider-verification"
        onChangePassword={() => setPasswordOpen(true)}
      >
        <div className="admin-provider-page">
          {mode === 'permission' ? (
            <section className="admin-state-panel">
              <AdminIcon name="shieldWarning" />
              <p className="admin-kicker">{t('Permission changed')}</p>
              <h2>{t('Access Denied')}</h2>
              <p>
                {t(
                  'Submitted identity, images, and decision controls have been removed from this session.',
                )}
              </p>
              <Link
                className="admin-secondary-button"
                href={adminRoute('dashboard', locale)}
              >
                {t('Back to Dashboard')}
              </Link>
            </section>
          ) : mode === 'loading' ? (
            <section
              className="admin-table-panel admin-provider-loading"
              aria-label={t('Loading submissions')}
            >
              <div />
              <div />
              <div />
              <div />
            </section>
          ) : mode === 'load-error' ? (
            <section className="admin-state-panel">
              <AdminIcon name="warning" />
              <h2>{t('Unable to load submissions')}</h2>
              <button
                className="admin-secondary-button"
                type="button"
                onClick={() => setMode('ready')}
              >
                {t('Try Again')}
              </button>
            </section>
          ) : (
            <>
              {mode === 'stale' && (
                <div className="admin-inline-alert">
                  <AdminIcon name="warning" />
                  <div>
                    <strong>{t('Record changed')}</strong>
                    <p>
                      {t(
                        'Another Admin updated this proposal. Your pending decision was not applied or audited as successful.',
                      )}
                    </p>
                  </div>
                  <button type="button" onClick={() => setMode('ready')}>
                    {t('Reload Details')}
                  </button>
                </div>
              )}
              {notice && (
                <div className="admin-inline-success" role="status">
                  <AdminIcon name="check" />
                  {notice}
                </div>
              )}
              <section className="admin-table-panel">
                <div
                  className="admin-segmented admin-segmented--queue"
                  role="tablist"
                  aria-label={t('Provider verification status')}
                >
                  {(['Pending', 'Approved', 'Rejected'] as Status[]).map(
                    (status) => (
                      <button
                        key={status}
                        role="tab"
                        type="button"
                        aria-selected={tab === status}
                        className={tab === status ? 'is-active' : ''}
                        onClick={() => {
                          setTab(status)
                          dismissReview()
                          setNotice('')
                        }}
                      >
                        {t(status)}
                        <small>
                          {
                            submissions.filter((item) => item.status === status)
                              .length
                          }
                        </small>
                      </button>
                    ),
                  )}
                </div>
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
                        dismissReview()
                      }}
                      placeholder={t('Search provider or reference')}
                      aria-label={t('Search verification queue')}
                    />
                  </label>
                  <FilterSelect
                    label="Provider type"
                    value={providerType}
                    options={[
                      'All types',
                      'Individual Therapist',
                      'Massage Business',
                    ]}
                    onChange={(value) => {
                      setProviderType(value)
                      dismissReview()
                    }}
                    t={t}
                  />
                  <FilterSelect
                    label="Region"
                    value={region}
                    options={[
                      'All regions',
                      'Ho Chi Minh City',
                      'Da Nang',
                      'Ha Noi',
                    ]}
                    onChange={(value) => {
                      setRegion(value)
                      dismissReview()
                    }}
                    t={t}
                  />
                  <FilterSelect
                    label="Submitted"
                    value={dateRange}
                    options={['Last 30 days', 'Last 7 days']}
                    onChange={(value) => {
                      setDateRange(value)
                      dismissReview()
                    }}
                    t={t}
                  />
                </form>
                {visible.length ? (
                  <div
                    className="admin-data-table admin-provider-table"
                    role="table"
                    aria-label={t('Provider verification queue')}
                  >
                    <div className="admin-data-table__head" role="row">
                      {[
                        'Provider',
                        'Type',
                        'Region',
                        'Submission',
                        'Submitted',
                        'Status',
                        '',
                      ].map((label, index) => (
                        <span key={`${label}-${index}`}>{t(label)}</span>
                      ))}
                    </div>
                    {visible.map((item) => (
                      <div key={item.id} role="row">
                        <div className="admin-user-cell">
                          <span className="admin-avatar">
                            <Picture
                              src={item.avatar}
                              alt=""
                              fallback={t('Image unavailable')}
                            />
                          </span>
                          <div>
                            <strong>{t(item.name)}</strong>
                            <small>
                              {item.id} · {item.version}
                            </small>
                          </div>
                        </div>
                        <span>{t(item.type)}</span>
                        <span>{t(item.region)}</span>
                        <span>
                          <Badge value={item.submissionType} t={t} />
                        </span>
                        <span>{t(item.submitted)}</span>
                        <span>
                          <Badge value={item.status} t={t} />
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            cancelReview()
                            setSelectedId(item.id)
                            cancelImage()
                            setImageIndex(null)
                            setNotice('')
                          }}
                        >
                          {t('Review')}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="admin-table-empty">
                    <AdminIcon name="search" />
                    <h2>{t('No submissions match these filters')}</h2>
                    <button
                      className="admin-secondary-button"
                      type="button"
                      onClick={clearFilters}
                    >
                      {t('Clear Filters')}
                    </button>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </AdminShell>
      {selected &&
        mode !== 'permission' &&
        mode !== 'loading' &&
        mode !== 'load-error' && (
          <ReviewPanel
            submission={selected}
            locale={locale}
            imageError={mode === 'image-error'}
            closing={reviewClosing}
            onClose={dismissReview}
            onImage={(index) => {
              cancelImage()
              setImageIndex(index)
            }}
            onDecision={(action) => {
              cancelDecision()
              decisionAccepted.current = false
              setReason('')
              setDecision(action)
            }}
          />
        )}
      {selected &&
        imageIndex !== null &&
        selected.profile.images[imageIndex] && (
          <div
            className={`admin-modal-backdrop admin-provider-image-backdrop admin-motion-backdrop${imageClosing ? ' is-closing' : ''}`}
            inert={imageClosing}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) dismissImage()
            }}
          >
            <section
              className="admin-provider-image-dialog admin-motion-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-provider-image-title"
            >
              <header>
                <div>
                  <p className="admin-kicker">
                    {selected.id} · {selected.version}
                  </p>
                  <h2 id="admin-provider-image-title">
                    {t(selected.profile.images[imageIndex].label)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={dismissImage}
                  aria-label={t('Close image')}
                >
                  <AdminIcon name="close" />
                </button>
              </header>
              <Picture
                key={imageIndex}
                src={selected.profile.images[imageIndex].url}
                alt={t(selected.profile.images[imageIndex].label)}
                fallback={t('Image unavailable')}
              />
              <footer>
                <span>
                  {imageIndex + 1} / {selected.profile.images.length} ·{' '}
                  {t('submitted images')}
                </span>
                <div>
                  <button
                    className="admin-secondary-button"
                    type="button"
                    disabled={imageIndex === 0}
                    onClick={() =>
                      setImageIndex((index) => Math.max(0, (index ?? 0) - 1))
                    }
                  >
                    {t('Previous')}
                  </button>
                  <button
                    className="admin-secondary-button"
                    type="button"
                    disabled={imageIndex === selected.profile.images.length - 1}
                    onClick={() =>
                      setImageIndex((index) =>
                        Math.min(
                          selected.profile.images.length - 1,
                          (index ?? 0) + 1,
                        ),
                      )
                    }
                  >
                    {t('Next')}
                  </button>
                </div>
              </footer>
            </section>
          </div>
        )}
      {selected && decision && (
        <div
          className={`admin-modal-backdrop admin-provider-decision-backdrop admin-motion-backdrop${decisionClosing ? ' is-closing' : ''}`}
          inert={decisionClosing}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) dismissDecision()
          }}
        >
          <section
            className="admin-dialog admin-motion-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-provider-dialog-title"
          >
            <span className="admin-dialog__icon">
              <AdminIcon name={decision === 'approve' ? 'shield' : 'warning'} />
            </span>
            <p className="admin-kicker">
              {selected.id} · {selected.version}
            </p>
            <h2 id="admin-provider-dialog-title">
              {t(
                decision === 'approve'
                  ? 'Approve this exact profile version?'
                  : 'Reject this profile proposal?',
              )}
            </h2>
            <p>
              {decision === 'approve'
                ? `${t('Only v3 for Maya Chen will become eligible for public display under current account rules.').replace('v3', selected.version).replace('Maya Chen', selected.name)}`
                : t(
                    'The proposal remains nonpublic. The Provider will receive the reason and can correct and resubmit from the app.',
                  )}
            </p>
            <form onSubmit={confirmDecision}>
              {decision === 'approve' ? (
                <div className="admin-confirm-target">
                  <span>
                    <AdminIcon name="briefcase" />
                  </span>
                  <div>
                    <small>{t('Decision target')}</small>
                    <strong>
                      {t(selected.name)} · {t(selected.submissionType)}
                    </strong>
                    <p>{t(selected.submitted)}</p>
                  </div>
                </div>
              ) : (
                <label className="admin-field">
                  <span>
                    {t('Reason')} <b>{t('Required')}</b>
                  </span>
                  <textarea
                    ref={reasonRef}
                    rows={3}
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder={t(
                      'Explain what the Provider needs to correct',
                    )}
                  />
                </label>
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
                  disabled={decision === 'reject' && !reason.trim()}
                >
                  {t(
                    decision === 'approve'
                      ? 'Confirm Approval'
                      : 'Confirm Rejection',
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
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
