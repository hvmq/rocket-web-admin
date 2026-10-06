import rows from './admin-no-show.json'
import type { Locale } from './admin-access'
import { dashboardT } from './admin-dashboard'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const extra: Record<string, { en: string; vi: string; ko: string }> = {
  'Restricted case': {
    en: 'Restricted case',
    vi: 'Chi tiết báo cáo vắng mặt',
    ko: '제한된 안건',
  },
  'View Booking': {
    en: 'View Booking',
    vi: 'Xem lịch hẹn',
    ko: '예약 내역 조회',
  },
  'Final decision recorded · Ava Morgan': {
    en: 'Final decision recorded · Ava Morgan',
    vi: 'Quyết định cuối cùng đã được ghi nhận · Ava Morgan',
    ko: '최종 결정 기록됨 · Ava Morgan',
  },
  'No no-show cases here': {
    en: 'No no-show cases here',
    vi: 'Không có vụ việc vắng mặt phù hợp',
    ko: '해당하는 노쇼 안건이 없습니다',
  },
  'Clear Filters': { en: 'Clear Filters', vi: 'Xóa bộ lọc', ko: '필터 지우기' },
  'Loading no-show cases': {
    en: 'Loading no-show cases',
    vi: 'Đang tải vụ việc vắng mặt',
    ko: '노쇼 안건을 불러오는 중',
  },
  'Unable to load no-show cases': {
    en: 'Unable to load no-show cases',
    vi: 'Không thể tải vụ việc vắng mặt',
    ko: '노쇼 안건을 불러올 수 없습니다',
  },
  'Try Again': { en: 'Try Again', vi: 'Thử lại', ko: '다시 시도' },
  'Final decision recorded': {
    en: 'Final decision recorded',
    vi: 'Đã ghi nhận quyết định cuối cùng',
    ko: '최종 결정 기록됨',
  },
  'Decision saved. The booking is Not Completed.': {
    en: 'Decision saved. The booking is Not Completed.',
    vi: 'Đã lưu kết luận. Lịch hẹn chuyển thành Không hoàn thành.',
    ko: '결정이 저장되었습니다. 예약이 미완료로 변경되었습니다.',
  },
  'Close Viewer': { en: 'Close Viewer', vi: 'Đóng ảnh', ko: '뷰어 닫기' },
  'Close evidence viewer': {
    en: 'Close evidence viewer',
    vi: 'Đóng ảnh đính kèm',
    ko: '증거 뷰어 닫기',
  },
  'Close case details': {
    en: 'Close case details',
    vi: 'Đóng chi tiết vụ việc',
    ko: '안건 상세 닫기',
  },
  'Explain the reviewed decision': {
    en: 'Explain the reviewed decision',
    vi: 'Giải thích quyết định sau khi xem xét',
    ko: '검토한 결정의 근거를 입력하세요',
  },
  'This case changed before confirmation. No decision or success audit was written.':
    {
      en: 'This case changed before confirmation. No decision or success audit was written.',
      vi: 'Vụ việc đã thay đổi trước khi xác nhận. Chưa có quyết định nào được lưu.',
      ko: '확인 전에 안건이 변경되었습니다. 결정이 저장되지 않았습니다.',
    },
  'No evidence was submitted.': {
    en: 'No evidence was submitted.',
    vi: 'Người báo cáo chưa đính kèm ảnh hoặc tệp bằng chứng.',
    ko: '제출된 증거가 없습니다.',
  },
  'Decision must include a responsible party and a reason.': {
    en: 'Decision must include a responsible party and a reason.',
    vi: 'Cần chọn bên chịu trách nhiệm và nhập lý do.',
    ko: '책임 당사자와 사유를 입력하세요.',
  },
  'Reload details before making a decision.': {
    en: 'Reload details before making a decision.',
    vi: 'Tải lại chi tiết trước khi đưa ra quyết định.',
    ko: '결정을 내리기 전에 상세 내용을 다시 불러오세요.',
  },
  'Case timeline': {
    en: 'Case timeline',
    vi: 'Lịch sử xử lý',
    ko: '안건 진행 타임라인',
  },
  'View image': {
    en: 'View image',
    vi: 'Xem ảnh',
    ko: '이미지 보기',
  },
  'Reception desk and beauty salon interior': {
    en: 'Reception desk and beauty salon interior',
    vi: 'Quầy lễ tân và không gian bên trong cơ sở dịch vụ',
    ko: '접수대와 서비스 매장 내부',
  },
  'Empty spa waiting area with armchairs and plants': {
    en: 'Empty spa waiting area with armchairs and plants',
    vi: 'Khu vực chờ có ghế ngồi và cây trang trí',
    ko: '안락의자와 식물이 있는 대기 구역',
  },
  'Booking messages in Vietnamese': {
    en: 'Booking messages in Vietnamese',
    vi: 'Các tin nhắn về lịch hẹn bằng tiếng Việt',
    ko: '베트남어 예약 메시지',
  },
  'Unable to load this image. Close and reopen it to try again.': {
    en: 'Unable to load this image. Close and reopen it to try again.',
    vi: 'Không tải được ảnh. Vui lòng đóng rồi mở lại để thử lại.',
    ko: '이미지를 불러올 수 없습니다. 닫은 후 다시 열어 주세요.',
  },
}

export function noShowT(locale: Locale, source: string): string {
  return (
    (translations[source] ?? extra[source])?.[locale] ??
    dashboardT(locale, source)
  )
}
