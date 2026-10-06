import rows from './admin-reviews.json'
import type { Locale } from './admin-access'
import { dashboardT } from './admin-dashboard'

const translations = Object.fromEntries(
  rows.map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const extra: Record<string, { en: string; vi: string; ko: string }> = {
  'Restore Review': {
    en: 'Restore Review',
    vi: 'Khôi phục đánh giá',
    ko: '리뷰 복원',
  },
  'Removed reviews cannot be restored or edited.': {
    en: 'Removed reviews cannot be restored or edited.',
    vi: 'Đánh giá đã gỡ không thể khôi phục hoặc chỉnh sửa.',
    ko: '삭제된 리뷰는 복원하거나 수정할 수 없습니다.',
  },
  'Moderation recorded': {
    en: 'Moderation recorded',
    vi: 'Đã ghi nhận kiểm duyệt',
    ko: '검수 내역이 기록되었습니다',
  },
  'The review becomes nonpublic and the Provider’s public average is recalculated from currently public valid reviews.':
    {
      en: 'The review becomes nonpublic and the Provider’s public average is recalculated from currently public valid reviews.',
      vi: 'Đánh giá sẽ bị ẩn; điểm công khai của đối tác được tính lại từ các đánh giá hợp lệ đang hiển thị.',
      ko: '리뷰가 비공개로 변경되고 공개된 유효 리뷰를 기준으로 제공자의 평균 평점이 다시 계산됩니다.',
    },
  'If still eligible, the original customer review becomes public again and the Provider’s public average is recalculated.':
    {
      en: 'If still eligible, the original customer review becomes public again and the Provider’s public average is recalculated.',
      vi: 'Nếu còn đủ điều kiện, đánh giá gốc sẽ được hiển thị lại và điểm công khai của đối tác được tính lại.',
      ko: '복원 자격이 유지되면 고객의 원본 리뷰가 다시 공개되고 제공자의 평균 평점이 다시 계산됩니다.',
    },
  'The review is removed from public surfaces. Restricted evidence remains available for any open case under retention policy.':
    {
      en: 'The review is removed from public surfaces. Restricted evidence remains available for any open case under retention policy.',
      vi: 'Đánh giá sẽ bị gỡ khỏi các khu vực công khai. Bằng chứng giới hạn vẫn được giữ cho vụ việc đang mở theo chính sách lưu trữ.',
      ko: '리뷰가 공개 화면에서 삭제됩니다. 제한된 증거는 보존 정책에 따라 진행 중인 사건에 유지됩니다.',
    },
  'The linked report closes without editing the Customer’s stars or comment and without changing review visibility.':
    {
      en: 'The linked report closes without editing the Customer’s stars or comment and without changing review visibility.',
      vi: 'Một báo cáo liên kết sẽ được đóng; số sao, nội dung của khách và trạng thái hiển thị không thay đổi.',
      ko: '연결된 신고 1건이 종료되며 고객의 별점, 내용, 리뷰 공개 상태는 변경되지 않습니다.',
    },
  'Exact review target': {
    en: 'Exact review target',
    vi: 'Đánh giá được xử lý',
    ko: '검수 대상 리뷰',
  },
  'original content stays immutable': {
    en: 'original content stays immutable',
    vi: 'nội dung gốc không thay đổi',
    ko: '원본 내용은 변경되지 않습니다',
  },
  'Decision Reason': {
    en: 'Decision Reason',
    vi: 'Lý do quyết định',
    ko: '결정 사유',
  },
  Required: { en: 'Required', vi: 'Bắt buộc', ko: '필수' },
  'Record the reason for this moderation decision': {
    en: 'Record the reason for this moderation decision',
    vi: 'Ghi lý do cho quyết định kiểm duyệt này',
    ko: '이번 검수 결정의 사유를 기록하세요',
  },
  'Recorded after current-state check': {
    en: 'Recorded after current-state check',
    vi: 'Ghi nhận sau khi kiểm tra trạng thái hiện tại',
    ko: '현재 상태 확인 후 기록',
  },
  'Visibility, report timeline, audit event, rating recalculation, and applicable notification requests update together.':
    {
      en: 'Visibility, report timeline, audit event, rating recalculation, and applicable notification requests update together.',
      vi: 'Trạng thái hiển thị, lịch sử báo cáo, nhật ký kiểm toán, điểm đánh giá và các yêu cầu thông báo liên quan được cập nhật cùng nhau.',
      ko: '공개 상태, 신고 기록, 감사 이벤트, 평균 평점과 해당 알림 요청이 함께 업데이트됩니다.',
    },
  'Go Back': { en: 'Go Back', vi: 'Quay lại', ko: '돌아가기' },
  Confirm: { en: 'Confirm', vi: 'Xác nhận', ko: '확인' },
  'current state': {
    en: 'current state',
    vi: 'trạng thái hiện tại',
    ko: '현재 상태',
  },
  stars: { en: 'stars', vi: 'sao', ko: '점' },
  'public reviews': {
    en: 'public reviews',
    vi: 'đánh giá công khai',
    ko: '공개 리뷰',
  },
  from: { en: 'from', vi: 'từ', ko: '중' },
  'Review visible.': {
    en: 'Review visible.',
    vi: 'Đánh giá đã hiển thị.',
    ko: '리뷰가 공개되었습니다.',
  },
  'Review hidden.': {
    en: 'Review hidden.',
    vi: 'Đánh giá đã được ẩn.',
    ko: '리뷰가 숨겨졌습니다.',
  },
  'Review removed.': {
    en: 'Review removed.',
    vi: 'Đánh giá đã được gỡ.',
    ko: '리뷰가 삭제되었습니다.',
  },
  'The Provider’s public average is now': {
    en: 'The Provider’s public average is now',
    vi: 'Điểm đánh giá công khai của đối tác hiện là',
    ko: '제공자의 공개 평균 평점은 현재',
  },
  'audit and applicable notification requests were recorded.': {
    en: 'audit and applicable notification requests were recorded.',
    vi: 'nhật ký kiểm toán và yêu cầu thông báo liên quan đã được ghi nhận.',
    ko: '감사 기록과 해당 알림 요청이 기록되었습니다.',
  },
  'No public reviews': {
    en: 'No public reviews',
    vi: 'Không có đánh giá công khai',
    ko: '공개 리뷰 없음',
  },
  'Report dismissed after current-state validation. The original review and public visibility were unchanged.':
    {
      en: 'Report dismissed after current-state validation. The original review and public visibility were unchanged.',
      vi: 'Đã bác bỏ một báo cáo sau khi kiểm tra trạng thái. Đánh giá gốc và trạng thái công khai không thay đổi.',
      ko: '현재 상태 확인 후 신고 1건을 기각했습니다. 원본 리뷰와 공개 상태는 변경되지 않았습니다.',
    },
  'This review or its report state changed after the detail opened. Reload before recording a decision.':
    {
      en: 'This review or its report state changed after the detail opened. Reload before recording a decision.',
      vi: 'Đánh giá hoặc báo cáo đã thay đổi sau khi mở chi tiết. Hãy tải lại trước khi ghi quyết định.',
      ko: '상세 화면을 연 뒤 리뷰 또는 신고 상태가 변경되었습니다. 결정 전에 다시 불러오세요.',
    },
  'Reload Details': {
    en: 'Reload Details',
    vi: 'Tải lại chi tiết',
    ko: '상세 새로고침',
  },
  'No reviews match these filters': {
    en: 'No reviews match these filters',
    vi: 'Không có đánh giá phù hợp với bộ lọc',
    ko: '필터와 일치하는 리뷰가 없습니다',
  },
  'Published after booking completion': {
    en: 'Published after booking completion',
    vi: 'Đăng sau khi hoàn tất lịch hẹn',
    ko: '예약 완료 후 게시됨',
  },
  'Report received': {
    en: 'Report received',
    vi: 'Đã nhận báo cáo',
    ko: '신고 접수됨',
  },
  'Review hidden · Ava Morgan · evidence retained': {
    en: 'Review hidden · Ava Morgan · evidence retained',
    vi: 'Đã ẩn đánh giá · Ava Morgan · giữ lại bằng chứng',
    ko: '리뷰 숨김 · Ava Morgan · 증거 보존',
  },
  'Reporter and affected user notification requests recorded': {
    en: 'Reporter and affected user notification requests recorded',
    vi: 'Đã ghi nhận yêu cầu thông báo cho người báo cáo và người liên quan',
    ko: '신고인 및 관련 사용자 알림 요청 기록됨',
  },
  'Review report dismissed · reason audited · reporter notification requested':
    {
      en: 'Review report dismissed · reason audited · reporter notification requested',
      vi: 'Đã bác bỏ báo cáo · ghi nhận lý do · yêu cầu thông báo người báo cáo',
      ko: '리뷰 신고 기각 · 사유 감사 기록 · 신고인 알림 요청',
    },
  'reason audited': {
    en: 'reason audited',
    vi: 'đã ghi nhận lý do',
    ko: '사유 감사 기록',
  },
  For: { en: 'For', vi: 'Cho', ko: '대상:' },
  'Review by': { en: 'Review by', vi: 'Đánh giá của', ko: '리뷰 작성자:' },
  'No reviews match this view': {
    en: 'No reviews match this view',
    vi: 'Không có đánh giá phù hợp',
    ko: '조건에 맞는 리뷰가 없습니다',
  },
  'Clear Filters': { en: 'Clear Filters', vi: 'Xóa bộ lọc', ko: '필터 지우기' },
  'Unable to load reviews': {
    en: 'Unable to load reviews',
    vi: 'Không thể tải đánh giá',
    ko: '리뷰를 불러올 수 없습니다',
  },
  'Try Again': { en: 'Try Again', vi: 'Thử lại', ko: '다시 시도' },
  'Sort by': { en: 'Sort by', vi: 'Sắp xếp', ko: '정렬' },
  'Newest first': { en: 'Newest first', vi: 'Mới nhất trước', ko: '최신 순' },
  'Oldest first': { en: 'Oldest first', vi: 'Cũ nhất trước', ko: '오래된 순' },
  'Highest rating': {
    en: 'Highest rating',
    vi: 'Sao cao nhất',
    ko: '높은 별점 순',
  },
  'Lowest rating': {
    en: 'Lowest rating',
    vi: 'Sao thấp nhất',
    ko: '낮은 별점 순',
  },
  'Moderation decision': {
    en: 'Moderation decision',
    vi: 'Quyết định kiểm duyệt',
    ko: '리뷰 검수 결정',
  },
  'Reason for this decision': {
    en: 'Reason for this decision',
    vi: 'Lý do đưa ra quyết định',
    ko: '결정 사유',
  },
  'Enter a reason for the moderation record': {
    en: 'Enter a reason for the moderation record',
    vi: 'Nhập lý do để lưu vào lịch sử kiểm duyệt',
    ko: '검수 기록에 남길 사유를 입력하세요',
  },
  'A reason is required.': {
    en: 'A reason is required.',
    vi: 'Vui lòng nhập lý do.',
    ko: '사유를 입력하세요.',
  },
  Cancel: { en: 'Cancel', vi: 'Hủy', ko: '취소' },
  'Confirm action': { en: 'Confirm action', vi: 'Xác nhận', ko: '확인' },
  'Review hidden · Ava Morgan': {
    en: 'Review hidden · Ava Morgan',
    vi: 'Đã ẩn đánh giá · Ava Morgan',
    ko: '리뷰 숨김 · Ava Morgan',
  },
  'Review removed · Ava Morgan': {
    en: 'Review removed · Ava Morgan',
    vi: 'Đã gỡ đánh giá · Ava Morgan',
    ko: '리뷰 삭제 · Ava Morgan',
  },
  'Report dismissed · Ava Morgan': {
    en: 'Report dismissed · Ava Morgan',
    vi: 'Đã bác bỏ báo cáo · Ava Morgan',
    ko: '신고 기각 · Ava Morgan',
  },
  'Decision recorded': {
    en: 'Decision recorded',
    vi: 'Đã ghi nhận quyết định',
    ko: '결정이 기록되었습니다',
  },
  'No linked reports': {
    en: 'No linked reports',
    vi: 'Không có báo cáo liên kết',
    ko: '연결된 신고 없음',
  },
  '1 linked report': {
    en: '1 linked report',
    vi: '1 báo cáo liên kết',
    ko: '연결된 신고 1건',
  },
  'Review details': {
    en: 'Review details',
    vi: 'Chi tiết đánh giá',
    ko: '리뷰 상세',
  },
  'Action unavailable for removed reviews.': {
    en: 'Action unavailable for removed reviews.',
    vi: 'Không thể thao tác với đánh giá đã gỡ.',
    ko: '삭제된 리뷰는 처리할 수 없습니다.',
  },
}

export function reviewsT(locale: Locale, source: string): string {
  return (
    translations[source]?.[locale] ||
    extra[source]?.[locale] ||
    dashboardT(locale, source)
  )
}
