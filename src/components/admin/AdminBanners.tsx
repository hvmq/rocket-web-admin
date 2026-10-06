'use client'

import Image from 'next/image'
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { bannersT } from '@/i18n/admin-banners'
import { AdminIcon } from './AdminIcon'
import { AdminShell } from './AdminShell'
import { AdminOverlay } from './AdminOverlay'
import { ChangePasswordDialog } from './AdminDashboard'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import {
  bannerDestinations,
  bannerState,
  bannerStates,
  initialBanners,
  validBannerImage,
  validateBanner,
  type Banner,
} from './admin-banners-demo'
import './dashboard.css'
import './banners.css'

type Translate = (source: string) => string
type Mode = 'ready' | 'loading' | 'empty' | 'error' | 'stale'

function BannerImage({
  src,
  alt,
  className = '',
  t,
}: {
  src: string
  alt: string
  className?: string
  t: Translate
}) {
  const [failed, setFailed] = useState(false)
  if (failed || !validBannerImage(src))
    return (
      <span
        className={`banner-image-fallback ${className}`}
        role="img"
        aria-label={t('Image unavailable')}
      >
        <AdminIcon name="image" />
        <small>{t('Image unavailable')}</small>
      </span>
    )
  return (
    <Image
      unoptimized
      src={src}
      alt={alt}
      width={1200}
      height={700}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

function BannerStatus({ banner, t }: { banner: Banner; t: Translate }) {
  const state = bannerState(banner)
  return (
    <span className={`banner-status banner-status--${state.toLowerCase()}`}>
      <i />
      {t(state)}
    </span>
  )
}

function BannerField({
  label,
  required,
  children,
  wide = false,
  t,
}: {
  label: string
  required?: boolean
  children: ReactNode
  wide?: boolean
  t: Translate
}) {
  return (
    <label className={`admin-field banner-field${wide ? ' banner-span' : ''}`}>
      <span>
        {t(label)} {required && <b>{t('Required')}</b>}
      </span>
      {children}
    </label>
  )
}

function BannerEditor({
  draft,
  original,
  error,
  t,
  onChange,
  onSave,
  onClose,
}: {
  draft: Banner
  original?: Banner
  error: string
  t: Translate
  onChange: (draft: Banner) => void
  onSave: (event: FormEvent, dismiss: () => void) => void
  onClose: () => void
}) {
  const [tab, setTab] = useState<'details' | 'preview'>('details')
  const update = (changes: Partial<Banner>) =>
    onChange({ ...draft, ...changes })
  return (
    <AdminOverlay
      variant="drawer"
      titleId="banner-form-title"
      onClose={onClose}
      className="banner-editor"
    >
      {(dismiss) => (
        <>
          <header>
            <h2 id="banner-form-title">
              {t(draft.id ? 'Edit Banner' : 'Create Banner')}
            </h2>
            <button
              className="banner-close"
              type="button"
              onClick={dismiss}
              aria-label={t('Close banner editor')}
            >
              <AdminIcon name="close" />
            </button>
          </header>
          <div
            className="banner-tabs"
            role="tablist"
            aria-label={t('Banner editor tabs')}
          >
            {(['details', 'preview'] as const).map((value) => (
              <button
                id={`banner-tab-${value}`}
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                aria-controls={`banner-panel-${value}`}
                tabIndex={tab === value ? 0 : -1}
                className={tab === value ? 'is-active' : ''}
                onClick={() => setTab(value)}
                onKeyDown={(event) => {
                  if (
                    ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault()
                    const next =
                      event.key === 'Home'
                        ? 'details'
                        : event.key === 'End'
                          ? 'preview'
                          : tab === 'details'
                            ? 'preview'
                            : 'details'
                    setTab(next)
                    document.getElementById(`banner-tab-${next}`)?.focus()
                  }
                }}
              >
                {t(value === 'details' ? 'Details' : 'Preview')}
              </button>
            ))}
          </div>
          {tab === 'details' ? (
            <form
              id="banner-panel-details"
              onSubmit={(event) => onSave(event, dismiss)}
              noValidate
              role="tabpanel"
              aria-labelledby="banner-tab-details"
            >
              <div className="banner-editor-body admin-motion-enter">
                {error && (
                  <p className="banner-error" role="alert">
                    {t(error)}
                  </p>
                )}
                <div className="banner-form-grid">
                  <BannerField label="Title" required t={t}>
                    <input
                      data-autofocus
                      name="title"
                      value={draft.title}
                      onChange={(event) =>
                        update({ title: event.target.value })
                      }
                    />
                  </BannerField>
                  <BannerField label="Accessibility label" required t={t}>
                    <input
                      name="label"
                      value={draft.label}
                      onChange={(event) =>
                        update({ label: event.target.value })
                      }
                    />
                  </BannerField>
                  <BannerField
                    label="Image URL or approved media reference"
                    required
                    wide
                    t={t}
                  >
                    <input
                      name="image"
                      value={draft.image}
                      placeholder={t('Select an approved image')}
                      onChange={(event) =>
                        update({ image: event.target.value })
                      }
                    />
                  </BannerField>
                  <BannerField label="Internal destination" required t={t}>
                    <select
                      name="destination"
                      value={draft.destination}
                      onChange={(event) =>
                        update({ destination: event.target.value })
                      }
                    >
                      <option value="">
                        {t('Select an internal destination')}
                      </option>
                      {bannerDestinations.map((value) => (
                        <option value={value} key={value}>
                          {t(value)}
                        </option>
                      ))}
                    </select>
                  </BannerField>
                  <BannerField label="Display order" t={t}>
                    <input
                      name="order"
                      type="number"
                      min="1"
                      step="1"
                      value={Number.isNaN(draft.order) ? '' : draft.order}
                      onChange={(event) =>
                        update({ order: event.target.valueAsNumber })
                      }
                    />
                  </BannerField>
                  <BannerField label="Effective start" required t={t}>
                    <input
                      name="start"
                      type="datetime-local"
                      value={draft.start}
                      onInput={(event) =>
                        update({ start: event.currentTarget.value })
                      }
                      onBlur={(event) =>
                        update({ start: event.currentTarget.value })
                      }
                      onChange={(event) =>
                        update({ start: event.target.value })
                      }
                    />
                  </BannerField>
                  <BannerField label="Effective end" required t={t}>
                    <input
                      name="end"
                      type="datetime-local"
                      value={draft.end}
                      onInput={(event) =>
                        update({ end: event.currentTarget.value })
                      }
                      onBlur={(event) =>
                        update({ end: event.currentTarget.value })
                      }
                      onChange={(event) => update({ end: event.target.value })}
                    />
                  </BannerField>
                  <label className="admin-check banner-span">
                    <input
                      name="visible"
                      type="checkbox"
                      checked={draft.visible}
                      disabled={original?.visible}
                      onChange={(event) =>
                        update({ visible: event.target.checked })
                      }
                    />
                    {t('Visible during effective period')}
                  </label>
                  {original?.visible && (
                    <small className="banner-span">
                      {t('Use Hide Banner to record a required reason.')}
                    </small>
                  )}
                  <small className="banner-span">
                    {t('Time zone')}: Asia/Ho_Chi_Minh (UTC+07:00)
                  </small>
                </div>
              </div>
              <footer>
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={dismiss}
                >
                  {t('Cancel')}
                </button>
                <button type="submit" className="admin-primary-button">
                  {t('Save Banner')}
                </button>
              </footer>
            </form>
          ) : (
            <div
              id="banner-panel-preview"
              className="banner-preview-panel"
              role="tabpanel"
              aria-labelledby="banner-tab-preview"
            >
              <div className="banner-editor-body admin-motion-enter">
                <div className="banner-preview">
                  <BannerImage
                    key={draft.image}
                    src={draft.image}
                    alt={draft.label}
                    t={t}
                  />
                  {!validBannerImage(draft.image) && (
                    <p>
                      {t(
                        'Image unavailable — return to Details to choose a valid image.',
                      )}
                    </p>
                  )}
                  <div>
                    <small>{t('APP HOME · INFORMATIONAL BANNER')}</small>
                    <strong>{t(draft.title || 'Untitled banner')}</strong>
                    <p>
                      {t('Opens')}{' '}
                      {t(draft.destination || 'no destination selected')}
                    </p>
                  </div>
                </div>
              </div>
              <footer>
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() => setTab('details')}
                >
                  {t('Back to Details')}
                </button>
              </footer>
            </div>
          )}
        </>
      )}
    </AdminOverlay>
  )
}

export function AdminBanners({
  locale,
  initialMode,
  initialBanner,
}: {
  locale: Locale
  initialMode?: string
  initialBanner?: string
}) {
  const t = (source: string) => bannersT(locale, source)
  const [mode, setMode] = useState<Mode>(
    ['loading', 'empty', 'error', 'stale'].includes(initialMode ?? '')
      ? (initialMode as Mode)
      : 'ready',
  )
  const [banners, setBanners] = useState<Banner[]>(
    mode === 'empty' ? [] : initialBanners,
  )
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [selectedId, setSelectedId] = useState(initialBanner ?? '')
  const [draft, setDraft] = useState<Banner | null>(null)
  const [error, setError] = useState('')
  const [action, setAction] = useState<'hide' | 'delete' | null>(null)
  const [reason, setReason] = useState('')
  const [notice, setNotice] = useState('')
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const detailDismiss = useAnimatedDismiss(() => setSelectedId(''))
  const closeDetail = detailDismiss.dismiss
  const selected = banners.find((banner) => banner.id === selectedId)
  useEffect(() => {
    if (!selectedId || draft || action || passwordOpen) return
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetail()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedId, draft, action, passwordOpen, closeDetail])
  const query = search.trim().toLocaleLowerCase(locale)
  const rows = banners
    .filter(
      (banner) =>
        (!query ||
          [
            banner.title,
            banner.label,
            banner.destination,
            t(banner.title),
            t(banner.label),
            t(banner.destination),
          ].some((value) => value.toLocaleLowerCase(locale).includes(query))) &&
        (status === 'all' || bannerState(banner) === status),
    )
    .sort((a, b) => a.order - b.order)
  const placement = banners
    .filter((banner) => bannerState(banner) === 'Active')
    .sort((a, b) => a.order - b.order)
  const original = banners.find((banner) => banner.id === draft?.id)
  const auditTime = () =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date())
  function save(event: FormEvent, dismiss: () => void) {
    event.preventDefault()
    if (!draft) return
    const issue = validateBanner(draft, original)
    if (issue || mode === 'stale') {
      setError(issue || 'Reload current data before saving.')
      return
    }
    const saved = {
      ...draft,
      title: draft.title.trim(),
      label: draft.label.trim(),
      id:
        draft.id ||
        `BN-${Math.max(304, ...banners.map((item) => Number(item.id.slice(3)))) + 1}`,
      audit: [
        { action: original ? 'Edited' : 'Created', time: auditTime() },
        ...draft.audit,
      ],
    }
    setBanners((current) =>
      original
        ? current.map((item) => (item.id === saved.id ? saved : item))
        : [...current, saved],
    )
    setSelectedId(saved.id)
    detailDismiss.cancel()
    setNotice(
      `${saved.id} · ${t('Banner saved. Effective display follows order and visibility.')}`,
    )
    dismiss()
  }
  function confirm(dismiss: () => void) {
    if (!selected || selected.deleted || !reason.trim()) return
    if (mode === 'stale') {
      setError('Reload current data before saving.')
      return
    }
    const audit = {
      action: action === 'delete' ? 'Deleted' : 'Hidden',
      reason: reason.trim(),
      time: auditTime(),
    }
    setBanners((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              deleted: action === 'delete',
              visible: action === 'hide' ? false : item.visible,
              audit: [audit, ...item.audit],
            }
          : item,
      ),
    )
    setNotice(
      `${selected.id} · ${t(action === 'delete' ? 'Banner deleted. Reason recorded.' : 'Banner hidden. Reason recorded.')}`,
    )
    dismiss()
  }
  return (
    <>
      <AdminShell
        locale={locale}
        title="Banner Management"
        active="banners"
        translate={t}
        onChangePassword={() => setPasswordOpen(true)}
        actions={
          <button
            type="button"
            className="admin-primary-button"
            onClick={() => {
              setError('')
              setDraft({
                id: '',
                title: '',
                label: '',
                image: '',
                destination: '',
                start: '',
                end: '',
                order: 1,
                visible: false,
                deleted: false,
                audit: [],
              })
            }}
          >
            {t('Create Banner')}
          </button>
        }
      >
        <div className="banners-page admin-motion-enter">
          {notice && (
            <div className="banner-notice admin-motion-enter" role="status">
              <AdminIcon name="check" />
              <div>
                <strong>{t('Banner updated')}</strong>
                <p>{notice}</p>
              </div>
              <button
                className="banner-close"
                type="button"
                onClick={() => setNotice('')}
                aria-label={t('Close')}
              >
                <AdminIcon name="close" />
              </button>
            </div>
          )}
          {mode === 'stale' && (
            <div className="banner-stale" role="alert">
              <AdminIcon name="warning" />
              <div>
                <strong>{t('Record changed')}</strong>
                <p>
                  {t(
                    'The banner changed after this view opened. Reload before making a decision.',
                  )}
                </p>
              </div>
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => {
                  setMode('ready')
                  setError('')
                }}
              >
                {t('Reload Details')}
              </button>
            </div>
          )}
          <section className="banner-panel">
            <div className="banner-toolbar">
              <label className="banner-search">
                <AdminIcon name="search" />
                <input
                  id="banner-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t('Search banner, label or destination')}
                  aria-label={t('Search banners')}
                />
              </label>
              <label className="banner-filter">
                {t('Status')}
                <select
                  id="banner-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="all">{t('All states')}</option>
                  {bannerStates.map((value) => (
                    <option key={value} value={value}>
                      {t(value)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {mode === 'loading' || mode === 'error' ? (
              <div
                className="banner-empty"
                aria-busy={mode === 'loading'}
                role="status"
              >
                <AdminIcon name={mode === 'error' ? 'warning' : 'image'} />
                <h2>
                  {t(
                    mode === 'loading'
                      ? 'Loading banners…'
                      : 'Banners unavailable',
                  )}
                </h2>
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() => setMode('ready')}
                >
                  {t('Retry')}
                </button>
              </div>
            ) : rows.length ? (
              <div className="banner-table-scroll">
                <table
                  className="banner-table"
                  aria-label={t('Informational banners')}
                >
                  <thead>
                    <tr>
                      {[
                        'Banner',
                        'Internal destination',
                        'Effective period',
                        'Order',
                        'State',
                        '',
                      ].map((label, index) => (
                        <th key={index} scope="col">
                          {t(label)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((banner, index) => (
                      <tr
                        key={banner.id}
                        className={`admin-motion-enter${selectedId === banner.id ? ' is-selected' : ''}`}
                        style={{
                          animationDelay: `var(--admin-motion-stagger-${Math.min(index, 4)})`,
                        }}
                      >
                        <td>
                          <div className="banner-cell">
                            <BannerImage
                              key={banner.image}
                              src={banner.image}
                              alt=""
                              t={t}
                            />
                            <span>
                              <strong>{t(banner.title)}</strong>
                              <small>{t(banner.label)}</small>
                            </span>
                          </div>
                        </td>
                        <td>{t(banner.destination)}</td>
                        <td>
                          {banner.start.replace('T', ' · ')} →{' '}
                          {banner.end.replace('T', ' · ')}
                        </td>
                        <td>{banner.order}</td>
                        <td>
                          <BannerStatus banner={banner} t={t} />
                        </td>
                        <td>
                          <button
                            className="banner-details-button"
                            type="button"
                            onClick={() => {
                              detailDismiss.cancel()
                              setSelectedId(banner.id)
                            }}
                            aria-label={`${t('Details')} · ${t(banner.title)}`}
                          >
                            {t('Details')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="banner-empty" role="status">
                <AdminIcon name="image" />
                <h2>{t('No banners found')}</h2>
                {(search || status !== 'all') && (
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => {
                      setSearch('')
                      setStatus('all')
                    }}
                  >
                    {t('Clear Filters')}
                  </button>
                )}
              </div>
            )}
          </section>
          {selected && mode !== 'error' && mode !== 'loading' && (
            <aside
              className={`banner-detail admin-motion-drawer${detailDismiss.closing ? ' is-closing' : ''}`}
              inert={detailDismiss.closing}
              aria-label={t('Banner details')}
            >
              <button
                className="banner-close banner-detail-close"
                type="button"
                onClick={detailDismiss.dismiss}
                aria-label={t('Close details')}
              >
                <AdminIcon name="close" />
              </button>
              <p className="banner-kicker">{selected.id}</p>
              <h2>{t(selected.title)}</h2>
              <BannerImage
                key={selected.image}
                src={selected.image}
                alt={t(selected.label)}
                className="banner-detail-image"
                t={t}
              />
              <div className="banner-facts">
                <span>
                  {t('Accessibility label')}
                  <strong>{t(selected.label)}</strong>
                </span>
                <span>
                  {t('Opens')}
                  <strong>{t(selected.destination)}</strong>
                </span>
                <span>
                  {t('Display order')}
                  <strong>{selected.order}</strong>
                </span>
                <span>
                  {t('State')}
                  <BannerStatus banner={selected} t={t} />
                </span>
              </div>
              <section>
                <h3>{t('Audit history')}</h3>
                <ol className="banner-audit">
                  {selected.audit.map((entry, index) => (
                    <li key={index}>
                      <i />
                      <div>
                        <strong>
                          {t(entry.action)} · Ava Morgan
                          {entry.reason ? ` · ${entry.reason}` : ''}
                        </strong>
                        <small>
                          {entry.time
                            ? `${entry.time} ICT`
                            : t('Latest activity')}
                        </small>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
              <section>
                <h3>{t('Current app placement')}</h3>
                {placement.length ? (
                  placement.map((item, index) => (
                    <div className="banner-placement" key={item.id}>
                      {index + 1}. {t(item.title)}
                    </div>
                  ))
                ) : (
                  <p>{t('No active banners')}</p>
                )}
              </section>
              <div className="banner-detail-actions">
                {selected.deleted ? (
                  <span>{t('Deleted banner · audit record only.')}</span>
                ) : (
                  <>
                    <button
                      className="admin-secondary-button"
                      type="button"
                      onClick={() => {
                        setError('')
                        setDraft({ ...selected })
                      }}
                    >
                      {t('Edit')}
                    </button>
                    {selected.visible && (
                      <button
                        className="admin-secondary-button"
                        type="button"
                        onClick={() => {
                          setReason('')
                          setError('')
                          setAction('hide')
                        }}
                      >
                        {t('Hide Banner')}
                      </button>
                    )}
                    <button
                      className="admin-secondary-button"
                      type="button"
                      onClick={() => {
                        setReason('')
                        setError('')
                        setAction('delete')
                      }}
                    >
                      {t('Delete Banner')}
                    </button>
                  </>
                )}
              </div>
            </aside>
          )}
        </div>
      </AdminShell>
      {draft && (
        <BannerEditor
          draft={draft}
          original={original}
          error={error}
          t={t}
          onChange={(value) => {
            setDraft(value)
            setError('')
          }}
          onSave={save}
          onClose={() => setDraft(null)}
        />
      )}
      {action && selected && (
        <AdminOverlay
          titleId="banner-dialog-title"
          onClose={() => setAction(null)}
          className="banner-confirm"
        >
          {(dismiss) => (
            <>
              <p className="banner-kicker">{selected.id}</p>
              <h2 id="banner-dialog-title">
                {t(action === 'delete' ? 'Delete Banner?' : 'Hide Banner?')}
              </h2>
              <p>
                {t(
                  action === 'delete'
                    ? 'Remove this banner from the catalogue and app placement. Its audit reference remains.'
                    : 'Hide this banner from the app after the next refresh. You may edit and show it again later.',
                )}
              </p>
              <div className="banner-confirm-target">
                <strong>{t(selected.title)}</strong>
                <small>{t(selected.destination)}</small>
              </div>
              {error && (
                <p className="banner-error" role="alert">
                  {t(error)}
                </p>
              )}
              <BannerField label="Reason" required t={t}>
                <textarea
                  data-autofocus
                  id="banner-reason"
                  value={reason}
                  rows={3}
                  onChange={(event) => setReason(event.target.value)}
                />
              </BannerField>
              <div className="admin-dialog__actions">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={dismiss}
                >
                  {t('Cancel')}
                </button>
                <button
                  type="button"
                  className="admin-primary-button"
                  disabled={!reason.trim()}
                  onClick={() => confirm(dismiss)}
                >
                  {t(action === 'delete' ? 'Confirm Delete' : 'Confirm Hide')}
                </button>
              </div>
            </>
          )}
        </AdminOverlay>
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
