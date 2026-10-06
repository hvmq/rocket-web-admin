'use client'

import { useEffect, useState, type FormEvent } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { appConfigT } from '@/i18n/admin-app-config'
import { AdminShell } from './AdminShell'
import { AdminConfigCard, AdminConfigField } from './AdminConfigForm'
import { ChangePasswordDialog } from './AdminDashboard'
import {
  appConfigStorageKey,
  configToDraft,
  createAppConfig,
  draftToConfig,
  isAppConfig,
  type AppConfigDraft,
  type BuildConfig,
  type ContentLocale,
  type Platform,
} from './admin-app-config-demo'
import './dashboard.css'
import './app-config.css'

const validationMessage =
  'Fill in every title, message and release note. Build numbers must be whole numbers, and the minimum supported build cannot exceed the latest build.'

export function AdminAppConfig({ locale }: { locale: Locale }) {
  const t = (source: string) => appConfigT(locale, source)
  const [saved, setSaved] = useState(createAppConfig)
  const [draft, setDraft] = useState(() => configToDraft(createAppConfig()))
  const [feedback, setFeedback] = useState<{
    text: string
    error: boolean
  } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(appConfigStorageKey)
      if (!stored) return
      const config: unknown = JSON.parse(stored)
      if (!isAppConfig(config)) throw new Error('Invalid stored config')
      setSaved(config)
      setDraft(configToDraft(config))
    } catch {
      setFeedback({
        text: 'The saved config could not be loaded. Sample values are shown.',
        error: true,
      })
    }
  }, [])

  function change(update: (value: AppConfigDraft) => void) {
    setDraft((previous) => {
      const next = structuredClone(previous)
      update(next)
      return next
    })
    setFeedback(null)
    setErrors({})
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const config = draftToConfig(draft)
    if (!config) {
      const nextErrors: Record<string, string> = {}
      for (const platform of ['android', 'ios'] as const) {
        for (const field of [
          'latestBuildNumber',
          'minSupportedBuildNumber',
        ] as const) {
          const value = draft.update[platform][field]
          if (
            !value.trim() ||
            !Number.isSafeInteger(Number(value)) ||
            Number(value) < 0
          ) {
            nextErrors[`${platform}-${field}`] =
              'Enter a non-negative whole build number.'
          }
        }
        if (
          Number(draft.update[platform].minSupportedBuildNumber) >
          Number(draft.update[platform].latestBuildNumber)
        ) {
          nextErrors[`${platform}-minSupportedBuildNumber`] =
            'The minimum supported build cannot exceed the latest build.'
        }
      }
      for (const language of ['vi', 'en'] as const) {
        const content = draft.update.locales[language]
        for (const field of ['title', 'message'] as const) {
          if (!content[field].trim())
            nextErrors[`${language}-${field}`] = 'This field is required.'
        }
        content.releaseNotes.forEach((note, index) => {
          if (!note.trim())
            nextErrors[`${language}-note-${index}`] = 'This field is required.'
        })
      }
      setErrors(nextErrors)
      setFeedback({ text: validationMessage, error: true })
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }
    try {
      window.localStorage.setItem(appConfigStorageKey, JSON.stringify(config))
      setSaved(structuredClone(config))
      setErrors({})
      setFeedback({ text: 'Config saved in this browser.', error: false })
    } catch {
      setFeedback({
        text: 'Browser storage is unavailable. The config could not be saved.',
        error: true,
      })
    }
  }

  const fieldError = (id: string) => (errors[id] ? t(errors[id]) : undefined)
  const buildField = (
    platform: Platform,
    field: keyof BuildConfig,
    label: string,
  ) => (
    <AdminConfigField
      id={`${platform}-${field}`}
      name={`${platform}.${field}`}
      label={t(label)}
      type="number"
      min={0}
      step={1}
      required
      value={draft.update[platform][field]}
      error={fieldError(`${platform}-${field}`)}
      onValueChange={(value) =>
        change((next) => {
          next.update[platform][field] = value
        })
      }
    />
  )
  const contentField = (
    language: ContentLocale,
    field: 'title' | 'message',
    label: string,
  ) => {
    const shared = {
      id: `${language}-${field}`,
      name: `${language}.${field}`,
      label: t(label),
      required: true,
      value: draft.update.locales[language][field],
      error: fieldError(`${language}-${field}`),
    }
    const update = (value: string) =>
      change((next) => {
        next.update.locales[language][field] = value
      })
    return field === 'message' ? (
      <AdminConfigField {...shared} multiline rows={3} onValueChange={update} />
    ) : (
      <AdminConfigField {...shared} onValueChange={update} />
    )
  }

  return (
    <>
      <AdminShell
        locale={locale}
        active="app-config"
        title="App Update"
        translate={t}
        onChangePassword={() => setPasswordOpen(true)}
      >
        <form className="admin-config-layout" noValidate onSubmit={save}>
          {feedback && (
            <p
              className={`admin-config-feedback admin-motion-enter${feedback.error ? ' admin-config-feedback--error' : ''}`}
              role={feedback.error ? 'alert' : 'status'}
            >
              {t(feedback.text)}
            </p>
          )}
          <AdminConfigCard>
            <label className="admin-config-switch">
              <input
                type="checkbox"
                checked={draft.hasCriticalIssue}
                onChange={(event) =>
                  change((next) => {
                    next.hasCriticalIssue = event.target.checked
                  })
                }
              />
              <strong>{t('Critical issue')}</strong>
            </label>
          </AdminConfigCard>
          <div className="admin-config-two-columns">
            {(['android', 'ios'] as const).map((platform, index) => (
              <AdminConfigCard
                key={platform}
                title={t(platform === 'android' ? 'Android' : 'iOS')}
                stagger={index + 1}
              >
                <div className="admin-config-field-grid">
                  {buildField(
                    platform,
                    'latestBuildNumber',
                    'Latest build number',
                  )}
                  {buildField(
                    platform,
                    'minSupportedBuildNumber',
                    'Minimum supported build',
                  )}
                </div>
              </AdminConfigCard>
            ))}
          </div>
          <div className="admin-config-two-columns">
            {(['vi', 'en'] as const).map((language, index) => (
              <AdminConfigCard
                key={language}
                title={t(language === 'vi' ? 'Tiếng Việt' : 'English')}
                stagger={index + 3}
              >
                <div className="admin-config-locale-fields">
                  {contentField(language, 'title', 'Title')}
                  {contentField(language, 'message', 'Message')}
                  <div className="admin-config-notes">
                    {draft.update.locales[language].releaseNotes.map(
                      (note, noteIndex) => (
                        <div className="admin-config-note" key={noteIndex}>
                          <AdminConfigField
                            multiline
                            id={`${language}-note-${noteIndex}`}
                            name={`${language}.releaseNotes.${noteIndex}`}
                            label={
                              noteIndex === 0
                                ? t('Release notes')
                                : t('Release note {number}').replace(
                                    '{number}',
                                    String(noteIndex + 1),
                                  )
                            }
                            rows={7}
                            required
                            value={note}
                            error={fieldError(`${language}-note-${noteIndex}`)}
                            onValueChange={(value) =>
                              change((next) => {
                                next.update.locales[language].releaseNotes[
                                  noteIndex
                                ] = value
                              })
                            }
                          />
                          {draft.update.locales[language].releaseNotes.length >
                            1 && (
                            <button
                              className="admin-secondary-button"
                              type="button"
                              aria-label={t(
                                'Remove {locale} release note {number}',
                              )
                                .replace('{locale}', language)
                                .replace('{number}', String(noteIndex + 1))}
                              onClick={() =>
                                change((next) => {
                                  next.update.locales[
                                    language
                                  ].releaseNotes.splice(noteIndex, 1)
                                })
                              }
                            >
                              {t('Remove')}
                            </button>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </AdminConfigCard>
            ))}
          </div>
          <div className="admin-config-actions admin-motion-enter">
            <button
              className="admin-secondary-button"
              type="button"
              onClick={() => {
                setDraft(configToDraft(saved))
                setErrors({})
                setFeedback({ text: 'Changes discarded.', error: false })
              }}
            >
              {t('Discard changes')}
            </button>
            <button className="admin-primary-button" type="submit">
              {t('Save config')}
            </button>
          </div>
        </form>
      </AdminShell>
      {passwordOpen && (
        <ChangePasswordDialog
          locale={locale}
          translate={t}
          onClose={() => setPasswordOpen(false)}
          demoPassword={demoPassword}
          onPasswordChange={setDemoPassword}
        />
      )}
    </>
  )
}
