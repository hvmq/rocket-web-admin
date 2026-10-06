'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { AdminBrand } from './AdminBrand'
import { AdminIcon, type IconName } from './AdminIcon'
import { dashboardT } from '@/i18n/admin-dashboard'
import type { Locale } from '@/i18n/admin-access'

const navigation: {
  label: string
  icon: IconName
  slug: string
  count?: number
}[] = [
  { label: 'Dashboard', icon: 'home', slug: 'dashboard' },
  { label: 'Users', icon: 'user', slug: 'users' },
  {
    label: 'Provider Verification',
    icon: 'shield',
    slug: 'provider-verification',
    count: 23,
  },
  { label: 'Appointments', icon: 'calendar', slug: 'appointments' },
  { label: 'No-Show Cases', icon: 'clock', slug: 'no-show', count: 5 },
  { label: 'Complaints', icon: 'notes', slug: 'complaints', count: 14 },
  { label: 'Reports', icon: 'report', slug: 'reports', count: 4 },
  { label: 'Reviews', icon: 'star', slug: 'reviews', count: 3 },
  { label: 'Regions', icon: 'location', slug: 'regions' },
  { label: 'Notifications', icon: 'notification', slug: 'notifications' },
  { label: 'Banners', icon: 'image', slug: 'banners' },
  { label: 'Audit Log', icon: 'document', slug: 'audit' },
  { label: 'App Update', icon: 'setting', slug: 'app-config' },
  { label: 'Deletion Requests', icon: 'trash', slug: 'deletion-requests' },
  { label: 'Admin Accounts', icon: 'shield', slug: 'team' },
]

export function adminRoute(
  slug: string,
  locale: Locale,
  filter?: string,
  range?: string,
) {
  const params = new URLSearchParams({ lang: locale })
  if (filter) params.set('filter', filter)
  if (range && slug === 'appointments') params.set('range', range)
  return `/${slug}?${params.toString()}`
}

export function AdminShell({
  locale,
  title,
  actions,
  children,
  onChangePassword,
  translate,
  active = 'dashboard',
}: {
  locale: Locale
  title: string
  actions?: ReactNode
  children: ReactNode
  onChangePassword: () => void
  translate?: (source: string) => string
  active?: string
}) {
  const t = translate ?? ((source: string) => dashboardT(locale, source))
  const router = useRouter()
  const [accountOpen, setAccountOpen] = useState(false)
  const account = useRef<HTMLDivElement>(null)
  const accountTrigger = useRef<HTMLButtonElement>(null)
  const accountMenuId = useId()

  useEffect(() => {
    if (!accountOpen) return
    const closeOutside = (event: Event) => {
      if (!account.current?.contains(event.target as Node)) {
        setAccountOpen(false)
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccountOpen(false)
        accountTrigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('focusin', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('focusin', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [accountOpen])

  return (
    <div
      className={`admin-theme admin-screen admin-dashboard-screen${active === 'users' ? ' admin-users-screen' : ''}`}
      lang={locale}
    >
      <aside className="admin-sidebar">
        <AdminBrand
          name={t('Rocket')}
          description={t('Administration')}
          logoLabel={t('Rocket logo')}
        />
        <nav className="admin-nav" aria-label={t('Admin navigation')}>
          {navigation.map((item) => (
            <Link
              key={item.slug}
              className={`admin-nav-item${item.slug === active ? ' is-active' : ''}`}
              href={adminRoute(item.slug, locale)}
              aria-current={item.slug === active ? 'page' : undefined}
            >
              <span className="admin-nav-item__icon">
                <AdminIcon name={item.icon} />
              </span>
              <span>{t(item.label)}</span>
              {item.count && <small>{item.count}</small>}
            </Link>
          ))}
        </nav>
        <div ref={account} className="admin-sidebar__footer">
          <button
            ref={accountTrigger}
            className="admin-identity"
            type="button"
            aria-expanded={accountOpen}
            aria-controls={accountMenuId}
            onClick={() => setAccountOpen((open) => !open)}
          >
            <span>AM</span>
            <span className="admin-identity__details">
              <strong>{t('Ava Morgan')}</strong>
              <small>{t('Owner')}</small>
            </span>
            <AdminIcon name="arrow" className="admin-identity__chevron" />
          </button>
          {accountOpen && (
            <div id={accountMenuId} className="admin-account-menu">
              <label className="admin-account-language">
                <span id={`${accountMenuId}-language-label`}>
                  {dashboardT(locale, 'Language')}
                </span>
                <select
                  aria-labelledby={`${accountMenuId}-language-label`}
                  value={locale}
                  onChange={(event) => {
                    const nextLocale = event.target.value
                    if (
                      nextLocale !== 'vi' &&
                      nextLocale !== 'en' &&
                      nextLocale !== 'ko'
                    ) {
                      return
                    }
                    const url = new URL(window.location.href)
                    url.searchParams.set('lang', nextLocale)
                    setAccountOpen(false)
                    accountTrigger.current?.focus()
                    router.replace(`${url.pathname}${url.search}${url.hash}`, {
                      scroll: false,
                    })
                  }}
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                  <option value="ko">한국어</option>
                </select>
              </label>
              <button
                className="admin-sidebar-action"
                type="button"
                onClick={() => {
                  setAccountOpen(false)
                  accountTrigger.current?.focus()
                  onChangePassword()
                }}
              >
                <AdminIcon name="lock" />
                <span>{t('Change Password')}</span>
              </button>
              <Link className="admin-sidebar-action" href={`/?lang=${locale}`}>
                <AdminIcon name="logout" />
                <span>{t('Sign Out')}</span>
              </Link>
            </div>
          )}
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar admin-motion-enter">
          <h1>{t(title)}</h1>
          <div className="admin-topbar__actions">{actions}</div>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  )
}
