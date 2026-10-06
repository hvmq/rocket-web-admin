import rows from './admin-team.json'
import { dashboardT } from './admin-dashboard'
import type { Locale } from './admin-access'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

export function teamT(
  locale: Locale,
  source: string,
  values: Record<string, string | number> = {},
): string {
  const text = translations[source]?.[locale] ?? dashboardT(locale, source)
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    String(values[key] ?? match),
  )
}
