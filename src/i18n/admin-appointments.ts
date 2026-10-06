import rows from './admin-appointments.json'
import type { Locale } from './admin-access'
import { dashboardT } from './admin-dashboard'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const additional: Record<string, { en: string; vi: string; ko: string }> = {
  'No appointments match these filters': {
    en: 'No appointments match these filters',
    vi: 'Không có lịch hẹn phù hợp bộ lọc',
    ko: '필터와 일치하는 예약이 없습니다',
  },
  'Clear Filters': { en: 'Clear Filters', vi: 'Xóa bộ lọc', ko: '필터 지우기' },
  'Unable to load appointments': {
    en: 'Unable to load appointments',
    vi: 'Không thể tải lịch hẹn',
    ko: '예약을 불러올 수 없습니다',
  },
  'Try Again': { en: 'Try Again', vi: 'Thử lại', ko: '다시 시도' },
  'Loading appointments': {
    en: 'Loading appointments',
    vi: 'Đang tải lịch hẹn',
    ko: '예약을 불러오는 중',
  },
  'Immutable snapshot': {
    en: 'Immutable snapshot',
    vi: 'Bản lưu không thể thay đổi',
    ko: '변경 불가 스냅샷',
  },
  'In-progress condition': {
    en: 'In-progress condition',
    vi: 'Tình trạng đang xử lý',
    ko: '진행 중인 상태',
  },
  'No booking note was provided.': {
    en: 'No booking note was provided.',
    vi: 'Không có ghi chú cho lịch hẹn.',
    ko: '예약 메모가 없습니다.',
  },
  'No associated cases.': {
    en: 'No associated cases.',
    vi: 'Không có vụ việc liên quan.',
    ko: '연계된 안건이 없습니다.',
  },
  'No-show case': {
    en: 'No-show case',
    vi: 'Vụ việc vắng mặt',
    ko: '노쇼 안건',
  },
  'Recorded reason': {
    en: 'Recorded reason',
    vi: 'Lý do đã ghi nhận',
    ko: '기록된 사유',
  },
  'Chat is unavailable because this booking was never Accepted.': {
    en: 'Chat is unavailable because this booking was never Accepted.',
    vi: 'Không có hội thoại vì lịch hẹn này chưa từng được chấp nhận.',
    ko: '이 예약은 수락된 적이 없어 대화를 볼 수 없습니다.',
  },
  'Read Only': { en: 'Read Only', vi: 'Chỉ xem', ko: '읽기 전용' },
  'Open Accepted Booking Chat': {
    en: 'Open Accepted Booking Chat',
    vi: 'Mở hội thoại lịch hẹn đã chấp nhận',
    ko: '수락된 예약 대화 열기',
  },
  'Case Access': {
    en: 'Case Access',
    vi: 'Quyền xử lý vụ việc',
    ko: '안건 접근 권한',
  },
  'Time unavailable in demo': {
    en: 'Time unavailable in demo',
    vi: 'Không có thời gian trong bản mẫu',
    ko: '데모에서 시간을 사용할 수 없음',
  },
  'Booking accepted': {
    en: 'Booking accepted',
    vi: 'Lịch hẹn được chấp nhận',
    ko: '예약 수락됨',
  },
  'Booking requested': {
    en: 'Booking requested',
    vi: 'Đã yêu cầu đặt lịch',
    ko: '예약 요청됨',
  },
  'Current booking state': {
    en: 'Current booking state',
    vi: 'Trạng thái lịch hẹn hiện tại',
    ko: '현재 예약 상태',
  },
  'Appointment cancelled': {
    en: 'Appointment cancelled',
    vi: 'Lịch hẹn đã hủy',
    ko: '예약 취소됨',
  },
  State: { en: 'State', vi: 'Trạng thái', ko: '상태' },
  Reason: { en: 'Reason', vi: 'Lý do', ko: '사유' },
  Notification: { en: 'Notification', vi: 'Thông báo', ko: '알림' },
  'State from booking record': {
    en: 'State from booking record',
    vi: 'Trạng thái từ hồ sơ đặt lịch',
    ko: '예약 기록의 상태',
  },
  'Provider response': {
    en: 'Provider response',
    vi: 'Phản hồi của đối tác',
    ko: '제공자 응답',
  },
  'Customer request': {
    en: 'Customer request',
    vi: 'Yêu cầu của khách hàng',
    ko: '고객 요청',
  },
  'Unavailable in demo': {
    en: 'Unavailable in demo',
    vi: 'Không có trong bản mẫu',
    ko: '데모에서 이용 불가',
  },
  Unavailable: { en: 'Unavailable', vi: 'Không có', ko: '이용 불가' },
  System: { en: 'System', vi: 'Hệ thống', ko: '시스템' },
  'Service snapshot unavailable': {
    en: 'Service snapshot unavailable',
    vi: 'Không có bản lưu dịch vụ',
    ko: '서비스 스냅샷 이용 불가',
  },
}

export function appointmentT(locale: Locale, source: string): string {
  return (
    (translations[source] ?? additional[source])?.[locale] ??
    dashboardT(locale, source)
  )
}
