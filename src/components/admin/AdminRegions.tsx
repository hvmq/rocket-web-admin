'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { regionsT } from '@/i18n/admin-regions'
import { AdminIcon } from './AdminIcon'
import { AdminShell } from './AdminShell'
import { AdminRegionImport } from './AdminRegionImport'
import { AdminPagination } from './AdminPagination'
import { AdminOverlay } from './AdminOverlay'
import type { RegionImportPreview } from './admin-region-import'
import { ChangePasswordDialog } from './AdminDashboard'
import {
  allowedParents,
  initialRegions,
  isAncestor,
  orderedRegions,
  regionLevels,
  regionPath,
  type Region,
  type RegionLevel,
} from './admin-regions-demo'
import './dashboard.css'
import './regions.css'

type Translate = (source: string) => string
type Mode = 'ready' | 'loading' | 'empty' | 'save-error' | 'stale'

const normalizeSearch = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase()
    .replace(/đ/g, 'd')

function RegionStatus({ region, t }: { region: Region; t: Translate }) {
  return (
    <span
      className={`region-status region-status--${region.status.toLowerCase()}`}
    >
      <i />
      {t(region.status)}
    </span>
  )
}

function RegionTable({
  regions,
  selectedId,
  search,
  locale,
  t,
  onSelect,
  onClearSearch,
}: {
  regions: Region[]
  selectedId: string
  search: string
  locale: Locale
  t: Translate
  onSelect: (id: string, trigger: HTMLButtonElement) => void
  onClearSearch: () => void
}) {
  const query = normalizeSearch(search.trim())
  const [pagination, setPagination] = useState({ query, page: 1 })
  const page = pagination.query === query ? pagination.page : 1
  const catalogue = useMemo(() => {
    const byId = new Map(regions.map((item) => [item.id, item]))
    const paths = new Map<string, string>()
    const childCounts = new Map<string, number>()
    regions.forEach((item) => {
      childCounts.set(item.parentId, (childCounts.get(item.parentId) ?? 0) + 1)
    })
    const rows = orderedRegions(regions).map((row) => {
      const parentPath = paths.get(row.item.parentId)
      const path = parentPath
        ? `${parentPath} / ${row.item.name}`
        : row.item.name
      paths.set(row.item.id, path)
      return { ...row, path }
    })
    return { rows, byId, childCounts }
  }, [regions])
  const rows = catalogue.rows.filter(
    ({ item, path }) =>
      !query ||
      [path, path.split(' / ').map(t).join(' / '), item.id].some((value) =>
        normalizeSearch(value).includes(query),
      ),
  )
  const pageCount = Math.max(1, Math.ceil(rows.length / 25))
  const currentPage = Math.min(page, pageCount)
  const visibleRows = rows.slice((currentPage - 1) * 25, currentPage * 25)

  if (!rows.length) {
    return (
      <div className="region-empty">
        <AdminIcon name="location" />
        <h2>{t(query ? 'No matching regions' : 'No regions found')}</h2>
        <p>
          {t(
            query
              ? 'Try a different name, region ID or full path.'
              : 'Import JSON or add a region to get started.',
          )}
        </p>
        {query && (
          <button
            className="admin-secondary-button"
            type="button"
            onClick={onClearSearch}
          >
            {t('Clear Search')}
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        className="region-table-scroll"
        tabIndex={0}
        role="region"
        aria-label={t('Region hierarchy')}
      >
        <div
          className="region-table"
          role="table"
          aria-label={t('Region hierarchy')}
        >
          <div className="region-row region-row--head" role="row">
            {['Region', 'Level', 'Parent', 'Order', 'Children', 'Status'].map(
              (label) => (
                <span key={label} role="columnheader">
                  {t(label)}
                </span>
              ),
            )}
            <span role="columnheader">{t('Actions')}</span>
          </div>
          {visibleRows.map(({ item, depth }, index) => (
            <div
              className={`region-row admin-motion-enter${selectedId === item.id ? ' is-selected' : ''}`}
              role="row"
              key={item.id}
              style={{
                animationDelay: `var(--admin-motion-stagger-${Math.min(index, 4)})`,
              }}
            >
              <div
                className="region-name"
                role="cell"
                style={{ paddingLeft: depth * 20 }}
              >
                <span aria-hidden="true">{depth ? '└' : '◉'}</span>
                <div>
                  <strong>{t(item.name)}</strong>
                  <small>{item.id}</small>
                </div>
              </div>
              <span role="cell" data-label={t('Level')}>
                {t(item.level)}
              </span>
              <span role="cell" data-label={t('Parent')}>
                {item.parentId
                  ? t(catalogue.byId.get(item.parentId)?.name ?? '—')
                  : '—'}
              </span>
              <span role="cell" data-label={t('Order')}>
                {item.order}
              </span>
              <span role="cell" data-label={t('Children')}>
                {catalogue.childCounts.get(item.id) ?? 0}
              </span>
              <span role="cell" data-label={t('Status')}>
                <RegionStatus region={item} t={t} />
              </span>
              <span role="cell" className="region-row-action">
                <button
                  type="button"
                  onClick={(event) => onSelect(item.id, event.currentTarget)}
                  aria-label={`${t('View')} ${t(item.name)}`}
                  aria-haspopup="dialog"
                  aria-expanded={selectedId === item.id}
                >
                  {t('View')}
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
      <AdminPagination
        page={currentPage}
        pageCount={pageCount}
        summary={t('Page {page} of {pages} · {count} regions')
          .replace('{page}', String(currentPage))
          .replace('{pages}', String(pageCount))
          .replace('{count}', rows.length.toLocaleString(locale))}
        label={t('Region pages')}
        previousLabel={t('Previous')}
        nextLabel={t('Next')}
        onPageChange={(page) => setPagination({ query, page })}
      />
    </>
  )
}

function RegionDetail({
  region,
  regions,
  reorder,
  error,
  t,
  onClose,
  onEdit,
  onToggle,
  onMove,
  onSaveOrder,
  onCancelOrder,
}: {
  region: Region
  regions: Region[]
  reorder: boolean
  error: string
  t: Translate
  onClose: () => void
  onEdit: () => void
  onToggle: () => void
  onMove: (id: string, direction: -1 | 1) => void
  onSaveOrder: () => void
  onCancelOrder: () => void
}) {
  const siblings = regions
    .filter((item) => item.parentId === region.parentId)
    .sort((a, b) => a.order - b.order)
  return (
    <AdminOverlay
      variant="drawer"
      className="region-detail"
      titleId="region-detail-title"
      onClose={onClose}
    >
      {(dismiss) => (
        <>
          <header>
            <div>
              <p className="region-kicker">{t('Selected region')}</p>
              <h2 id="region-detail-title">{t(region.name)}</h2>
            </div>
            <button
              className="region-close"
              type="button"
              onClick={dismiss}
              aria-label={t('Close details')}
            >
              <AdminIcon name="close" />
            </button>
          </header>
          <div className="region-detail-body">
            <p className="region-path">
              {regionPath(regions, region).split(' / ').map(t).join(' / ')}
            </p>
            <div className="region-facts">
              <span>
                {t('Level')} <strong>{t(region.level)}</strong>
              </span>
              <span>
                {t('Order')} <strong>{region.order}</strong>
              </span>
              <span>
                {t('Status')} <RegionStatus region={region} t={t} />
              </span>
            </div>
            {reorder ? (
              <section className="region-siblings">
                <h3>{t('Sibling order')}</h3>
                {siblings.map((sibling, index) => (
                  <div className="region-sibling" key={sibling.id}>
                    <span>
                      {index + 1}. {t(sibling.name)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onMove(sibling.id, -1)}
                      disabled={index === 0}
                      aria-label={`${t('Move')} ${t(sibling.name)} ${t('up')}`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => onMove(sibling.id, 1)}
                      disabled={index === siblings.length - 1}
                      aria-label={`${t('Move')} ${t(sibling.name)} ${t('down')}`}
                    >
                      ↓
                    </button>
                  </div>
                ))}
                {error && (
                  <p className="region-error" role="alert">
                    {t(error)}
                  </p>
                )}
              </section>
            ) : null}
          </div>
          <footer>
            {reorder ? (
              <>
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={onCancelOrder}
                >
                  {t('Cancel')}
                </button>
                <button
                  className="admin-primary-button"
                  type="button"
                  onClick={onSaveOrder}
                  disabled={!!error}
                >
                  {t('Save Order')}
                </button>
              </>
            ) : (
              <>
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={onEdit}
                >
                  {t('Edit')}
                </button>
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={onToggle}
                >
                  {t(region.status === 'Active' ? 'Deactivate' : 'Reactivate')}
                </button>
              </>
            )}
          </footer>
        </>
      )}
    </AdminOverlay>
  )
}

function RegionEditor({
  draft,
  regions,
  error,
  t,
  onChange,
  onClose,
  onSubmit,
}: {
  draft: Region
  regions: Region[]
  error: string
  t: Translate
  onChange: (value: Region) => void
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => boolean
}) {
  const parents = regions.filter(
    (item) =>
      item.id !== draft.id &&
      item.status === 'Active' &&
      allowedParents[draft.level].includes(item.level) &&
      !isAncestor(regions, item.id, draft.id),
  )
  return (
    <AdminOverlay
      variant="drawer"
      className="region-editor"
      titleId="region-form-title"
      onClose={onClose}
    >
      {(dismiss) => (
        <>
          <header>
            <h2 id="region-form-title">
              {t(draft.id ? 'Edit Region' : 'Add Region')}
            </h2>
            <button
              type="button"
              onClick={dismiss}
              aria-label={t('Close region editor')}
            >
              <AdminIcon name="close" />
            </button>
          </header>
          <form
            onSubmit={(event) => {
              if (onSubmit(event)) dismiss()
            }}
            noValidate
          >
            <div className="region-editor-body">
              {error && (
                <p className="region-error" role="alert">
                  {t(error)}
                </p>
              )}
              <label className="region-field">
                <span>
                  {t('Name')} <b>{t('Required')}</b>
                </span>
                <input
                  data-autofocus
                  required
                  value={draft.name}
                  onChange={(event) =>
                    onChange({ ...draft, name: event.target.value })
                  }
                  autoComplete="off"
                />
              </label>
              <label className="region-field">
                <span>
                  {t('Level')} <b>{t('Required')}</b>
                </span>
                <select
                  required
                  value={draft.level}
                  onChange={(event) =>
                    onChange({
                      ...draft,
                      level: event.target.value as RegionLevel,
                      parentId: '',
                    })
                  }
                >
                  {regionLevels.map((level) => (
                    <option key={level} value={level}>
                      {t(level)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="region-field">
                <span>
                  {t('Parent')}{' '}
                  {draft.level !== 'Country' && <b>{t('Required')}</b>}
                </span>
                <select
                  disabled={draft.level === 'Country'}
                  required={draft.level !== 'Country'}
                  value={draft.parentId}
                  onChange={(event) =>
                    onChange({ ...draft, parentId: event.target.value })
                  }
                >
                  <option value="">
                    {t(
                      draft.level === 'Country'
                        ? 'No parent · country only'
                        : 'Select a parent region',
                    )}
                  </option>
                  {parents.map((parent) => (
                    <option value={parent.id} key={parent.id}>
                      {regionPath(regions, parent)
                        .split(' / ')
                        .map(t)
                        .join(' / ')}
                    </option>
                  ))}
                </select>
              </label>
              <label className="region-field">
                <span>{t('Display order')}</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={draft.order}
                  onChange={(event) =>
                    onChange({ ...draft, order: Number(event.target.value) })
                  }
                />
              </label>
              <label className="region-field">
                <span>{t('Status')}</span>
                <select
                  disabled={!!draft.id}
                  value={draft.status}
                  onChange={(event) =>
                    onChange({
                      ...draft,
                      status: event.target.value as Region['status'],
                    })
                  }
                >
                  <option value="Active">{t('Active')}</option>
                  <option value="Inactive">{t('Inactive')}</option>
                </select>
                {draft.id && (
                  <small className="region-field-hint">
                    {t(
                      'Use the Deactivate or Reactivate action to change status with a reason.',
                    )}
                  </small>
                )}
              </label>
            </div>
            <footer>
              <button
                className="admin-secondary-button"
                type="button"
                onClick={dismiss}
              >
                {t('Cancel')}
              </button>
              <button className="admin-primary-button" type="submit">
                {t('Save Region')}
              </button>
            </footer>
          </form>
        </>
      )}
    </AdminOverlay>
  )
}

function RegionStatusDialog({
  region,
  regions,
  reason,
  error,
  t,
  onReason,
  onClose,
  onConfirm,
}: {
  region: Region
  regions: Region[]
  reason: string
  error: string
  t: Translate
  onReason: (value: string) => void
  onClose: () => void
  onConfirm: () => boolean
}) {
  const activate = region.status === 'Inactive'
  return (
    <AdminOverlay
      className="region-confirm"
      titleId="region-dialog-title"
      onClose={onClose}
    >
      {(dismiss) => (
        <>
          <p className="region-kicker">{region.id}</p>
          <h2 id="region-dialog-title">
            {t(activate ? 'Reactivate Region?' : 'Deactivate Region?')}
          </h2>
          <p>
            {t(
              activate
                ? 'This region can appear in new choices again.'
                : 'This region and its historical references stay readable. It will no longer appear in new registration or search choices.',
            )}
          </p>
          <div className="region-confirm-target">
            {regionPath(regions, region).split(' / ').map(t).join(' / ')}
          </div>
          {error && (
            <p className="region-error" role="alert">
              {t(error)}
            </p>
          )}
          <label className="region-field">
            <span>
              {t('Reason')} <b>{t('Required')}</b>
            </span>
            <textarea
              rows={3}
              value={reason}
              onChange={(event) => onReason(event.target.value)}
              data-autofocus
              required
            />
          </label>
          <div className="admin-dialog__actions">
            <button
              className="admin-secondary-button"
              type="button"
              onClick={dismiss}
            >
              {t('Cancel')}
            </button>
            <button
              className="admin-primary-button"
              type="button"
              onClick={() => {
                if (onConfirm()) dismiss()
              }}
              disabled={!reason.trim()}
            >
              {t(activate ? 'Confirm Reactivation' : 'Confirm Deactivation')}
            </button>
          </div>
        </>
      )}
    </AdminOverlay>
  )
}

export function AdminRegions({
  locale,
  initialMode,
  initialRegion,
}: {
  locale: Locale
  initialMode?: string
  initialRegion?: string
}) {
  const t = (source: string) => regionsT(locale, source)
  const [mode, setMode] = useState<Mode>(
    ['loading', 'empty', 'save-error', 'stale'].includes(initialMode ?? '')
      ? (initialMode as Mode)
      : 'ready',
  )
  const [regions, setRegions] = useState<Region[]>(
    initialMode === 'empty' ? [] : initialRegions,
  )
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(
    initialRegion && initialRegions.some((item) => item.id === initialRegion)
      ? initialRegion
      : '',
  )
  const [reorder, setReorder] = useState(false)
  const [orderDraft, setOrderDraft] = useState<Region[] | null>(null)
  const [draft, setDraft] = useState<Region | null>(null)
  const [formError, setFormError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmSnapshot, setConfirmSnapshot] = useState<Region | null>(null)
  const [reason, setReason] = useState('')
  const [notice, setNotice] = useState('')
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [catalogueVersion, setCatalogueVersion] = useState(0)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const detailTrigger = useRef<HTMLButtonElement | null>(null)
  const searchInput = useRef<HTMLInputElement | null>(null)
  const shownRegions = orderDraft ?? regions
  const selected = shownRegions.find((item) => item.id === selectedId)

  useEffect(() => {
    if (selectedId || draft || confirmOpen) return
    if (detailTrigger.current?.isConnected) detailTrigger.current.focus()
    detailTrigger.current = null
  }, [selectedId, draft, confirmOpen])

  function cancelOrder() {
    setReorder(false)
    setOrderDraft(null)
  }

  function closeDetail() {
    setSelectedId('')
    cancelOrder()
  }

  function beginReorder() {
    if (reorder) {
      setReorder(false)
      setOrderDraft(null)
      return
    }
    setReorder(true)
    setOrderDraft(regions.map((item) => ({ ...item })))
    if (!selectedId)
      setSelectedId(
        regions.find((item) => item.level === 'Province / City')?.id ??
          regions[0]?.id ??
          '',
      )
  }

  function moveSibling(id: string, direction: -1 | 1) {
    setOrderDraft((current) => {
      if (!current) return current
      const next = current.map((item) => ({ ...item }))
      const target = next.find((item) => item.id === id)!
      const siblings = next
        .filter((item) => item.parentId === target.parentId)
        .sort((a, b) => a.order - b.order)
      const index = siblings.findIndex((item) => item.id === id)
      const neighbor = siblings[index + direction]
      if (!neighbor) return current
      const order = target.order
      target.order = neighbor.order
      neighbor.order = order
      return next
    })
  }

  function saveOrder() {
    if (mode === 'stale') return
    if (mode === 'save-error') return
    if (orderDraft) setRegions(orderDraft)
    setOrderDraft(null)
    setReorder(false)
    setNotice(t('Sibling order saved. Audit event recorded by Ava Morgan.'))
  }

  function saveRegion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft) return false
    const value = { ...draft, name: draft.name.trim() }
    setDraft(value)
    const parent = regions.find((item) => item.id === value.parentId)
    const original = regions.find((item) => item.id === value.id)
    let error = ''
    if (!value.name) error = 'Enter a region name.'
    else if (value.level === 'Country' && value.parentId)
      error = 'A country cannot have a parent.'
    else if (
      value.level !== 'Country' &&
      (!parent ||
        parent.status !== 'Active' ||
        !allowedParents[value.level].includes(parent.level))
    )
      error = 'Choose a compatible active parent for this level.'
    else if (value.parentId && isAncestor(regions, value.parentId, value.id))
      error = 'A region cannot be its own parent or descendant.'
    else if (
      regions.some(
        (item) =>
          item.id !== value.id &&
          item.parentId === value.parentId &&
          item.name.toLocaleLowerCase() === value.name.toLocaleLowerCase(),
      )
    )
      error = 'A sibling with this name already exists.'
    else if (!Number.isInteger(value.order) || value.order < 1)
      error = 'Enter a positive display order.'
    else if (original && original.status !== value.status)
      error =
        'Use the Deactivate or Reactivate action to change status with a reason.'
    else if (mode === 'stale') error = 'Reload current data before saving.'
    if (error) {
      setFormError(error)
      return false
    }
    if (mode === 'save-error') {
      setFormError(
        'The save did not complete. Your values remain in the editor.',
      )
      return false
    }

    const saved = {
      ...value,
      id: value.id || `RG-${Date.now().toString().slice(-6)}`,
    }
    const next = regions
      .filter((item) => item.id !== saved.id)
      .map((item) => ({ ...item }))
    const siblings = next
      .filter((item) => item.parentId === saved.parentId)
      .sort((a, b) => a.order - b.order)
    siblings.splice(Math.min(saved.order - 1, siblings.length), 0, saved)
    siblings.forEach((item, index) => {
      item.order = index + 1
    })
    if (original && original.parentId !== saved.parentId) {
      next
        .filter((item) => item.parentId === original.parentId)
        .sort((a, b) => a.order - b.order)
        .forEach((item, index) => {
          item.order = index + 1
        })
    }
    setRegions([...next, saved])
    setSelectedId(saved.id)
    setNotice(
      `${t(saved.name)} ${t('saved. Audit event recorded by Ava Morgan.')}`,
    )
    setMode('ready')
    return true
  }

  function confirmStatus() {
    if (!selected || !reason.trim()) return false
    if (mode === 'stale') {
      setFormError('Reload current data before saving.')
      return false
    }
    if (mode === 'save-error') {
      setFormError(
        'The save did not complete. Your values remain in the editor.',
      )
      return false
    }
    const newStatus = selected.status === 'Active' ? 'Inactive' : 'Active'
    setRegions((current) =>
      current.map((item) =>
        item.id === selected.id ? { ...item, status: newStatus } : item,
      ),
    )
    setNotice(
      `${regionPath(regions, selected).split(' / ').map(t).join(' / ')} ${t(newStatus === 'Active' ? 'reactivated. Reason and audit event recorded.' : 'deactivated. Reason and audit event recorded.')}`,
    )
    return true
  }

  function importRegions(preview: RegionImportPreview): string {
    if (mode === 'stale') return 'Reload current data before saving.'
    if (mode === 'save-error')
      return 'The save did not complete. Your values remain in the editor.'
    setRegions(preview.regions)
    setSearch('')
    setSelectedId('')
    setOrderDraft(null)
    setReorder(false)
    setMode('ready')
    setCatalogueVersion((value) => value + 1)
    setNotice(
      t('{count} regions imported.').replace(
        '{count}',
        preview.imported.length.toLocaleString(locale),
      ),
    )
    return ''
  }

  return (
    <>
      <AdminShell
        locale={locale}
        title="Region Management"
        active="regions"
        translate={t}
        onChangePassword={() => setPasswordOpen(true)}
      >
        <div className="regions-page admin-motion-enter">
          <div className="region-catalogue-heading">
            <div>
              <p className="region-kicker">{t('Region catalogue')}</p>
              <p>
                {t(
                  'Import JSON to manage many regions at once, or add individual regions manually.',
                )}
              </p>
            </div>
            <span>
              {t('{count} regions').replace(
                '{count}',
                (mode === 'empty' ? 0 : regions.length).toLocaleString(locale),
              )}
            </span>
          </div>
          {notice && (
            <div className="region-notice" role="status">
              <AdminIcon name="check" />
              <div>
                <strong>{t('Catalogue updated')}</strong>
                <p>{notice}</p>
              </div>
            </div>
          )}
          {mode === 'stale' && (
            <div className="region-stale" role="alert">
              <AdminIcon name="warning" />
              <div>
                <strong>{t('Record changed')}</strong>
                <p>
                  {t(
                    'The region catalogue changed after this view opened. Reload current data before saving.',
                  )}
                </p>
              </div>
              <button type="button" onClick={() => setMode('ready')}>
                {t('Reload Details')}
              </button>
            </div>
          )}
          {mode === 'save-error' && (
            <p className="region-error" role="alert">
              {t(
                'The save did not complete. Your values remain in the editor.',
              )}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('ready')
                  setFormError('')
                }}
              >
                {t('Try Again')}
              </button>
            </p>
          )}
          <section className="region-panel" aria-label={t('Region hierarchy')}>
            <div className="region-toolbar">
              <label className="region-search">
                <AdminIcon name="search" />
                <input
                  ref={searchInput}
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t('Search countries, regions or full paths')}
                  aria-label={t('Search regions')}
                />
              </label>
              <div>
                <button
                  className="admin-secondary-button"
                  type="button"
                  disabled={
                    mode === 'loading' || mode === 'empty' || !regions.length
                  }
                  aria-pressed={reorder}
                  onClick={(event) => {
                    detailTrigger.current = event.currentTarget
                    beginReorder()
                  }}
                >
                  {t(reorder ? 'Exit Reorder' : 'Reorder')}
                </button>
                <button
                  className="admin-secondary-button"
                  type="button"
                  disabled={mode === 'loading'}
                  onClick={() => {
                    setDraft({
                      id: '',
                      name: '',
                      level:
                        mode === 'empty' || !regions.length
                          ? 'Country'
                          : 'Province / City',
                      parentId:
                        mode !== 'empty' &&
                        regions.some((item) => item.id === 'vn')
                          ? 'vn'
                          : '',
                      order: 1,
                      status: 'Active',
                    })
                    setFormError('')
                  }}
                >
                  {t('Add Manually')}
                </button>
                <button
                  className="admin-primary-button"
                  type="button"
                  disabled={mode === 'loading'}
                  onClick={() => {
                    setSelectedId('')
                    setReorder(false)
                    setOrderDraft(null)
                    setImportOpen(true)
                  }}
                >
                  <AdminIcon name="document" />
                  {t('Import JSON')}
                </button>
              </div>
            </div>
            {mode === 'loading' ? (
              <div className="region-empty" aria-busy="true">
                <h2>{t('Loading regions…')}</h2>
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={() => setMode('ready')}
                >
                  {t('Try Again')}
                </button>
              </div>
            ) : (
              <RegionTable
                key={catalogueVersion}
                regions={mode === 'empty' ? [] : shownRegions}
                selectedId={selectedId}
                search={search}
                locale={locale}
                t={t}
                onSelect={(id, trigger) => {
                  detailTrigger.current = trigger
                  setSelectedId(id)
                }}
                onClearSearch={() => {
                  setSearch('')
                  searchInput.current?.focus()
                }}
              />
            )}
          </section>
        </div>
      </AdminShell>
      {selected &&
        mode !== 'empty' &&
        mode !== 'loading' &&
        !draft &&
        !confirmOpen &&
        !importOpen &&
        !passwordOpen && (
          <RegionDetail
            region={selected}
            regions={shownRegions}
            reorder={reorder}
            error={
              mode === 'stale'
                ? 'Reload current data before saving.'
                : mode === 'save-error'
                  ? 'The save did not complete. Your values remain in the editor.'
                  : ''
            }
            t={t}
            onClose={closeDetail}
            onEdit={() => {
              setDraft({ ...selected })
              setFormError('')
            }}
            onToggle={() => {
              setFormError('')
              setReason('')
              setConfirmSnapshot({ ...selected })
              setConfirmOpen(true)
            }}
            onMove={moveSibling}
            onSaveOrder={saveOrder}
            onCancelOrder={cancelOrder}
          />
        )}
      {importOpen && (
        <AdminRegionImport
          locale={locale}
          regions={mode === 'empty' ? [] : regions}
          onClose={() => setImportOpen(false)}
          onImport={importRegions}
        />
      )}
      {draft && (
        <RegionEditor
          draft={draft}
          regions={regions}
          error={formError}
          t={t}
          onChange={(value) => {
            setDraft(value)
            setFormError('')
          }}
          onClose={() => {
            setDraft(null)
            setFormError('')
          }}
          onSubmit={saveRegion}
        />
      )}
      {confirmOpen && confirmSnapshot && (
        <RegionStatusDialog
          region={confirmSnapshot}
          regions={regions}
          reason={reason}
          error={formError}
          t={t}
          onReason={setReason}
          onClose={() => {
            setConfirmOpen(false)
            setConfirmSnapshot(null)
            setReason('')
            setFormError('')
          }}
          onConfirm={confirmStatus}
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
