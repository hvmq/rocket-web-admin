'use client'

import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { chatEvidenceT } from '@/i18n/admin-chat-evidence'
import type { ReportCase } from './admin-reports-demo'
import { AdminIcon } from './AdminIcon'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './chat-evidence-dialog.css'

const messages = [
  {
    id: 'MSG-8838',
    author: 'Maya Chen',
    time: '2:54 PM',
    original: 'Hello Jamie, I can meet you in the building lobby.',
  },
  {
    id: 'MSG-8839',
    author: 'Jamie Rivera',
    time: '2:56 PM',
    original: 'Okay. I will message when I arrive.',
  },
  {
    id: 'MSG-8840',
    author: 'Maya Chen',
    time: '3:02 PM',
    original: 'Please keep all booking communication here.',
    translation: 'Vui lòng giữ mọi trao đổi về lịch hẹn tại đây.',
  },
  {
    id: 'MSG-8842',
    author: 'Jamie Rivera',
    time: '3:05 PM',
    original:
      'If you do not share your private number, I will keep contacting your business account.',
    translation:
      'Nếu bạn không cung cấp số riêng, tôi sẽ tiếp tục liên hệ tài khoản doanh nghiệp của bạn.',
    reported: true,
  },
  {
    id: 'MSG-8843',
    author: 'Maya Chen',
    time: '3:08 PM',
    original: 'I will only communicate through the booking chat.',
    translation: 'Tôi sẽ chỉ trao đổi qua cuộc trò chuyện của lịch hẹn.',
  },
]

export function AdminChatEvidenceDialog({
  locale,
  report,
  onClose,
}: {
  locale: Locale
  report: ReportCase
  onClose: () => void
}) {
  const t = (source: string) => chatEvidenceT(locale, source)
  const [showTranslations, setShowTranslations] = useState(false)
  const closeButton = useRef<HTMLButtonElement>(null)
  const { closing, dismiss } = useAnimatedDismiss(onClose)

  useEffect(() => {
    closeButton.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dismiss])

  return (
    <div
      className={`report-chat-backdrop admin-motion-backdrop${closing ? ' is-closing' : ''}`}
      inert={closing}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <section
        className="report-chat-dialog admin-motion-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-chat-title"
        lang={locale}
      >
        <header className="report-chat-header">
          <div>
            <p className="report-kicker">
              {report.id} · {t('original evidence preserved')}
            </p>
            <h2 id="report-chat-title">{t('Booking conversation')}</h2>
            <p>
              {t('Jamie Rivera · Customer ↔ Maya Chen · Individual Therapist')}
            </p>
          </div>
          <button
            ref={closeButton}
            type="button"
            className="report-chat-close"
            aria-label={t('Back to Report')}
            onClick={dismiss}
          >
            <AdminIcon name="close" />
          </button>
        </header>

        <div className="report-chat-body">
          <div className="report-chat-context">
            <div>
              <small>{t('Booking reference')}</small>
              <strong>{report.bookingId}</strong>
            </div>
            <div>
              <small>{t('Participants')}</small>
              <strong>{t('2 verified accounts')}</strong>
            </div>
            <div>
              <small>{t('Booking status')}</small>
              <strong>{t('Accepted')}</strong>
            </div>
            <div>
              <small>{t('Chat status')}</small>
              <strong>{t('Active')}</strong>
            </div>
            <div>
              <small>{t('Reported message')}</small>
              <strong>MSG-8842</strong>
            </div>
          </div>

          <div className="report-chat-policy">
            <AdminIcon name="shield" />
            <div>
              <strong>{t('Permission-aware evidence')}</strong>
              <p>
                {t(
                  'Private address and direct contact details stay masked. Attachment access is checked separately.',
                )}
              </p>
            </div>
          </div>

          <div className="report-chat-transcript-head">
            <div>
              <strong>{t('Chat Evidence')}</strong>
              <small>{t('Accepted booking · Admin view is read-only')}</small>
            </div>
            <label>
              <input
                type="checkbox"
                checked={showTranslations}
                onChange={(event) => setShowTranslations(event.target.checked)}
              />
              <span>{t('Show translations')}</span>
            </label>
          </div>

          <ol
            className="report-chat-messages"
            aria-label={t('Read-only booking chat')}
          >
            {messages.map((message) => (
              <li
                key={message.id}
                className={message.reported ? 'is-reported' : ''}
              >
                <div className="report-chat-message-meta">
                  <strong>{t(message.author)}</strong>
                  <time>{t(message.time)}</time>
                  {message.reported && <span>{t('Reported original')}</span>}
                </div>
                <div className="report-chat-copy">
                  <small>{t('Original')}</small>
                  <p>{message.original}</p>
                </div>
                {showTranslations && message.translation && (
                  <div className="report-chat-copy report-chat-translation">
                    <small>{t('Machine Translation')}</small>
                    <p>{message.translation}</p>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <footer className="report-chat-footer">
          <AdminIcon name="chatLock" />
          <span>
            {t(
              'Read-only Admin evidence view · users continue to communicate only through the accepted booking chat.',
            )}
          </span>
          <button type="button" className="report-secondary" onClick={dismiss}>
            {t('Back to Report')}
          </button>
        </footer>
      </section>
    </div>
  )
}
