'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { notificationsT } from '@/i18n/admin-notifications'
import { AdminIcon } from './AdminIcon'
import { AdminShell } from './AdminShell'
import { ChangePasswordDialog } from './AdminDashboard'
import { initialRegions } from './admin-regions-demo'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './dashboard.css'
import './notifications.css'

type AudienceType = 'role' | 'region' | 'accounts'
type Delivery = 'now' | 'schedule'
type Draft = {
  title: string
  body: string
  image: string
  imageName: string
  inApp: boolean
  push: boolean
  destination: string
  audienceType: AudienceType
  role: string
  region: string
  providerType: string
  accounts: string
  delivery: Delivery
  scheduledAt: string
}
type Translate = (source: string) => string
type Receipt = {
  id: string
  title: string
  audience: string
  count: number
  status: string
  time: string
}

const destinations = [
  'Provider search',
  'Appointments',
  'Provider profile',
  'Booking chat',
  'Notifications',
]
const roles = ['Customer', 'Service Provider', 'Customer & Service Provider']
const activeRegions = initialRegions.filter(
  (region) => region.level === 'Province / City' && region.status === 'Active',
)
const steps = ['Message', 'Audience', 'Preview', 'Delivery']

function emptyDraft(): Draft {
  return {
    title: '',
    body: '',
    image: '',
    imageName: '',
    inApp: true,
    push: false,
    destination: '',
    audienceType: 'role',
    role: 'Customer',
    region: '',
    providerType: '',
    accounts: '',
    delivery: 'now',
    scheduledAt: '',
  }
}

function eligibleCount(draft: Draft) {
  if (draft.audienceType === 'accounts')
    return draft.accounts
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean).length
  if (draft.audienceType === 'region')
    return draft.region ? (draft.region === 'Ho Chi Minh City' ? 420 : 96) : 0
  if (draft.role === 'Customer & Service Provider') return 1498
  if (draft.role === 'Customer') return 1284
  if (draft.role === 'Service Provider') return draft.providerType ? 88 : 214
  return 0
}

function audienceRule(draft: Draft, t: Translate) {
  if (draft.audienceType === 'accounts')
    return draft.accounts.trim()
      ? `${t('Specific accounts')} · ${eligibleCount(draft)}`
      : t('No audience selected')
  if (draft.audienceType === 'region')
    return draft.region
      ? `${t(draft.role || 'All eligible roles')}${draft.providerType ? ` · ${t(draft.providerType)}` : ''} · ${t(draft.region)}`
      : t('No audience selected')
  return draft.role
    ? `${t(draft.role)}${draft.providerType ? ` · ${t(draft.providerType)}` : ''}`
    : t('No audience selected')
}

function NotificationField({
  label,
  requiredLabel,
  children,
  className = '',
}: {
  label: string
  requiredLabel?: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`admin-field notification-field ${className}`}>
      <span>
        {label} <b>{requiredLabel ?? ''}</b>
      </span>
      {children}
    </label>
  )
}

function Summary({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="notification-summary">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  )
}

function ImagePreview({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <Image
      unoptimized
      src={src}
      alt={alt}
      width={120}
      height={90}
      className={`notification-image ${className}`}
    />
  )
}

