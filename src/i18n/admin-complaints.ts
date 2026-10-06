import rows from './admin-complaints.json'
import type { Locale } from './admin-access'
import { dashboardT } from './admin-dashboard'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const extra: Record<string, { en: string; vi: string; ko: string }> = {
  'View image': { en: 'View image', vi: 'Xem ảnh', ko: '이미지 보기' },
  'Evidence preview': {
    en: 'Evidence preview',
    vi: 'Xem bằng chứng',
    ko: '증거 미리보기',
  },
  'Close evidence viewer': {
    en: 'Close evidence viewer',
    vi: 'Đóng ảnh bằng chứng',
    ko: '증거 이미지 닫기',
  },
  'Close Viewer': { en: 'Close Viewer', vi: 'Đóng ảnh', ko: '이미지 닫기' },
  'Read-only · access is checked again for every open request': {
    en: 'Read-only · access is checked again for every open request',
    vi: 'Chỉ xem · quyền truy cập được kiểm tra mỗi lần mở',
    ko: '읽기 전용 · 열람할 때마다 접근 권한을 확인합니다',
  },
  'Accepted booking details for BK-48291': {
    en: 'Accepted booking details for BK-48291',
    vi: 'Thông tin lịch hẹn đã chấp nhận BK-48291',
    ko: '확정된 예약 BK-48291의 상세 정보',
  },
  'Booking messages in Vietnamese': {
    en: 'Booking messages in Vietnamese',
    vi: 'Tin nhắn lịch hẹn bằng tiếng Việt',
    ko: '베트남어 예약 메시지',
  },
  'Unable to load this image. Close and reopen it to try again.': {
    en: 'Unable to load this image. Close and reopen it to try again.',
    vi: 'Không thể tải ảnh. Đóng và mở lại để thử lần nữa.',
    ko: '이미지를 불러올 수 없습니다. 닫았다가 다시 열어 주세요.',
  },
  'Complaint Details': {
    en: 'Complaint Details',
    vi: 'Chi tiết khiếu nại',
    ko: '민원 상세',
  },
  'No complaints match this view': {
    en: 'No complaints match this view',
    vi: 'Không có khiếu nại phù hợp',
    ko: '일치하는 민원이 없습니다',
  },
  'Clear Filters': { en: 'Clear Filters', vi: 'Xóa bộ lọc', ko: '필터 지우기' },
  'Loading complaints': {
    en: 'Loading complaints',
    vi: 'Đang tải khiếu nại',
    ko: '민원을 불러오는 중',
  },
  'Unable to Load': {
    en: 'Unable to Load',
    vi: 'Không thể tải dữ liệu',
    ko: '불러올 수 없습니다',
  },
  "We couldn't load complaints. No count or result has been verified.": {
    en: "We couldn't load complaints. No count or result has been verified.",
    vi: 'Không thể tải khiếu nại. Số lượng và kết quả chưa được xác nhận.',
    ko: '민원을 불러올 수 없습니다. 건수와 결과가 확인되지 않았습니다.',
  },
  'Try Again': { en: 'Try Again', vi: 'Thử lại', ko: '다시 시도' },
  'Close case details': {
    en: 'Close case details',
    vi: 'Đóng chi tiết vụ việc',
    ko: '안건 상세 닫기',
  },
  'Case updated': {
    en: 'Case updated',
    vi: 'Đã cập nhật vụ việc',
    ko: '안건이 업데이트되었습니다',
  },
  'Write clear, neutral case communication': {
    en: 'Write clear, neutral case communication',
    vi: 'Viết nội dung rõ ràng, trung lập',
    ko: '명확하고 중립적인 내용을 작성하세요',
  },
  'View Booking': { en: 'View Booking', vi: 'Xem lịch hẹn', ko: '예약 보기' },
  'oldest first': { en: 'oldest first', vi: 'cũ nhất trước', ko: '오래된 순' },
  'newest first': { en: 'newest first', vi: 'mới nhất trước', ko: '최신 순' },
  'complainant-visible message': {
    en: 'complainant-visible message',
    vi: 'nội dung hiển thị cho người khiếu nại',
    ko: '민원인에게 표시되는 메시지',
  },
  'The complainant will be notified and can open': {
    en: 'The complainant will be notified and can open',
    vi: 'Người khiếu nại sẽ nhận thông báo và có thể mở',
    ko: '민원인에게 알림이 전송되며 열람할 수 있습니다',
  },
  'Review started with actor and timestamp recorded.': {
    en: 'Review started with actor and timestamp recorded.',
    vi: 'Đã bắt đầu xét duyệt và ghi nhận người thực hiện, thời gian.',
    ko: '검토가 시작되었으며 담당자와 시간이 기록되었습니다.',
  },
  'Question sent to the complainant. The case remains In Progress.': {
    en: 'Question sent to the complainant. The case remains In Progress.',
    vi: 'Đã gửi câu hỏi cho người khiếu nại. Vụ việc vẫn đang xử lý.',
    ko: '민원인에게 질문을 보냈습니다. 안건은 처리 중입니다.',
  },
  'Complaint closed. Outcome and notification were recorded; booking status was unchanged.':
    {
      en: 'Complaint closed. Outcome and notification were recorded; booking status was unchanged.',
      vi: 'Đã đóng khiếu nại, ghi nhận kết quả và thông báo; trạng thái lịch hẹn không đổi.',
      ko: '민원을 종료하고 결과와 알림을 기록했습니다. 예약 상태는 변경되지 않았습니다.',
    },
}

export function complaintsT(locale: Locale, source: string) {
  return (
    translations[source]?.[locale] ||
    extra[source]?.[locale] ||
    dashboardT(locale, source)
  )
}
