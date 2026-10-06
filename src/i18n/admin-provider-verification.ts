import rows from './admin-provider-verification.json'
import type { Locale } from './admin-access'
import { dashboardT } from './admin-dashboard'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const extra: Record<string, { en: string; vi: string; ko: string }> = {
  'No submissions match these filters': {
    en: 'No submissions match these filters',
    vi: 'Không có hồ sơ phù hợp bộ lọc',
    ko: '필터와 일치하는 신청이 없습니다',
  },
  'Clear Filters': { en: 'Clear Filters', vi: 'Xóa bộ lọc', ko: '필터 지우기' },
  'Public profile proposal': {
    en: 'Public profile proposal',
    vi: 'Hồ sơ công khai đề xuất',
    ko: '공개 프로필 제안',
  },
  'This is the first submitted version. No version is currently published.': {
    en: 'This is the first submitted version. No version is currently published.',
    vi: 'Đây là phiên bản đầu tiên được gửi. Chưa có phiên bản nào được công khai.',
    ko: '첫 제출 버전입니다. 현재 공개된 버전이 없습니다.',
  },
  'Explain what the Provider needs to correct': {
    en: 'Explain what the Provider needs to correct',
    vi: 'Nêu rõ những gì đối tác cần sửa',
    ko: '제공자가 수정해야 할 내용을 설명하세요',
  },
  'Decision already recorded': {
    en: 'Decision already recorded',
    vi: 'Đã ghi nhận quyết định',
    ko: '심사 결과가 기록되었습니다',
  },
  'Reason:': { en: 'Reason:', vi: 'Lý do:', ko: '사유:' },
  'Confirm Approval': {
    en: 'Confirm Approval',
    vi: 'Xác nhận phê duyệt',
    ko: '승인 확인',
  },
  'Confirm Rejection': {
    en: 'Confirm Rejection',
    vi: 'Xác nhận từ chối',
    ko: '거절 확인',
  },
  'Profile decision recorded': {
    en: 'Profile decision recorded',
    vi: 'Đã ghi nhận quyết định xét duyệt',
    ko: '프로필 심사 결과가 기록되었습니다',
  },
  'Loading submissions': {
    en: 'Loading submissions',
    vi: 'Đang tải hồ sơ',
    ko: '신청을 불러오는 중',
  },
  'Unable to load submissions': {
    en: 'Unable to load submissions',
    vi: 'Không thể tải hồ sơ',
    ko: '신청을 불러올 수 없습니다',
  },
  'Try Again': { en: 'Try Again', vi: 'Thử lại', ko: '다시 시도' },
  'Submitted profile': {
    en: 'Submitted profile',
    vi: 'Hồ sơ đã nộp',
    ko: '제출된 프로필',
  },
  'No services submitted': {
    en: 'No services submitted',
    vi: 'Chưa nộp dịch vụ',
    ko: '제출된 서비스 없음',
  },
}

export function providerT(locale: Locale, source: string) {
  const version = /^Submitted (v\d+)$/.exec(source)
  if (version && !translations[source]) {
    return locale === 'vi'
      ? `Đã gửi ${version[1]}`
      : locale === 'ko'
        ? `${version[1]} 제출됨`
        : source
  }
  const count = /^(\d+) submitted$/.exec(source)
  if (count && !translations[source]) {
    return locale === 'vi'
      ? `Đã gửi ${count[1]}`
      : locale === 'ko'
        ? `${count[1]}개 제출`
        : source
  }
  return (
    (translations[source] ?? extra[source])?.[locale] ??
    dashboardT(locale, source)
  )
}