export function AdminNotifications({ locale }: { locale: Locale }) {
  const t = (source: string) => notificationsT(locale, source)
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [success, setSuccess] = useState<Receipt | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const pendingReset = useRef(false)
  const confirmDismiss = useAnimatedDismiss(() => {
    setConfirmOpen(false)
    if (pendingReset.current) {
      pendingReset.current = false
      setDraft(emptyDraft())
      setStep(1)
    }
  })
  const dismissConfirm = confirmDismiss.dismiss
  useEffect(() => {
    if (!confirmOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismissConfirm()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [confirmOpen, dismissConfirm])
  const count = eligibleCount(draft)
  const rule = audienceRule(draft, t)
  const update = (changes: Partial<Draft>) => {
    setDraft((current) => ({ ...current, ...changes }))
    setError('')
  }

  async function upload(file?: File) {
    if (!file) return
    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setImageError('Choose a JPG, PNG or WebP image up to 5 MB.')
      return
    }
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () =>
          typeof reader.result === 'string'
            ? resolve(reader.result)
            : reject(new Error('Invalid image'))
        reader.onerror = () => reject(new Error('Image read failed'))
        reader.readAsDataURL(file)
      })
      await new Promise<void>((resolve, reject) => {
        const image = new window.Image()
        image.onload = () => resolve()
        image.onerror = () => reject(new Error('Invalid image'))
        image.src = data
      })
      update({ image: data, imageName: file.name })
      setImageError('')
    } catch {
      setImageError('This image could not be loaded. Choose another image.')
    }
    if (fileInput.current) fileInput.current.value = ''
  }

  function next() {
    let issue = ''
    if (step === 1) {
      if (!draft.title.trim() || !draft.body.trim())
        issue = 'Title and body are required.'
      else if (!draft.inApp && !draft.push)
        issue = 'Choose at least one supported channel.'
      else if (!destinations.includes(draft.destination))
        issue = 'Choose a valid internal destination.'
    } else if (
      step === 2 &&
      (!count ||
        (draft.audienceType === 'role' && !draft.role) ||
        (draft.audienceType === 'region' && !draft.region))
    ) {
      issue = 'Select a non-empty audience.'
    } else if (
      step === 4 &&
      draft.delivery === 'schedule' &&
      (!draft.scheduledAt ||
        new Date(`${draft.scheduledAt}+07:00`).getTime() <= Date.now())
    ) {
      issue = 'Choose a future time in Asia/Ho_Chi_Minh.'
    }
    if (issue) {
      setError(issue)
      return
    }
    setError('')
    if (step < 4) setStep(step + 1)
    else {
      confirmDismiss.cancel()
      setConfirmOpen(true)
    }
  }

  function recordDelivery() {
    if (!eligibleCount(draft)) {
      confirmDismiss.dismiss()
      setStep(2)
      setError('The audience is empty. Select eligible accounts.')
      return
    }
    const receipt: Receipt = {
      id: `NT-${2050 + receipts.length}`,
      title: draft.title.trim(),
      audience: rule,
      count,
      status: draft.delivery === 'schedule' ? 'Scheduled' : 'Processing',
      time:
        draft.delivery === 'schedule'
          ? `${draft.scheduledAt.replace('T', ' · ')} ICT`
          : 'Just now · ICT',
    }
    setReceipts((current) => [receipt, ...current])
    setSuccess(receipt)
    pendingReset.current = true
    confirmDismiss.dismiss()
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title={historyOpen ? 'Notifications' : 'Compose Notification'}
        active="notifications"
        translate={t}
        onChangePassword={() => setPasswordOpen(true)}
        actions={
          <button
            className="admin-secondary-button"
            type="button"
            onClick={() => setHistoryOpen(!historyOpen)}
          >
            {t(historyOpen ? 'Compose Notification' : 'View History')}
          </button>
        }
      >
        {historyOpen ? (
          <section className="notification-history admin-motion-enter">
            <h2>{t('View History')}</h2>
            {receipts.length ? (
              receipts.map((receipt) => (
                <div className="notification-history-row" key={receipt.id}>
                  <div>
                    <strong>{receipt.title}</strong>
                    <small>
                      {receipt.id} · {receipt.audience} ·{' '}
                      {receipt.count.toLocaleString(locale)}
                    </small>
                  </div>
                  <span>{t(receipt.status)}</span>
                  <small>
                    {receipt.time === 'Just now · ICT'
                      ? `${t('Just now')} · ICT`
                      : receipt.time}
                  </small>
                </div>
              ))
            ) : (
              <div className="notification-empty">
                <AdminIcon name="notification" />
                <h3>{t('No notification requests yet')}</h3>
                <p>
                  {t(
                    'No notification requests have been recorded in this demo yet.',
                  )}
                </p>
                <button
                  className="admin-primary-button"
                  type="button"
                  onClick={() => setHistoryOpen(false)}
                >
                  {t('Compose Notification')}
                </button>
              </div>
            )}
          </section>
        ) : (
          <div className="notification-compose">
            {success && (
              <div
                className="notification-success admin-motion-enter"
                role="status"
              >
                <AdminIcon name="check" />
                <div>
                  <strong>{t('Notification request recorded')}</strong>
                  <p>
                    {success.id} · {t(success.status)}.{' '}
                    {t('Only the selected audience is targeted.')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccess(null)}
                  aria-label={t('Close')}
                >
                  <AdminIcon name="close" />
                </button>
              </div>
            )}
            <nav
              className="notification-steps"
              aria-label={t('Compose and Schedule Notification')}
            >
              {steps.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  className={`${index + 1 === step ? 'is-active' : ''} ${index + 1 < step ? 'is-done' : ''}`}
                  aria-current={index + 1 === step ? 'step' : undefined}
                  disabled={index + 1 > step}
                  onClick={() => {
                    setStep(index + 1)
                    setError('')
                  }}
                >
                  <b>{index + 1}</b>
                  {t(label)}
                </button>
              ))}
            </nav>
            <section
              className="notification-card admin-motion-enter"
              key={step}
              aria-labelledby="notification-step-title"
            >
              <p className="notification-kicker">
                {locale === 'en' ? `Step ${step} of 4` : t(`Step ${step} of 4`)}
              </p>
              <h2 id="notification-step-title">{t(steps[step - 1])}</h2>
              {error && (
                <p className="notification-error" role="alert">
                  {t(error)}
                </p>
              )}
              {step === 1 && (
                <>
                  <div className="notification-form-grid">
                    <NotificationField
                      label={t('Title')}
                      requiredLabel={t('Required')}
                    >
                      <input
                        value={draft.title}
                        onChange={(event) =>
                          update({ title: event.target.value })
                        }
                        maxLength={100}
                        placeholder={t('Message title')}
                      />
                    </NotificationField>
                    <NotificationField
                      label={t('Body')}
                      requiredLabel={t('Required')}
                      className="notification-span"
                    >
                      <textarea
                        value={draft.body}
                        onChange={(event) =>
                          update({ body: event.target.value })
                        }
                        rows={5}
                        placeholder={t('Write the message people will see')}
                      />
                    </NotificationField>
                    <section
                      className="notification-upload-field notification-span"
                      aria-labelledby="notification-image-label"
                    >
                      <div className="notification-image-heading">
                        <strong id="notification-image-label">
                          {t('Notification image')}
                        </strong>
                        <small>{t('Optional')}</small>
                      </div>
                      <div className="notification-upload">
                        <div className="notification-placeholder">
                          {draft.image ? (
                            <ImagePreview
                              src={draft.image}
                              alt={t('Notification image')}
                            />
                          ) : (
                            <AdminIcon name="image" />
                          )}
                        </div>
                        <div>
                          <p>
                            {draft.imageName ||
                              t('Add an image to your notification')}
                          </p>
                          <small>{t('JPG, PNG or WebP · Maximum 5 MB')}</small>
                          <div className="notification-image-actions">
                            <button
                              className="admin-secondary-button"
                              type="button"
                              onClick={() => fileInput.current?.click()}
                            >
                              {t(draft.image ? 'Change Image' : 'Upload Image')}
                            </button>
                            {draft.image && (
                              <button
                                className="admin-secondary-button"
                                type="button"
                                onClick={() =>
                                  update({ image: '', imageName: '' })
                                }
                              >
                                {t('Remove Image')}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <input
                        ref={fileInput}
                        className="notification-visually-hidden"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        aria-labelledby="notification-image-label"
                        onChange={(event) => upload(event.target.files?.[0])}
                      />
                      {imageError && (
                        <p className="notification-error" role="alert">
                          {t(imageError)}
                        </p>
                      )}
                    </section>
                    <fieldset className="notification-choice">
                      <legend>{t('Channels')}</legend>
                      <label>
                        <input
                          type="checkbox"
                          checked={draft.inApp}
                          onChange={(event) =>
                            update({ inApp: event.target.checked })
                          }
                        />{' '}
                        {t('In-App')}
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={draft.push}
                          onChange={(event) =>
                            update({ push: event.target.checked })
                          }
                        />{' '}
                        {t('Push')}
                      </label>
                    </fieldset>
                    <NotificationField
                      label={t('Internal destination')}
                      requiredLabel={t('Required')}
                    >
                      <select
                        value={draft.destination}
                        onChange={(event) =>
                          update({ destination: event.target.value })
                        }
                      >
                        <option value="">
                          {t('Select an internal destination')}
                        </option>
                        {destinations.map((value) => (
                          <option key={value} value={value}>
                            {t(value)}
                          </option>
                        ))}
                      </select>
                    </NotificationField>
                  </div>
                  <p className="notification-hint">
                    {t(
                      'Only configured internal app destinations are available. External URLs are not accepted.',
                    )}
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <fieldset className="notification-choice">
                    <legend>
                      {t('Choose an audience')} <b>{t('Required')}</b>
                    </legend>
                    {(
                      [
                        ['role', 'By role'],
                        ['region', 'By region'],
                        ['accounts', 'Specific accounts'],
                      ] as const
                    ).map(([value, label]) => (
                      <label key={value}>
                        <input
                          type="radio"
                          name="audienceType"
                          checked={draft.audienceType === value}
                          onChange={() =>
                            update({ audienceType: value, providerType: '' })
                          }
                        />{' '}
                        {t(label)}
                      </label>
                    ))}
                  </fieldset>
                  {draft.audienceType !== 'accounts' ? (
                    <div className="notification-form-grid">
                      <NotificationField
                        label={`${t('Role')} · ${t(draft.audienceType === 'role' ? 'Required' : 'Optional')}`}
                      >
                        <select
                          value={draft.role}
                          onChange={(event) =>
                            update({
                              role: event.target.value,
                              providerType: '',
                            })
                          }
                        >
                          <option value="">
                            {t(
                              draft.audienceType === 'region'
                                ? 'All eligible roles'
                                : 'Select a role',
                            )}
                          </option>
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {t(role)}
                            </option>
                          ))}
                        </select>
                      </NotificationField>
                      {draft.audienceType === 'region' && (
                        <NotificationField
                          label={t('Region')}
                          requiredLabel={t('Required')}
                        >
                          <select
                            value={draft.region}
                            onChange={(event) =>
                              update({ region: event.target.value })
                            }
                          >
                            <option value="">
                              {t('Select active region')}
                            </option>
                            {activeRegions.map((region) => (
                              <option key={region.id} value={region.name}>
                                {t(region.name)}
                              </option>
                            ))}
                          </select>
                        </NotificationField>
                      )}
                      {draft.role === 'Service Provider' && (
                        <NotificationField
                          label={`${t('Provider type')} · ${t('Optional refinement')}`}
                        >
                          <select
                            value={draft.providerType}
                            onChange={(event) =>
                              update({ providerType: event.target.value })
                            }
                          >
                            <option value="">{t('All provider types')}</option>
                            <option value="Individual Therapist">
                              {t('Individual Therapist')}
                            </option>
                            <option value="Massage Business">
                              {t('Massage Business')}
                            </option>
                          </select>
                        </NotificationField>
                      )}
                    </div>
                  ) : (
                    <NotificationField
                      label={t('Account references')}
                      requiredLabel={t('Required')}
                    >
                      <textarea
                        rows={3}
                        value={draft.accounts}
                        onChange={(event) =>
                          update({ accounts: event.target.value })
                        }
                        placeholder={t(
                          'Account references, separated by commas',
                        )}
                      />
                    </NotificationField>
                  )}
                  <Summary
                    label={t('Exact target rule')}
                    value={rule}
                    detail={`${t('Estimated eligible accounts')} · ${count.toLocaleString(locale)}`}
                  />
                </>
              )}
              {step === 3 && (
                <div className="notification-preview-grid">
                  <div className="notification-phone">
                    <small>{t('APP PREVIEW')}</small>
                    <div className="notification-message">
                      {draft.image && (
                        <ImagePreview
                          src={draft.image}
                          alt={t('Notification image')}
                          className="notification-preview-image"
                        />
                      )}
                      <strong>{draft.title}</strong>
                      <p>{draft.body}</p>
                      <span>
                        {t('Open')} {t(draft.destination)}
                      </span>
                    </div>
                  </div>
                  <dl className="notification-review">
                    <div>
                      <dt>{t('Audience')}</dt>
                      <dd>{rule}</dd>
                    </div>
                    <div>
                      <dt>{t('Estimated eligible accounts')}</dt>
                      <dd>{count.toLocaleString(locale)}</dd>
                    </div>
                    <div>
                      <dt>{t('Channels')}</dt>
                      <dd>
                        {[draft.inApp && t('In-App'), draft.push && t('Push')]
                          .filter(Boolean)
                          .join(' + ')}
                      </dd>
                    </div>
                    <div>
                      <dt>{t('Internal destination')}</dt>
                      <dd>{t(draft.destination)}</dd>
                    </div>
                    {draft.image && (
                      <div>
                        <dt>{t('Notification image')}</dt>
                        <dd>{draft.imageName}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
              {step === 4 && (
                <>
                  <fieldset className="notification-choice">
                    <legend>{t('Delivery')}</legend>
                    <label>
                      <input
                        type="radio"
                        name="delivery"
                        checked={draft.delivery === 'now'}
                        onChange={() => update({ delivery: 'now' })}
                      />{' '}
                      {t('Send Now')}
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="delivery"
                        checked={draft.delivery === 'schedule'}
                        onChange={() => update({ delivery: 'schedule' })}
                      />{' '}
                      {t('Schedule')}
                    </label>
                  </fieldset>
                  {draft.delivery === 'schedule' && (
                    <NotificationField
                      label={`${t('Scheduled date and time')} · ${t('Future time required')}`}
                    >
                      <input
                        type="datetime-local"
                        value={draft.scheduledAt}
                        onChange={(event) =>
                          update({ scheduledAt: event.target.value })
                        }
                      />
                    </NotificationField>
                  )}
                  <Summary
                    label={t('Configured time zone')}
                    value="Asia/Ho_Chi_Minh · ICT (UTC+7)"
                    detail={`${rule} · ${count.toLocaleString(locale)} ${t('estimated eligible accounts')}`}
                  />
                </>
              )}
              <footer className="notification-card-footer">
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={() => {
                    setError('')
                    if (step === 1) {
                      setDraft(emptyDraft())
                      setHistoryOpen(true)
                    } else setStep(step - 1)
                  }}
                >
                  {t(step === 1 ? 'Cancel' : 'Back')}
                </button>
                <button
                  className="admin-primary-button"
                  type="button"
                  onClick={next}
                >
                  {t(
                    step === 4
                      ? draft.delivery === 'now'
                        ? 'Send Now'
                        : 'Schedule'
                      : 'Continue',
                  )}
                </button>
              </footer>
            </section>
          </div>
        )}
      </AdminShell>
      {confirmOpen && (
        <div
          className={`admin-modal-backdrop admin-motion-backdrop${confirmDismiss.closing ? ' is-closing' : ''}`}
          inert={confirmDismiss.closing}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) confirmDismiss.dismiss()
          }}
        >
          <section
            className="admin-dialog admin-motion-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-confirm-title"
          >
            <p className="notification-kicker">{t('Confirm delivery')}</p>
            <h2 id="notification-confirm-title">
              {draft.delivery === 'now'
                ? t('Send Now?')
                : `${t('Schedule Notification')}?`}
            </h2>
            <div className="notification-summary">
              {draft.image && (
                <ImagePreview src={draft.image} alt={t('Notification image')} />
              )}
              <strong>{draft.title}</strong>
              <small>
                {rule} · {count.toLocaleString(locale)}{' '}
                {t('estimated eligible accounts')}
              </small>
              <small>
                {draft.delivery === 'schedule'
                  ? `${draft.scheduledAt.replace('T', ' · ')} ICT`
                  : t('Send request starts now')}
              </small>
            </div>
            <div className="admin-dialog__actions">
              <button
                className="admin-secondary-button"
                type="button"
                onClick={confirmDismiss.dismiss}
              >
                {t('Go Back')}
              </button>
              <button
                className="admin-primary-button"
                type="button"
                onClick={recordDelivery}
              >
                {t('Confirm')}
              </button>
            </div>
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
