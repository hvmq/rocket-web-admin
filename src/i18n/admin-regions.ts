import rows from './admin-regions.json'
import importRows from './admin-region-import.json'
import type { Locale } from './admin-access'

const translations = Object.fromEntries(
  [...rows, ...importRows].map((row) => [row.source, row]),
) as Record<string, { en: string; vi: string; ko: string }>

const additional: Record<string, { en: string; vi: string; ko: string }> = {
  Actions: { en: 'Actions', vi: 'Thao tác', ko: '작업' },
  'Imported regions preview': {
    en: 'Imported regions preview',
    vi: 'Xem trước khu vực trong JSON',
    ko: '가져올 지역 미리보기',
  },
  'Select a parent region': {
    en: 'Select a parent region',
    vi: 'Chọn khu vực cấp trên',
    ko: '상위 지역 선택',
  },
  'No matching regions': {
    en: 'No matching regions',
    vi: 'Không có khu vực phù hợp',
    ko: '일치하는 지역이 없습니다',
  },
  'Try a different name, region ID or full path.': {
    en: 'Try a different name, region ID or full path.',
    vi: 'Thử tìm bằng tên khác, mã khu vực hoặc đường dẫn đầy đủ.',
    ko: '다른 이름, 지역 ID 또는 전체 경로로 검색하세요.',
  },
  'Import JSON or add a region to get started.': {
    en: 'Import JSON or add a region to get started.',
    vi: 'Nhập JSON hoặc thêm khu vực mới để bắt đầu.',
    ko: 'JSON을 가져오거나 지역을 추가하여 시작하세요.',
  },
  Move: { en: 'Move', vi: 'Chuyển', ko: '이동' },
  up: { en: 'up', vi: 'lên', ko: '위로' },
  down: { en: 'down', vi: 'xuống', ko: '아래로' },
  'Sibling order saved. Audit event recorded by Ava Morgan.': {
    en: 'Sibling order saved. Audit event recorded by Ava Morgan.',
    vi: 'Đã lưu thứ tự các khu vực cùng cấp. Ava Morgan đã ghi lại sự kiện kiểm toán.',
    ko: '동일 단계 지역 순서가 저장되었습니다. Ava Morgan의 감사 기록이 생성되었습니다.',
  },
  'saved. Audit event recorded by Ava Morgan.': {
    en: 'saved. Audit event recorded by Ava Morgan.',
    vi: 'đã được lưu. Ava Morgan đã ghi lại sự kiện kiểm toán.',
    ko: '저장되었습니다. Ava Morgan의 감사 기록이 생성되었습니다.',
  },
  'reactivated. Reason and audit event recorded.': {
    en: 'reactivated. Reason and audit event recorded.',
    vi: 'đã được kích hoạt lại. Đã ghi lại lý do và sự kiện kiểm toán.',
    ko: '다시 활성화되었습니다. 사유와 감사 기록이 저장되었습니다.',
  },
  'deactivated. Reason and audit event recorded.': {
    en: 'deactivated. Reason and audit event recorded.',
    vi: 'đã bị vô hiệu hóa. Đã ghi lại lý do và sự kiện kiểm toán.',
    ko: '비활성화되었습니다. 사유와 감사 기록이 저장되었습니다.',
  },
  Reactivate: { en: 'Reactivate', vi: 'Kích hoạt lại', ko: '재활성화' },
  'Reactivate Region?': {
    en: 'Reactivate Region?',
    vi: 'Kích hoạt lại khu vực?',
    ko: '지역을 다시 활성화하시겠습니까?',
  },
  'Confirm Reactivation': {
    en: 'Confirm Reactivation',
    vi: 'Xác nhận kích hoạt lại',
    ko: '재활성화 확인',
  },
  'This region can appear in new choices again.': {
    en: 'This region can appear in new choices again.',
    vi: 'Khu vực này có thể xuất hiện lại trong các lựa chọn mới.',
    ko: '이 지역이 새 선택 항목에 다시 표시됩니다.',
  },
  'Catalogue updated': {
    en: 'Catalogue updated',
    vi: 'Đã cập nhật danh mục',
    ko: '지역 목록이 업데이트되었습니다',
  },
  'Enter a region name.': {
    en: 'Enter a region name.',
    vi: 'Nhập tên khu vực.',
    ko: '지역 이름을 입력하세요.',
  },
  'A country cannot have a parent.': {
    en: 'A country cannot have a parent.',
    vi: 'Quốc gia không thể có khu vực cấp trên.',
    ko: '국가에는 상위 지역을 지정할 수 없습니다.',
  },
  'Choose a compatible active parent for this level.': {
    en: 'Choose a compatible active parent for this level.',
    vi: 'Chọn khu vực cấp trên đang hoạt động và phù hợp với cấp này.',
    ko: '이 단계에 맞는 활성 상위 지역을 선택하세요.',
  },
  'A region cannot be its own parent or descendant.': {
    en: 'A region cannot be its own parent or descendant.',
    vi: 'Khu vực không thể thuộc chính nó hoặc khu vực cấp dưới của nó.',
    ko: '자기 자신이나 하위 지역을 상위 지역으로 지정할 수 없습니다.',
  },
  'A sibling with this name already exists.': {
    en: 'A sibling with this name already exists.',
    vi: 'Đã có khu vực cùng cấp với tên này.',
    ko: '같은 단계에 동일한 이름의 지역이 있습니다.',
  },
  'Enter a positive display order.': {
    en: 'Enter a positive display order.',
    vi: 'Nhập thứ tự hiển thị lớn hơn 0.',
    ko: '양수인 표시 순서를 입력하세요.',
  },
  'Use the Deactivate or Reactivate action to change status with a reason.': {
    en: 'Use the Deactivate or Reactivate action to change status with a reason.',
    vi: 'Dùng thao tác vô hiệu hóa hoặc kích hoạt lại và nhập lý do để đổi trạng thái.',
    ko: '상태를 변경하려면 사유를 입력하고 비활성화 또는 재활성화 작업을 사용하세요.',
  },
  'Reload current data before saving.': {
    en: 'Reload current data before saving.',
    vi: 'Tải lại dữ liệu hiện tại trước khi lưu.',
    ko: '저장하기 전에 최신 데이터를 다시 불러오세요.',
  },
  'Clear Search': { en: 'Clear Search', vi: 'Xóa tìm kiếm', ko: '검색 지우기' },
  'Try Again': { en: 'Try Again', vi: 'Thử lại', ko: '다시 시도' },
}

export function regionsT(locale: Locale, source: string): string {
  return (translations[source] ?? additional[source])?.[locale] ?? source
}
