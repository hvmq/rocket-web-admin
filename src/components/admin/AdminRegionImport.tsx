'use client'

import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { regionsT } from '@/i18n/admin-regions'
import { AdminIcon } from './AdminIcon'
import { AdminOverlay } from './AdminOverlay'
import { orderedRegions, type Region } from './admin-regions-demo'
import {
  parseRegionJson,
  previewRegionImport,
  RegionImportError,
  regionImportExample,
  regionImportMaxBytes,
  type RegionImportMode,
  type RegionImportPreview,
} from './admin-region-import'

export function AdminRegionImport({
  locale,
  regions,
  onClose,
  onImport,
}: {
  locale: Locale
  regions: Region[]
  onClose: () => void
  onImport: (preview: RegionImportPreview) => string
}) {
  const t = (source: string) => regionsT(locale, source)
  const [source, setSource] = useState('')
  const [fileName, setFileName] = useState('')
  const [reading, setReading] = useState(false)
  const [mode, setMode] = useState<RegionImportMode>('merge')
  const [preview, setPreview] = useState<RegionImportPreview | null>(null)
  const [error, setError] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  const readVersion = useRef(0)
  const previewPanel = useRef<HTMLElement>(null)

  useEffect(
    () => () => {
      readVersion.current++
    },
    [],
  )

  useEffect(() => {
    if (!preview) return
    previewPanel.current?.scrollIntoView({ block: 'nearest' })
    previewPanel.current?.focus({ preventScroll: true })
  }, [preview])

  function showError(value: unknown) {
    setPreview(null)
    setError(
      value instanceof RegionImportError
        ? `${t(value.message)}${value.detail ? ` (${value.detail})` : ''}`
        : t('Unable to read this JSON file. Try another file.'),
    )
  }

  async function readFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const version = ++readVersion.current
    setPreview(null)
    setError('')
    setSource('')
    setFileName('')
    if (file.size > regionImportMaxBytes) {
      setReading(false)
      setError(t('The JSON file must be 5 MB or smaller.'))
      return
    }
    setReading(true)
    try {
      const content = await file.text()
      if (version !== readVersion.current) return
      setSource(content)
      setFileName(file.name)
    } catch (value) {
      if (version === readVersion.current) showError(value)
    } finally {
      if (version === readVersion.current) setReading(false)
    }
  }

  function validate() {
    setError('')
    try {
      setPreview(previewRegionImport(parseRegionJson(source), regions, mode))
    } catch (value) {
      showError(value)
    }
  }

  const importedIds = new Set(preview?.imported.map((item) => item.id))
  const previewRows = preview
    ? orderedRegions(preview.regions)
        .filter(({ item }) => importedIds.has(item.id))
        .slice(0, 8)
    : []
  const counts = preview
    ? ([
        [
          'Country',
          preview.imported.filter((item) => item.level === 'Country').length,
        ],
        [
          'Province / City',
          preview.imported.filter((item) => item.level === 'Province / City')
            .length,
        ],
        [
          'Intermediate Area',
          preview.imported.filter((item) => item.level === 'Intermediate Area')
            .length,
        ],
        [
          'Ward / Commune',
          preview.imported.filter((item) => item.level === 'Ward / Commune')
            .length,
        ],
      ] as const)
    : []

  return (
    <AdminOverlay
      variant="drawer"
      titleId="region-import-title"
      className="region-import"
      onClose={onClose}
    >
      {(dismiss) => (
        <>
          <header>
            <div>
              <p className="region-kicker">{t('Region catalogue')}</p>
              <h2 id="region-import-title">{t('Import JSON')}</h2>
            </div>
            <button
              className="region-import-close"
              type="button"
              aria-label={t('Close JSON importer')}
              onClick={dismiss}
            >
              <AdminIcon name="close" />
            </button>
          </header>
          <div className="region-import-body">
            <p className="region-import-intro">
              {t(
                'Import a region catalogue in bulk. Upload a JSON file or paste its contents, then review before applying.',
              )}
            </p>
            <div className="region-import-upload">
              <span className="region-import-upload-icon">
                <AdminIcon name="document" />
              </span>
              <div>
                <strong>{fileName || t('Choose a JSON file')}</strong>
                <p>
                  {reading ? t('Reading file…') : t('JSON files up to 5 MB')}
                </p>
              </div>
              <button
                className="admin-secondary-button"
                type="button"
                data-autofocus
                onClick={() => fileInput.current?.click()}
              >
                {t('Browse Files')}
              </button>
              <input
                ref={fileInput}
                type="file"
                accept=".json,application/json"
                hidden
                onChange={readFile}
              />
            </div>
            <label className="region-field region-import-source">
              <span>
                {t('JSON content')}
                <b>{t('Upload or paste')}</b>
              </span>
              <textarea
                value={source}
                rows={9}
                spellCheck={false}
                placeholder={
                  '{ "meta": { "countryCode": "VN" }, "provinces": [...] }'
                }
                onChange={(event) => {
                  readVersion.current++
                  setReading(false)
                  setSource(event.target.value)
                  setFileName('')
                  setPreview(null)
                  setError('')
                }}
              />
            </label>
            <details className="region-import-format">
              <summary>{t('JSON format and sample')}</summary>
              <p>
                {t(
                  'Use the same provinces and wards structure as the app area selector. Codes become stable region IDs; the array order becomes the display order.',
                )}
              </p>
              <pre>{JSON.stringify(regionImportExample, null, 2)}</pre>
              <a href="/data/region-import-template.json" download>
                {t('Download Sample JSON')}
              </a>
              <p>
                {t(
                  'For other countries or an intermediate level, use a regions array with id, name, level, parentId, order and status.',
                )}
              </p>
              <pre>
                {JSON.stringify(
                  {
                    regions: [
                      {
                        id: 'vn',
                        name: 'Vietnam',
                        level: 'Country',
                        parentId: '',
                        order: 1,
                        status: 'Active',
                      },
                    ],
                  },
                  null,
                  2,
                )}
              </pre>
            </details>
            <fieldset className="region-import-mode">
              <legend>{t('Import method')}</legend>
              {(['merge', 'replace'] as const).map((value) => (
                <label
                  key={value}
                  className={mode === value ? 'is-selected' : ''}
                >
                  <input
                    type="radio"
                    name="region-import-mode"
                    value={value}
                    checked={mode === value}
                    onChange={() => {
                      setMode(value)
                      setPreview(null)
                      setError('')
                    }}
                  />
                  <span>
                    <strong>
                      {t(
                        value === 'merge'
                          ? 'Add and update'
                          : 'Replace catalogue',
                      )}
                    </strong>
                    <small>
                      {t(
                        value === 'merge'
                          ? 'Update matching IDs and add new regions. Keep other existing regions.'
                          : 'Use this JSON as the complete catalogue. Existing regions missing from the file will be removed from this catalogue.',
                      )}
                    </small>
                  </span>
                </label>
              ))}
            </fieldset>
            {error && (
              <p className="region-error" role="alert">
                {error}
              </p>
            )}
            {preview && (
              <section
                ref={previewPanel}
                tabIndex={-1}
                className="region-import-preview admin-motion-enter"
                aria-label={t('Import preview')}
              >
                <div className="region-import-preview-heading" role="status">
                  <AdminIcon name="check" />
                  <div>
                    <strong>{t('JSON validated')}</strong>
                    <p>
                      {t('{count} regions ready to import.').replace(
                        '{count}',
                        preview.imported.length.toLocaleString(locale),
                      )}
                    </p>
                  </div>
                </div>
                <div className="region-import-stats">
                  {[
                    [t('New regions'), preview.added],
                    [t('Updated regions'), preview.updated],
                    [t('Removed regions'), preview.removed],
                  ].map(([label, count]) => (
                    <div key={label}>
                      <strong>{count.toLocaleString(locale)}</strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="region-import-counts">
                  {counts
                    .filter(([, count]) => count > 0)
                    .map(([level, count]) => (
                      <span key={level}>
                        {t(level)}{' '}
                        <strong>{count.toLocaleString(locale)}</strong>
                      </span>
                    ))}
                </div>
                <h3>{t('Imported regions preview')}</h3>
                <ul>
                  {previewRows.map(({ item, depth }) => (
                    <li key={item.id} style={{ paddingLeft: depth * 16 }}>
                      <strong>{t(item.name)}</strong>
                      <small>{item.id}</small>
                    </li>
                  ))}
                </ul>
                {preview.imported.length > previewRows.length && (
                  <p className="region-import-more">
                    {t('Showing the first {count} regions.').replace(
                      '{count}',
                      String(previewRows.length),
                    )}
                  </p>
                )}
                {preview.removed > 0 && (
                  <p className="region-import-replace-note">
                    {t(
                      '{count} existing regions will leave this catalogue when you apply the import.',
                    ).replace(
                      '{count}',
                      preview.removed.toLocaleString(locale),
                    )}
                  </p>
                )}
              </section>
            )}
          </div>
          <footer>
            <button
              className="admin-secondary-button"
              type="button"
              onClick={dismiss}
            >
              {t('Cancel')}
            </button>
            {preview ? (
              <button
                className="admin-primary-button"
                type="button"
                onClick={() => {
                  const error = onImport(preview)
                  if (error) setError(t(error))
                  else dismiss()
                }}
              >
                {t('Apply Import')}
              </button>
            ) : (
              <button
                className="admin-primary-button"
                type="button"
                disabled={reading || !source.trim()}
                onClick={validate}
              >
                {t('Validate and Preview')}
              </button>
            )}
          </footer>
        </>
      )}
    </AdminOverlay>
  )
}
