import rows from './admin-reports.json'
import type { Locale } from './admin-access'
import { dashboardT } from './admin-dashboard'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const extra: Record<string, { en: string; vi: string; ko: string }> = {
  'require review': {
    en: 'require review',
    vi: 'cần xét duyệt',
    ko: '검토 필요',
  },
  'Reported by': { en: 'Reported by', vi: 'Người báo cáo:', ko: '신고인:' },
  'View Booking': { en: 'View Booking', vi: 'Xem lịch hẹn', ko: '예약 보기' },
  'newest first': { en: 'newest first', vi: 'mới nhất trước', ko: '최신 순' },
  'oldest first': { en: 'oldest first', vi: 'cũ nhất trước', ko: '오래된 순' },
  'Unable to Save': {
    en: 'Unable to Save',
    vi: 'Không thể lưu',
    ko: '저장할 수 없습니다',
  },
  'Changes in reports were not saved. Your form text remains available to retry.':
    {
      en: 'Changes in reports were not saved. Your form text remains available to retry.',
      vi: 'Chưa lưu thay đổi báo cáo. Nội dung biểu mẫu vẫn còn để thử lại.',
      ko: '신고 변경 사항이 저장되지 않았습니다. 입력한 내용은 다시 시도할 수 있도록 유지됩니다.',
    },
  'Record changed': {
    en: 'Record changed',
    vi: 'Báo cáo đã thay đổi',
    ko: '기록이 변경되었습니다',
  },
  'This report changed after it was opened. Reload before adding notes or recording a decision.':
    {
      en: 'This report changed after it was opened. Reload before adding notes or recording a decision.',
      vi: 'Báo cáo đã thay đổi sau khi mở. Hãy tải lại trước khi ghi chú hoặc ra quyết định.',
      ko: '신고를 연 후 내용이 변경되었습니다. 메모하거나 결정하기 전에 새로고침하세요.',
    },
  'Action Unavailable': {
    en: 'Action Unavailable',
    vi: 'Không thể thực hiện',
    ko: '작업을 사용할 수 없습니다',
  },
  'Your access to reports changed. Restricted details and actions have been removed.':
    {
      en: 'Your access to reports changed. Restricted details and actions have been removed.',
      vi: 'Quyền truy cập báo cáo đã thay đổi. Chi tiết và thao tác giới hạn đã bị ẩn.',
      ko: '신고 접근 권한이 변경되어 제한된 상세 정보와 작업이 제거되었습니다.',
    },
  'Back to Dashboard': {
    en: 'Back to Dashboard',
    vi: 'Về bảng điều khiển',
    ko: '대시보드로 돌아가기',
  },
  "We couldn't load reports. No count or result has been verified.": {
    en: "We couldn't load reports. No count or result has been verified.",
    vi: 'Không thể tải báo cáo. Số lượng và kết quả chưa được xác nhận.',
    ko: '신고를 불러올 수 없습니다. 건수와 결과가 확인되지 않았습니다.',
  },
  'current state checked on confirmation': {
    en: 'current state checked on confirmation',
    vi: 'kiểm tra trạng thái hiện tại khi xác nhận',
    ko: '확인 시 현재 상태 검사',
  },
  'The question goes to the reporter and this case stays open.': {
    en: 'The question goes to the reporter and this case stays open.',
    vi: 'Câu hỏi được gửi cho người báo cáo và vụ việc vẫn đang mở.',
    ko: '질문이 신고인에게 전달되며 사건은 열린 상태로 유지됩니다.',
  },
  'The report decision is separate from any action on the target. The reporter sees only the outcome below, never the internal reason.':
    {
      en: 'The report decision is separate from any action on the target. The reporter sees only the outcome below, never the internal reason.',
      vi: 'Quyết định xử lý báo cáo tách biệt với thao tác trên đối tượng. Người báo cáo chỉ thấy kết quả bên dưới, không thấy lý do nội bộ.',
      ko: '신고 결정은 대상 조치와 별개입니다. 신고인은 아래 결과만 볼 수 있으며 내부 사유는 볼 수 없습니다.',
    },
  'Exact case target': {
    en: 'Exact case target',
    vi: 'Đối tượng chính xác',
    ko: '정확한 사건 대상',
  },
  'Explain the result in user-facing language': {
    en: 'Explain the result in user-facing language',
    vi: 'Giải thích kết quả cho người báo cáo',
    ko: '신고인에게 보여줄 결과를 설명하세요',
  },
  'Ask for the specific information needed': {
    en: 'Ask for the specific information needed',
    vi: 'Nêu rõ thông tin cần bổ sung',
    ko: '필요한 정보를 구체적으로 요청하세요',
  },
  'Record the evidence-based reason for this decision': {
    en: 'Record the evidence-based reason for this decision',
    vi: 'Ghi lý do dựa trên bằng chứng cho quyết định này',
    ko: '이 결정의 증거 기반 사유를 기록하세요',
  },
  'Information request': {
    en: 'Information request',
    vi: 'Yêu cầu thông tin',
    ko: '정보 요청',
  },
  'Result notification': {
    en: 'Result notification',
    vi: 'Thông báo kết quả',
    ko: '결과 알림',
  },
  'can open': { en: 'can open', vi: 'có thể mở', ko: '열 수 있습니다' },
  'after the request is recorded.': {
    en: 'after the request is recorded.',
    vi: 'sau khi yêu cầu được ghi nhận.',
    ko: '요청이 기록된 후.',
  },
  'Read-only · access is checked again for every open request': {
    en: 'Read-only · access is checked again for every open request',
    vi: 'Chỉ xem · quyền truy cập được kiểm tra mỗi lần mở',
    ko: '읽기 전용 · 열 때마다 접근 권한을 다시 확인합니다',
  },
  'Private note saved for authorized Admins only.': {
    en: 'Private note saved for authorized Admins only.',
    vi: 'Đã lưu ghi chú chỉ dành cho quản trị viên có quyền.',
    ko: '권한이 있는 관리자만 볼 수 있는 메모가 저장되었습니다.',
  },
  'Classification and audit event recorded from the configured workflow.': {
    en: 'Classification and audit event recorded from the configured workflow.',
    vi: 'Đã ghi nhận phân loại và lịch sử thao tác.',
    ko: '분류와 감사 이벤트가 기록되었습니다.',
  },
  'Assignment and audit event recorded.': {
    en: 'Assignment and audit event recorded.',
    vi: 'Đã ghi nhận phân công và lịch sử thao tác.',
    ko: '담당자 배정과 감사 이벤트가 기록되었습니다.',
  },
  'The request was sent to the reporter and recorded in the case timeline.': {
    en: 'The request was sent to the reporter and recorded in the case timeline.',
    vi: 'Đã gửi yêu cầu cho người báo cáo và ghi vào tiến trình vụ việc.',
    ko: '요청이 신고인에게 전송되고 사건 타임라인에 기록되었습니다.',
  },
  'No reports match this view': {
    en: 'No reports match this view',
    vi: 'Không có báo cáo phù hợp',
    ko: '일치하는 신고가 없습니다',
  },
  'Clear Filters': { en: 'Clear Filters', vi: 'Xóa bộ lọc', ko: '필터 지우기' },
  'Add an internal note only': {
    en: 'Add an internal note only',
    vi: 'Chỉ thêm ghi chú nội bộ',
    ko: '내부 메모만 추가',
  },
  'No private notes yet.': {
    en: 'No private notes yet.',
    vi: 'Chưa có ghi chú nội bộ.',
    ko: '내부 메모가 없습니다.',
  },
  'Not applicable': {
    en: 'Not applicable',
    vi: 'Không áp dụng',
    ko: '해당 없음',
  },
  'View Chat Evidence': {
    en: 'View Chat Evidence',
    vi: 'Xem bằng chứng trò chuyện',
    ko: '채팅 증거 보기',
  },
  'View Photo Owner': {
    en: 'View Photo Owner',
    vi: 'Xem chủ ảnh',
    ko: '사진 소유자 보기',
  },
  'Reporter-visible outcome': {
    en: 'Reporter-visible outcome',
    vi: 'Kết quả hiển thị cho người báo cáo',
    ko: '신고인에게 표시되는 결과',
  },
  'Resolved reports are read-only. Evidence remains permission restricted.': {
    en: 'Resolved reports are read-only. Evidence remains permission restricted.',
    vi: 'Báo cáo đã giải quyết chỉ có thể xem. Bằng chứng vẫn bị giới hạn quyền truy cập.',
    ko: '해결된 신고는 읽기 전용입니다. 증거 접근은 계속 제한됩니다.',
  },
  Close: { en: 'Close', vi: 'Đóng', ko: '닫기' },
  'Go Back': { en: 'Go Back', vi: 'Quay lại', ko: '돌아가기' },
  Required: { en: 'Required', vi: 'Bắt buộc', ko: '필수' },
  'Outcome shown to reporter': {
    en: 'Outcome shown to reporter',
    vi: 'Kết quả gửi cho người báo cáo',
    ko: '신고인에게 표시할 결과',
  },
  'Question to reporter': {
    en: 'Question to reporter',
    vi: 'Câu hỏi gửi người báo cáo',
    ko: '신고인에게 보낼 질문',
  },
  'Internal decision reason': {
    en: 'Internal decision reason',
    vi: 'Lý do quyết định nội bộ',
    ko: '내부 결정 사유',
  },
  'Send Request': { en: 'Send Request', vi: 'Gửi yêu cầu', ko: '요청 보내기' },
  'Confirm Dismissal': {
    en: 'Confirm Dismissal',
    vi: 'Xác nhận bác bỏ',
    ko: '기각 확인',
  },
  'Confirm Resolution': {
    en: 'Confirm Resolution',
    vi: 'Xác nhận giải quyết',
    ko: '해결 확인',
  },
  'Evidence preview': {
    en: 'Evidence preview',
    vi: 'Xem trước bằng chứng',
    ko: '증거 미리보기',
  },
  'Close Viewer': { en: 'Close Viewer', vi: 'Đóng trình xem', ko: '뷰어 닫기' },
  'Restricted case evidence': {
    en: 'Restricted case evidence',
    vi: 'Bằng chứng vụ việc có giới hạn',
    ko: '접근 제한된 증거',
  },
  'No evidence was submitted.': {
    en: 'No evidence was submitted.',
    vi: 'Chưa có bằng chứng được gửi.',
    ko: '제출된 증거가 없습니다.',
  },
  'Case updated': {
    en: 'Case updated',
    vi: 'Đã cập nhật vụ việc',
    ko: '사건이 업데이트되었습니다',
  },
  'Try Again': { en: 'Try Again', vi: 'Thử lại', ko: '다시 시도' },
  'Reload Details': {
    en: 'Reload Details',
    vi: 'Tải lại chi tiết',
    ko: '상세 새로고침',
  },
  'Unable to Load': {
    en: 'Unable to Load',
    vi: 'Không thể tải',
    ko: '불러올 수 없습니다',
  },
  'Loading reports…': {
    en: 'Loading reports…',
    vi: 'Đang tải báo cáo…',
    ko: '신고 불러오는 중…',
  },
}

export function reportsT(locale: Locale, source: string) {
  return (
    translations[source]?.[locale] ||
    extra[source]?.[locale] ||
    dashboardT(locale, source)
  )
}
