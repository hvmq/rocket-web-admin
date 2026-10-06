import rows from './admin-users.json'
import contextRows from './admin-users-context.json'
import type { Locale } from './admin-access'
import { dashboardT } from './admin-dashboard'

const translations = Object.fromEntries(
  [...rows, ...contextRows].map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const extra: Record<string, { en: string; vi: string; ko: string }> = {
  'Provider type': {
    en: 'Provider type',
    vi: 'Loại đối tác',
    ko: '제공자 유형',
  },
  'All types': { en: 'All types', vi: 'Tất cả loại', ko: '모든 유형' },
  'No users match these filters': {
    en: 'No users match these filters',
    vi: 'Không có người dùng phù hợp bộ lọc',
    ko: '필터와 일치하는 사용자가 없습니다',
  },
  'Clear Filters': { en: 'Clear Filters', vi: 'Xóa bộ lọc', ko: '필터 지우기' },
  'Unlock Account': {
    en: 'Unlock Account',
    vi: 'Mở khóa tài khoản',
    ko: '계정 잠금 해제',
  },
  Lock: { en: 'Lock', vi: 'Khóa', ko: '잠금' },
  Unlock: { en: 'Unlock', vi: 'Mở khóa', ko: '잠금 해제' },
  'Not applicable': {
    en: 'Not applicable',
    vi: 'Không áp dụng',
    ko: '해당 없음',
  },
  'Confirm account decision': {
    en: 'Confirm account decision',
    vi: 'Xác nhận quyết định tài khoản',
    ko: '계정 결정 확인',
  },
  Reason: { en: 'Reason', vi: 'Lý do', ko: '사유' },
  Required: { en: 'Required', vi: 'Bắt buộc', ko: '필수' },
  'Record the reason for this decision': {
    en: 'Record the reason for this decision',
    vi: 'Ghi lý do cho quyết định này',
    ko: '결정 사유를 기록하세요',
  },
  'Go Back': { en: 'Go Back', vi: 'Quay lại', ko: '뒤로 가기' },
  'Confirm Lock': { en: 'Confirm Lock', vi: 'Xác nhận khóa', ko: '잠금 확인' },
  'Confirm Unlock': {
    en: 'Confirm Unlock',
    vi: 'Xác nhận mở khóa',
    ko: '잠금 해제 확인',
  },
  'Deleted accounts are read-only and cannot be restored.': {
    en: 'Deleted accounts are read-only and cannot be restored.',
    vi: 'Tài khoản đã xóa chỉ có thể xem và không thể khôi phục.',
    ko: '삭제된 계정은 읽기 전용이며 복원할 수 없습니다.',
  },
  'This prevents sign-in and new actions. Existing bookings, chat, and evidence remain available under policy.':
    {
      en: 'This prevents sign-in and new actions. Existing bookings, chat, and evidence remain available under policy.',
      vi: 'Thao tác này chặn đăng nhập và hoạt động mới. Lịch hẹn, trò chuyện và bằng chứng hiện có vẫn được lưu theo chính sách.',
      ko: '로그인과 새 활동이 차단됩니다. 기존 예약, 채팅 및 증거는 정책에 따라 유지됩니다.',
    },
  'This restores sign-in under current permissions. It does not approve a pending Provider profile.':
    {
      en: 'This restores sign-in under current permissions. It does not approve a pending Provider profile.',
      vi: 'Thao tác này khôi phục đăng nhập theo quyền hiện tại. Hồ sơ đối tác đang chờ vẫn chưa được duyệt.',
      ko: '현재 권한으로 로그인을 복원합니다. 대기 중인 제공자 프로필은 승인되지 않습니다.',
    },
  'Account locked': {
    en: 'Account locked',
    vi: 'Tài khoản đã khóa',
    ko: '계정 잠김',
  },
  'Account deleted': {
    en: 'Account deleted',
    vi: 'Tài khoản đã xóa',
    ko: '계정 삭제됨',
  },
  'Reason recorded by Ava Morgan': {
    en: 'Reason recorded by Ava Morgan',
    vi: 'Ava Morgan đã ghi lý do',
    ko: 'Ava Morgan이 사유를 기록함',
  },
  'Account deletion completed': {
    en: 'Account deletion completed',
    vi: 'Đã hoàn tất xóa tài khoản',
    ko: '계정 삭제 완료',
  },
  'Loading users…': {
    en: 'Loading users…',
    vi: 'Đang tải người dùng…',
    ko: '사용자 로딩 중…',
  },
  'Unable to Load': {
    en: 'Unable to Load',
    vi: 'Không thể tải',
    ko: '불러올 수 없음',
  },
  'Try Again': { en: 'Try Again', vi: 'Thử lại', ko: '다시 시도' },
  'Record changed': {
    en: 'Record changed',
    vi: 'Bản ghi đã thay đổi',
    ko: '기록이 변경됨',
  },
  'Reload Details': {
    en: 'Reload Details',
    vi: 'Tải lại chi tiết',
    ko: '상세 정보 다시 불러오기',
  },
  'Action Permission Lost': {
    en: 'Action Permission Lost',
    vi: 'Đã mất quyền thao tác',
    ko: '작업 권한 상실',
  },
  'Back to Dashboard': {
    en: 'Back to Dashboard',
    vi: 'Về bảng điều khiển',
    ko: '대시보드로 돌아가기',
  },
  'Related records': {
    en: 'Related records',
    vi: 'Hồ sơ liên quan',
    ko: '관련 기록',
  },
  'Deletion request': {
    en: 'Deletion request',
    vi: 'Yêu cầu xóa',
    ko: '삭제 요청',
  },
  Expand: { en: 'Expand', vi: 'Mở rộng', ko: '확대' },
  Restore: { en: 'Restore', vi: 'Thu nhỏ', ko: '복원' },
  'Close related records': {
    en: 'Close related records',
    vi: 'Đóng hồ sơ liên quan',
    ko: '관련 기록 닫기',
  },
  'Expand dialog to full screen': {
    en: 'Expand dialog to full screen',
    vi: 'Phóng to toàn màn hình',
    ko: '전체 화면으로 확대',
  },
  'Restore dialog size': {
    en: 'Restore dialog size',
    vi: 'Khôi phục kích thước hộp thoại',
    ko: '대화상자 크기 복원',
  },
  'Booking note': {
    en: 'Booking note',
    vi: 'Ghi chú lịch hẹn',
    ko: '예약 메모',
  },
  'State history': {
    en: 'State history',
    vi: 'Lịch sử trạng thái',
    ko: '상태 이력',
  },
  'Review context': {
    en: 'Review context',
    vi: 'Thông tin xét duyệt',
    ko: '심사 정보',
  },
  'Profile context': {
    en: 'Profile context',
    vi: 'Thông tin hồ sơ',
    ko: '프로필 정보',
  },
  'Provider account': {
    en: 'Provider account',
    vi: 'Tài khoản đối tác',
    ko: '제공자 계정',
  },
  'The proposed profile version is awaiting review against the currently published version.':
    {
      en: 'The proposed profile version is awaiting review against the currently published version.',
      vi: 'Phiên bản hồ sơ đề xuất đang chờ xét duyệt so với phiên bản đang công khai.',
      ko: '제안된 프로필 버전을 현재 공개된 버전과 비교하여 심사 중입니다.',
    },
  'This new provider profile has no published version yet.': {
    en: 'This new provider profile has no published version yet.',
    vi: 'Hồ sơ đối tác mới này chưa có phiên bản công khai.',
    ko: '이 신규 제공자 프로필은 아직 공개된 버전이 없습니다.',
  },
  'No verification submission is linked to this account. The current profile state is shown above.':
    {
      en: 'No verification submission is linked to this account. The current profile state is shown above.',
      vi: 'Tài khoản này không có hồ sơ xét duyệt liên kết. Trạng thái hồ sơ hiện tại được hiển thị ở trên.',
      ko: '이 계정에 연결된 심사 신청이 없습니다. 현재 프로필 상태는 위에 표시됩니다.',
    },
  '4 submitted · portrait, workspace, service environment': {
    en: '4 submitted · portrait, workspace, service environment',
    vi: '4 ảnh đã nộp · chân dung, nơi làm việc, không gian dịch vụ',
    ko: '제출 이미지 4장 · 인물, 작업 공간, 서비스 환경',
  },
  '3 services · $68–$120 · 45–90 minutes': {
    en: '3 services · $68–$120 · 45–90 minutes',
    vi: '3 dịch vụ · $68–$120 · 45–90 phút',
    ko: '서비스 3개 · $68–$120 · 45–90분',
  },
  'Monday–Friday · 09:00–17:00': {
    en: 'Monday–Friday · 09:00–17:00',
    vi: 'Thứ Hai–Thứ Sáu · 09:00–17:00',
    ko: '월–금 · 09:00–17:00',
  },
  'requested this booking · time unavailable in demo': {
    en: 'requested this booking · time unavailable in demo',
    vi: 'đã yêu cầu lịch hẹn này · không có thời gian trong bản mẫu',
    ko: '예약을 요청함 · 데모에 시간 없음',
  },
  'accepted this booking · time unavailable in demo': {
    en: 'accepted this booking · time unavailable in demo',
    vi: 'đã nhận lịch hẹn này · không có thời gian trong bản mẫu',
    ko: '예약을 수락함 · 데모에 시간 없음',
  },
  'Current state:': {
    en: 'Current state:',
    vi: 'Trạng thái hiện tại:',
    ko: '현재 상태:',
  },
  'time unavailable in demo': {
    en: 'time unavailable in demo',
    vi: 'không có thời gian trong bản mẫu',
    ko: '데모에 시간 없음',
  },
}

export function usersT(locale: Locale, source: string): string {
  return (
    translations[source]?.[locale] ??
    extra[source]?.[locale] ??
    dashboardT(locale, source)
  )
}
