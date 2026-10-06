import type { Locale } from '@/i18n/admin-access'
import { dashboardT } from '@/i18n/admin-dashboard'

export function AdminPageLoading({ locale }: { locale: Locale }) {
  return (
    <div className="admin-page-loading" role="status" aria-live="polite">
      <span
        className="admin-loading-spinner admin-motion-spin"
        aria-hidden="true"
      />
      <p>{dashboardT(locale, 'Loading page…')}</p>
    </div>
  )
}
