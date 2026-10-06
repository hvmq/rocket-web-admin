import rows from './admin-chat-evidence.json'
import type { Locale } from './admin-access'
import { reportsT } from './admin-reports'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const extra: Record<string, { en: string; vi: string; ko: string }> = {
  'original evidence preserved': {
    en: 'original evidence preserved',
    vi: 'bằng chứng gốc được lưu giữ nguyên vẹn',
    ko: '원본 증거 유지됨',
  },
}

export function chatEvidenceT(locale: Locale, source: string) {
  return (
    translations[source]?.[locale] ||
    extra[source]?.[locale] ||
    reportsT(locale, source)
  )
}
