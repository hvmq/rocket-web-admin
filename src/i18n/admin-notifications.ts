import rows from './admin-notifications.json'
import { dashboardT } from './admin-dashboard'
import type { Locale } from './admin-access'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const extra: Record<string, { en: string; vi: string; ko: string }> = {
  'Write the message people will see': {
    en: 'Write the message people will see',
    vi: 'Nhập nội dung người nhận sẽ thấy',
    ko: '수신자에게 표시할 내용을 입력하세요',
  },
  'Remove Image': { en: 'Remove Image', vi: 'Xóa ảnh', ko: '이미지 삭제' },
  'Change Image': { en: 'Change Image', vi: 'Đổi ảnh', ko: '이미지 변경' },
  'Choose a JPG, PNG or WebP image up to 5 MB.': {
    en: 'Choose a JPG, PNG or WebP image up to 5 MB.',
    vi: 'Chọn ảnh JPG, PNG hoặc WebP tối đa 5 MB.',
    ko: '5MB 이하의 JPG, PNG 또는 WebP 이미지를 선택하세요.',
  },
  'This image could not be loaded. Choose another image.': {
    en: 'This image could not be loaded. Choose another image.',
    vi: 'Không thể tải ảnh này. Hãy chọn ảnh khác.',
    ko: '이미지를 불러올 수 없습니다. 다른 이미지를 선택하세요.',
  },
  'Title and body are required.': {
    en: 'Title and body are required.',
    vi: 'Cần nhập tiêu đề và nội dung.',
    ko: '제목과 본문을 입력하세요.',
  },
  'Choose at least one supported channel.': {
    en: 'Choose at least one supported channel.',
    vi: 'Chọn ít nhất một kênh gửi.',
    ko: '하나 이상의 발송 채널을 선택하세요.',
  },
  'Choose a valid internal destination.': {
    en: 'Choose a valid internal destination.',
    vi: 'Chọn điểm đến nội bộ hợp lệ.',
    ko: '올바른 인앱 연결 화면을 선택하세요.',
  },
  'Select a non-empty audience.': {
    en: 'Select a non-empty audience.',
    vi: 'Chọn đối tượng nhận không rỗng.',
    ko: '수신 대상이 있는 그룹을 선택하세요.',
  },
  'Choose a future time in Asia/Ho_Chi_Minh.': {
    en: 'Choose a future time in Asia/Ho_Chi_Minh.',
    vi: 'Chọn thời gian tương lai theo múi giờ Asia/Ho_Chi_Minh.',
    ko: 'Asia/Ho_Chi_Minh 시간대의 미래 시간을 선택하세요.',
  },
  'The audience is empty. Select eligible accounts.': {
    en: 'The audience is empty. Select eligible accounts.',
    vi: 'Đối tượng nhận đang rỗng. Hãy chọn tài khoản hợp lệ.',
    ko: '수신 대상이 비어 있습니다. 해당 계정을 선택하세요.',
  },
  'No audience selected': {
    en: 'No audience selected',
    vi: 'Chưa chọn đối tượng',
    ko: '수신 대상 없음',
  },
  'All provider types': {
    en: 'All provider types',
    vi: 'Tất cả loại đối tác',
    ko: '모든 제공자 유형',
  },
  'Provider type': {
    en: 'Provider type',
    vi: 'Loại đối tác',
    ko: '제공자 유형',
  },
  'Optional refinement': {
    en: 'Optional refinement',
    vi: 'Lọc thêm (không bắt buộc)',
    ko: '선택 필터',
  },
  'Individual Therapist': {
    en: 'Individual Therapist',
    vi: 'Kỹ thuật viên cá nhân',
    ko: '개인 테라피스트',
  },
  'Massage Business': {
    en: 'Massage Business',
    vi: 'Doanh nghiệp massage',
    ko: '마사지 업체',
  },
  'Account references, separated by commas': {
    en: 'Account references, separated by commas',
    vi: 'Mã tài khoản, ngăn cách bằng dấu phẩy',
    ko: '계정 참조를 쉼표로 구분하세요',
  },
  'No eligible accounts': {
    en: 'No eligible accounts',
    vi: 'Không có tài khoản phù hợp',
    ko: '대상 계정 없음',
  },
  'No notification requests yet': {
    en: 'No notification requests yet',
    vi: 'Chưa có yêu cầu gửi thông báo',
    ko: '아직 알림 요청이 없습니다',
  },
  'No notification requests have been recorded in this demo yet.': {
    en: 'No notification requests have been recorded in this demo yet.',
    vi: 'Bản mẫu này chưa ghi nhận yêu cầu gửi thông báo nào.',
    ko: '이 데모에는 아직 기록된 알림 요청이 없습니다.',
  },
  Open: { en: 'Open', vi: 'Mở', ko: '열기' },
  Close: { en: 'Close', vi: 'Đóng', ko: '닫기' },
  'Just now': { en: 'Just now', vi: 'Vừa xong', ko: '방금' },
  'Notification request recorded': {
    en: 'Notification request recorded',
    vi: 'Đã ghi nhận yêu cầu gửi thông báo',
    ko: '알림 요청이 기록되었습니다',
  },
  'Only the selected audience is targeted.': {
    en: 'Only the selected audience is targeted.',
    vi: 'Chỉ đối tượng đã chọn được nhận.',
    ko: '선택한 대상에게만 발송됩니다.',
  },
  Processing: { en: 'Processing', vi: 'Đang xử lý', ko: '처리 중' },
  Scheduled: { en: 'Scheduled', vi: 'Đã lên lịch', ko: '예약됨' },
  'Schedule Notification': {
    en: 'Schedule Notification',
    vi: 'Lên lịch thông báo',
    ko: '알림 예약',
  },
  'estimated eligible accounts': {
    en: 'estimated eligible accounts',
    vi: 'tài khoản dự kiến phù hợp',
    ko: '예상 대상 계정',
  },
  'Account references': {
    en: 'Account references',
    vi: 'Mã tài khoản',
    ko: '계정 참조',
  },
  'Exact target rule': {
    en: 'Exact target rule',
    vi: 'Quy tắc chọn đối tượng',
    ko: '정확한 대상 규칙',
  },
  'Estimated eligible accounts': {
    en: 'Estimated eligible accounts',
    vi: 'Số tài khoản dự kiến phù hợp',
    ko: '예상 대상 계정 수',
  },
  'Configured time zone': {
    en: 'Configured time zone',
    vi: 'Múi giờ được cấu hình',
    ko: '설정된 시간대',
  },
  Schedule: { en: 'Schedule', vi: 'Lên lịch', ko: '예약' },
}

export function notificationsT(locale: Locale, source: string): string {
  return (
    (translations[source] ?? extra[source])?.[locale] ??
    dashboardT(locale, source)
  )
}
