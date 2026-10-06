import rows from './admin-app-config.json'
import { dashboardT } from './admin-dashboard'
import type { Locale } from './admin-access'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>
export function appConfigT(locale: Locale, source: string): string {
  return translations[source]?.[locale] ?? dashboardT(locale, source)
}
