import rows from './admin-dashboard.json'
import type { Locale } from './admin-access'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const additional: Record<string, { en: string; vi: string; ko: string }> = {
  Language: { en: 'Language', vi: 'Ngôn ngữ', ko: '언어' },
  'No-show cases': {
    en: 'No-show cases',
    vi: 'Báo cáo vắng mặt',
    ko: '노쇼(미방문) 분쟁 안건',
  },
  'Password updated. Use your new password the next time you sign in.': {
    en: 'Password updated. Use your new password the next time you sign in.',
    vi: 'Đã cập nhật mật khẩu. Hãy dùng mật khẩu mới trong lần đăng nhập tiếp theo.',
    ko: '비밀번호가 변경되었습니다. 다음 로그인부터 새 비밀번호를 사용하세요.',
  },
  Done: { en: 'Done', vi: 'Xong', ko: '완료' },
  'Current password is incorrect.': {
    en: 'Current password is incorrect.',
    vi: 'Mật khẩu hiện tại không đúng.',
    ko: '현재 비밀번호가 올바르지 않습니다.',
  },
  'Use at least 8 characters for the new password.': {
    en: 'Use at least 8 characters for the new password.',
    vi: 'Mật khẩu mới cần ít nhất 8 ký tự.',
    ko: '새 비밀번호는 8자 이상이어야 합니다.',
  },
  'Choose a password different from your current password.': {
    en: 'Choose a password different from your current password.',
    vi: 'Hãy chọn mật khẩu khác mật khẩu hiện tại.',
    ko: '현재 비밀번호와 다른 비밀번호를 선택하세요.',
  },
  'New passwords do not match.': {
    en: 'New passwords do not match.',
    vi: 'Mật khẩu mới không khớp.',
    ko: '새 비밀번호가 일치하지 않습니다.',
  },
  'Demo current password: Rocket2026!': {
    en: 'Demo current password: Rocket2026!',
    vi: 'Mật khẩu demo hiện tại: Rocket2026!',
    ko: '데모 현재 비밀번호: Rocket2026!',
  },
}

export function dashboardT(locale: Locale, source: string): string {
  return (translations[source] ?? additional[source])?.[locale] ?? source
}
