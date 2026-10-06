Hãy dựa vào đoạn code mẫu bên dưới, bạn hãy convert code đó sang code web này tương ứng. Sau khi code xong thì hiển thị page vừa code, với data như trong code tôi gửi bạn để tôi check xem đã code đúng chưa nhé
Lưu ý:

- Hãy code các components để tái sử dụng cho các màn hình sau
- Web chỉ sử dụng 1 font là Google Sans Flex hãy code để tái sử dụng
- Icons và ảnh phải sử dụng đúng icons và ảnh trong assets, như được đề cập ở trong code mẫu bên dưới
- Chỉ code UI và các tương tác trong cùng màn hình bằng dữ liệu mẫu; không tích hợp backend/API hoặc nghiệp vụ ngoài màn hình khi tôi không yêu cầu
- Thực hiện localization vào source code như thông tin từ code mẫu tôi cung cấp cho bạn
- Hãy code đầy đủ các tương tác UI trong cùng màn hình như khi bấm Play: tab, bộ lọc, sắp xếp, form, dialog, trạng thái rỗng/lỗi. Mọi control trong Play phải thao tác được với dữ liệu mẫu, không thay bằng ảnh chụp hay HTML tĩnh. Các action chuyển sang màn hình khác chỉ cần giữ điểm điều hướng, không cần code màn hình đích.

<!--
Màn hình 169: Account Deletion Requests
Components sử dụng (hàm dựng trong app.js):
- Không dùng component trong thư viện uiComponents; giao diện được tạo bằng HTML trực tiếp.
Thành phần khác:
- HTML: <header>, <nav>, <main>, <section>, <aside>, <form>, <label>, <button>, <input>, <select>, <img>, <svg>.
- CSS: các quy tắc cần cho màn hình được nhúng trong <style> bên dưới (từ styles.css).
- Font: Google Sans Flex qua Google Fonts.
Nguồn ảnh/icon trong thẻ <img>:
- assets\icons\smart house\outline\home.svg
- assets\icons\user\outline\user.svg
- assets\icons\interface\outline\shield-check.svg
- assets\icons\time and date\outline\calendar.svg
- assets\icons\time and date\outline\time-oclock.svg
- assets\icons\notes and task\outline\notes.svg
- assets\icons\education\outline\report.svg
- assets\icons\interface\outline\star.svg
- assets\icons\navigation maps\outline\location.svg
- assets\icons\device\outline\notification.svg
- assets\icons\multimedia and audio\outline\image.svg
- assets\icons\editor\outline\document-text.svg
- assets\icons\interface\outline\setting.svg
- assets\icons\interface\outline\trash.svg
- assets\icons\device\outline\lock.svg
- assets\icons\interface\outline\logout.svg
- assets\icons\interface\outline\search 01.svg
Bản dịch chuỗi giao diện (JSON từ i18n.js; vi = Việt, en = Anh, ko = Hàn):
[
  {"source":"Account Deletion Requests","vi":"Hàng chờ yêu cầu xóa tài khoản","en":"Account Deletion Requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"Rocket","vi":"Rocket","en":"Rocket","ko":"Rocket"},
  {"source":"Administration","vi":"Quản trị hệ thống","en":"Administration","ko":"시스템 관리"},
  {"source":"Dashboard","vi":"Bảng điều khiển","en":"Dashboard","ko":"대시보드"},
  {"source":"Users","vi":"Người dùng","en":"Users","ko":"사용자 관리"},
  {"source":"Provider Verification","vi":"Xét duyệt hồ sơ đối tác","en":"Provider Verification","ko":"제공자 입점 및 프로필 심사"},
  {"source":"Appointments","vi":"Lịch hẹn","en":"Appointments","ko":"예약"},
  {"source":"No-Show Cases","vi":"Không-hiển thị Cases","en":"No-Show Cases","ko":"없음-표시 Cases"},
  {"source":"Complaints","vi":"Khiếu nại","en":"Complaints","ko":"불만"},
  {"source":"Reports","vi":"Lượt báo cáo","en":"Reports","ko":"신고 접수 건수"},
  {"source":"Reviews","vi":"Đánh giá","en":"Reviews","ko":"리뷰"},
  {"source":"Regions","vi":"Regions","en":"Regions","ko":"Regions"},
  {"source":"Notifications","vi":"Thông báo","en":"Notifications","ko":"알림"},
  {"source":"Banners","vi":"Banners","en":"Banners","ko":"Banners"},
  {"source":"Audit Log","vi":"Nhật ký kiểm toán hệ thống","en":"Audit Log","ko":"시스템 감사 로그"},
  {"source":"App Update","vi":"App Update","en":"App Update","ko":"App Update"},
  {"source":"Deletion Requests","vi":"Yêu cầu xóa tài khoản","en":"Deletion Requests","ko":"계정 탈퇴 요청"},
  {"source":"Admin Accounts","vi":"Admin Accounts","en":"Admin Accounts","ko":"Admin Accounts"},
  {"source":"AM","vi":"AM","en":"AM","ko":"AM"},
  {"source":"Ava Morgan","vi":"Ava Morgan","en":"Ava Morgan","ko":"Ava Morgan"},
  {"source":"Owner","vi":"Chủ sở hữu","en":"Owner","ko":"소유자"},
  {"source":"Change Password","vi":"Đổi mật khẩu","en":"Change Password","ko":"비밀번호 변경"},
  {"source":"Sign Out","vi":"Đăng xuất","en":"Sign Out","ko":"로그아웃"},
  {"source":"Account deletion requests","vi":"Yêu cầu xóa tài khoản","en":"Account deletion requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"3 requests in this view","vi":"3 yêu cầu trong chế độ xem này","en":"3 requests in this view","ko":"현재 화면에 3건의 요청 표시 중"},
  {"source":"Status","vi":"Trạng thái","en":"Status","ko":"상태"},
  {"source":"All statuses","vi":"Tất cả trạng thái","en":"All statuses","ko":"전체 상태"},
  {"source":"Received · policy review required","vi":"Đã nhận · chính sách đánh giá bắt buộc","en":"Received · policy review required","ko":"수신됨 · 정책 검토 필수"},
  {"source":"Requested","vi":"Thời điểm yêu cầu","en":"Requested","ko":"취소 요청 일시"},
  {"source":"Any time","vi":"Mọi thời điểm","en":"Any time","ko":"전체 기간"},
  {"source":"Today","vi":"Hôm nay","en":"Today","ko":"오늘"},
  {"source":"Last 7 days","vi":"7 ngày qua","en":"Last 7 days","ko":"최근 7일"},
  {"source":"Last 30 days","vi":"30 ngày qua","en":"Last 30 days","ko":"최근 30일"},
  {"source":"Reference","vi":"Mã tham chiếu","en":"Reference","ko":"참조 번호"},
  {"source":"Requester","vi":"Người yêu cầu hủy","en":"Requester","ko":"취소 요청자"},
  {"source":"DEL-1024","vi":"DEL-1024","en":"DEL-1024","ko":"DEL-1024"},
  {"source":"Jamie Rivera","vi":"Jamie Rivera","en":"Jamie Rivera","ko":"Jamie Rivera"},
  {"source":"Customer · Active","vi":"Khách hàng · đang hoạt động","en":"Customer · Active","ko":"고객 · 활성"},
  {"source":"Sep 24, 2026 · 18:12 ICT","vi":"Sep 24, 2026 · 18:12 ICT","en":"Sep 24, 2026 · 18:12 ICT","ko":"Sep 24, 2026 · 18:12 ICT"},
  {"source":"View Request","vi":"Xem yêu cầu","en":"View Request","ko":"요청 상세 보기"},
  {"source":"DEL-1023","vi":"DEL-1023","en":"DEL-1023","ko":"DEL-1023"},
  {"source":"Lotus Wellness","vi":"Lotus Wellness","en":"Lotus Wellness","ko":"Lotus Wellness"},
  {"source":"Service Provider · Active","vi":"Dịch vụ nhà cung cấp · đang hoạt động","en":"Service Provider · Active","ko":"서비스 제공자 · 활성"},
  {"source":"Sep 18, 2026 · 09:30 ICT","vi":"Sep 18, 2026 · 09:30 ICT","en":"Sep 18, 2026 · 09:30 ICT","ko":"Sep 18, 2026 · 09:30 ICT"},
  {"source":"Page 1 of 2 · 3 matching requests","vi":"Page 1 của 2 · 3 matching yêu cầu","en":"Page 1 of 2 · 3 matching requests","ko":"Page 1 의 2 · 3 matching 요청"},
  {"source":"Previous","vi":"Trang trước","en":"Previous","ko":"이전"},
  {"source":"Next","vi":"Trang sau","en":"Next","ko":"다음"},
  {"source":"Rocket logo","vi":"Logo Rocket","en":"Rocket logo","ko":"Rocket 로고"},
  {"source":"Admin navigation","vi":"Điều hướng Quản trị","en":"Admin navigation","ko":"관리자 메뉴 탐색"},
  {"source":"Search deletion requests","vi":"Tìm kiếm yêu cầu xóa tài khoản","en":"Search deletion requests","ko":"탈퇴 요청 검색"},
  {"source":"Search reference or requester","vi":"Tìm theo mã yêu cầu hoặc người yêu cầu","en":"Search reference or requester","ko":"요청 번호 또는 신청자 검색"},
  {"source":"Request pages","vi":"Phân trang yêu cầu","en":"Request pages","ko":"요청 목록 페이지"}
]
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Account Deletion Requests — Rocket</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
  <style>:root { --canvas: #faf7f2; --surface: #fff; --text-primary: #181818; --text-secondary: #605a56; --text-muted: #776f6a; --text-inverse: #fff; --selection-strong: #181818; --accent-pink: #fec8cd; --accent-apricot: #ffc19e; --rating-star: #e3a008; --rating-star-filter: brightness(0) saturate(100%) invert(60%) sepia(97%) saturate(1067%) hue-rotate(4deg) brightness(97%) contrast(94%); --gradient-start: #fef0ed; --gradient-warm: #fae4d9; --gradient-peach: #f7d0bf; --gradient-rose: #f9dae4; --border-subtle: #e8e2dc; --border-control: #776f6a; --disabled-surface: #eeeae5; --error: #a3293d; --error-surface: #fbeaec; --success: #25654f; --success-surface: #eaf4ee; --editor-line: #e5e7eb; --editor-bg: #eeeeec; --editor-panel: #fff; --editor-blue: #5551ff; --font-display: "Google Sans Flex"; --font-ui: "Google Sans Flex"; --motion-press: .12s; --motion-selection: .18s; --motion-surface: .22s; --motion-route: .26s; --motion-easing: cubic-bezier(.2, 0, 0, 1); --topbar-height: 52px; --left-sidebar-width: 224px; --right-sidebar-width: 276px; }
* { box-sizing: border-box; }
html, body { width: 100%; height: 100%; margin: 0px; overflow: hidden; }
body { color: var(--text-primary); font-family: var(--font-ui); background: var(--editor-bg); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; }
button { color: inherit; }
.huge-icon { object-fit: contain; object-position: center center; vertical-align: middle; flex: 0 0 auto; width: 24px; height: 24px; display: inline-block; }
button:focus-visible, input:focus-visible, [tabindex]:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 3px; }
.brand-mark { background: var(--text-primary); color: var(--accent-pink); border-radius: 10px; flex: 0 0 auto; place-items: center; display: inline-grid; }
.brand-mark--small { width: 30px; height: 30px; padding: 5px; }
.brand-mark svg { fill: currentcolor; width: 100%; height: 100%; }
.brand-mark .brand-mark__cut { fill: var(--text-primary); }
.brand-mark .brand-mark__dot { fill: var(--surface); }
.primary-button:active:not(:disabled), .secondary-button:active:not(:disabled), .app-icon-button:active { opacity: 0.92; transform: scale(0.98); }
@keyframes screen-enter { 
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0px); }
}
@media (width <= 980px) {:root { --left-sidebar-width: 190px; --right-sidebar-width: 0px; }}
@media (width <= 680px) {:root { --left-sidebar-width: 0px; }}
.admin-deletion-heading { justify-content: space-between; align-items: center; gap: 18px; padding: 18px 20px 14px; display: flex; }
.admin-deletion-heading h2 { font: 600 20px/1.3 var(--font-ui); color: var(--admin-ink); margin: 0px; }
.admin-deletion-heading > span { color: var(--admin-ashen); font-size: 12px; }
.admin-deletion-filter .admin-search-field { flex: 1 1 250px; }
.admin-five-table-panel .admin-deletion-table { overflow-x: auto; }
.admin-deletion-table > div { grid-template-columns: 0.7fr 1.1fr 1.2fr 1.35fr 85px; }
.admin-deletion-table > div > * { overflow-wrap: anywhere; min-width: 0px; }
.admin-deletion-pagination { color: var(--admin-ashen); justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; display: flex; }
.admin-deletion-pagination > div { gap: 8px; display: flex; }
.admin-deletion-pagination button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-screen { --font-display: var(--font-ui); --admin-canvas: #f8fafc; --admin-paper: #fff; --admin-stone: #f1f5f9; --admin-ink: #0f172a; --admin-graphite: #334155; --admin-ashen: #64748b; --admin-pebble: #94a3b8; --admin-mist: #cbd5e1; --admin-chalk: #e2e8f0; --admin-clay: #ea580c; --admin-shadow-sm: 0 1px 2px 0 #0000000a; --admin-shadow: 0 1px 3px 0 #0000000f, 0 1px 2px -1px #0000000a; --admin-shadow-md: 0 4px 6px -1px #00000012, 0 2px 4px -2px #0000000d; --admin-shadow-lg: 0 10px 15px -3px #00000014, 0 4px 6px -4px #0000000a; --admin-shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000000f; background: var(--admin-canvas); width: 1440px; height: 960px; color: var(--admin-graphite); font: 400 13px/1.5 var(--font-ui); -webkit-font-smoothing: antialiased; grid-template-columns: 244px minmax(0px, 1fr); display: grid; position: relative; overflow: hidden; }
.admin-five-screen .admin-content { padding-bottom: 32px; }
.admin-five-layout { grid-template-columns: minmax(0px, 1fr) 340px; align-items: start; gap: 20px; display: grid; }
.admin-five-screen--detail .admin-five-layout { display: block; }
.admin-five-layout > :only-child { grid-column: 1 / -1; }
.admin-five-stack { gap: 18px; min-width: 0px; display: grid; }
.admin-five-table-panel { min-width: 0px; }
.admin-four-sibling button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); }
.admin-screen button, .admin-screen input, .admin-screen select, .admin-screen textarea { font: inherit; }
.admin-screen .huge-icon { flex-shrink: 0; width: 18px; height: 18px; }
.admin-sidebar { border-right: 1px solid var(--admin-chalk); background: var(--admin-paper); flex-direction: column; min-width: 0px; min-height: 0px; padding: 24px 16px 20px; display: flex; overflow-y: auto; }
.admin-brand { align-items: center; gap: 12px; padding: 0px 8px; display: flex; }
.admin-brand .brand-mark { background: var(--admin-ink); width: 36px; height: 36px; color: var(--admin-clay); box-shadow: var(--admin-shadow-sm); border-radius: 10px; padding: 7px; }
.admin-brand .brand-mark__cut { fill: var(--admin-ink); }
.admin-brand strong, .admin-brand small { display: block; }
.admin-brand strong { color: var(--admin-ink); font-family: var(--font-ui); letter-spacing: -0.02em; font-size: 18px; font-weight: 700; line-height: 1.1; }
.admin-brand small { color: var(--admin-ashen); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; font-size: 10px; font-weight: 600; }
.admin-nav { gap: 4px; margin-top: 26px; display: grid; }
.admin-nav-item { width: 100%; min-height: 38px; color: var(--admin-graphite); text-align: left; cursor: pointer; background: 0px 0px; border: 0px; border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr) auto; align-items: center; gap: 10px; padding: 0px 10px; font-size: 12px; font-weight: 500; transition: 0.15s; display: grid; }
.admin-nav-item:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-nav-item.is-active { color: var(--admin-clay); background: rgba(234, 88, 12, 0.08); font-weight: 600; }
.admin-nav-item__icon { place-items: center; width: 20px; height: 20px; display: grid; }
.admin-nav-item small { background: var(--admin-stone); min-width: 20px; color: var(--admin-graphite); text-align: center; border-radius: 9999px; padding: 1px 6px; font-size: 10px; font-weight: 600; }
.admin-sidebar__footer { border-top: 1px solid var(--admin-chalk); margin-top: auto; padding-top: 16px; }
.admin-identity { background: var(--admin-stone); border-radius: 10px; align-items: center; gap: 10px; margin-bottom: 8px; padding: 8px 10px; display: flex; }
.admin-identity > span { background: var(--admin-ink); color: rgb(255, 255, 255); border-radius: 50%; flex: 0 0 auto; place-items: center; width: 32px; height: 32px; font-size: 11px; font-weight: 700; display: grid; }
.admin-identity strong, .admin-identity small { display: block; }
.admin-identity strong { color: var(--admin-ink); font-size: 12px; font-weight: 600; }
.admin-identity small { color: var(--admin-ashen); font-size: 11px; }
.admin-sidebar-action { width: 100%; height: 34px; color: var(--admin-graphite); cursor: pointer; background: 0px 0px; border: 0px; border-radius: 6px; align-items: center; gap: 8px; padding: 0px 10px; font-size: 12px; transition: 0.15s; display: flex; }
.admin-sidebar-action:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-main { background: var(--admin-canvas); grid-template-rows: auto minmax(0px, 1fr); min-width: 0px; min-height: 0px; display: grid; }
.admin-topbar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); justify-content: space-between; align-items: center; gap: 24px; min-height: 72px; padding: 16px 32px; display: flex; }
.admin-topbar h1 { font-family: var(--font-ui); letter-spacing: -0.02em; color: var(--admin-ink); margin: 0px; font-size: 22px; font-weight: 700; line-height: 1.25; }
.admin-topbar__actions { align-items: center; gap: 10px; min-height: 40px; display: flex; }
.admin-content { scrollbar-color: var(--admin-mist) transparent; scrollbar-width: thin; min-width: 0px; min-height: 0px; padding: 24px 32px 32px; position: relative; overflow: auto; }
.admin-primary-button, .admin-secondary-button, .admin-text-button, .admin-icon-action { cursor: pointer; border-radius: 8px; min-height: 38px; font-size: 13px; font-weight: 550; transition: 0.15s; }
.admin-primary-button:hover:not(:disabled) { box-shadow: var(--admin-shadow); background: rgb(30, 41, 59); border-color: rgb(30, 41, 59); }
.admin-primary-button:disabled, .admin-secondary-button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-secondary-button { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-graphite); box-shadow: var(--admin-shadow-sm); padding: 0px 15px; }
.admin-secondary-button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); border-color: var(--admin-pebble); }
.admin-field input, .admin-field textarea, .admin-compact-field select, .admin-filter-bar select, .admin-search-field input { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-ink); border-radius: 8px; font-size: 13px; }
.admin-field input::placeholder, .admin-field textarea::placeholder, .admin-search-field input::placeholder { color: var(--admin-pebble); }
.admin-status { background: var(--admin-stone); border: 1px solid var(--admin-chalk); width: max-content; max-width: 100%; color: var(--admin-graphite); white-space: nowrap; border-radius: 9999px; align-items: center; gap: 6px; padding: 3px 9px; font-size: 11px; font-weight: 600; display: inline-flex; }
.admin-status > span { background: var(--admin-pebble); border-radius: 50%; flex: 0 0 auto; width: 6px; height: 6px; }
.admin-status--attention, .admin-status--pending, .admin-status--pending-review { color: rgb(146, 64, 14); background: rgb(255, 251, 235); border-color: rgb(253, 230, 138); }
.admin-status--attention > span, .admin-status--pending > span, .admin-status--pending-review > span { background: rgb(245, 158, 11); }
.admin-table-panel { border: 1px solid var(--admin-chalk); background: var(--admin-paper); box-shadow: var(--admin-shadow); border-radius: 12px; overflow: hidden; }
.admin-filter-bar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); align-items: flex-end; gap: 12px; min-height: 68px; padding: 14px 18px; display: flex; }
.admin-filter-bar > label:not(.admin-search-field) { color: var(--admin-ashen); letter-spacing: 0.04em; text-transform: uppercase; gap: 4px; font-size: 11px; font-weight: 600; display: grid; }
.admin-filter-bar select { border: 1px solid var(--admin-mist); background: var(--admin-paper); min-width: 140px; height: 38px; color: var(--admin-ink); border-radius: 8px; padding: 0px 28px 0px 10px; font-size: 13px; }
.admin-search-field { border: 1px solid var(--admin-mist); background: var(--admin-paper); border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr); align-items: center; gap: 8px; min-width: 240px; height: 38px; padding: 0px 12px; transition: 0.15s; display: grid; }
.admin-search-field input { min-width: 0px; height: 34px; color: var(--admin-ink); border: 0px; outline: 0px; padding: 0px; font-size: 13px; }
.admin-data-table { min-width: 0px; }
.admin-data-table > div { border-top: 1px solid var(--admin-stone); min-height: 56px; color: var(--admin-graphite); align-items: center; gap: 12px; padding: 0px 18px; font-size: 13px; transition: background 0.12s; display: grid; }
.admin-data-table > div:first-child { border-top: 0px; }
.admin-data-table > div:not(.admin-data-table__head):hover { background: var(--admin-stone); }
.admin-data-table__head { letter-spacing: 0.05em; text-transform: uppercase; font-weight: 600; background: var(--admin-stone) !important; min-height: 42px !important; color: var(--admin-ashen) !important; border-bottom: 1px solid var(--admin-chalk) !important; font-size: 11px !important; }
.admin-data-table strong, .admin-data-table small { display: block; }
.admin-data-table strong { color: var(--admin-ink); font-size: 13px; font-weight: 600; }
.admin-data-table small { color: var(--admin-ashen); margin-top: 2px; font-size: 11px; }
.admin-data-table > div > button { color: rgb(37, 99, 235); text-underline-offset: 2px; cursor: pointer; text-align: right; background: 0px 0px; border: 0px; padding: 0px; font-size: 12px; font-weight: 600; text-decoration: underline; transition: color 0.15s; }
.admin-data-table > div > button:hover { color: rgb(29, 78, 216); }
@keyframes admin-skeleton { 
  0% { opacity: 0.55; }
  100% { opacity: 1; }
}
.admin-provider-gallery button:hover:not(:disabled) { border-color: var(--admin-mist); box-shadow: var(--admin-shadow); }
@media (prefers-reduced-motion: reduce) {*, ::before, ::after { scroll-behavior: auto !important; transition-duration: 1ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important; }}
.admin-screen h1, .admin-screen h2, .admin-screen h3, .admin-screen .admin-brand strong, .admin-screen .admin-nav-item.is-active { font-weight: 600; }
    html, body { width: 100%; height: auto; min-height: 100%; overflow: auto; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  </style>
</head>
<body>
<div class="admin-screen admin-five-screen admin-five-screen--detail admin-five-deletion-screen">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark brand-mark--small" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img" aria-label="Rocket logo">
      <path d="M24 5c8.3 3.6 13 10.1 13 18.1C37 32 31.9 39.5 24 43c-7.9-3.5-13-11-13-19.9C11 15.1 15.7 8.6 24 5Z"></path>
      <path class="brand-mark__cut" d="M24 13.3c3.8 3.1 5.8 6.6 5.8 10.5 0 4.4-2.2 8.2-5.8 11.1-3.6-2.9-5.8-6.7-5.8-11.1 0-3.9 2-7.4 5.8-10.5Z"></path>
      <circle class="brand-mark__dot" cx="24" cy="22" r="3.2"></circle>
    </svg></span>
            <div><strong>Rocket</strong><small>Administration</small></div>
          </div>
          <nav class="admin-nav" aria-label="Admin navigation">
            
      <button class="admin-nav-item" type="button" data-admin-route="admin-dashboard">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\smart house\outline\home.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Dashboard</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-users">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\user\outline\user.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Users</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-provider-verification">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Provider Verification</span>
        <small>23</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-appointments">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\calendar.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Appointments</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-no-show">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\time-oclock.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>No-Show Cases</span>
        <small>5</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-complaints">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\notes and task\outline\notes.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Complaints</span>
        <small>14</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reports">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\education\outline\report.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reports</span>
        <small>4</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reviews">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\star.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reviews</span>
        <small>3</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-regions">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\navigation maps\outline\location.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Regions</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-notifications">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\device\outline\notification.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Notifications</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-banners">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\multimedia and audio\outline\image.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Banners</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-audit">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\editor\outline\document-text.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Audit Log</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-app-config">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\setting.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>App Update</span>
        
      </button>
      <button class="admin-nav-item is-active" type="button" data-admin-route="admin-deletion-requests">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\trash.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Deletion Requests</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-team">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Admin Accounts</span>
        
      </button>
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-identity">
              <span>AM</span>
              <div><strong>Ava Morgan</strong><small>Owner</small></div>
            </div>
            <button class="admin-sidebar-action" type="button" data-admin-change-password=""><img class="huge-icon" src="assets\icons\device\outline\lock.svg" alt="" aria-hidden="true" decoding="async"><span>Change Password</span></button>
            <button class="admin-sidebar-action" type="button" data-admin-sign-out=""><img class="huge-icon" src="assets\icons\interface\outline\logout.svg" alt="" aria-hidden="true" decoding="async"><span>Sign Out</span></button>
          </div>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar">
            <div>
              <h1>Account Deletion Requests</h1>
            </div>
            <div class="admin-topbar__actions"></div>
          </header>
          <div class="admin-content"><div class="admin-five-layout"><div class="admin-five-stack"><section class="admin-table-panel admin-five-table-panel"><div class="admin-deletion-heading"><div><h2>Account deletion requests</h2></div><span>3 requests in this view</span></div>
      <form class="admin-filter-bar admin-deletion-filter"><label class="admin-search-field"><img class="huge-icon" src="assets\icons\interface\outline\search 01.svg" alt="" aria-hidden="true" decoding="async"><input id="deletion-search" type="search" value="" placeholder="Search reference or requester" aria-label="Search deletion requests"></label><label><span>Status</span><select id="deletion-status"><option value="all">All statuses</option><option value="Received · policy review required">Received · policy review required</option></select></label><label><span>Requested</span><select id="deletion-date"><option value="all">Any time</option><option value="today">Today</option><option value="7-days">Last 7 days</option><option value="30-days">Last 30 days</option></select></label></form>
      <div class="admin-data-table admin-deletion-table" role="table" aria-label="Account deletion requests"><div class="admin-data-table__head" role="row"><span>Reference</span><span>Requester</span><span>Requested</span><span>Status</span><span></span></div><div role="row" class=""><strong>DEL-1024</strong><div><strong>Jamie Rivera</strong><small>Customer · Active</small></div><span>Sep 24, 2026 · 18:12 ICT</span><span><span class="admin-status admin-status--attention admin-status--received-·-policy-review-required"><span></span>Received · policy review required</span></span><button type="button" data-five-view-deletion="DEL-1024">View Request</button></div><div role="row" class=""><strong>DEL-1023</strong><div><strong>Lotus Wellness</strong><small>Service Provider · Active</small></div><span>Sep 18, 2026 · 09:30 ICT</span><span><span class="admin-status admin-status--attention admin-status--received-·-policy-review-required"><span></span>Received · policy review required</span></span><button type="button" data-five-view-deletion="DEL-1023">View Request</button></div></div></section><nav class="admin-deletion-pagination" aria-label="Request pages"><span>Page 1 of 2 · 3 matching requests</span><div><button class="admin-secondary-button" type="button" data-five-deletion-page="0" disabled="">Previous</button><button class="admin-secondary-button" type="button" data-five-deletion-page="2">Next</button></div></nav></div></div></div>
        </main>
        
        
      </div>
</body>
</html>

## Mã tham chiếu cho các action trong màn hình 169: Account Deletion Requests
Các hàm dưới đây là mã nguồn dựng UI và xử lý sự kiện của chính màn hình. Những nhánh gọi navigateTo(...) hoặc dùng data-admin-route chuyển sang màn hình khác nằm ngoài phạm vi page này. Các action cập nhật state và render lại vẫn thuộc page này.

Trạng thái dữ liệu mẫu ban đầu:
```json
{}
```

Mã nguồn tham chiếu:
```javascript
function Do(e){return e.adminChangePasswordOpen?`
      <div class="admin-modal-backdrop">
        <section class="admin-dialog admin-change-password-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-change-password-title">
          <span class="admin-dialog__icon">${l.lock}</span>
          <h2 id="admin-change-password-title">Change Password</h2>
          ${e.adminChangePasswordSuccess?`
            <p class="admin-change-password-success" role="status">Password updated. Use your new password the next time you sign in.</p>
            <div class="admin-dialog__actions"><button class="admin-primary-button" type="button" data-admin-close-change-password>Done</button></div>
          `:`
            <p>Enter your current password and choose a new one.</p>
            <form id="admin-change-password-form" class="admin-change-password-form" novalidate>
              <label class="admin-field"><span>Current Password</span><input id="admin-current-password" name="currentPassword" type="password" autocomplete="current-password" required /></label>
              <label class="admin-field"><span>New Password</span><input id="admin-new-password" name="newPassword" type="password" autocomplete="new-password" minlength="8" required /></label>
              <label class="admin-field"><span>Confirm New Password</span><input id="admin-confirm-password" name="confirmPassword" type="password" autocomplete="new-password" required /></label>
              <p class="admin-dialog-error" id="admin-change-password-error" role="alert" hidden></p>
              <div class="admin-dialog__actions"><button class="admin-secondary-button" type="button" data-admin-close-change-password>Cancel</button><button class="admin-primary-button" type="submit">Save Password</button></div>
            </form>
          `}
        </section>
      </div>`:""}

function ee(e,{active:t,title:n,actions:i="",content:o="",overlay:r="",className:d=""}){var p,u;return`
      <div class="admin-screen ${a(d)}">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark brand-mark--small" aria-hidden="true">${Ve}</span>
            <div><strong>Rocket</strong><small>Administration</small></div>
          </div>
          <nav class="admin-nav" aria-label="Admin navigation">
            ${kp.filter(h=>Mt(e,h.target)).map(h=>Bp(h,t)).join("")}
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-identity">
              <span>${a((((p=De(e))==null?void 0:p.name)||"Admin").split(/\s+/).map(h=>h[0]).slice(0,2).join("").toUpperCase())}</span>
              <div><strong>${a(((u=De(e))==null?void 0:u.name)||"Admin")}</strong><small>${a(Gn(De(e)))}</small></div>
            </div>
            <button class="admin-sidebar-action" type="button" data-admin-change-password>${l.lock}<span>Change Password</span></button>
            <button class="admin-sidebar-action" type="button" data-admin-sign-out>${l.logout}<span>Sign Out</span></button>
          </div>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar">
            <div>
              <h1>${a(n)}</h1>
            </div>
            <div class="admin-topbar__actions">${i}</div>
          </header>
          <div class="admin-content">${o}</div>
        </main>
        ${r}
        ${Do(e)}
      </div>`}

function ne(){var e,t,n,i;c.querySelectorAll("form.admin-filter-bar").forEach(o=>{o.addEventListener("submit",r=>{r.preventDefault(),b()})}),c.querySelectorAll("[data-admin-route]").forEach(o=>{o.addEventListener("click",()=>{const r=s.session;r.adminEvidenceViewer="";const d=o.dataset.adminRouteFilter;d&&o.dataset.adminRoute==="admin-users"&&(r.adminUserSearch="",r.adminUserRole="Customer",r.adminUserStatus=d,r.adminUserRegion="all",r.selectedAdminUserId=""),d&&o.dataset.adminRoute==="admin-appointments"&&(r.adminAppointmentSearch="",r.adminAppointmentStatus=d,r.adminAppointmentProviderType="all",r.adminAppointmentRegion="all",r.adminAppointmentDate=r.adminDateRange,r.selectedAdminAppointmentId=""),d&&o.dataset.adminRoute==="admin-complaints"&&(r.adminComplaintTab=d,r.adminComplaintStatus="all",r.selectedAdminComplaintId=""),d&&o.dataset.adminRoute==="admin-provider-verification"&&(r.adminProviderTab=d,r.adminProviderSearch="",r.adminProviderType="all",r.adminProviderRegion="all",r.adminProviderDate="30-days",r.selectedAdminSubmissionId=""),d&&o.dataset.adminRoute==="admin-no-show"&&(r.adminNoShowTab=d,r.adminNoShowSearch="",r.adminNoShowStatus="all",r.adminNoShowDate="30-days",r.selectedAdminNoShowId=""),v(o.dataset.adminRoute)})}),c.querySelectorAll("[data-admin-case-booking]").forEach(o=>{o.addEventListener("click",()=>{const r=s.session,d=o.dataset.adminCaseBooking;r.adminAppointments.some(p=>p.id===d)&&(r.selectedAdminAppointmentId=d,r.adminAppointmentSearch="",r.adminAppointmentStatus="all",r.adminAppointmentDate="30-days",r.adminAppointmentProviderType="all",r.adminAppointmentRegion="all",v("admin-appointments"))})}),c.querySelectorAll("[data-admin-disabled-nav]").forEach(o=>{o.addEventListener("click",()=>{o.blur()})}),(e=c.querySelector("[data-admin-change-password]"))==null||e.addEventListener("click",()=>{const o=s.session;o.adminChangePasswordOpen=!0,o.adminChangePasswordSuccess=!1,b({focusSelector:"#admin-current-password"})}),(t=c.querySelector("[data-admin-close-change-password]"))==null||t.addEventListener("click",()=>{const o=s.session;o.adminChangePasswordOpen=!1,o.adminChangePasswordSuccess=!1,b({focusSelector:"[data-admin-change-password]"})}),(n=c.querySelector("#admin-change-password-form"))==null||n.addEventListener("submit",o=>{var f;o.preventDefault();const r=o.currentTarget,d=r.elements.currentPassword.value,p=r.elements.newPassword.value,u=r.elements.confirmPassword.value,h=r.querySelector("#admin-change-password-error");let m="",w=null;if(d!==((f=De(s.session))==null?void 0:f.password)?(m="Current password is incorrect.",w=r.elements.currentPassword):p.length<8?(m="Use at least 8 characters for the new password.",w=r.elements.newPassword):p===d?(m="Choose a password different from your current password.",w=r.elements.newPassword):p!==u&&(m="New passwords do not match.",w=r.elements.confirmPassword),m){h.textContent=m,h.hidden=!1,w.focus();return}De(s.session).password=p,s.session.adminPassword="",s.session.adminChangePasswordSuccess=!0,b({focusSelector:"[data-admin-close-change-password]"})}),(i=c.querySelector("[data-admin-sign-out]"))==null||i.addEventListener("click",()=>{s.startScreen="admin-access",s.history=[],s.session=on(),s.session.adminAccountId=null,v("admin-access",{replace:!0})}),c.querySelectorAll("[data-admin-evidence]").forEach(o=>{o.addEventListener("click",()=>{s.session.adminEvidenceViewer=o.dataset.adminEvidence,b()})}),c.querySelectorAll("[data-admin-close-evidence]").forEach(o=>{o.addEventListener("click",()=>{s.session.adminEvidenceViewer="",b()})})}

function O(e,t="neutral"){const n=String(e||"").toLowerCase().replaceAll(" ","-");return`<span class="admin-status admin-status--${a(t)} admin-status--${a(n)}"><span></span>${a(e)}</span>`}

function rn(e,t){if(t!=="7-days")return!0;const n=String(e||"").match(/Sep\s+(\d{1,2})/i);return!!(n&&Number(n[1])>=19&&Number(n[1])<=25)}

function et(e){return`<ol class="admin-case-timeline">${e.map((t,n)=>`<li><span></span><div><strong>${a(t)}</strong><small>${n?"Recorded in case history":"Latest activity"}</small></div></li>`).join("")}</ol>`}

function Xn(e,t=!1){return e.length?`<div class="admin-evidence-list">${e.map(n=>`<button type="button" ${t?"data-admin-disabled-nav":`data-admin-evidence="${a(n)}"`}>${l.image}<span><strong>${a(n.split(" · ")[0])}</strong><small>${a(n.split(" · ").slice(1).join(" · ")||"Access checked when opened")}</small></span>${t?O("Restricted","attention"):l.arrow}</button>`).join("")}</div>`:`<div class="admin-evidence-empty">${l.image}<span>No evidence was submitted.</span></div>`}

function zn(e){if(!e.adminEvidenceViewer)return"";const[t,...n]=e.adminEvidenceViewer.split(" · ");return`<div class="admin-modal-backdrop"><section class="admin-evidence-viewer" role="dialog" aria-modal="true" aria-labelledby="admin-evidence-title"><header><div><h2 id="admin-evidence-title">${a(t)}</h2><p>${a(n.join(" · ")||"Restricted case evidence")}</p></div><button type="button" data-admin-close-evidence aria-label="Close evidence viewer">${l.close}</button></header><div class="admin-evidence-preview">${l.image}<strong>Evidence preview</strong></div><footer><span>${l.shield}<small>Read-only · access is checked again for every open request</small></span><button class="admin-secondary-button" type="button" data-admin-close-evidence>Close Viewer</button></footer></section></div>`}

function tt(e,t){return`<div class="admin-inline-alert"><span>${l.alert}</span><div><strong>Record changed</strong><p>${a(e)}</p></div><button type="button" ${t}>Reload Details</button></div>`}

function sn(e){return e?`<button class="admin-secondary-button" type="button" data-admin-case-booking="${a(e)}">View Booking ${a(e)}</button>`:""}

function Ie(e,t,n={}){const i=a(t),o=n.action||"";if(e==="loading")return`<section class="admin-five-state" aria-busy="true" aria-label="Loading ${i}"><div class="admin-five-skeleton"><span></span><span></span><span></span><span></span></div><p>Loading ${i}…</p></section>`;const r={"no-results":[l.search,"No Results Found",`No matching items in ${i}. Your filters are preserved.`,"Clear Filters"],empty:[l.document,"Nothing in This Queue",`There is no work in ${i} to review right now.`,""],"load-error":[l.alert,"Unable to Load",`We couldn't load ${i}. No count or result has been verified.`,"Try Again"],"save-error":[l.alert,"Unable to Save",`Changes in ${i} were not saved. Safe form text remains available to retry.`,"Try Again"],permission:[l.shieldWarning,"Action Unavailable",`Your access to ${i} changed. Restricted details and actions have been removed.`,"Back to Dashboard"],conflict:[l.alert,"This Item Has Changed",`Another Admin changed this ${i}. Your decision was not applied. Review the current status and update time before confirming again.`,"Reload Details"]},[d,p,u,h]=r[e]||r["load-error"];return`<section class="admin-five-state admin-five-state--${e}" role="status">${d}<div><p class="admin-kicker">${i}</p><h2>${p}</h2><p>${u}</p>${e==="no-results"&&n.filters?`<small>Active filters: ${a(n.filters)}</small>`:""}${e==="conflict"?`<small>Current status: ${a(n.status||"Check latest record")} · Updated: ${a(n.updated||"Reload required")}</small>`:""}${h&&o?`<button class="admin-secondary-button" type="button" ${o}>${h}</button>`:""}</div></section>`}

function de(e,{action:t,type:n,target:i,before:o,after:r,reason:d,route:p,notification:u="Not applicable"}){var w;const h=new Date,m=Object.fromEntries(new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:"Asia/Ho_Chi_Minh"}).formatToParts(h).map(f=>[f.type,f.value]));e.adminAuditEvents.unshift({id:`AUD-${h.getTime()}`,time:`${new Intl.DateTimeFormat("en-US",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Ho_Chi_Minh"}).format(h)} ICT`,date:`${m.year}-${m.month}-${m.day}`,actor:((w=De(e))==null?void 0:w.name)||"Admin",action:t,type:n,target:i,before:o,after:r,reason:d,route:p,notification:u})}

function Mr(e){const t=String(e.adminDeletionSearch||"").trim().toLowerCase(),n={today:0,"7-days":1,"30-days":2};return(e.adminDeletionMode==="empty"?[]:e.adminDeletionRequests).filter(i=>(!t||`${i.id} ${i.requester} ${i.requesterId}`.toLowerCase().includes(t))&&(e.adminDeletionStatus==="all"||i.status===e.adminDeletionStatus)&&(e.adminDeletionDate==="all"||n[i.dateKey]<=n[e.adminDeletionDate]))}

function Er(e){var A,R;const t=e.adminDeletionMode==="permission",n=Mr(e),i=Math.max(1,Math.ceil(n.length/2)),o=Math.min(Math.max(e.adminDeletionPage||1,1),i),r=n.slice((o-1)*2,o*2),d=t?null:r.find(T=>T.id===e.selectedAdminDeletionId),p=!!(e.adminDeletionSearch||e.adminDeletionStatus!=="all"||e.adminDeletionDate!=="all"),u=[...new Set(e.adminDeletionRequests.map(T=>T.status))],h=`<section class="admin-table-panel admin-five-table-panel"><div class="admin-deletion-heading"><div><h2>Account deletion requests</h2></div><span>${n.length} requests in this view</span></div>
      <form class="admin-filter-bar admin-deletion-filter"><label class="admin-search-field">${l.search}<input id="deletion-search" type="search" value="${a(e.adminDeletionSearch)}" placeholder="Search reference or requester" aria-label="Search deletion requests" /></label><label><span>Status</span><select id="deletion-status"><option value="all">All statuses</option>${u.map(T=>`<option value="${a(T)}" ${e.adminDeletionStatus===T?"selected":""}>${a(T)}</option>`).join("")}</select></label><label><span>Requested</span><select id="deletion-date"><option value="all">Any time</option><option value="today" ${e.adminDeletionDate==="today"?"selected":""}>Today</option><option value="7-days" ${e.adminDeletionDate==="7-days"?"selected":""}>Last 7 days</option><option value="30-days" ${e.adminDeletionDate==="30-days"?"selected":""}>Last 30 days</option></select></label></form>
      ${n.length?`<div class="admin-data-table admin-deletion-table" role="table" aria-label="Account deletion requests"><div class="admin-data-table__head" role="row"><span>Reference</span><span>Requester</span><span>Requested</span><span>Status</span><span></span></div>${r.map(T=>`<div role="row" class="${(d==null?void 0:d.id)===T.id?"is-selected":""}"><strong>${a(T.id)}</strong><div><strong>${a(T.requester)}</strong><small>${a(T.account)}</small></div><span>${a(T.requested)}</span><span>${O(T.status,"attention")}</span><button type="button" data-five-view-deletion="${T.id}">View Request</button></div>`).join("")}</div>`:Ie(p?"no-results":"empty","deletion requests",{filters:`Status: ${e.adminDeletionStatus}; date: ${e.adminDeletionDate}`,action:"data-five-deletion-clear"})}</section>`,m=n.length?`<nav class="admin-deletion-pagination" aria-label="Request pages"><span>Page ${o} of ${i} · ${n.length} matching requests</span><div><button class="admin-secondary-button" type="button" data-five-deletion-page="${o-1}" ${o<=1?"disabled":""}>Previous</button><button class="admin-secondary-button" type="button" data-five-deletion-page="${o+1}" ${o>=i?"disabled":""}>Next</button></div></nav>`:"",w=d?`<div class="admin-five-stack"><section class="admin-five-info">${l.shieldWarning}<div><strong>Policy Required</strong><p>Deletion policy not configured. This request is read-only.</p></div></section><section class="admin-five-card"><div class="admin-five-card-heading"><div><p class="admin-kicker">${a(d.id)}</p><h2>Request detail</h2></div>${O(d.status,"attention")}</div><div class="admin-five-facts admin-five-facts--grid"><span>Requester<strong>${a(d.requester)}</strong></span><span>Account<strong>${a(d.account)}</strong></span><span>Requested<strong>${a(d.requested)}</strong></span><span>Policy reference<strong>Not supplied</strong></span></div></section><div class="admin-five-columns"><section class="admin-five-card"><h3>Related active bookings</h3>${d.bookings.length?d.bookings.map(T=>`<p>${a(T)}</p>`).join(""):"<p>No active booking linked.</p>"}${d.bookings.length?`${sn((R=(A=d.bookings[0])==null?void 0:A.match(/^BK-[0-9]+/))==null?void 0:R[0])}`:""}</section><section class="admin-five-card"><h3>Open cases and preservation</h3>${d.cases.length?d.cases.map(T=>`<p>${a(T)}</p>`).join(""):"<p>No open case linked.</p>"}</section></div><section class="admin-five-card"><h3>Decision history</h3><ol class="admin-five-timeline">${d.history.map(T=>`<li>${a(T)}</li>`).join("")}</ol></section></div>`:"",f=t?Ie("permission","deletion requests",{action:"data-five-deletion-dashboard"}):e.adminDeletionMode==="loading"?Ie("loading","deletion requests"):e.adminDeletionMode==="error"?Ie("load-error","deletion requests",{action:"data-five-deletion-retry"}):`<div class="admin-five-stack">${h}${m}</div>`,y=!t&&d?`<aside class="admin-five-drawer admin-five-deletion-drawer" aria-label="Deletion request details"><header><div><p class="admin-kicker">${a(d.id)}</p><h2>Deletion request</h2></div><button type="button" data-five-close-deletion aria-label="Close request details">${l.close}</button></header><div class="admin-five-deletion-drawer__body">${w}<section class="admin-five-card"><h3>Awaiting approved workflow</h3><div class="admin-five-facts"><span>Request status<strong>${a(d.status)}</strong></span><span>Preservation review<strong>${d.cases.length?"Open cases flagged":"No open case linked"}</strong></span><span>Policy reference<strong>Required</strong></span></div></section></div><footer><button class="admin-secondary-button" type="button" data-five-open-requester>View Requester</button></footer></aside>`:"";return ee(e,{active:"deletion-requests",title:"Account Deletion Requests",content:`<div class="admin-five-layout">${f}${y}</div>`,className:"admin-five-screen admin-five-screen--detail admin-five-deletion-screen"})}

function Ps(){var t,n,i,o,r,d,p;const e=s.session;ne(),(t=c.querySelector("#deletion-search"))==null||t.addEventListener("input",u=>{e.adminDeletionSearch=u.currentTarget.value}),(n=c.querySelector("#deletion-search"))==null||n.addEventListener("change",()=>{e.adminDeletionPage=1,e.selectedAdminDeletionId="",b({focusSelector:"#deletion-search"})}),[["#deletion-status","adminDeletionStatus"],["#deletion-date","adminDeletionDate"]].forEach(([u,h])=>{var m;return(m=c.querySelector(u))==null?void 0:m.addEventListener("change",w=>{e[h]=w.currentTarget.value,e.adminDeletionPage=1,e.selectedAdminDeletionId="",b({focusSelector:u})})}),c.querySelectorAll("[data-five-deletion-page]").forEach(u=>u.addEventListener("click",()=>{e.adminDeletionPage=Number(u.dataset.fiveDeletionPage),e.selectedAdminDeletionId="",b()})),c.querySelectorAll("[data-five-view-deletion]").forEach(u=>u.addEventListener("click",()=>{e.selectedAdminDeletionId=u.dataset.fiveViewDeletion,b({focusSelector:"[data-five-close-deletion]"})})),(i=c.querySelector("[data-five-close-deletion]"))==null||i.addEventListener("click",()=>{e.selectedAdminDeletionId="",b()}),(o=c.querySelector("[data-five-deletion-clear]"))==null||o.addEventListener("click",()=>{e.adminDeletionSearch="",e.adminDeletionStatus="all",e.adminDeletionDate="all",e.adminDeletionPage=1,b({focusSelector:"#deletion-search"})}),(r=c.querySelector("[data-five-deletion-retry]"))==null||r.addEventListener("click",()=>{e.adminDeletionMode="ready",b()}),(d=c.querySelector("[data-five-deletion-dashboard]"))==null||d.addEventListener("click",()=>v("admin-dashboard")),(p=c.querySelector("[data-five-open-requester]"))==null||p.addEventListener("click",()=>{var u;e.selectedAdminUserId=((u=e.adminDeletionRequests.find(h=>h.id===e.selectedAdminDeletionId))==null?void 0:u.requesterId)||"",v("admin-users")})}
```

Các trạng thái và action khác trong cùng màn hình. Mỗi khối là một trang HTML/CSS đầy đủ với dữ liệu mẫu, sidebar, font, assets và bản dịch. Dùng mã xử lý sự kiện ở trên để tái tạo tương tác trong Play:

### Request detail
```html
<!--
Màn hình 169: Account Deletion Requests
Components sử dụng (hàm dựng trong app.js):
- Không dùng component trong thư viện uiComponents; giao diện được tạo bằng HTML trực tiếp.
Thành phần khác:
- HTML: <header>, <nav>, <main>, <section>, <aside>, <footer>, <form>, <label>, <button>, <input>, <select>, <img>, <svg>.
- CSS: các quy tắc cần cho màn hình được nhúng trong <style> bên dưới (từ styles.css).
- Font: Google Sans Flex qua Google Fonts.
Nguồn ảnh/icon trong thẻ <img>:
- assets\icons\smart house\outline\home.svg
- assets\icons\user\outline\user.svg
- assets\icons\interface\outline\shield-check.svg
- assets\icons\time and date\outline\calendar.svg
- assets\icons\time and date\outline\time-oclock.svg
- assets\icons\notes and task\outline\notes.svg
- assets\icons\education\outline\report.svg
- assets\icons\interface\outline\star.svg
- assets\icons\navigation maps\outline\location.svg
- assets\icons\device\outline\notification.svg
- assets\icons\multimedia and audio\outline\image.svg
- assets\icons\editor\outline\document-text.svg
- assets\icons\interface\outline\setting.svg
- assets\icons\interface\outline\trash.svg
- assets\icons\device\outline\lock.svg
- assets\icons\interface\outline\logout.svg
- assets\icons\interface\outline\search 01.svg
- assets\icons\interface\outline\remove.svg
- assets\icons\interface\outline\shield-warning.svg
Bản dịch chuỗi giao diện (JSON từ i18n.js; vi = Việt, en = Anh, ko = Hàn):
[
  {"source":"Account Deletion Requests","vi":"Hàng chờ yêu cầu xóa tài khoản","en":"Account Deletion Requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"Rocket","vi":"Rocket","en":"Rocket","ko":"Rocket"},
  {"source":"Administration","vi":"Quản trị hệ thống","en":"Administration","ko":"시스템 관리"},
  {"source":"Dashboard","vi":"Bảng điều khiển","en":"Dashboard","ko":"대시보드"},
  {"source":"Users","vi":"Người dùng","en":"Users","ko":"사용자 관리"},
  {"source":"Provider Verification","vi":"Xét duyệt hồ sơ đối tác","en":"Provider Verification","ko":"제공자 입점 및 프로필 심사"},
  {"source":"Appointments","vi":"Lịch hẹn","en":"Appointments","ko":"예약"},
  {"source":"No-Show Cases","vi":"Không-hiển thị Cases","en":"No-Show Cases","ko":"없음-표시 Cases"},
  {"source":"Complaints","vi":"Khiếu nại","en":"Complaints","ko":"불만"},
  {"source":"Reports","vi":"Lượt báo cáo","en":"Reports","ko":"신고 접수 건수"},
  {"source":"Reviews","vi":"Đánh giá","en":"Reviews","ko":"리뷰"},
  {"source":"Regions","vi":"Regions","en":"Regions","ko":"Regions"},
  {"source":"Notifications","vi":"Thông báo","en":"Notifications","ko":"알림"},
  {"source":"Banners","vi":"Banners","en":"Banners","ko":"Banners"},
  {"source":"Audit Log","vi":"Nhật ký kiểm toán hệ thống","en":"Audit Log","ko":"시스템 감사 로그"},
  {"source":"App Update","vi":"App Update","en":"App Update","ko":"App Update"},
  {"source":"Deletion Requests","vi":"Yêu cầu xóa tài khoản","en":"Deletion Requests","ko":"계정 탈퇴 요청"},
  {"source":"Admin Accounts","vi":"Admin Accounts","en":"Admin Accounts","ko":"Admin Accounts"},
  {"source":"AM","vi":"AM","en":"AM","ko":"AM"},
  {"source":"Ava Morgan","vi":"Ava Morgan","en":"Ava Morgan","ko":"Ava Morgan"},
  {"source":"Owner","vi":"Chủ sở hữu","en":"Owner","ko":"소유자"},
  {"source":"Change Password","vi":"Đổi mật khẩu","en":"Change Password","ko":"비밀번호 변경"},
  {"source":"Sign Out","vi":"Đăng xuất","en":"Sign Out","ko":"로그아웃"},
  {"source":"Account deletion requests","vi":"Yêu cầu xóa tài khoản","en":"Account deletion requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"3 requests in this view","vi":"3 yêu cầu trong chế độ xem này","en":"3 requests in this view","ko":"현재 화면에 3건의 요청 표시 중"},
  {"source":"Status","vi":"Trạng thái","en":"Status","ko":"상태"},
  {"source":"All statuses","vi":"Tất cả trạng thái","en":"All statuses","ko":"전체 상태"},
  {"source":"Received · policy review required","vi":"Đã nhận · chính sách đánh giá bắt buộc","en":"Received · policy review required","ko":"수신됨 · 정책 검토 필수"},
  {"source":"Requested","vi":"Thời điểm yêu cầu","en":"Requested","ko":"취소 요청 일시"},
  {"source":"Any time","vi":"Mọi thời điểm","en":"Any time","ko":"전체 기간"},
  {"source":"Today","vi":"Hôm nay","en":"Today","ko":"오늘"},
  {"source":"Last 7 days","vi":"7 ngày qua","en":"Last 7 days","ko":"최근 7일"},
  {"source":"Last 30 days","vi":"30 ngày qua","en":"Last 30 days","ko":"최근 30일"},
  {"source":"Reference","vi":"Mã tham chiếu","en":"Reference","ko":"참조 번호"},
  {"source":"Requester","vi":"Người yêu cầu hủy","en":"Requester","ko":"취소 요청자"},
  {"source":"DEL-1024","vi":"DEL-1024","en":"DEL-1024","ko":"DEL-1024"},
  {"source":"Jamie Rivera","vi":"Jamie Rivera","en":"Jamie Rivera","ko":"Jamie Rivera"},
  {"source":"Customer · Active","vi":"Khách hàng · đang hoạt động","en":"Customer · Active","ko":"고객 · 활성"},
  {"source":"Sep 24, 2026 · 18:12 ICT","vi":"Sep 24, 2026 · 18:12 ICT","en":"Sep 24, 2026 · 18:12 ICT","ko":"Sep 24, 2026 · 18:12 ICT"},
  {"source":"View Request","vi":"Xem yêu cầu","en":"View Request","ko":"요청 상세 보기"},
  {"source":"DEL-1023","vi":"DEL-1023","en":"DEL-1023","ko":"DEL-1023"},
  {"source":"Lotus Wellness","vi":"Lotus Wellness","en":"Lotus Wellness","ko":"Lotus Wellness"},
  {"source":"Service Provider · Active","vi":"Dịch vụ nhà cung cấp · đang hoạt động","en":"Service Provider · Active","ko":"서비스 제공자 · 활성"},
  {"source":"Sep 18, 2026 · 09:30 ICT","vi":"Sep 18, 2026 · 09:30 ICT","en":"Sep 18, 2026 · 09:30 ICT","ko":"Sep 18, 2026 · 09:30 ICT"},
  {"source":"Page 1 of 2 · 3 matching requests","vi":"Page 1 của 2 · 3 matching yêu cầu","en":"Page 1 of 2 · 3 matching requests","ko":"Page 1 의 2 · 3 matching 요청"},
  {"source":"Previous","vi":"Trang trước","en":"Previous","ko":"이전"},
  {"source":"Next","vi":"Trang sau","en":"Next","ko":"다음"},
  {"source":"Deletion request","vi":"Xóa yêu cầu","en":"Deletion request","ko":"삭제 요청"},
  {"source":"Policy Required","vi":"Cần quy trình chính sách chính thức","en":"Policy Required","ko":"공식 데이터 삭제 정책 필요"},
  {"source":"Deletion policy not configured. This request is read-only.","vi":"Chưa cấu hình chính sách xóa & lưu giữ dữ liệu. Yêu cầu này ở chế độ chỉ đọc.","en":"Deletion policy not configured. This request is read-only.","ko":"계정 삭제 및 데이터 보존 정책이 설정되지 않았습니다. 현재 요청은 열람 전용입니다."},
  {"source":"Request detail","vi":"Chi tiết yêu cầu xóa","en":"Request detail","ko":"탈퇴 요청 상세 정보"},
  {"source":"Account","vi":"Tài khoản liên quan","en":"Account","ko":"해당 계정"},
  {"source":"Policy reference","vi":"Căn cứ chính sách","en":"Policy reference","ko":"법적 정책 기준"},
  {"source":"Not supplied","vi":"Chưa được cung cấp","en":"Not supplied","ko":"미제공"},
  {"source":"Related active bookings","vi":"Lịch hẹn đang hoạt động liên quan","en":"Related active bookings","ko":"연계된 진행 중 예약"},
  {"source":"BK-48291 · Accepted · cancellation review open","vi":"BK-48291 · đã chấp nhận · yêu cầu hủy đánh giá mở","en":"BK-48291 · Accepted · cancellation review open","ko":"BK-48291 · 수락됨 · 취소 검토 열기"},
  {"source":"View Booking BK-48291","vi":"Xem lịch hẹn BK-48291","en":"View Booking BK-48291","ko":"예약 내역 조회 (BK-48291)"},
  {"source":"Open cases and preservation","vi":"Vụ việc đang mở & Bảo toàn chứng cứ","en":"Open cases and preservation","ko":"미결 안건 및 증거 보존 대상"},
  {"source":"CP-3018 · New complaint","vi":"CP-3018 · mới khiếu nại","en":"CP-3018 · New complaint","ko":"CP-3018 · 신규 불만"},
  {"source":"CN-1084 · Pending cancellation","vi":"CN-1084 · đang chờ yêu cầu hủy","en":"CN-1084 · Pending cancellation","ko":"CN-1084 · 대기 중 취소"},
  {"source":"Decision history","vi":"Lịch sử quyết định & xử lý","en":"Decision history","ko":"처리 이력 타임라인"},
  {"source":"Sep 24, 2026 · 18:12 ICT — Request received","vi":"Sep 24, 2026 · 18:12 ICT — yêu cầu đã nhận","en":"Sep 24, 2026 · 18:12 ICT — Request received","ko":"Sep 24, 2026 · 18:12 ICT — 요청 수신됨"},
  {"source":"Sep 24, 2026 · 18:12 ICT — Open booking and cases flagged for review","vi":"Sep 24, 2026 · 18:12 ICT — mở đặt lịch và cases flagged cho đánh giá","en":"Sep 24, 2026 · 18:12 ICT — Open booking and cases flagged for review","ko":"Sep 24, 2026 · 18:12 ICT — 열기 예약 및 cases flagged 위한 검토"},
  {"source":"Awaiting approved workflow","vi":"Chờ quy trình xử lý được phê duyệt","en":"Awaiting approved workflow","ko":"공식 승인 워크플로 대기 중"},
  {"source":"Request status","vi":"Tình trạng yêu cầu","en":"Request status","ko":"신청 상태"},
  {"source":"Preservation review","vi":"Thẩm định lưu giữ chứng cứ","en":"Preservation review","ko":"증거 데이터 보존 검토"},
  {"source":"Open cases flagged","vi":"Đã đánh dấu vụ việc đang mở","en":"Open cases flagged","ko":"미결 분쟁 안건 존재"},
  {"source":"Required","vi":"Bắt buộc","en":"Required","ko":"필수"},
  {"source":"View Requester","vi":"Xem tài khoản người yêu cầu","en":"View Requester","ko":"신청자 계정 보기"},
  {"source":"Rocket logo","vi":"Logo Rocket","en":"Rocket logo","ko":"Rocket 로고"},
  {"source":"Admin navigation","vi":"Điều hướng Quản trị","en":"Admin navigation","ko":"관리자 메뉴 탐색"},
  {"source":"Search deletion requests","vi":"Tìm kiếm yêu cầu xóa tài khoản","en":"Search deletion requests","ko":"탈퇴 요청 검색"},
  {"source":"Search reference or requester","vi":"Tìm theo mã yêu cầu hoặc người yêu cầu","en":"Search reference or requester","ko":"요청 번호 또는 신청자 검색"},
  {"source":"Request pages","vi":"Phân trang yêu cầu","en":"Request pages","ko":"요청 목록 페이지"},
  {"source":"Deletion request details","vi":"Xóa yêu cầu chi tiết","en":"Deletion request details","ko":"삭제 요청 상세"},
  {"source":"Close request details","vi":"Close yêu cầu chi tiết","en":"Close request details","ko":"Close 요청 상세"}
]
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Account Deletion Requests — Rocket</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
  <style>:root { --canvas: #faf7f2; --surface: #fff; --text-primary: #181818; --text-secondary: #605a56; --text-muted: #776f6a; --text-inverse: #fff; --selection-strong: #181818; --accent-pink: #fec8cd; --accent-apricot: #ffc19e; --rating-star: #e3a008; --rating-star-filter: brightness(0) saturate(100%) invert(60%) sepia(97%) saturate(1067%) hue-rotate(4deg) brightness(97%) contrast(94%); --gradient-start: #fef0ed; --gradient-warm: #fae4d9; --gradient-peach: #f7d0bf; --gradient-rose: #f9dae4; --border-subtle: #e8e2dc; --border-control: #776f6a; --disabled-surface: #eeeae5; --error: #a3293d; --error-surface: #fbeaec; --success: #25654f; --success-surface: #eaf4ee; --editor-line: #e5e7eb; --editor-bg: #eeeeec; --editor-panel: #fff; --editor-blue: #5551ff; --font-display: "Google Sans Flex"; --font-ui: "Google Sans Flex"; --motion-press: .12s; --motion-selection: .18s; --motion-surface: .22s; --motion-route: .26s; --motion-easing: cubic-bezier(.2, 0, 0, 1); --topbar-height: 52px; --left-sidebar-width: 224px; --right-sidebar-width: 276px; }
* { box-sizing: border-box; }
html, body { width: 100%; height: 100%; margin: 0px; overflow: hidden; }
body { color: var(--text-primary); font-family: var(--font-ui); background: var(--editor-bg); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; }
button { color: inherit; }
.huge-icon { object-fit: contain; object-position: center center; vertical-align: middle; flex: 0 0 auto; width: 24px; height: 24px; display: inline-block; }
button:focus-visible, input:focus-visible, [tabindex]:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 3px; }
.brand-mark { background: var(--text-primary); color: var(--accent-pink); border-radius: 10px; flex: 0 0 auto; place-items: center; display: inline-grid; }
.brand-mark--small { width: 30px; height: 30px; padding: 5px; }
.brand-mark svg { fill: currentcolor; width: 100%; height: 100%; }
.brand-mark .brand-mark__cut { fill: var(--text-primary); }
.brand-mark .brand-mark__dot { fill: var(--surface); }
.primary-button:active:not(:disabled), .secondary-button:active:not(:disabled), .app-icon-button:active { opacity: 0.92; transform: scale(0.98); }
@keyframes screen-enter { 
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0px); }
}
@media (width <= 980px) {:root { --left-sidebar-width: 190px; --right-sidebar-width: 0px; }}
@media (width <= 680px) {:root { --left-sidebar-width: 0px; }}
.admin-deletion-heading { justify-content: space-between; align-items: center; gap: 18px; padding: 18px 20px 14px; display: flex; }
.admin-deletion-heading h2 { font: 600 20px/1.3 var(--font-ui); color: var(--admin-ink); margin: 0px; }
.admin-deletion-heading > span { color: var(--admin-ashen); font-size: 12px; }
.admin-deletion-filter .admin-search-field { flex: 1 1 250px; }
.admin-five-table-panel .admin-deletion-table { overflow-x: auto; }
.admin-deletion-table > div { grid-template-columns: 0.7fr 1.1fr 1.2fr 1.35fr 85px; }
.admin-deletion-table > div.is-selected { background: var(--admin-stone); }
.admin-deletion-table > div > * { overflow-wrap: anywhere; min-width: 0px; }
.admin-deletion-pagination { color: var(--admin-ashen); justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; display: flex; }
.admin-deletion-pagination > div { gap: 8px; display: flex; }
.admin-deletion-pagination button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-screen { --font-display: var(--font-ui); --admin-canvas: #f8fafc; --admin-paper: #fff; --admin-stone: #f1f5f9; --admin-ink: #0f172a; --admin-graphite: #334155; --admin-ashen: #64748b; --admin-pebble: #94a3b8; --admin-mist: #cbd5e1; --admin-chalk: #e2e8f0; --admin-clay: #ea580c; --admin-shadow-sm: 0 1px 2px 0 #0000000a; --admin-shadow: 0 1px 3px 0 #0000000f, 0 1px 2px -1px #0000000a; --admin-shadow-md: 0 4px 6px -1px #00000012, 0 2px 4px -2px #0000000d; --admin-shadow-lg: 0 10px 15px -3px #00000014, 0 4px 6px -4px #0000000a; --admin-shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000000f; background: var(--admin-canvas); width: 1440px; height: 960px; color: var(--admin-graphite); font: 400 13px/1.5 var(--font-ui); -webkit-font-smoothing: antialiased; grid-template-columns: 244px minmax(0px, 1fr); display: grid; position: relative; overflow: hidden; }
.admin-five-screen .admin-content { padding-bottom: 32px; }
.admin-five-layout { grid-template-columns: minmax(0px, 1fr) 340px; align-items: start; gap: 20px; display: grid; }
.admin-five-screen--detail .admin-five-layout { display: block; }
.admin-five-screen--detail .admin-five-drawer { z-index: 5; border-top: 0px; border-bottom: 0px; border-right: 0px; border-radius: 0px; align-content: start; width: min(480px, 100%); position: absolute; top: 0px; bottom: 0px; right: 0px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.08) -10px 0px 35px; }
.admin-five-stack { gap: 18px; min-width: 0px; display: grid; }
.admin-five-table-panel { min-width: 0px; }
.admin-five-drawer { border: 1px solid var(--admin-chalk); background: var(--admin-paper); box-shadow: var(--admin-shadow); border-radius: 14px; gap: 18px; padding: 24px; display: grid; }
.admin-five-drawer header { justify-content: space-between; align-items: start; gap: 12px; display: flex; }
.admin-five-drawer header button { background: var(--admin-stone); width: 32px; height: 32px; color: var(--admin-graphite); cursor: pointer; border: 0px; border-radius: 8px; place-items: center; transition: 0.15s; display: grid; }
.admin-five-drawer header button:hover { background: var(--admin-mist); color: var(--admin-ink); }
.admin-five-deletion-screen .admin-five-deletion-drawer { flex-direction: column; gap: 0px; padding: 0px; display: flex; overflow: hidden; }
.admin-five-deletion-drawer > header { border-bottom: 1px solid var(--admin-chalk); padding: 20px 24px; }
.admin-five-deletion-drawer__body { flex: 1 1 0%; align-content: start; gap: 16px; min-height: 0px; padding: 20px 24px; display: grid; overflow-y: auto; }
.admin-five-deletion-drawer__body .admin-five-columns, .admin-five-deletion-drawer__body .admin-five-facts--grid { grid-template-columns: minmax(0px, 1fr); }
.admin-five-deletion-drawer > footer { border-top: 1px solid var(--admin-chalk); padding: 16px 24px; }
.admin-five-drawer h2, .admin-five-card h2, .admin-five-state-example h2 { font: 700 20px/1.3 var(--font-ui); color: var(--admin-ink); margin: 0px; }
.admin-five-facts { gap: 0px; display: grid; }
.admin-five-facts > span { border-bottom: 1px solid var(--admin-chalk); color: var(--admin-ashen); gap: 4px; padding: 12px 0px; font-size: 11px; display: grid; }
.admin-five-facts > span strong { color: var(--admin-ink); overflow-wrap: anywhere; font-size: 13px; font-weight: 600; }
.admin-five-facts--grid { grid-template-columns: repeat(2, minmax(0px, 1fr)); column-gap: 20px; }
.admin-five-info { border: 1px solid var(--admin-chalk); background: var(--admin-paper); box-shadow: var(--admin-shadow-sm); border-radius: 12px; align-items: start; gap: 14px; padding: 18px 20px; display: flex; }
.admin-five-info > .huge-icon { width: 22px; height: 22px; color: var(--admin-clay); flex-shrink: 0; margin-top: 2px; }
.admin-five-info strong, .admin-five-card h3 { color: var(--admin-ink); font-size: 14px; font-weight: 600; }
.admin-five-info p { color: var(--admin-ashen); margin: 4px 0px 0px; font-size: 12px; }
.admin-five-card { border: 1px solid var(--admin-chalk); background: var(--admin-paper); box-shadow: var(--admin-shadow-sm); border-radius: 12px; padding: 22px; }
.admin-five-card h3 { margin: 0px 0px 12px; font-size: 15px; }
.admin-five-card > p { color: var(--admin-graphite); font-size: 13px; }
.admin-five-card-heading { justify-content: space-between; align-items: start; gap: 16px; display: flex; }
.admin-five-columns { grid-template-columns: 1fr 1fr; gap: 16px; display: grid; }
.admin-five-timeline { color: var(--admin-graphite); margin: 0px; padding-left: 20px; font-size: 12px; }
.admin-five-timeline li + li { margin-top: 10px; }
.admin-four-sibling button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); }
.admin-screen button, .admin-screen input, .admin-screen select, .admin-screen textarea { font: inherit; }
.admin-screen .huge-icon { flex-shrink: 0; width: 18px; height: 18px; }
.admin-sidebar { border-right: 1px solid var(--admin-chalk); background: var(--admin-paper); flex-direction: column; min-width: 0px; min-height: 0px; padding: 24px 16px 20px; display: flex; overflow-y: auto; }
.admin-brand { align-items: center; gap: 12px; padding: 0px 8px; display: flex; }
.admin-brand .brand-mark { background: var(--admin-ink); width: 36px; height: 36px; color: var(--admin-clay); box-shadow: var(--admin-shadow-sm); border-radius: 10px; padding: 7px; }
.admin-brand .brand-mark__cut { fill: var(--admin-ink); }
.admin-brand strong, .admin-brand small { display: block; }
.admin-brand strong { color: var(--admin-ink); font-family: var(--font-ui); letter-spacing: -0.02em; font-size: 18px; font-weight: 700; line-height: 1.1; }
.admin-brand small { color: var(--admin-ashen); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; font-size: 10px; font-weight: 600; }
.admin-nav { gap: 4px; margin-top: 26px; display: grid; }
.admin-nav-item { width: 100%; min-height: 38px; color: var(--admin-graphite); text-align: left; cursor: pointer; background: 0px 0px; border: 0px; border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr) auto; align-items: center; gap: 10px; padding: 0px 10px; font-size: 12px; font-weight: 500; transition: 0.15s; display: grid; }
.admin-nav-item:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-nav-item.is-active { color: var(--admin-clay); background: rgba(234, 88, 12, 0.08); font-weight: 600; }
.admin-nav-item__icon { place-items: center; width: 20px; height: 20px; display: grid; }
.admin-nav-item small { background: var(--admin-stone); min-width: 20px; color: var(--admin-graphite); text-align: center; border-radius: 9999px; padding: 1px 6px; font-size: 10px; font-weight: 600; }
.admin-sidebar__footer { border-top: 1px solid var(--admin-chalk); margin-top: auto; padding-top: 16px; }
.admin-identity { background: var(--admin-stone); border-radius: 10px; align-items: center; gap: 10px; margin-bottom: 8px; padding: 8px 10px; display: flex; }
.admin-identity > span { background: var(--admin-ink); color: rgb(255, 255, 255); border-radius: 50%; flex: 0 0 auto; place-items: center; width: 32px; height: 32px; font-size: 11px; font-weight: 700; display: grid; }
.admin-identity strong, .admin-identity small { display: block; }
.admin-identity strong { color: var(--admin-ink); font-size: 12px; font-weight: 600; }
.admin-identity small { color: var(--admin-ashen); font-size: 11px; }
.admin-sidebar-action { width: 100%; height: 34px; color: var(--admin-graphite); cursor: pointer; background: 0px 0px; border: 0px; border-radius: 6px; align-items: center; gap: 8px; padding: 0px 10px; font-size: 12px; transition: 0.15s; display: flex; }
.admin-sidebar-action:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-main { background: var(--admin-canvas); grid-template-rows: auto minmax(0px, 1fr); min-width: 0px; min-height: 0px; display: grid; }
.admin-topbar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); justify-content: space-between; align-items: center; gap: 24px; min-height: 72px; padding: 16px 32px; display: flex; }
.admin-topbar h1 { font-family: var(--font-ui); letter-spacing: -0.02em; color: var(--admin-ink); margin: 0px; font-size: 22px; font-weight: 700; line-height: 1.25; }
.admin-topbar__actions { align-items: center; gap: 10px; min-height: 40px; display: flex; }
.admin-content { scrollbar-color: var(--admin-mist) transparent; scrollbar-width: thin; min-width: 0px; min-height: 0px; padding: 24px 32px 32px; position: relative; overflow: auto; }
.admin-kicker { color: var(--admin-clay); letter-spacing: 0.08em; text-transform: uppercase; margin: 0px 0px 6px; font-size: 11px; font-weight: 600; }
.admin-primary-button, .admin-secondary-button, .admin-text-button, .admin-icon-action { cursor: pointer; border-radius: 8px; min-height: 38px; font-size: 13px; font-weight: 550; transition: 0.15s; }
.admin-primary-button:hover:not(:disabled) { box-shadow: var(--admin-shadow); background: rgb(30, 41, 59); border-color: rgb(30, 41, 59); }
.admin-primary-button:disabled, .admin-secondary-button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-secondary-button { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-graphite); box-shadow: var(--admin-shadow-sm); padding: 0px 15px; }
.admin-secondary-button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); border-color: var(--admin-pebble); }
.admin-field input, .admin-field textarea, .admin-compact-field select, .admin-filter-bar select, .admin-search-field input { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-ink); border-radius: 8px; font-size: 13px; }
.admin-field input::placeholder, .admin-field textarea::placeholder, .admin-search-field input::placeholder { color: var(--admin-pebble); }
.admin-status { background: var(--admin-stone); border: 1px solid var(--admin-chalk); width: max-content; max-width: 100%; color: var(--admin-graphite); white-space: nowrap; border-radius: 9999px; align-items: center; gap: 6px; padding: 3px 9px; font-size: 11px; font-weight: 600; display: inline-flex; }
.admin-status > span { background: var(--admin-pebble); border-radius: 50%; flex: 0 0 auto; width: 6px; height: 6px; }
.admin-status--attention, .admin-status--pending, .admin-status--pending-review { color: rgb(146, 64, 14); background: rgb(255, 251, 235); border-color: rgb(253, 230, 138); }
.admin-status--attention > span, .admin-status--pending > span, .admin-status--pending-review > span { background: rgb(245, 158, 11); }
.admin-table-panel { border: 1px solid var(--admin-chalk); background: var(--admin-paper); box-shadow: var(--admin-shadow); border-radius: 12px; overflow: hidden; }
.admin-filter-bar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); align-items: flex-end; gap: 12px; min-height: 68px; padding: 14px 18px; display: flex; }
.admin-filter-bar > label:not(.admin-search-field) { color: var(--admin-ashen); letter-spacing: 0.04em; text-transform: uppercase; gap: 4px; font-size: 11px; font-weight: 600; display: grid; }
.admin-filter-bar select { border: 1px solid var(--admin-mist); background: var(--admin-paper); min-width: 140px; height: 38px; color: var(--admin-ink); border-radius: 8px; padding: 0px 28px 0px 10px; font-size: 13px; }
.admin-search-field { border: 1px solid var(--admin-mist); background: var(--admin-paper); border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr); align-items: center; gap: 8px; min-width: 240px; height: 38px; padding: 0px 12px; transition: 0.15s; display: grid; }
.admin-search-field input { min-width: 0px; height: 34px; color: var(--admin-ink); border: 0px; outline: 0px; padding: 0px; font-size: 13px; }
.admin-data-table { min-width: 0px; }
.admin-data-table > div { border-top: 1px solid var(--admin-stone); min-height: 56px; color: var(--admin-graphite); align-items: center; gap: 12px; padding: 0px 18px; font-size: 13px; transition: background 0.12s; display: grid; }
.admin-data-table > div:first-child { border-top: 0px; }
.admin-data-table > div:not(.admin-data-table__head):hover { background: var(--admin-stone); }
.admin-data-table__head { letter-spacing: 0.05em; text-transform: uppercase; font-weight: 600; background: var(--admin-stone) !important; min-height: 42px !important; color: var(--admin-ashen) !important; border-bottom: 1px solid var(--admin-chalk) !important; font-size: 11px !important; }
.admin-data-table strong, .admin-data-table small { display: block; }
.admin-data-table strong { color: var(--admin-ink); font-size: 13px; font-weight: 600; }
.admin-data-table small { color: var(--admin-ashen); margin-top: 2px; font-size: 11px; }
.admin-data-table > div > button { color: rgb(37, 99, 235); text-underline-offset: 2px; cursor: pointer; text-align: right; background: 0px 0px; border: 0px; padding: 0px; font-size: 12px; font-weight: 600; text-decoration: underline; transition: color 0.15s; }
.admin-data-table > div > button:hover { color: rgb(29, 78, 216); }
@keyframes admin-skeleton { 
  0% { opacity: 0.55; }
  100% { opacity: 1; }
}
.admin-provider-gallery button:hover:not(:disabled) { border-color: var(--admin-mist); box-shadow: var(--admin-shadow); }
@media (prefers-reduced-motion: reduce) {*, ::before, ::after { scroll-behavior: auto !important; transition-duration: 1ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important; }}
.admin-screen h1, .admin-screen h2, .admin-screen h3, .admin-screen .admin-brand strong, .admin-screen .admin-nav-item.is-active { font-weight: 600; }
    html, body { width: 100%; height: auto; min-height: 100%; overflow: auto; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  </style>
</head>
<body>
<div class="admin-screen admin-five-screen admin-five-screen--detail admin-five-deletion-screen">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark brand-mark--small" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img" aria-label="Rocket logo">
      <path d="M24 5c8.3 3.6 13 10.1 13 18.1C37 32 31.9 39.5 24 43c-7.9-3.5-13-11-13-19.9C11 15.1 15.7 8.6 24 5Z"></path>
      <path class="brand-mark__cut" d="M24 13.3c3.8 3.1 5.8 6.6 5.8 10.5 0 4.4-2.2 8.2-5.8 11.1-3.6-2.9-5.8-6.7-5.8-11.1 0-3.9 2-7.4 5.8-10.5Z"></path>
      <circle class="brand-mark__dot" cx="24" cy="22" r="3.2"></circle>
    </svg></span>
            <div><strong>Rocket</strong><small>Administration</small></div>
          </div>
          <nav class="admin-nav" aria-label="Admin navigation">
            
      <button class="admin-nav-item" type="button" data-admin-route="admin-dashboard">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\smart house\outline\home.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Dashboard</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-users">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\user\outline\user.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Users</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-provider-verification">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Provider Verification</span>
        <small>23</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-appointments">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\calendar.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Appointments</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-no-show">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\time-oclock.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>No-Show Cases</span>
        <small>5</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-complaints">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\notes and task\outline\notes.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Complaints</span>
        <small>14</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reports">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\education\outline\report.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reports</span>
        <small>4</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reviews">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\star.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reviews</span>
        <small>3</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-regions">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\navigation maps\outline\location.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Regions</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-notifications">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\device\outline\notification.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Notifications</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-banners">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\multimedia and audio\outline\image.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Banners</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-audit">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\editor\outline\document-text.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Audit Log</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-app-config">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\setting.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>App Update</span>
        
      </button>
      <button class="admin-nav-item is-active" type="button" data-admin-route="admin-deletion-requests">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\trash.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Deletion Requests</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-team">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Admin Accounts</span>
        
      </button>
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-identity">
              <span>AM</span>
              <div><strong>Ava Morgan</strong><small>Owner</small></div>
            </div>
            <button class="admin-sidebar-action" type="button" data-admin-change-password=""><img class="huge-icon" src="assets\icons\device\outline\lock.svg" alt="" aria-hidden="true" decoding="async"><span>Change Password</span></button>
            <button class="admin-sidebar-action" type="button" data-admin-sign-out=""><img class="huge-icon" src="assets\icons\interface\outline\logout.svg" alt="" aria-hidden="true" decoding="async"><span>Sign Out</span></button>
          </div>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar">
            <div>
              <h1>Account Deletion Requests</h1>
            </div>
            <div class="admin-topbar__actions"></div>
          </header>
          <div class="admin-content"><div class="admin-five-layout"><div class="admin-five-stack"><section class="admin-table-panel admin-five-table-panel"><div class="admin-deletion-heading"><div><h2>Account deletion requests</h2></div><span>3 requests in this view</span></div>
      <form class="admin-filter-bar admin-deletion-filter"><label class="admin-search-field"><img class="huge-icon" src="assets\icons\interface\outline\search 01.svg" alt="" aria-hidden="true" decoding="async"><input id="deletion-search" type="search" value="" placeholder="Search reference or requester" aria-label="Search deletion requests"></label><label><span>Status</span><select id="deletion-status"><option value="all">All statuses</option><option value="Received · policy review required">Received · policy review required</option></select></label><label><span>Requested</span><select id="deletion-date"><option value="all">Any time</option><option value="today">Today</option><option value="7-days">Last 7 days</option><option value="30-days">Last 30 days</option></select></label></form>
      <div class="admin-data-table admin-deletion-table" role="table" aria-label="Account deletion requests"><div class="admin-data-table__head" role="row"><span>Reference</span><span>Requester</span><span>Requested</span><span>Status</span><span></span></div><div role="row" class="is-selected"><strong>DEL-1024</strong><div><strong>Jamie Rivera</strong><small>Customer · Active</small></div><span>Sep 24, 2026 · 18:12 ICT</span><span><span class="admin-status admin-status--attention admin-status--received-·-policy-review-required"><span></span>Received · policy review required</span></span><button type="button" data-five-view-deletion="DEL-1024">View Request</button></div><div role="row" class=""><strong>DEL-1023</strong><div><strong>Lotus Wellness</strong><small>Service Provider · Active</small></div><span>Sep 18, 2026 · 09:30 ICT</span><span><span class="admin-status admin-status--attention admin-status--received-·-policy-review-required"><span></span>Received · policy review required</span></span><button type="button" data-five-view-deletion="DEL-1023">View Request</button></div></div></section><nav class="admin-deletion-pagination" aria-label="Request pages"><span>Page 1 of 2 · 3 matching requests</span><div><button class="admin-secondary-button" type="button" data-five-deletion-page="0" disabled="">Previous</button><button class="admin-secondary-button" type="button" data-five-deletion-page="2">Next</button></div></nav></div><aside class="admin-five-drawer admin-five-deletion-drawer" aria-label="Deletion request details"><header><div><p class="admin-kicker">DEL-1024</p><h2>Deletion request</h2></div><button type="button" data-five-close-deletion="" aria-label="Close request details"><img class="huge-icon" src="assets\icons\interface\outline\remove.svg" alt="" aria-hidden="true" decoding="async"></button></header><div class="admin-five-deletion-drawer__body"><div class="admin-five-stack"><section class="admin-five-info"><img class="huge-icon" src="assets\icons\interface\outline\shield-warning.svg" alt="" aria-hidden="true" decoding="async"><div><strong>Policy Required</strong><p>Deletion policy not configured. This request is read-only.</p></div></section><section class="admin-five-card"><div class="admin-five-card-heading"><div><p class="admin-kicker">DEL-1024</p><h2>Request detail</h2></div><span class="admin-status admin-status--attention admin-status--received-·-policy-review-required"><span></span>Received · policy review required</span></div><div class="admin-five-facts admin-five-facts--grid"><span>Requester<strong>Jamie Rivera</strong></span><span>Account<strong>Customer · Active</strong></span><span>Requested<strong>Sep 24, 2026 · 18:12 ICT</strong></span><span>Policy reference<strong>Not supplied</strong></span></div></section><div class="admin-five-columns"><section class="admin-five-card"><h3>Related active bookings</h3><p>BK-48291 · Accepted · cancellation review open</p><button class="admin-secondary-button" type="button" data-admin-case-booking="BK-48291">View Booking BK-48291</button></section><section class="admin-five-card"><h3>Open cases and preservation</h3><p>CP-3018 · New complaint</p><p>CN-1084 · Pending cancellation</p></section></div><section class="admin-five-card"><h3>Decision history</h3><ol class="admin-five-timeline"><li>Sep 24, 2026 · 18:12 ICT — Request received</li><li>Sep 24, 2026 · 18:12 ICT — Open booking and cases flagged for review</li></ol></section></div><section class="admin-five-card"><h3>Awaiting approved workflow</h3><div class="admin-five-facts"><span>Request status<strong>Received · policy review required</strong></span><span>Preservation review<strong>Open cases flagged</strong></span><span>Policy reference<strong>Required</strong></span></div></section></div><footer><button class="admin-secondary-button" type="button" data-five-open-requester="">View Requester</button></footer></aside></div></div>
        </main>
        
        
      </div>
</body>
</html>
```

### Play · No matching requests
```html
<!--
Màn hình 169: Account Deletion Requests
Components sử dụng (hàm dựng trong app.js):
- Không dùng component trong thư viện uiComponents; giao diện được tạo bằng HTML trực tiếp.
Thành phần khác:
- HTML: <header>, <nav>, <main>, <section>, <aside>, <form>, <label>, <button>, <input>, <select>, <img>, <svg>.
- CSS: các quy tắc cần cho màn hình được nhúng trong <style> bên dưới (từ styles.css).
- Font: Google Sans Flex qua Google Fonts.
Nguồn ảnh/icon trong thẻ <img>:
- assets\icons\smart house\outline\home.svg
- assets\icons\user\outline\user.svg
- assets\icons\interface\outline\shield-check.svg
- assets\icons\time and date\outline\calendar.svg
- assets\icons\time and date\outline\time-oclock.svg
- assets\icons\notes and task\outline\notes.svg
- assets\icons\education\outline\report.svg
- assets\icons\interface\outline\star.svg
- assets\icons\navigation maps\outline\location.svg
- assets\icons\device\outline\notification.svg
- assets\icons\multimedia and audio\outline\image.svg
- assets\icons\editor\outline\document-text.svg
- assets\icons\interface\outline\setting.svg
- assets\icons\interface\outline\trash.svg
- assets\icons\device\outline\lock.svg
- assets\icons\interface\outline\logout.svg
- assets\icons\interface\outline\search 01.svg
Bản dịch chuỗi giao diện (JSON từ i18n.js; vi = Việt, en = Anh, ko = Hàn):
[
  {"source":"Account Deletion Requests","vi":"Hàng chờ yêu cầu xóa tài khoản","en":"Account Deletion Requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"Rocket","vi":"Rocket","en":"Rocket","ko":"Rocket"},
  {"source":"Administration","vi":"Quản trị hệ thống","en":"Administration","ko":"시스템 관리"},
  {"source":"Dashboard","vi":"Bảng điều khiển","en":"Dashboard","ko":"대시보드"},
  {"source":"Users","vi":"Người dùng","en":"Users","ko":"사용자 관리"},
  {"source":"Provider Verification","vi":"Xét duyệt hồ sơ đối tác","en":"Provider Verification","ko":"제공자 입점 및 프로필 심사"},
  {"source":"Appointments","vi":"Lịch hẹn","en":"Appointments","ko":"예약"},
  {"source":"No-Show Cases","vi":"Không-hiển thị Cases","en":"No-Show Cases","ko":"없음-표시 Cases"},
  {"source":"Complaints","vi":"Khiếu nại","en":"Complaints","ko":"불만"},
  {"source":"Reports","vi":"Lượt báo cáo","en":"Reports","ko":"신고 접수 건수"},
  {"source":"Reviews","vi":"Đánh giá","en":"Reviews","ko":"리뷰"},
  {"source":"Regions","vi":"Regions","en":"Regions","ko":"Regions"},
  {"source":"Notifications","vi":"Thông báo","en":"Notifications","ko":"알림"},
  {"source":"Banners","vi":"Banners","en":"Banners","ko":"Banners"},
  {"source":"Audit Log","vi":"Nhật ký kiểm toán hệ thống","en":"Audit Log","ko":"시스템 감사 로그"},
  {"source":"App Update","vi":"App Update","en":"App Update","ko":"App Update"},
  {"source":"Deletion Requests","vi":"Yêu cầu xóa tài khoản","en":"Deletion Requests","ko":"계정 탈퇴 요청"},
  {"source":"Admin Accounts","vi":"Admin Accounts","en":"Admin Accounts","ko":"Admin Accounts"},
  {"source":"AM","vi":"AM","en":"AM","ko":"AM"},
  {"source":"Ava Morgan","vi":"Ava Morgan","en":"Ava Morgan","ko":"Ava Morgan"},
  {"source":"Owner","vi":"Chủ sở hữu","en":"Owner","ko":"소유자"},
  {"source":"Change Password","vi":"Đổi mật khẩu","en":"Change Password","ko":"비밀번호 변경"},
  {"source":"Sign Out","vi":"Đăng xuất","en":"Sign Out","ko":"로그아웃"},
  {"source":"Account deletion requests","vi":"Yêu cầu xóa tài khoản","en":"Account deletion requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"0 requests in this view","vi":"0 yêu cầu trong chế độ xem này","en":"0 requests in this view","ko":"현재 화면에 0건의 요청 표시 중"},
  {"source":"Status","vi":"Trạng thái","en":"Status","ko":"상태"},
  {"source":"All statuses","vi":"Tất cả trạng thái","en":"All statuses","ko":"전체 상태"},
  {"source":"Received · policy review required","vi":"Đã nhận · chính sách đánh giá bắt buộc","en":"Received · policy review required","ko":"수신됨 · 정책 검토 필수"},
  {"source":"Requested","vi":"Thời điểm yêu cầu","en":"Requested","ko":"취소 요청 일시"},
  {"source":"Any time","vi":"Mọi thời điểm","en":"Any time","ko":"전체 기간"},
  {"source":"Today","vi":"Hôm nay","en":"Today","ko":"오늘"},
  {"source":"Last 7 days","vi":"7 ngày qua","en":"Last 7 days","ko":"최근 7일"},
  {"source":"Last 30 days","vi":"30 ngày qua","en":"Last 30 days","ko":"최근 30일"},
  {"source":"deletion requests","vi":"xóa yêu cầu","en":"deletion requests","ko":"삭제 요청"},
  {"source":"No Results Found","vi":"Không tìm thấy kết quả phù hợp","en":"No Results Found","ko":"검색 결과 없음"},
  {"source":"No matching items in deletion requests. Your filters are preserved.","vi":"Không matching items trong xóa yêu cầu. Của bạn bộ lọc được được giữ nguyên.","en":"No matching items in deletion requests. Your filters are preserved.","ko":"없음 matching items 에서 삭제 요청. 내 필터 입니다 유지됨."},
  {"source":"Active filters: Status: all; date: all","vi":"Đang hoạt động bộ lọc: trạng thái: tất cả; ngày: tất cả","en":"Active filters: Status: all; date: all","ko":"활성 필터: 상태: 모든; 날짜: 모든"},
  {"source":"Clear Filters","vi":"Xóa bộ lọc","en":"Clear Filters","ko":"필터 초기화"},
  {"source":"Rocket logo","vi":"Logo Rocket","en":"Rocket logo","ko":"Rocket 로고"},
  {"source":"Admin navigation","vi":"Điều hướng Quản trị","en":"Admin navigation","ko":"관리자 메뉴 탐색"},
  {"source":"Search deletion requests","vi":"Tìm kiếm yêu cầu xóa tài khoản","en":"Search deletion requests","ko":"탈퇴 요청 검색"},
  {"source":"Search reference or requester","vi":"Tìm theo mã yêu cầu hoặc người yêu cầu","en":"Search reference or requester","ko":"요청 번호 또는 신청자 검색"}
]
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Account Deletion Requests — Rocket</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
  <style>:root { --canvas: #faf7f2; --surface: #fff; --text-primary: #181818; --text-secondary: #605a56; --text-muted: #776f6a; --text-inverse: #fff; --selection-strong: #181818; --accent-pink: #fec8cd; --accent-apricot: #ffc19e; --rating-star: #e3a008; --rating-star-filter: brightness(0) saturate(100%) invert(60%) sepia(97%) saturate(1067%) hue-rotate(4deg) brightness(97%) contrast(94%); --gradient-start: #fef0ed; --gradient-warm: #fae4d9; --gradient-peach: #f7d0bf; --gradient-rose: #f9dae4; --border-subtle: #e8e2dc; --border-control: #776f6a; --disabled-surface: #eeeae5; --error: #a3293d; --error-surface: #fbeaec; --success: #25654f; --success-surface: #eaf4ee; --editor-line: #e5e7eb; --editor-bg: #eeeeec; --editor-panel: #fff; --editor-blue: #5551ff; --font-display: "Google Sans Flex"; --font-ui: "Google Sans Flex"; --motion-press: .12s; --motion-selection: .18s; --motion-surface: .22s; --motion-route: .26s; --motion-easing: cubic-bezier(.2, 0, 0, 1); --topbar-height: 52px; --left-sidebar-width: 224px; --right-sidebar-width: 276px; }
* { box-sizing: border-box; }
html, body { width: 100%; height: 100%; margin: 0px; overflow: hidden; }
body { color: var(--text-primary); font-family: var(--font-ui); background: var(--editor-bg); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; }
button { color: inherit; }
.huge-icon { object-fit: contain; object-position: center center; vertical-align: middle; flex: 0 0 auto; width: 24px; height: 24px; display: inline-block; }
button:focus-visible, input:focus-visible, [tabindex]:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 3px; }
.brand-mark { background: var(--text-primary); color: var(--accent-pink); border-radius: 10px; flex: 0 0 auto; place-items: center; display: inline-grid; }
.brand-mark--small { width: 30px; height: 30px; padding: 5px; }
.brand-mark svg { fill: currentcolor; width: 100%; height: 100%; }
.brand-mark .brand-mark__cut { fill: var(--text-primary); }
.brand-mark .brand-mark__dot { fill: var(--surface); }
.primary-button:active:not(:disabled), .secondary-button:active:not(:disabled), .app-icon-button:active { opacity: 0.92; transform: scale(0.98); }
@keyframes screen-enter { 
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0px); }
}
@media (width <= 980px) {:root { --left-sidebar-width: 190px; --right-sidebar-width: 0px; }}
@media (width <= 680px) {:root { --left-sidebar-width: 0px; }}
.admin-deletion-heading { justify-content: space-between; align-items: center; gap: 18px; padding: 18px 20px 14px; display: flex; }
.admin-deletion-heading h2 { font: 600 20px/1.3 var(--font-ui); color: var(--admin-ink); margin: 0px; }
.admin-deletion-heading > span { color: var(--admin-ashen); font-size: 12px; }
.admin-deletion-filter .admin-search-field { flex: 1 1 250px; }
.admin-screen { --font-display: var(--font-ui); --admin-canvas: #f8fafc; --admin-paper: #fff; --admin-stone: #f1f5f9; --admin-ink: #0f172a; --admin-graphite: #334155; --admin-ashen: #64748b; --admin-pebble: #94a3b8; --admin-mist: #cbd5e1; --admin-chalk: #e2e8f0; --admin-clay: #ea580c; --admin-shadow-sm: 0 1px 2px 0 #0000000a; --admin-shadow: 0 1px 3px 0 #0000000f, 0 1px 2px -1px #0000000a; --admin-shadow-md: 0 4px 6px -1px #00000012, 0 2px 4px -2px #0000000d; --admin-shadow-lg: 0 10px 15px -3px #00000014, 0 4px 6px -4px #0000000a; --admin-shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000000f; background: var(--admin-canvas); width: 1440px; height: 960px; color: var(--admin-graphite); font: 400 13px/1.5 var(--font-ui); -webkit-font-smoothing: antialiased; grid-template-columns: 244px minmax(0px, 1fr); display: grid; position: relative; overflow: hidden; }
.admin-five-screen .admin-content { padding-bottom: 32px; }
.admin-five-layout { grid-template-columns: minmax(0px, 1fr) 340px; align-items: start; gap: 20px; display: grid; }
.admin-five-screen--detail .admin-five-layout { display: block; }
.admin-five-layout > :only-child { grid-column: 1 / -1; }
.admin-five-stack { gap: 18px; min-width: 0px; display: grid; }
.admin-five-table-panel { min-width: 0px; }
.admin-four-sibling button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); }
.admin-screen button, .admin-screen input, .admin-screen select, .admin-screen textarea { font: inherit; }
.admin-screen .huge-icon { flex-shrink: 0; width: 18px; height: 18px; }
.admin-sidebar { border-right: 1px solid var(--admin-chalk); background: var(--admin-paper); flex-direction: column; min-width: 0px; min-height: 0px; padding: 24px 16px 20px; display: flex; overflow-y: auto; }
.admin-brand { align-items: center; gap: 12px; padding: 0px 8px; display: flex; }
.admin-brand .brand-mark { background: var(--admin-ink); width: 36px; height: 36px; color: var(--admin-clay); box-shadow: var(--admin-shadow-sm); border-radius: 10px; padding: 7px; }
.admin-brand .brand-mark__cut { fill: var(--admin-ink); }
.admin-brand strong, .admin-brand small { display: block; }
.admin-brand strong { color: var(--admin-ink); font-family: var(--font-ui); letter-spacing: -0.02em; font-size: 18px; font-weight: 700; line-height: 1.1; }
.admin-brand small { color: var(--admin-ashen); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; font-size: 10px; font-weight: 600; }
.admin-nav { gap: 4px; margin-top: 26px; display: grid; }
.admin-nav-item { width: 100%; min-height: 38px; color: var(--admin-graphite); text-align: left; cursor: pointer; background: 0px 0px; border: 0px; border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr) auto; align-items: center; gap: 10px; padding: 0px 10px; font-size: 12px; font-weight: 500; transition: 0.15s; display: grid; }
.admin-nav-item:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-nav-item.is-active { color: var(--admin-clay); background: rgba(234, 88, 12, 0.08); font-weight: 600; }
.admin-nav-item__icon { place-items: center; width: 20px; height: 20px; display: grid; }
.admin-nav-item small { background: var(--admin-stone); min-width: 20px; color: var(--admin-graphite); text-align: center; border-radius: 9999px; padding: 1px 6px; font-size: 10px; font-weight: 600; }
.admin-sidebar__footer { border-top: 1px solid var(--admin-chalk); margin-top: auto; padding-top: 16px; }
.admin-identity { background: var(--admin-stone); border-radius: 10px; align-items: center; gap: 10px; margin-bottom: 8px; padding: 8px 10px; display: flex; }
.admin-identity > span { background: var(--admin-ink); color: rgb(255, 255, 255); border-radius: 50%; flex: 0 0 auto; place-items: center; width: 32px; height: 32px; font-size: 11px; font-weight: 700; display: grid; }
.admin-identity strong, .admin-identity small { display: block; }
.admin-identity strong { color: var(--admin-ink); font-size: 12px; font-weight: 600; }
.admin-identity small { color: var(--admin-ashen); font-size: 11px; }
.admin-sidebar-action { width: 100%; height: 34px; color: var(--admin-graphite); cursor: pointer; background: 0px 0px; border: 0px; border-radius: 6px; align-items: center; gap: 8px; padding: 0px 10px; font-size: 12px; transition: 0.15s; display: flex; }
.admin-sidebar-action:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-main { background: var(--admin-canvas); grid-template-rows: auto minmax(0px, 1fr); min-width: 0px; min-height: 0px; display: grid; }
.admin-topbar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); justify-content: space-between; align-items: center; gap: 24px; min-height: 72px; padding: 16px 32px; display: flex; }
.admin-topbar h1 { font-family: var(--font-ui); letter-spacing: -0.02em; color: var(--admin-ink); margin: 0px; font-size: 22px; font-weight: 700; line-height: 1.25; }
.admin-topbar__actions { align-items: center; gap: 10px; min-height: 40px; display: flex; }
.admin-content { scrollbar-color: var(--admin-mist) transparent; scrollbar-width: thin; min-width: 0px; min-height: 0px; padding: 24px 32px 32px; position: relative; overflow: auto; }
.admin-kicker { color: var(--admin-clay); letter-spacing: 0.08em; text-transform: uppercase; margin: 0px 0px 6px; font-size: 11px; font-weight: 600; }
.admin-primary-button, .admin-secondary-button, .admin-text-button, .admin-icon-action { cursor: pointer; border-radius: 8px; min-height: 38px; font-size: 13px; font-weight: 550; transition: 0.15s; }
.admin-primary-button:hover:not(:disabled) { box-shadow: var(--admin-shadow); background: rgb(30, 41, 59); border-color: rgb(30, 41, 59); }
.admin-primary-button:disabled, .admin-secondary-button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-secondary-button { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-graphite); box-shadow: var(--admin-shadow-sm); padding: 0px 15px; }
.admin-secondary-button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); border-color: var(--admin-pebble); }
.admin-field input, .admin-field textarea, .admin-compact-field select, .admin-filter-bar select, .admin-search-field input { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-ink); border-radius: 8px; font-size: 13px; }
.admin-field input::placeholder, .admin-field textarea::placeholder, .admin-search-field input::placeholder { color: var(--admin-pebble); }
.admin-table-panel { border: 1px solid var(--admin-chalk); background: var(--admin-paper); box-shadow: var(--admin-shadow); border-radius: 12px; overflow: hidden; }
.admin-filter-bar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); align-items: flex-end; gap: 12px; min-height: 68px; padding: 14px 18px; display: flex; }
.admin-filter-bar > label:not(.admin-search-field) { color: var(--admin-ashen); letter-spacing: 0.04em; text-transform: uppercase; gap: 4px; font-size: 11px; font-weight: 600; display: grid; }
.admin-filter-bar select { border: 1px solid var(--admin-mist); background: var(--admin-paper); min-width: 140px; height: 38px; color: var(--admin-ink); border-radius: 8px; padding: 0px 28px 0px 10px; font-size: 13px; }
.admin-search-field { border: 1px solid var(--admin-mist); background: var(--admin-paper); border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr); align-items: center; gap: 8px; min-width: 240px; height: 38px; padding: 0px 12px; transition: 0.15s; display: grid; }
.admin-search-field input { min-width: 0px; height: 34px; color: var(--admin-ink); border: 0px; outline: 0px; padding: 0px; font-size: 13px; }
@keyframes admin-skeleton { 
  0% { opacity: 0.55; }
  100% { opacity: 1; }
}
.admin-provider-gallery button:hover:not(:disabled) { border-color: var(--admin-mist); box-shadow: var(--admin-shadow); }
@media (prefers-reduced-motion: reduce) {*, ::before, ::after { scroll-behavior: auto !important; transition-duration: 1ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important; }}
.admin-screen h1, .admin-screen h2, .admin-screen h3, .admin-screen .admin-brand strong, .admin-screen .admin-nav-item.is-active { font-weight: 600; }
    html, body { width: 100%; height: auto; min-height: 100%; overflow: auto; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  </style>
</head>
<body>
<div class="admin-screen admin-five-screen admin-five-screen--detail admin-five-deletion-screen">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark brand-mark--small" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img" aria-label="Rocket logo">
      <path d="M24 5c8.3 3.6 13 10.1 13 18.1C37 32 31.9 39.5 24 43c-7.9-3.5-13-11-13-19.9C11 15.1 15.7 8.6 24 5Z"></path>
      <path class="brand-mark__cut" d="M24 13.3c3.8 3.1 5.8 6.6 5.8 10.5 0 4.4-2.2 8.2-5.8 11.1-3.6-2.9-5.8-6.7-5.8-11.1 0-3.9 2-7.4 5.8-10.5Z"></path>
      <circle class="brand-mark__dot" cx="24" cy="22" r="3.2"></circle>
    </svg></span>
            <div><strong>Rocket</strong><small>Administration</small></div>
          </div>
          <nav class="admin-nav" aria-label="Admin navigation">
            
      <button class="admin-nav-item" type="button" data-admin-route="admin-dashboard">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\smart house\outline\home.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Dashboard</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-users">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\user\outline\user.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Users</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-provider-verification">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Provider Verification</span>
        <small>23</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-appointments">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\calendar.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Appointments</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-no-show">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\time-oclock.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>No-Show Cases</span>
        <small>5</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-complaints">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\notes and task\outline\notes.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Complaints</span>
        <small>14</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reports">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\education\outline\report.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reports</span>
        <small>4</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reviews">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\star.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reviews</span>
        <small>3</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-regions">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\navigation maps\outline\location.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Regions</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-notifications">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\device\outline\notification.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Notifications</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-banners">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\multimedia and audio\outline\image.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Banners</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-audit">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\editor\outline\document-text.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Audit Log</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-app-config">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\setting.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>App Update</span>
        
      </button>
      <button class="admin-nav-item is-active" type="button" data-admin-route="admin-deletion-requests">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\trash.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Deletion Requests</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-team">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Admin Accounts</span>
        
      </button>
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-identity">
              <span>AM</span>
              <div><strong>Ava Morgan</strong><small>Owner</small></div>
            </div>
            <button class="admin-sidebar-action" type="button" data-admin-change-password=""><img class="huge-icon" src="assets\icons\device\outline\lock.svg" alt="" aria-hidden="true" decoding="async"><span>Change Password</span></button>
            <button class="admin-sidebar-action" type="button" data-admin-sign-out=""><img class="huge-icon" src="assets\icons\interface\outline\logout.svg" alt="" aria-hidden="true" decoding="async"><span>Sign Out</span></button>
          </div>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar">
            <div>
              <h1>Account Deletion Requests</h1>
            </div>
            <div class="admin-topbar__actions"></div>
          </header>
          <div class="admin-content"><div class="admin-five-layout"><div class="admin-five-stack"><section class="admin-table-panel admin-five-table-panel"><div class="admin-deletion-heading"><div><h2>Account deletion requests</h2></div><span>0 requests in this view</span></div>
      <form class="admin-filter-bar admin-deletion-filter"><label class="admin-search-field"><img class="huge-icon" src="assets\icons\interface\outline\search 01.svg" alt="" aria-hidden="true" decoding="async"><input id="deletion-search" type="search" value="missing request" placeholder="Search reference or requester" aria-label="Search deletion requests"></label><label><span>Status</span><select id="deletion-status"><option value="all">All statuses</option><option value="Received · policy review required">Received · policy review required</option></select></label><label><span>Requested</span><select id="deletion-date"><option value="all">Any time</option><option value="today">Today</option><option value="7-days">Last 7 days</option><option value="30-days">Last 30 days</option></select></label></form>
      <section class="admin-five-state admin-five-state--no-results" role="status"><img class="huge-icon" src="assets\icons\interface\outline\search 01.svg" alt="" aria-hidden="true" decoding="async"><div><p class="admin-kicker">deletion requests</p><h2>No Results Found</h2><p>No matching items in deletion requests. Your filters are preserved.</p><small>Active filters: Status: all; date: all</small><button class="admin-secondary-button" type="button" data-five-deletion-clear="">Clear Filters</button></div></section></section></div></div></div>
        </main>
        
        
      </div>
</body>
</html>
```

### Play · Loading
```html
<!--
Màn hình 169: Account Deletion Requests
Components sử dụng (hàm dựng trong app.js):
- Không dùng component trong thư viện uiComponents; giao diện được tạo bằng HTML trực tiếp.
Thành phần khác:
- HTML: <header>, <nav>, <main>, <section>, <aside>, <button>, <img>, <svg>.
- CSS: các quy tắc cần cho màn hình được nhúng trong <style> bên dưới (từ styles.css).
- Font: Google Sans Flex qua Google Fonts.
Nguồn ảnh/icon trong thẻ <img>:
- assets\icons\smart house\outline\home.svg
- assets\icons\user\outline\user.svg
- assets\icons\interface\outline\shield-check.svg
- assets\icons\time and date\outline\calendar.svg
- assets\icons\time and date\outline\time-oclock.svg
- assets\icons\notes and task\outline\notes.svg
- assets\icons\education\outline\report.svg
- assets\icons\interface\outline\star.svg
- assets\icons\navigation maps\outline\location.svg
- assets\icons\device\outline\notification.svg
- assets\icons\multimedia and audio\outline\image.svg
- assets\icons\editor\outline\document-text.svg
- assets\icons\interface\outline\setting.svg
- assets\icons\interface\outline\trash.svg
- assets\icons\device\outline\lock.svg
- assets\icons\interface\outline\logout.svg
Bản dịch chuỗi giao diện (JSON từ i18n.js; vi = Việt, en = Anh, ko = Hàn):
[
  {"source":"Account Deletion Requests","vi":"Hàng chờ yêu cầu xóa tài khoản","en":"Account Deletion Requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"Rocket","vi":"Rocket","en":"Rocket","ko":"Rocket"},
  {"source":"Administration","vi":"Quản trị hệ thống","en":"Administration","ko":"시스템 관리"},
  {"source":"Dashboard","vi":"Bảng điều khiển","en":"Dashboard","ko":"대시보드"},
  {"source":"Users","vi":"Người dùng","en":"Users","ko":"사용자 관리"},
  {"source":"Provider Verification","vi":"Xét duyệt hồ sơ đối tác","en":"Provider Verification","ko":"제공자 입점 및 프로필 심사"},
  {"source":"Appointments","vi":"Lịch hẹn","en":"Appointments","ko":"예약"},
  {"source":"No-Show Cases","vi":"Không-hiển thị Cases","en":"No-Show Cases","ko":"없음-표시 Cases"},
  {"source":"Complaints","vi":"Khiếu nại","en":"Complaints","ko":"불만"},
  {"source":"Reports","vi":"Lượt báo cáo","en":"Reports","ko":"신고 접수 건수"},
  {"source":"Reviews","vi":"Đánh giá","en":"Reviews","ko":"리뷰"},
  {"source":"Regions","vi":"Regions","en":"Regions","ko":"Regions"},
  {"source":"Notifications","vi":"Thông báo","en":"Notifications","ko":"알림"},
  {"source":"Banners","vi":"Banners","en":"Banners","ko":"Banners"},
  {"source":"Audit Log","vi":"Nhật ký kiểm toán hệ thống","en":"Audit Log","ko":"시스템 감사 로그"},
  {"source":"App Update","vi":"App Update","en":"App Update","ko":"App Update"},
  {"source":"Deletion Requests","vi":"Yêu cầu xóa tài khoản","en":"Deletion Requests","ko":"계정 탈퇴 요청"},
  {"source":"Admin Accounts","vi":"Admin Accounts","en":"Admin Accounts","ko":"Admin Accounts"},
  {"source":"AM","vi":"AM","en":"AM","ko":"AM"},
  {"source":"Ava Morgan","vi":"Ava Morgan","en":"Ava Morgan","ko":"Ava Morgan"},
  {"source":"Owner","vi":"Chủ sở hữu","en":"Owner","ko":"소유자"},
  {"source":"Change Password","vi":"Đổi mật khẩu","en":"Change Password","ko":"비밀번호 변경"},
  {"source":"Sign Out","vi":"Đăng xuất","en":"Sign Out","ko":"로그아웃"},
  {"source":"Loading deletion requests…","vi":"Loading xóa yêu cầu…","en":"Loading deletion requests…","ko":"Loading 삭제 요청…"},
  {"source":"Rocket logo","vi":"Logo Rocket","en":"Rocket logo","ko":"Rocket 로고"},
  {"source":"Admin navigation","vi":"Điều hướng Quản trị","en":"Admin navigation","ko":"관리자 메뉴 탐색"},
  {"source":"Loading deletion requests","vi":"Loading xóa yêu cầu","en":"Loading deletion requests","ko":"Loading 삭제 요청"}
]
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Account Deletion Requests — Rocket</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
  <style>:root { --canvas: #faf7f2; --surface: #fff; --text-primary: #181818; --text-secondary: #605a56; --text-muted: #776f6a; --text-inverse: #fff; --selection-strong: #181818; --accent-pink: #fec8cd; --accent-apricot: #ffc19e; --rating-star: #e3a008; --rating-star-filter: brightness(0) saturate(100%) invert(60%) sepia(97%) saturate(1067%) hue-rotate(4deg) brightness(97%) contrast(94%); --gradient-start: #fef0ed; --gradient-warm: #fae4d9; --gradient-peach: #f7d0bf; --gradient-rose: #f9dae4; --border-subtle: #e8e2dc; --border-control: #776f6a; --disabled-surface: #eeeae5; --error: #a3293d; --error-surface: #fbeaec; --success: #25654f; --success-surface: #eaf4ee; --editor-line: #e5e7eb; --editor-bg: #eeeeec; --editor-panel: #fff; --editor-blue: #5551ff; --font-display: "Google Sans Flex"; --font-ui: "Google Sans Flex"; --motion-press: .12s; --motion-selection: .18s; --motion-surface: .22s; --motion-route: .26s; --motion-easing: cubic-bezier(.2, 0, 0, 1); --topbar-height: 52px; --left-sidebar-width: 224px; --right-sidebar-width: 276px; }
* { box-sizing: border-box; }
html, body { width: 100%; height: 100%; margin: 0px; overflow: hidden; }
body { color: var(--text-primary); font-family: var(--font-ui); background: var(--editor-bg); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; }
button { color: inherit; }
.huge-icon { object-fit: contain; object-position: center center; vertical-align: middle; flex: 0 0 auto; width: 24px; height: 24px; display: inline-block; }
button:focus-visible, input:focus-visible, [tabindex]:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 3px; }
.brand-mark { background: var(--text-primary); color: var(--accent-pink); border-radius: 10px; flex: 0 0 auto; place-items: center; display: inline-grid; }
.brand-mark--small { width: 30px; height: 30px; padding: 5px; }
.brand-mark svg { fill: currentcolor; width: 100%; height: 100%; }
.brand-mark .brand-mark__cut { fill: var(--text-primary); }
.brand-mark .brand-mark__dot { fill: var(--surface); }
.primary-button:active:not(:disabled), .secondary-button:active:not(:disabled), .app-icon-button:active { opacity: 0.92; transform: scale(0.98); }
@keyframes screen-enter { 
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0px); }
}
@media (width <= 980px) {:root { --left-sidebar-width: 190px; --right-sidebar-width: 0px; }}
@media (width <= 680px) {:root { --left-sidebar-width: 0px; }}
.admin-screen { --font-display: var(--font-ui); --admin-canvas: #f8fafc; --admin-paper: #fff; --admin-stone: #f1f5f9; --admin-ink: #0f172a; --admin-graphite: #334155; --admin-ashen: #64748b; --admin-pebble: #94a3b8; --admin-mist: #cbd5e1; --admin-chalk: #e2e8f0; --admin-clay: #ea580c; --admin-shadow-sm: 0 1px 2px 0 #0000000a; --admin-shadow: 0 1px 3px 0 #0000000f, 0 1px 2px -1px #0000000a; --admin-shadow-md: 0 4px 6px -1px #00000012, 0 2px 4px -2px #0000000d; --admin-shadow-lg: 0 10px 15px -3px #00000014, 0 4px 6px -4px #0000000a; --admin-shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000000f; background: var(--admin-canvas); width: 1440px; height: 960px; color: var(--admin-graphite); font: 400 13px/1.5 var(--font-ui); -webkit-font-smoothing: antialiased; grid-template-columns: 244px minmax(0px, 1fr); display: grid; position: relative; overflow: hidden; }
.admin-five-screen .admin-content { padding-bottom: 32px; }
.admin-five-layout { grid-template-columns: minmax(0px, 1fr) 340px; align-items: start; gap: 20px; display: grid; }
.admin-five-screen--detail .admin-five-layout { display: block; }
.admin-five-layout > :only-child { grid-column: 1 / -1; }
.admin-four-sibling button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); }
.admin-screen button, .admin-screen input, .admin-screen select, .admin-screen textarea { font: inherit; }
.admin-screen .huge-icon { flex-shrink: 0; width: 18px; height: 18px; }
.admin-sidebar { border-right: 1px solid var(--admin-chalk); background: var(--admin-paper); flex-direction: column; min-width: 0px; min-height: 0px; padding: 24px 16px 20px; display: flex; overflow-y: auto; }
.admin-brand { align-items: center; gap: 12px; padding: 0px 8px; display: flex; }
.admin-brand .brand-mark { background: var(--admin-ink); width: 36px; height: 36px; color: var(--admin-clay); box-shadow: var(--admin-shadow-sm); border-radius: 10px; padding: 7px; }
.admin-brand .brand-mark__cut { fill: var(--admin-ink); }
.admin-brand strong, .admin-brand small { display: block; }
.admin-brand strong { color: var(--admin-ink); font-family: var(--font-ui); letter-spacing: -0.02em; font-size: 18px; font-weight: 700; line-height: 1.1; }
.admin-brand small { color: var(--admin-ashen); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; font-size: 10px; font-weight: 600; }
.admin-nav { gap: 4px; margin-top: 26px; display: grid; }
.admin-nav-item { width: 100%; min-height: 38px; color: var(--admin-graphite); text-align: left; cursor: pointer; background: 0px 0px; border: 0px; border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr) auto; align-items: center; gap: 10px; padding: 0px 10px; font-size: 12px; font-weight: 500; transition: 0.15s; display: grid; }
.admin-nav-item:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-nav-item.is-active { color: var(--admin-clay); background: rgba(234, 88, 12, 0.08); font-weight: 600; }
.admin-nav-item__icon { place-items: center; width: 20px; height: 20px; display: grid; }
.admin-nav-item small { background: var(--admin-stone); min-width: 20px; color: var(--admin-graphite); text-align: center; border-radius: 9999px; padding: 1px 6px; font-size: 10px; font-weight: 600; }
.admin-sidebar__footer { border-top: 1px solid var(--admin-chalk); margin-top: auto; padding-top: 16px; }
.admin-identity { background: var(--admin-stone); border-radius: 10px; align-items: center; gap: 10px; margin-bottom: 8px; padding: 8px 10px; display: flex; }
.admin-identity > span { background: var(--admin-ink); color: rgb(255, 255, 255); border-radius: 50%; flex: 0 0 auto; place-items: center; width: 32px; height: 32px; font-size: 11px; font-weight: 700; display: grid; }
.admin-identity strong, .admin-identity small { display: block; }
.admin-identity strong { color: var(--admin-ink); font-size: 12px; font-weight: 600; }
.admin-identity small { color: var(--admin-ashen); font-size: 11px; }
.admin-sidebar-action { width: 100%; height: 34px; color: var(--admin-graphite); cursor: pointer; background: 0px 0px; border: 0px; border-radius: 6px; align-items: center; gap: 8px; padding: 0px 10px; font-size: 12px; transition: 0.15s; display: flex; }
.admin-sidebar-action:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-main { background: var(--admin-canvas); grid-template-rows: auto minmax(0px, 1fr); min-width: 0px; min-height: 0px; display: grid; }
.admin-topbar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); justify-content: space-between; align-items: center; gap: 24px; min-height: 72px; padding: 16px 32px; display: flex; }
.admin-topbar h1 { font-family: var(--font-ui); letter-spacing: -0.02em; color: var(--admin-ink); margin: 0px; font-size: 22px; font-weight: 700; line-height: 1.25; }
.admin-topbar__actions { align-items: center; gap: 10px; min-height: 40px; display: flex; }
.admin-content { scrollbar-color: var(--admin-mist) transparent; scrollbar-width: thin; min-width: 0px; min-height: 0px; padding: 24px 32px 32px; position: relative; overflow: auto; }
.admin-primary-button:hover:not(:disabled) { box-shadow: var(--admin-shadow); background: rgb(30, 41, 59); border-color: rgb(30, 41, 59); }
.admin-secondary-button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); border-color: var(--admin-pebble); }
@keyframes admin-skeleton { 
  0% { opacity: 0.55; }
  100% { opacity: 1; }
}
.admin-provider-gallery button:hover:not(:disabled) { border-color: var(--admin-mist); box-shadow: var(--admin-shadow); }
@media (prefers-reduced-motion: reduce) {*, ::before, ::after { scroll-behavior: auto !important; transition-duration: 1ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important; }}
.admin-screen h1, .admin-screen h2, .admin-screen h3, .admin-screen .admin-brand strong, .admin-screen .admin-nav-item.is-active { font-weight: 600; }
    html, body { width: 100%; height: auto; min-height: 100%; overflow: auto; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  </style>
</head>
<body>
<div class="admin-screen admin-five-screen admin-five-screen--detail admin-five-deletion-screen">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark brand-mark--small" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img" aria-label="Rocket logo">
      <path d="M24 5c8.3 3.6 13 10.1 13 18.1C37 32 31.9 39.5 24 43c-7.9-3.5-13-11-13-19.9C11 15.1 15.7 8.6 24 5Z"></path>
      <path class="brand-mark__cut" d="M24 13.3c3.8 3.1 5.8 6.6 5.8 10.5 0 4.4-2.2 8.2-5.8 11.1-3.6-2.9-5.8-6.7-5.8-11.1 0-3.9 2-7.4 5.8-10.5Z"></path>
      <circle class="brand-mark__dot" cx="24" cy="22" r="3.2"></circle>
    </svg></span>
            <div><strong>Rocket</strong><small>Administration</small></div>
          </div>
          <nav class="admin-nav" aria-label="Admin navigation">
            
      <button class="admin-nav-item" type="button" data-admin-route="admin-dashboard">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\smart house\outline\home.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Dashboard</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-users">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\user\outline\user.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Users</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-provider-verification">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Provider Verification</span>
        <small>23</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-appointments">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\calendar.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Appointments</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-no-show">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\time-oclock.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>No-Show Cases</span>
        <small>5</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-complaints">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\notes and task\outline\notes.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Complaints</span>
        <small>14</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reports">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\education\outline\report.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reports</span>
        <small>4</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reviews">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\star.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reviews</span>
        <small>3</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-regions">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\navigation maps\outline\location.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Regions</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-notifications">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\device\outline\notification.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Notifications</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-banners">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\multimedia and audio\outline\image.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Banners</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-audit">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\editor\outline\document-text.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Audit Log</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-app-config">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\setting.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>App Update</span>
        
      </button>
      <button class="admin-nav-item is-active" type="button" data-admin-route="admin-deletion-requests">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\trash.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Deletion Requests</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-team">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Admin Accounts</span>
        
      </button>
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-identity">
              <span>AM</span>
              <div><strong>Ava Morgan</strong><small>Owner</small></div>
            </div>
            <button class="admin-sidebar-action" type="button" data-admin-change-password=""><img class="huge-icon" src="assets\icons\device\outline\lock.svg" alt="" aria-hidden="true" decoding="async"><span>Change Password</span></button>
            <button class="admin-sidebar-action" type="button" data-admin-sign-out=""><img class="huge-icon" src="assets\icons\interface\outline\logout.svg" alt="" aria-hidden="true" decoding="async"><span>Sign Out</span></button>
          </div>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar">
            <div>
              <h1>Account Deletion Requests</h1>
            </div>
            <div class="admin-topbar__actions"></div>
          </header>
          <div class="admin-content"><div class="admin-five-layout"><section class="admin-five-state" aria-busy="true" aria-label="Loading deletion requests"><div class="admin-five-skeleton"><span></span><span></span><span></span><span></span></div><p>Loading deletion requests…</p></section></div></div>
        </main>
        
        
      </div>
</body>
</html>
```

### Play · Unable to load
```html
<!--
Màn hình 169: Account Deletion Requests
Components sử dụng (hàm dựng trong app.js):
- Không dùng component trong thư viện uiComponents; giao diện được tạo bằng HTML trực tiếp.
Thành phần khác:
- HTML: <header>, <nav>, <main>, <section>, <aside>, <button>, <img>, <svg>.
- CSS: các quy tắc cần cho màn hình được nhúng trong <style> bên dưới (từ styles.css).
- Font: Google Sans Flex qua Google Fonts.
Nguồn ảnh/icon trong thẻ <img>:
- assets\icons\smart house\outline\home.svg
- assets\icons\user\outline\user.svg
- assets\icons\interface\outline\shield-check.svg
- assets\icons\time and date\outline\calendar.svg
- assets\icons\time and date\outline\time-oclock.svg
- assets\icons\notes and task\outline\notes.svg
- assets\icons\education\outline\report.svg
- assets\icons\interface\outline\star.svg
- assets\icons\navigation maps\outline\location.svg
- assets\icons\device\outline\notification.svg
- assets\icons\multimedia and audio\outline\image.svg
- assets\icons\editor\outline\document-text.svg
- assets\icons\interface\outline\setting.svg
- assets\icons\interface\outline\trash.svg
- assets\icons\device\outline\lock.svg
- assets\icons\interface\outline\logout.svg
- assets\icons\interface\outline\warning.svg
Bản dịch chuỗi giao diện (JSON từ i18n.js; vi = Việt, en = Anh, ko = Hàn):
[
  {"source":"Account Deletion Requests","vi":"Hàng chờ yêu cầu xóa tài khoản","en":"Account Deletion Requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"Rocket","vi":"Rocket","en":"Rocket","ko":"Rocket"},
  {"source":"Administration","vi":"Quản trị hệ thống","en":"Administration","ko":"시스템 관리"},
  {"source":"Dashboard","vi":"Bảng điều khiển","en":"Dashboard","ko":"대시보드"},
  {"source":"Users","vi":"Người dùng","en":"Users","ko":"사용자 관리"},
  {"source":"Provider Verification","vi":"Xét duyệt hồ sơ đối tác","en":"Provider Verification","ko":"제공자 입점 및 프로필 심사"},
  {"source":"Appointments","vi":"Lịch hẹn","en":"Appointments","ko":"예약"},
  {"source":"No-Show Cases","vi":"Không-hiển thị Cases","en":"No-Show Cases","ko":"없음-표시 Cases"},
  {"source":"Complaints","vi":"Khiếu nại","en":"Complaints","ko":"불만"},
  {"source":"Reports","vi":"Lượt báo cáo","en":"Reports","ko":"신고 접수 건수"},
  {"source":"Reviews","vi":"Đánh giá","en":"Reviews","ko":"리뷰"},
  {"source":"Regions","vi":"Regions","en":"Regions","ko":"Regions"},
  {"source":"Notifications","vi":"Thông báo","en":"Notifications","ko":"알림"},
  {"source":"Banners","vi":"Banners","en":"Banners","ko":"Banners"},
  {"source":"Audit Log","vi":"Nhật ký kiểm toán hệ thống","en":"Audit Log","ko":"시스템 감사 로그"},
  {"source":"App Update","vi":"App Update","en":"App Update","ko":"App Update"},
  {"source":"Deletion Requests","vi":"Yêu cầu xóa tài khoản","en":"Deletion Requests","ko":"계정 탈퇴 요청"},
  {"source":"Admin Accounts","vi":"Admin Accounts","en":"Admin Accounts","ko":"Admin Accounts"},
  {"source":"AM","vi":"AM","en":"AM","ko":"AM"},
  {"source":"Ava Morgan","vi":"Ava Morgan","en":"Ava Morgan","ko":"Ava Morgan"},
  {"source":"Owner","vi":"Chủ sở hữu","en":"Owner","ko":"소유자"},
  {"source":"Change Password","vi":"Đổi mật khẩu","en":"Change Password","ko":"비밀번호 변경"},
  {"source":"Sign Out","vi":"Đăng xuất","en":"Sign Out","ko":"로그아웃"},
  {"source":"deletion requests","vi":"xóa yêu cầu","en":"deletion requests","ko":"삭제 요청"},
  {"source":"Unable to Load","vi":"Không thể tải dữ liệu","en":"Unable to Load","ko":"데이터를 불러올 수 없음"},
  {"source":"We couldn't load deletion requests. No count or result has been verified.","vi":"Chúng tôi couldn't load xóa yêu cầu. Không số lượng hoặc kết quả đã được đã xác minh.","en":"We couldn't load deletion requests. No count or result has been verified.","ko":"저희 couldn't load 삭제 요청. 없음 개수 또는 결과 있음 되었습니다 인증됨."},
  {"source":"Try Again","vi":"Thử lại","en":"Try Again","ko":"다시 시도"},
  {"source":"Rocket logo","vi":"Logo Rocket","en":"Rocket logo","ko":"Rocket 로고"},
  {"source":"Admin navigation","vi":"Điều hướng Quản trị","en":"Admin navigation","ko":"관리자 메뉴 탐색"}
]
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Account Deletion Requests — Rocket</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
  <style>:root { --canvas: #faf7f2; --surface: #fff; --text-primary: #181818; --text-secondary: #605a56; --text-muted: #776f6a; --text-inverse: #fff; --selection-strong: #181818; --accent-pink: #fec8cd; --accent-apricot: #ffc19e; --rating-star: #e3a008; --rating-star-filter: brightness(0) saturate(100%) invert(60%) sepia(97%) saturate(1067%) hue-rotate(4deg) brightness(97%) contrast(94%); --gradient-start: #fef0ed; --gradient-warm: #fae4d9; --gradient-peach: #f7d0bf; --gradient-rose: #f9dae4; --border-subtle: #e8e2dc; --border-control: #776f6a; --disabled-surface: #eeeae5; --error: #a3293d; --error-surface: #fbeaec; --success: #25654f; --success-surface: #eaf4ee; --editor-line: #e5e7eb; --editor-bg: #eeeeec; --editor-panel: #fff; --editor-blue: #5551ff; --font-display: "Google Sans Flex"; --font-ui: "Google Sans Flex"; --motion-press: .12s; --motion-selection: .18s; --motion-surface: .22s; --motion-route: .26s; --motion-easing: cubic-bezier(.2, 0, 0, 1); --topbar-height: 52px; --left-sidebar-width: 224px; --right-sidebar-width: 276px; }
* { box-sizing: border-box; }
html, body { width: 100%; height: 100%; margin: 0px; overflow: hidden; }
body { color: var(--text-primary); font-family: var(--font-ui); background: var(--editor-bg); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; }
button { color: inherit; }
.huge-icon { object-fit: contain; object-position: center center; vertical-align: middle; flex: 0 0 auto; width: 24px; height: 24px; display: inline-block; }
button:focus-visible, input:focus-visible, [tabindex]:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 3px; }
.brand-mark { background: var(--text-primary); color: var(--accent-pink); border-radius: 10px; flex: 0 0 auto; place-items: center; display: inline-grid; }
.brand-mark--small { width: 30px; height: 30px; padding: 5px; }
.brand-mark svg { fill: currentcolor; width: 100%; height: 100%; }
.brand-mark .brand-mark__cut { fill: var(--text-primary); }
.brand-mark .brand-mark__dot { fill: var(--surface); }
.primary-button:active:not(:disabled), .secondary-button:active:not(:disabled), .app-icon-button:active { opacity: 0.92; transform: scale(0.98); }
@keyframes screen-enter { 
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0px); }
}
@media (width <= 980px) {:root { --left-sidebar-width: 190px; --right-sidebar-width: 0px; }}
@media (width <= 680px) {:root { --left-sidebar-width: 0px; }}
.admin-screen { --font-display: var(--font-ui); --admin-canvas: #f8fafc; --admin-paper: #fff; --admin-stone: #f1f5f9; --admin-ink: #0f172a; --admin-graphite: #334155; --admin-ashen: #64748b; --admin-pebble: #94a3b8; --admin-mist: #cbd5e1; --admin-chalk: #e2e8f0; --admin-clay: #ea580c; --admin-shadow-sm: 0 1px 2px 0 #0000000a; --admin-shadow: 0 1px 3px 0 #0000000f, 0 1px 2px -1px #0000000a; --admin-shadow-md: 0 4px 6px -1px #00000012, 0 2px 4px -2px #0000000d; --admin-shadow-lg: 0 10px 15px -3px #00000014, 0 4px 6px -4px #0000000a; --admin-shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000000f; background: var(--admin-canvas); width: 1440px; height: 960px; color: var(--admin-graphite); font: 400 13px/1.5 var(--font-ui); -webkit-font-smoothing: antialiased; grid-template-columns: 244px minmax(0px, 1fr); display: grid; position: relative; overflow: hidden; }
.admin-five-screen .admin-content { padding-bottom: 32px; }
.admin-five-layout { grid-template-columns: minmax(0px, 1fr) 340px; align-items: start; gap: 20px; display: grid; }
.admin-five-screen--detail .admin-five-layout { display: block; }
.admin-five-layout > :only-child { grid-column: 1 / -1; }
.admin-four-sibling button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); }
.admin-screen button, .admin-screen input, .admin-screen select, .admin-screen textarea { font: inherit; }
.admin-screen .huge-icon { flex-shrink: 0; width: 18px; height: 18px; }
.admin-sidebar { border-right: 1px solid var(--admin-chalk); background: var(--admin-paper); flex-direction: column; min-width: 0px; min-height: 0px; padding: 24px 16px 20px; display: flex; overflow-y: auto; }
.admin-brand { align-items: center; gap: 12px; padding: 0px 8px; display: flex; }
.admin-brand .brand-mark { background: var(--admin-ink); width: 36px; height: 36px; color: var(--admin-clay); box-shadow: var(--admin-shadow-sm); border-radius: 10px; padding: 7px; }
.admin-brand .brand-mark__cut { fill: var(--admin-ink); }
.admin-brand strong, .admin-brand small { display: block; }
.admin-brand strong { color: var(--admin-ink); font-family: var(--font-ui); letter-spacing: -0.02em; font-size: 18px; font-weight: 700; line-height: 1.1; }
.admin-brand small { color: var(--admin-ashen); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; font-size: 10px; font-weight: 600; }
.admin-nav { gap: 4px; margin-top: 26px; display: grid; }
.admin-nav-item { width: 100%; min-height: 38px; color: var(--admin-graphite); text-align: left; cursor: pointer; background: 0px 0px; border: 0px; border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr) auto; align-items: center; gap: 10px; padding: 0px 10px; font-size: 12px; font-weight: 500; transition: 0.15s; display: grid; }
.admin-nav-item:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-nav-item.is-active { color: var(--admin-clay); background: rgba(234, 88, 12, 0.08); font-weight: 600; }
.admin-nav-item__icon { place-items: center; width: 20px; height: 20px; display: grid; }
.admin-nav-item small { background: var(--admin-stone); min-width: 20px; color: var(--admin-graphite); text-align: center; border-radius: 9999px; padding: 1px 6px; font-size: 10px; font-weight: 600; }
.admin-sidebar__footer { border-top: 1px solid var(--admin-chalk); margin-top: auto; padding-top: 16px; }
.admin-identity { background: var(--admin-stone); border-radius: 10px; align-items: center; gap: 10px; margin-bottom: 8px; padding: 8px 10px; display: flex; }
.admin-identity > span { background: var(--admin-ink); color: rgb(255, 255, 255); border-radius: 50%; flex: 0 0 auto; place-items: center; width: 32px; height: 32px; font-size: 11px; font-weight: 700; display: grid; }
.admin-identity strong, .admin-identity small { display: block; }
.admin-identity strong { color: var(--admin-ink); font-size: 12px; font-weight: 600; }
.admin-identity small { color: var(--admin-ashen); font-size: 11px; }
.admin-sidebar-action { width: 100%; height: 34px; color: var(--admin-graphite); cursor: pointer; background: 0px 0px; border: 0px; border-radius: 6px; align-items: center; gap: 8px; padding: 0px 10px; font-size: 12px; transition: 0.15s; display: flex; }
.admin-sidebar-action:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-main { background: var(--admin-canvas); grid-template-rows: auto minmax(0px, 1fr); min-width: 0px; min-height: 0px; display: grid; }
.admin-topbar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); justify-content: space-between; align-items: center; gap: 24px; min-height: 72px; padding: 16px 32px; display: flex; }
.admin-topbar h1 { font-family: var(--font-ui); letter-spacing: -0.02em; color: var(--admin-ink); margin: 0px; font-size: 22px; font-weight: 700; line-height: 1.25; }
.admin-topbar__actions { align-items: center; gap: 10px; min-height: 40px; display: flex; }
.admin-content { scrollbar-color: var(--admin-mist) transparent; scrollbar-width: thin; min-width: 0px; min-height: 0px; padding: 24px 32px 32px; position: relative; overflow: auto; }
.admin-kicker { color: var(--admin-clay); letter-spacing: 0.08em; text-transform: uppercase; margin: 0px 0px 6px; font-size: 11px; font-weight: 600; }
.admin-primary-button, .admin-secondary-button, .admin-text-button, .admin-icon-action { cursor: pointer; border-radius: 8px; min-height: 38px; font-size: 13px; font-weight: 550; transition: 0.15s; }
.admin-primary-button:hover:not(:disabled) { box-shadow: var(--admin-shadow); background: rgb(30, 41, 59); border-color: rgb(30, 41, 59); }
.admin-primary-button:disabled, .admin-secondary-button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-secondary-button { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-graphite); box-shadow: var(--admin-shadow-sm); padding: 0px 15px; }
.admin-secondary-button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); border-color: var(--admin-pebble); }
@keyframes admin-skeleton { 
  0% { opacity: 0.55; }
  100% { opacity: 1; }
}
.admin-provider-gallery button:hover:not(:disabled) { border-color: var(--admin-mist); box-shadow: var(--admin-shadow); }
@media (prefers-reduced-motion: reduce) {*, ::before, ::after { scroll-behavior: auto !important; transition-duration: 1ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important; }}
.admin-screen h1, .admin-screen h2, .admin-screen h3, .admin-screen .admin-brand strong, .admin-screen .admin-nav-item.is-active { font-weight: 600; }
    html, body { width: 100%; height: auto; min-height: 100%; overflow: auto; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  </style>
</head>
<body>
<div class="admin-screen admin-five-screen admin-five-screen--detail admin-five-deletion-screen">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark brand-mark--small" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img" aria-label="Rocket logo">
      <path d="M24 5c8.3 3.6 13 10.1 13 18.1C37 32 31.9 39.5 24 43c-7.9-3.5-13-11-13-19.9C11 15.1 15.7 8.6 24 5Z"></path>
      <path class="brand-mark__cut" d="M24 13.3c3.8 3.1 5.8 6.6 5.8 10.5 0 4.4-2.2 8.2-5.8 11.1-3.6-2.9-5.8-6.7-5.8-11.1 0-3.9 2-7.4 5.8-10.5Z"></path>
      <circle class="brand-mark__dot" cx="24" cy="22" r="3.2"></circle>
    </svg></span>
            <div><strong>Rocket</strong><small>Administration</small></div>
          </div>
          <nav class="admin-nav" aria-label="Admin navigation">
            
      <button class="admin-nav-item" type="button" data-admin-route="admin-dashboard">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\smart house\outline\home.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Dashboard</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-users">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\user\outline\user.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Users</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-provider-verification">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Provider Verification</span>
        <small>23</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-appointments">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\calendar.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Appointments</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-no-show">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\time-oclock.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>No-Show Cases</span>
        <small>5</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-complaints">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\notes and task\outline\notes.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Complaints</span>
        <small>14</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reports">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\education\outline\report.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reports</span>
        <small>4</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reviews">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\star.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reviews</span>
        <small>3</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-regions">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\navigation maps\outline\location.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Regions</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-notifications">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\device\outline\notification.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Notifications</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-banners">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\multimedia and audio\outline\image.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Banners</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-audit">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\editor\outline\document-text.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Audit Log</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-app-config">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\setting.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>App Update</span>
        
      </button>
      <button class="admin-nav-item is-active" type="button" data-admin-route="admin-deletion-requests">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\trash.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Deletion Requests</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-team">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Admin Accounts</span>
        
      </button>
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-identity">
              <span>AM</span>
              <div><strong>Ava Morgan</strong><small>Owner</small></div>
            </div>
            <button class="admin-sidebar-action" type="button" data-admin-change-password=""><img class="huge-icon" src="assets\icons\device\outline\lock.svg" alt="" aria-hidden="true" decoding="async"><span>Change Password</span></button>
            <button class="admin-sidebar-action" type="button" data-admin-sign-out=""><img class="huge-icon" src="assets\icons\interface\outline\logout.svg" alt="" aria-hidden="true" decoding="async"><span>Sign Out</span></button>
          </div>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar">
            <div>
              <h1>Account Deletion Requests</h1>
            </div>
            <div class="admin-topbar__actions"></div>
          </header>
          <div class="admin-content"><div class="admin-five-layout"><section class="admin-five-state admin-five-state--load-error" role="status"><img class="huge-icon" src="assets\icons\interface\outline\warning.svg" alt="" aria-hidden="true" decoding="async"><div><p class="admin-kicker">deletion requests</p><h2>Unable to Load</h2><p>We couldn't load deletion requests. No count or result has been verified.</p><button class="admin-secondary-button" type="button" data-five-deletion-retry="">Try Again</button></div></section></div></div>
        </main>
        
        
      </div>
</body>
</html>
```

### Play · Permission lost
```html
<!--
Màn hình 169: Account Deletion Requests
Components sử dụng (hàm dựng trong app.js):
- Không dùng component trong thư viện uiComponents; giao diện được tạo bằng HTML trực tiếp.
Thành phần khác:
- HTML: <header>, <nav>, <main>, <section>, <aside>, <button>, <img>, <svg>.
- CSS: các quy tắc cần cho màn hình được nhúng trong <style> bên dưới (từ styles.css).
- Font: Google Sans Flex qua Google Fonts.
Nguồn ảnh/icon trong thẻ <img>:
- assets\icons\smart house\outline\home.svg
- assets\icons\user\outline\user.svg
- assets\icons\interface\outline\shield-check.svg
- assets\icons\time and date\outline\calendar.svg
- assets\icons\time and date\outline\time-oclock.svg
- assets\icons\notes and task\outline\notes.svg
- assets\icons\education\outline\report.svg
- assets\icons\interface\outline\star.svg
- assets\icons\navigation maps\outline\location.svg
- assets\icons\device\outline\notification.svg
- assets\icons\multimedia and audio\outline\image.svg
- assets\icons\editor\outline\document-text.svg
- assets\icons\interface\outline\setting.svg
- assets\icons\interface\outline\trash.svg
- assets\icons\device\outline\lock.svg
- assets\icons\interface\outline\logout.svg
- assets\icons\interface\outline\shield-warning.svg
Bản dịch chuỗi giao diện (JSON từ i18n.js; vi = Việt, en = Anh, ko = Hàn):
[
  {"source":"Account Deletion Requests","vi":"Hàng chờ yêu cầu xóa tài khoản","en":"Account Deletion Requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"Rocket","vi":"Rocket","en":"Rocket","ko":"Rocket"},
  {"source":"Administration","vi":"Quản trị hệ thống","en":"Administration","ko":"시스템 관리"},
  {"source":"Dashboard","vi":"Bảng điều khiển","en":"Dashboard","ko":"대시보드"},
  {"source":"Users","vi":"Người dùng","en":"Users","ko":"사용자 관리"},
  {"source":"Provider Verification","vi":"Xét duyệt hồ sơ đối tác","en":"Provider Verification","ko":"제공자 입점 및 프로필 심사"},
  {"source":"Appointments","vi":"Lịch hẹn","en":"Appointments","ko":"예약"},
  {"source":"No-Show Cases","vi":"Không-hiển thị Cases","en":"No-Show Cases","ko":"없음-표시 Cases"},
  {"source":"Complaints","vi":"Khiếu nại","en":"Complaints","ko":"불만"},
  {"source":"Reports","vi":"Lượt báo cáo","en":"Reports","ko":"신고 접수 건수"},
  {"source":"Reviews","vi":"Đánh giá","en":"Reviews","ko":"리뷰"},
  {"source":"Regions","vi":"Regions","en":"Regions","ko":"Regions"},
  {"source":"Notifications","vi":"Thông báo","en":"Notifications","ko":"알림"},
  {"source":"Banners","vi":"Banners","en":"Banners","ko":"Banners"},
  {"source":"Audit Log","vi":"Nhật ký kiểm toán hệ thống","en":"Audit Log","ko":"시스템 감사 로그"},
  {"source":"App Update","vi":"App Update","en":"App Update","ko":"App Update"},
  {"source":"Deletion Requests","vi":"Yêu cầu xóa tài khoản","en":"Deletion Requests","ko":"계정 탈퇴 요청"},
  {"source":"Admin Accounts","vi":"Admin Accounts","en":"Admin Accounts","ko":"Admin Accounts"},
  {"source":"AM","vi":"AM","en":"AM","ko":"AM"},
  {"source":"Ava Morgan","vi":"Ava Morgan","en":"Ava Morgan","ko":"Ava Morgan"},
  {"source":"Owner","vi":"Chủ sở hữu","en":"Owner","ko":"소유자"},
  {"source":"Change Password","vi":"Đổi mật khẩu","en":"Change Password","ko":"비밀번호 변경"},
  {"source":"Sign Out","vi":"Đăng xuất","en":"Sign Out","ko":"로그아웃"},
  {"source":"deletion requests","vi":"xóa yêu cầu","en":"deletion requests","ko":"삭제 요청"},
  {"source":"Action Unavailable","vi":"Thao tác không khả dụng","en":"Action Unavailable","ko":"작업 권한 없음 (사용 불가)"},
  {"source":"Your access to deletion requests changed. Restricted details and actions have been removed.","vi":"Của bạn quyền truy cập đến xóa yêu cầu đã thay đổi. Restricted chi tiết và thao tác have được đã xóa.","en":"Your access to deletion requests changed. Restricted details and actions have been removed.","ko":"내 접근 삭제 요청 변경됨. Restricted 상세 및 작업 have 되었습니다 제거됨."},
  {"source":"Back to Dashboard","vi":"Về Bảng điều khiển","en":"Back to Dashboard","ko":"대시보드로 돌아가기"},
  {"source":"Rocket logo","vi":"Logo Rocket","en":"Rocket logo","ko":"Rocket 로고"},
  {"source":"Admin navigation","vi":"Điều hướng Quản trị","en":"Admin navigation","ko":"관리자 메뉴 탐색"}
]
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Account Deletion Requests — Rocket</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
  <style>:root { --canvas: #faf7f2; --surface: #fff; --text-primary: #181818; --text-secondary: #605a56; --text-muted: #776f6a; --text-inverse: #fff; --selection-strong: #181818; --accent-pink: #fec8cd; --accent-apricot: #ffc19e; --rating-star: #e3a008; --rating-star-filter: brightness(0) saturate(100%) invert(60%) sepia(97%) saturate(1067%) hue-rotate(4deg) brightness(97%) contrast(94%); --gradient-start: #fef0ed; --gradient-warm: #fae4d9; --gradient-peach: #f7d0bf; --gradient-rose: #f9dae4; --border-subtle: #e8e2dc; --border-control: #776f6a; --disabled-surface: #eeeae5; --error: #a3293d; --error-surface: #fbeaec; --success: #25654f; --success-surface: #eaf4ee; --editor-line: #e5e7eb; --editor-bg: #eeeeec; --editor-panel: #fff; --editor-blue: #5551ff; --font-display: "Google Sans Flex"; --font-ui: "Google Sans Flex"; --motion-press: .12s; --motion-selection: .18s; --motion-surface: .22s; --motion-route: .26s; --motion-easing: cubic-bezier(.2, 0, 0, 1); --topbar-height: 52px; --left-sidebar-width: 224px; --right-sidebar-width: 276px; }
* { box-sizing: border-box; }
html, body { width: 100%; height: 100%; margin: 0px; overflow: hidden; }
body { color: var(--text-primary); font-family: var(--font-ui); background: var(--editor-bg); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; }
button { color: inherit; }
.huge-icon { object-fit: contain; object-position: center center; vertical-align: middle; flex: 0 0 auto; width: 24px; height: 24px; display: inline-block; }
button:focus-visible, input:focus-visible, [tabindex]:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 3px; }
.brand-mark { background: var(--text-primary); color: var(--accent-pink); border-radius: 10px; flex: 0 0 auto; place-items: center; display: inline-grid; }
.brand-mark--small { width: 30px; height: 30px; padding: 5px; }
.brand-mark svg { fill: currentcolor; width: 100%; height: 100%; }
.brand-mark .brand-mark__cut { fill: var(--text-primary); }
.brand-mark .brand-mark__dot { fill: var(--surface); }
.primary-button:active:not(:disabled), .secondary-button:active:not(:disabled), .app-icon-button:active { opacity: 0.92; transform: scale(0.98); }
@keyframes screen-enter { 
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0px); }
}
@media (width <= 980px) {:root { --left-sidebar-width: 190px; --right-sidebar-width: 0px; }}
@media (width <= 680px) {:root { --left-sidebar-width: 0px; }}
.admin-screen { --font-display: var(--font-ui); --admin-canvas: #f8fafc; --admin-paper: #fff; --admin-stone: #f1f5f9; --admin-ink: #0f172a; --admin-graphite: #334155; --admin-ashen: #64748b; --admin-pebble: #94a3b8; --admin-mist: #cbd5e1; --admin-chalk: #e2e8f0; --admin-clay: #ea580c; --admin-shadow-sm: 0 1px 2px 0 #0000000a; --admin-shadow: 0 1px 3px 0 #0000000f, 0 1px 2px -1px #0000000a; --admin-shadow-md: 0 4px 6px -1px #00000012, 0 2px 4px -2px #0000000d; --admin-shadow-lg: 0 10px 15px -3px #00000014, 0 4px 6px -4px #0000000a; --admin-shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000000f; background: var(--admin-canvas); width: 1440px; height: 960px; color: var(--admin-graphite); font: 400 13px/1.5 var(--font-ui); -webkit-font-smoothing: antialiased; grid-template-columns: 244px minmax(0px, 1fr); display: grid; position: relative; overflow: hidden; }
.admin-five-screen .admin-content { padding-bottom: 32px; }
.admin-five-layout { grid-template-columns: minmax(0px, 1fr) 340px; align-items: start; gap: 20px; display: grid; }
.admin-five-screen--detail .admin-five-layout { display: block; }
.admin-five-layout > :only-child { grid-column: 1 / -1; }
.admin-four-sibling button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); }
.admin-screen button, .admin-screen input, .admin-screen select, .admin-screen textarea { font: inherit; }
.admin-screen .huge-icon { flex-shrink: 0; width: 18px; height: 18px; }
.admin-sidebar { border-right: 1px solid var(--admin-chalk); background: var(--admin-paper); flex-direction: column; min-width: 0px; min-height: 0px; padding: 24px 16px 20px; display: flex; overflow-y: auto; }
.admin-brand { align-items: center; gap: 12px; padding: 0px 8px; display: flex; }
.admin-brand .brand-mark { background: var(--admin-ink); width: 36px; height: 36px; color: var(--admin-clay); box-shadow: var(--admin-shadow-sm); border-radius: 10px; padding: 7px; }
.admin-brand .brand-mark__cut { fill: var(--admin-ink); }
.admin-brand strong, .admin-brand small { display: block; }
.admin-brand strong { color: var(--admin-ink); font-family: var(--font-ui); letter-spacing: -0.02em; font-size: 18px; font-weight: 700; line-height: 1.1; }
.admin-brand small { color: var(--admin-ashen); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; font-size: 10px; font-weight: 600; }
.admin-nav { gap: 4px; margin-top: 26px; display: grid; }
.admin-nav-item { width: 100%; min-height: 38px; color: var(--admin-graphite); text-align: left; cursor: pointer; background: 0px 0px; border: 0px; border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr) auto; align-items: center; gap: 10px; padding: 0px 10px; font-size: 12px; font-weight: 500; transition: 0.15s; display: grid; }
.admin-nav-item:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-nav-item.is-active { color: var(--admin-clay); background: rgba(234, 88, 12, 0.08); font-weight: 600; }
.admin-nav-item__icon { place-items: center; width: 20px; height: 20px; display: grid; }
.admin-nav-item small { background: var(--admin-stone); min-width: 20px; color: var(--admin-graphite); text-align: center; border-radius: 9999px; padding: 1px 6px; font-size: 10px; font-weight: 600; }
.admin-sidebar__footer { border-top: 1px solid var(--admin-chalk); margin-top: auto; padding-top: 16px; }
.admin-identity { background: var(--admin-stone); border-radius: 10px; align-items: center; gap: 10px; margin-bottom: 8px; padding: 8px 10px; display: flex; }
.admin-identity > span { background: var(--admin-ink); color: rgb(255, 255, 255); border-radius: 50%; flex: 0 0 auto; place-items: center; width: 32px; height: 32px; font-size: 11px; font-weight: 700; display: grid; }
.admin-identity strong, .admin-identity small { display: block; }
.admin-identity strong { color: var(--admin-ink); font-size: 12px; font-weight: 600; }
.admin-identity small { color: var(--admin-ashen); font-size: 11px; }
.admin-sidebar-action { width: 100%; height: 34px; color: var(--admin-graphite); cursor: pointer; background: 0px 0px; border: 0px; border-radius: 6px; align-items: center; gap: 8px; padding: 0px 10px; font-size: 12px; transition: 0.15s; display: flex; }
.admin-sidebar-action:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-main { background: var(--admin-canvas); grid-template-rows: auto minmax(0px, 1fr); min-width: 0px; min-height: 0px; display: grid; }
.admin-topbar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); justify-content: space-between; align-items: center; gap: 24px; min-height: 72px; padding: 16px 32px; display: flex; }
.admin-topbar h1 { font-family: var(--font-ui); letter-spacing: -0.02em; color: var(--admin-ink); margin: 0px; font-size: 22px; font-weight: 700; line-height: 1.25; }
.admin-topbar__actions { align-items: center; gap: 10px; min-height: 40px; display: flex; }
.admin-content { scrollbar-color: var(--admin-mist) transparent; scrollbar-width: thin; min-width: 0px; min-height: 0px; padding: 24px 32px 32px; position: relative; overflow: auto; }
.admin-kicker { color: var(--admin-clay); letter-spacing: 0.08em; text-transform: uppercase; margin: 0px 0px 6px; font-size: 11px; font-weight: 600; }
.admin-primary-button, .admin-secondary-button, .admin-text-button, .admin-icon-action { cursor: pointer; border-radius: 8px; min-height: 38px; font-size: 13px; font-weight: 550; transition: 0.15s; }
.admin-primary-button:hover:not(:disabled) { box-shadow: var(--admin-shadow); background: rgb(30, 41, 59); border-color: rgb(30, 41, 59); }
.admin-primary-button:disabled, .admin-secondary-button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-secondary-button { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-graphite); box-shadow: var(--admin-shadow-sm); padding: 0px 15px; }
.admin-secondary-button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); border-color: var(--admin-pebble); }
@keyframes admin-skeleton { 
  0% { opacity: 0.55; }
  100% { opacity: 1; }
}
.admin-provider-gallery button:hover:not(:disabled) { border-color: var(--admin-mist); box-shadow: var(--admin-shadow); }
@media (prefers-reduced-motion: reduce) {*, ::before, ::after { scroll-behavior: auto !important; transition-duration: 1ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important; }}
.admin-screen h1, .admin-screen h2, .admin-screen h3, .admin-screen .admin-brand strong, .admin-screen .admin-nav-item.is-active { font-weight: 600; }
    html, body { width: 100%; height: auto; min-height: 100%; overflow: auto; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  </style>
</head>
<body>
<div class="admin-screen admin-five-screen admin-five-screen--detail admin-five-deletion-screen">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark brand-mark--small" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img" aria-label="Rocket logo">
      <path d="M24 5c8.3 3.6 13 10.1 13 18.1C37 32 31.9 39.5 24 43c-7.9-3.5-13-11-13-19.9C11 15.1 15.7 8.6 24 5Z"></path>
      <path class="brand-mark__cut" d="M24 13.3c3.8 3.1 5.8 6.6 5.8 10.5 0 4.4-2.2 8.2-5.8 11.1-3.6-2.9-5.8-6.7-5.8-11.1 0-3.9 2-7.4 5.8-10.5Z"></path>
      <circle class="brand-mark__dot" cx="24" cy="22" r="3.2"></circle>
    </svg></span>
            <div><strong>Rocket</strong><small>Administration</small></div>
          </div>
          <nav class="admin-nav" aria-label="Admin navigation">
            
      <button class="admin-nav-item" type="button" data-admin-route="admin-dashboard">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\smart house\outline\home.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Dashboard</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-users">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\user\outline\user.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Users</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-provider-verification">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Provider Verification</span>
        <small>23</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-appointments">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\calendar.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Appointments</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-no-show">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\time-oclock.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>No-Show Cases</span>
        <small>5</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-complaints">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\notes and task\outline\notes.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Complaints</span>
        <small>14</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reports">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\education\outline\report.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reports</span>
        <small>4</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reviews">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\star.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reviews</span>
        <small>3</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-regions">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\navigation maps\outline\location.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Regions</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-notifications">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\device\outline\notification.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Notifications</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-banners">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\multimedia and audio\outline\image.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Banners</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-audit">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\editor\outline\document-text.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Audit Log</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-app-config">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\setting.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>App Update</span>
        
      </button>
      <button class="admin-nav-item is-active" type="button" data-admin-route="admin-deletion-requests">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\trash.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Deletion Requests</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-team">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Admin Accounts</span>
        
      </button>
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-identity">
              <span>AM</span>
              <div><strong>Ava Morgan</strong><small>Owner</small></div>
            </div>
            <button class="admin-sidebar-action" type="button" data-admin-change-password=""><img class="huge-icon" src="assets\icons\device\outline\lock.svg" alt="" aria-hidden="true" decoding="async"><span>Change Password</span></button>
            <button class="admin-sidebar-action" type="button" data-admin-sign-out=""><img class="huge-icon" src="assets\icons\interface\outline\logout.svg" alt="" aria-hidden="true" decoding="async"><span>Sign Out</span></button>
          </div>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar">
            <div>
              <h1>Account Deletion Requests</h1>
            </div>
            <div class="admin-topbar__actions"></div>
          </header>
          <div class="admin-content"><div class="admin-five-layout"><section class="admin-five-state admin-five-state--permission" role="status"><img class="huge-icon" src="assets\icons\interface\outline\shield-warning.svg" alt="" aria-hidden="true" decoding="async"><div><p class="admin-kicker">deletion requests</p><h2>Action Unavailable</h2><p>Your access to deletion requests changed. Restricted details and actions have been removed.</p><button class="admin-secondary-button" type="button" data-five-deletion-dashboard="">Back to Dashboard</button></div></section></div></div>
        </main>
        
        
      </div>
</body>
</html>
```

### Change password dialog
```html
<!--
Màn hình 169: Account Deletion Requests
Components sử dụng (hàm dựng trong app.js):
- Không dùng component trong thư viện uiComponents; giao diện được tạo bằng HTML trực tiếp.
Thành phần khác:
- HTML: <header>, <nav>, <main>, <section>, <aside>, <form>, <label>, <button>, <input>, <select>, <img>, <svg>.
- CSS: các quy tắc cần cho màn hình được nhúng trong <style> bên dưới (từ styles.css).
- Font: Google Sans Flex qua Google Fonts.
Nguồn ảnh/icon trong thẻ <img>:
- assets\icons\smart house\outline\home.svg
- assets\icons\user\outline\user.svg
- assets\icons\interface\outline\shield-check.svg
- assets\icons\time and date\outline\calendar.svg
- assets\icons\time and date\outline\time-oclock.svg
- assets\icons\notes and task\outline\notes.svg
- assets\icons\education\outline\report.svg
- assets\icons\interface\outline\star.svg
- assets\icons\navigation maps\outline\location.svg
- assets\icons\device\outline\notification.svg
- assets\icons\multimedia and audio\outline\image.svg
- assets\icons\editor\outline\document-text.svg
- assets\icons\interface\outline\setting.svg
- assets\icons\interface\outline\trash.svg
- assets\icons\device\outline\lock.svg
- assets\icons\interface\outline\logout.svg
- assets\icons\interface\outline\search 01.svg
Bản dịch chuỗi giao diện (JSON từ i18n.js; vi = Việt, en = Anh, ko = Hàn):
[
  {"source":"Account Deletion Requests","vi":"Hàng chờ yêu cầu xóa tài khoản","en":"Account Deletion Requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"Rocket","vi":"Rocket","en":"Rocket","ko":"Rocket"},
  {"source":"Administration","vi":"Quản trị hệ thống","en":"Administration","ko":"시스템 관리"},
  {"source":"Dashboard","vi":"Bảng điều khiển","en":"Dashboard","ko":"대시보드"},
  {"source":"Users","vi":"Người dùng","en":"Users","ko":"사용자 관리"},
  {"source":"Provider Verification","vi":"Xét duyệt hồ sơ đối tác","en":"Provider Verification","ko":"제공자 입점 및 프로필 심사"},
  {"source":"Appointments","vi":"Lịch hẹn","en":"Appointments","ko":"예약"},
  {"source":"No-Show Cases","vi":"Không-hiển thị Cases","en":"No-Show Cases","ko":"없음-표시 Cases"},
  {"source":"Complaints","vi":"Khiếu nại","en":"Complaints","ko":"불만"},
  {"source":"Reports","vi":"Lượt báo cáo","en":"Reports","ko":"신고 접수 건수"},
  {"source":"Reviews","vi":"Đánh giá","en":"Reviews","ko":"리뷰"},
  {"source":"Regions","vi":"Regions","en":"Regions","ko":"Regions"},
  {"source":"Notifications","vi":"Thông báo","en":"Notifications","ko":"알림"},
  {"source":"Banners","vi":"Banners","en":"Banners","ko":"Banners"},
  {"source":"Audit Log","vi":"Nhật ký kiểm toán hệ thống","en":"Audit Log","ko":"시스템 감사 로그"},
  {"source":"App Update","vi":"App Update","en":"App Update","ko":"App Update"},
  {"source":"Deletion Requests","vi":"Yêu cầu xóa tài khoản","en":"Deletion Requests","ko":"계정 탈퇴 요청"},
  {"source":"Admin Accounts","vi":"Admin Accounts","en":"Admin Accounts","ko":"Admin Accounts"},
  {"source":"AM","vi":"AM","en":"AM","ko":"AM"},
  {"source":"Ava Morgan","vi":"Ava Morgan","en":"Ava Morgan","ko":"Ava Morgan"},
  {"source":"Owner","vi":"Chủ sở hữu","en":"Owner","ko":"소유자"},
  {"source":"Change Password","vi":"Đổi mật khẩu","en":"Change Password","ko":"비밀번호 변경"},
  {"source":"Sign Out","vi":"Đăng xuất","en":"Sign Out","ko":"로그아웃"},
  {"source":"Account deletion requests","vi":"Yêu cầu xóa tài khoản","en":"Account deletion requests","ko":"계정 탈퇴(삭제) 요청 대기열"},
  {"source":"3 requests in this view","vi":"3 yêu cầu trong chế độ xem này","en":"3 requests in this view","ko":"현재 화면에 3건의 요청 표시 중"},
  {"source":"Status","vi":"Trạng thái","en":"Status","ko":"상태"},
  {"source":"All statuses","vi":"Tất cả trạng thái","en":"All statuses","ko":"전체 상태"},
  {"source":"Received · policy review required","vi":"Đã nhận · chính sách đánh giá bắt buộc","en":"Received · policy review required","ko":"수신됨 · 정책 검토 필수"},
  {"source":"Requested","vi":"Thời điểm yêu cầu","en":"Requested","ko":"취소 요청 일시"},
  {"source":"Any time","vi":"Mọi thời điểm","en":"Any time","ko":"전체 기간"},
  {"source":"Today","vi":"Hôm nay","en":"Today","ko":"오늘"},
  {"source":"Last 7 days","vi":"7 ngày qua","en":"Last 7 days","ko":"최근 7일"},
  {"source":"Last 30 days","vi":"30 ngày qua","en":"Last 30 days","ko":"최근 30일"},
  {"source":"Reference","vi":"Mã tham chiếu","en":"Reference","ko":"참조 번호"},
  {"source":"Requester","vi":"Người yêu cầu hủy","en":"Requester","ko":"취소 요청자"},
  {"source":"DEL-1024","vi":"DEL-1024","en":"DEL-1024","ko":"DEL-1024"},
  {"source":"Jamie Rivera","vi":"Jamie Rivera","en":"Jamie Rivera","ko":"Jamie Rivera"},
  {"source":"Customer · Active","vi":"Khách hàng · đang hoạt động","en":"Customer · Active","ko":"고객 · 활성"},
  {"source":"Sep 24, 2026 · 18:12 ICT","vi":"Sep 24, 2026 · 18:12 ICT","en":"Sep 24, 2026 · 18:12 ICT","ko":"Sep 24, 2026 · 18:12 ICT"},
  {"source":"View Request","vi":"Xem yêu cầu","en":"View Request","ko":"요청 상세 보기"},
  {"source":"DEL-1023","vi":"DEL-1023","en":"DEL-1023","ko":"DEL-1023"},
  {"source":"Lotus Wellness","vi":"Lotus Wellness","en":"Lotus Wellness","ko":"Lotus Wellness"},
  {"source":"Service Provider · Active","vi":"Dịch vụ nhà cung cấp · đang hoạt động","en":"Service Provider · Active","ko":"서비스 제공자 · 활성"},
  {"source":"Sep 18, 2026 · 09:30 ICT","vi":"Sep 18, 2026 · 09:30 ICT","en":"Sep 18, 2026 · 09:30 ICT","ko":"Sep 18, 2026 · 09:30 ICT"},
  {"source":"Page 1 of 2 · 3 matching requests","vi":"Page 1 của 2 · 3 matching yêu cầu","en":"Page 1 of 2 · 3 matching requests","ko":"Page 1 의 2 · 3 matching 요청"},
  {"source":"Previous","vi":"Trang trước","en":"Previous","ko":"이전"},
  {"source":"Next","vi":"Trang sau","en":"Next","ko":"다음"},
  {"source":"Enter your current password and choose a new one.","vi":"Nhập mật khẩu hiện tại và chọn mật khẩu mới.","en":"Enter your current password and choose a new one.","ko":"현재 비밀번호를 입력하고 새 비밀번호를 설정하세요."},
  {"source":"Current Password","vi":"Mật khẩu hiện tại","en":"Current Password","ko":"현재 비밀번호"},
  {"source":"New Password","vi":"Mật khẩu mới","en":"New Password","ko":"새 비밀번호"},
  {"source":"Confirm New Password","vi":"Xác nhận mật khẩu mới","en":"Confirm New Password","ko":"새 비밀번호 확인"},
  {"source":"Cancel","vi":"Hủy bỏ","en":"Cancel","ko":"취소"},
  {"source":"Save Password","vi":"Lưu mật khẩu","en":"Save Password","ko":"비밀번호 저장"},
  {"source":"Rocket logo","vi":"Logo Rocket","en":"Rocket logo","ko":"Rocket 로고"},
  {"source":"Admin navigation","vi":"Điều hướng Quản trị","en":"Admin navigation","ko":"관리자 메뉴 탐색"},
  {"source":"Search deletion requests","vi":"Tìm kiếm yêu cầu xóa tài khoản","en":"Search deletion requests","ko":"탈퇴 요청 검색"},
  {"source":"Search reference or requester","vi":"Tìm theo mã yêu cầu hoặc người yêu cầu","en":"Search reference or requester","ko":"요청 번호 또는 신청자 검색"},
  {"source":"Request pages","vi":"Phân trang yêu cầu","en":"Request pages","ko":"요청 목록 페이지"}
]
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Account Deletion Requests — Rocket</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
  <style>:root { --canvas: #faf7f2; --surface: #fff; --text-primary: #181818; --text-secondary: #605a56; --text-muted: #776f6a; --text-inverse: #fff; --selection-strong: #181818; --accent-pink: #fec8cd; --accent-apricot: #ffc19e; --rating-star: #e3a008; --rating-star-filter: brightness(0) saturate(100%) invert(60%) sepia(97%) saturate(1067%) hue-rotate(4deg) brightness(97%) contrast(94%); --gradient-start: #fef0ed; --gradient-warm: #fae4d9; --gradient-peach: #f7d0bf; --gradient-rose: #f9dae4; --border-subtle: #e8e2dc; --border-control: #776f6a; --disabled-surface: #eeeae5; --error: #a3293d; --error-surface: #fbeaec; --success: #25654f; --success-surface: #eaf4ee; --editor-line: #e5e7eb; --editor-bg: #eeeeec; --editor-panel: #fff; --editor-blue: #5551ff; --font-display: "Google Sans Flex"; --font-ui: "Google Sans Flex"; --motion-press: .12s; --motion-selection: .18s; --motion-surface: .22s; --motion-route: .26s; --motion-easing: cubic-bezier(.2, 0, 0, 1); --topbar-height: 52px; --left-sidebar-width: 224px; --right-sidebar-width: 276px; }
* { box-sizing: border-box; }
html, body { width: 100%; height: 100%; margin: 0px; overflow: hidden; }
body { color: var(--text-primary); font-family: var(--font-ui); background: var(--editor-bg); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; }
button { color: inherit; }
.huge-icon { object-fit: contain; object-position: center center; vertical-align: middle; flex: 0 0 auto; width: 24px; height: 24px; display: inline-block; }
button:focus-visible, input:focus-visible, [tabindex]:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 3px; }
[hidden] { display: none !important; }
.brand-mark { background: var(--text-primary); color: var(--accent-pink); border-radius: 10px; flex: 0 0 auto; place-items: center; display: inline-grid; }
.brand-mark--small { width: 30px; height: 30px; padding: 5px; }
.brand-mark svg { fill: currentcolor; width: 100%; height: 100%; }
.brand-mark .brand-mark__cut { fill: var(--text-primary); }
.brand-mark .brand-mark__dot { fill: var(--surface); }
.primary-button:active:not(:disabled), .secondary-button:active:not(:disabled), .app-icon-button:active { opacity: 0.92; transform: scale(0.98); }
@keyframes screen-enter { 
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0px); }
}
@media (width <= 980px) {:root { --left-sidebar-width: 190px; --right-sidebar-width: 0px; }}
@media (width <= 680px) {:root { --left-sidebar-width: 0px; }}
.admin-deletion-heading { justify-content: space-between; align-items: center; gap: 18px; padding: 18px 20px 14px; display: flex; }
.admin-deletion-heading h2 { font: 600 20px/1.3 var(--font-ui); color: var(--admin-ink); margin: 0px; }
.admin-deletion-heading > span { color: var(--admin-ashen); font-size: 12px; }
.admin-deletion-filter .admin-search-field { flex: 1 1 250px; }
.admin-five-table-panel .admin-deletion-table { overflow-x: auto; }
.admin-deletion-table > div { grid-template-columns: 0.7fr 1.1fr 1.2fr 1.35fr 85px; }
.admin-deletion-table > div > * { overflow-wrap: anywhere; min-width: 0px; }
.admin-deletion-pagination { color: var(--admin-ashen); justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; display: flex; }
.admin-deletion-pagination > div { gap: 8px; display: flex; }
.admin-deletion-pagination button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-screen { --font-display: var(--font-ui); --admin-canvas: #f8fafc; --admin-paper: #fff; --admin-stone: #f1f5f9; --admin-ink: #0f172a; --admin-graphite: #334155; --admin-ashen: #64748b; --admin-pebble: #94a3b8; --admin-mist: #cbd5e1; --admin-chalk: #e2e8f0; --admin-clay: #ea580c; --admin-shadow-sm: 0 1px 2px 0 #0000000a; --admin-shadow: 0 1px 3px 0 #0000000f, 0 1px 2px -1px #0000000a; --admin-shadow-md: 0 4px 6px -1px #00000012, 0 2px 4px -2px #0000000d; --admin-shadow-lg: 0 10px 15px -3px #00000014, 0 4px 6px -4px #0000000a; --admin-shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000000f; background: var(--admin-canvas); width: 1440px; height: 960px; color: var(--admin-graphite); font: 400 13px/1.5 var(--font-ui); -webkit-font-smoothing: antialiased; grid-template-columns: 244px minmax(0px, 1fr); display: grid; position: relative; overflow: hidden; }
.admin-five-screen .admin-content { padding-bottom: 32px; }
.admin-five-layout { grid-template-columns: minmax(0px, 1fr) 340px; align-items: start; gap: 20px; display: grid; }
.admin-five-screen--detail .admin-five-layout { display: block; }
.admin-five-layout > :only-child { grid-column: 1 / -1; }
.admin-five-stack { gap: 18px; min-width: 0px; display: grid; }
.admin-five-table-panel { min-width: 0px; }
.admin-four-sibling button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); }
.admin-screen button, .admin-screen input, .admin-screen select, .admin-screen textarea { font: inherit; }
.admin-screen .huge-icon { flex-shrink: 0; width: 18px; height: 18px; }
.admin-sidebar { border-right: 1px solid var(--admin-chalk); background: var(--admin-paper); flex-direction: column; min-width: 0px; min-height: 0px; padding: 24px 16px 20px; display: flex; overflow-y: auto; }
.admin-brand { align-items: center; gap: 12px; padding: 0px 8px; display: flex; }
.admin-brand .brand-mark { background: var(--admin-ink); width: 36px; height: 36px; color: var(--admin-clay); box-shadow: var(--admin-shadow-sm); border-radius: 10px; padding: 7px; }
.admin-brand .brand-mark__cut { fill: var(--admin-ink); }
.admin-brand strong, .admin-brand small { display: block; }
.admin-brand strong { color: var(--admin-ink); font-family: var(--font-ui); letter-spacing: -0.02em; font-size: 18px; font-weight: 700; line-height: 1.1; }
.admin-brand small { color: var(--admin-ashen); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; font-size: 10px; font-weight: 600; }
.admin-nav { gap: 4px; margin-top: 26px; display: grid; }
.admin-nav-item { width: 100%; min-height: 38px; color: var(--admin-graphite); text-align: left; cursor: pointer; background: 0px 0px; border: 0px; border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr) auto; align-items: center; gap: 10px; padding: 0px 10px; font-size: 12px; font-weight: 500; transition: 0.15s; display: grid; }
.admin-nav-item:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-nav-item.is-active { color: var(--admin-clay); background: rgba(234, 88, 12, 0.08); font-weight: 600; }
.admin-nav-item__icon { place-items: center; width: 20px; height: 20px; display: grid; }
.admin-nav-item small { background: var(--admin-stone); min-width: 20px; color: var(--admin-graphite); text-align: center; border-radius: 9999px; padding: 1px 6px; font-size: 10px; font-weight: 600; }
.admin-sidebar__footer { border-top: 1px solid var(--admin-chalk); margin-top: auto; padding-top: 16px; }
.admin-identity { background: var(--admin-stone); border-radius: 10px; align-items: center; gap: 10px; margin-bottom: 8px; padding: 8px 10px; display: flex; }
.admin-identity > span { background: var(--admin-ink); color: rgb(255, 255, 255); border-radius: 50%; flex: 0 0 auto; place-items: center; width: 32px; height: 32px; font-size: 11px; font-weight: 700; display: grid; }
.admin-identity strong, .admin-identity small { display: block; }
.admin-identity strong { color: var(--admin-ink); font-size: 12px; font-weight: 600; }
.admin-identity small { color: var(--admin-ashen); font-size: 11px; }
.admin-sidebar-action { width: 100%; height: 34px; color: var(--admin-graphite); cursor: pointer; background: 0px 0px; border: 0px; border-radius: 6px; align-items: center; gap: 8px; padding: 0px 10px; font-size: 12px; transition: 0.15s; display: flex; }
.admin-sidebar-action:hover { background: var(--admin-stone); color: var(--admin-ink); }
.admin-change-password-dialog { box-sizing: border-box; max-width: 100%; max-height: 100%; overflow-y: auto; }
.admin-change-password-form { gap: 14px; display: grid; }
.admin-change-password-form .admin-dialog__actions { margin-top: 8px; }
.admin-main { background: var(--admin-canvas); grid-template-rows: auto minmax(0px, 1fr); min-width: 0px; min-height: 0px; display: grid; }
.admin-topbar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); justify-content: space-between; align-items: center; gap: 24px; min-height: 72px; padding: 16px 32px; display: flex; }
.admin-topbar h1 { font-family: var(--font-ui); letter-spacing: -0.02em; color: var(--admin-ink); margin: 0px; font-size: 22px; font-weight: 700; line-height: 1.25; }
.admin-topbar__actions { align-items: center; gap: 10px; min-height: 40px; display: flex; }
.admin-content { scrollbar-color: var(--admin-mist) transparent; scrollbar-width: thin; min-width: 0px; min-height: 0px; padding: 24px 32px 32px; position: relative; overflow: auto; }
.admin-primary-button, .admin-secondary-button, .admin-text-button, .admin-icon-action { cursor: pointer; border-radius: 8px; min-height: 38px; font-size: 13px; font-weight: 550; transition: 0.15s; }
.admin-primary-button { border: 1px solid var(--admin-ink); background: var(--admin-ink); color: rgb(255, 255, 255); box-shadow: var(--admin-shadow-sm); padding: 0px 16px; }
.admin-primary-button:hover:not(:disabled) { box-shadow: var(--admin-shadow); background: rgb(30, 41, 59); border-color: rgb(30, 41, 59); }
.admin-primary-button:disabled, .admin-secondary-button:disabled { opacity: 0.45; cursor: not-allowed; }
.admin-secondary-button { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-graphite); box-shadow: var(--admin-shadow-sm); padding: 0px 15px; }
.admin-secondary-button:hover:not(:disabled) { background: var(--admin-stone); color: var(--admin-ink); border-color: var(--admin-pebble); }
.admin-field { color: var(--admin-graphite); gap: 6px; font-size: 12px; font-weight: 600; display: grid; }
.admin-field > span { justify-content: space-between; display: flex; }
.admin-field input, .admin-field textarea, .admin-compact-field select, .admin-filter-bar select, .admin-search-field input { border: 1px solid var(--admin-mist); background: var(--admin-paper); color: var(--admin-ink); border-radius: 8px; font-size: 13px; }
.admin-field input { height: 40px; padding: 0px 12px; }
.admin-field input::placeholder, .admin-field textarea::placeholder, .admin-search-field input::placeholder { color: var(--admin-pebble); }
.admin-status { background: var(--admin-stone); border: 1px solid var(--admin-chalk); width: max-content; max-width: 100%; color: var(--admin-graphite); white-space: nowrap; border-radius: 9999px; align-items: center; gap: 6px; padding: 3px 9px; font-size: 11px; font-weight: 600; display: inline-flex; }
.admin-status > span { background: var(--admin-pebble); border-radius: 50%; flex: 0 0 auto; width: 6px; height: 6px; }
.admin-status--attention, .admin-status--pending, .admin-status--pending-review { color: rgb(146, 64, 14); background: rgb(255, 251, 235); border-color: rgb(253, 230, 138); }
.admin-status--attention > span, .admin-status--pending > span, .admin-status--pending-review > span { background: rgb(245, 158, 11); }
.admin-table-panel { border: 1px solid var(--admin-chalk); background: var(--admin-paper); box-shadow: var(--admin-shadow); border-radius: 12px; overflow: hidden; }
.admin-filter-bar { border-bottom: 1px solid var(--admin-chalk); background: var(--admin-paper); align-items: flex-end; gap: 12px; min-height: 68px; padding: 14px 18px; display: flex; }
.admin-filter-bar > label:not(.admin-search-field) { color: var(--admin-ashen); letter-spacing: 0.04em; text-transform: uppercase; gap: 4px; font-size: 11px; font-weight: 600; display: grid; }
.admin-filter-bar select { border: 1px solid var(--admin-mist); background: var(--admin-paper); min-width: 140px; height: 38px; color: var(--admin-ink); border-radius: 8px; padding: 0px 28px 0px 10px; font-size: 13px; }
.admin-search-field { border: 1px solid var(--admin-mist); background: var(--admin-paper); border-radius: 8px; grid-template-columns: 20px minmax(0px, 1fr); align-items: center; gap: 8px; min-width: 240px; height: 38px; padding: 0px 12px; transition: 0.15s; display: grid; }
.admin-search-field input { min-width: 0px; height: 34px; color: var(--admin-ink); border: 0px; outline: 0px; padding: 0px; font-size: 13px; }
.admin-data-table { min-width: 0px; }
.admin-data-table > div { border-top: 1px solid var(--admin-stone); min-height: 56px; color: var(--admin-graphite); align-items: center; gap: 12px; padding: 0px 18px; font-size: 13px; transition: background 0.12s; display: grid; }
.admin-data-table > div:first-child { border-top: 0px; }
.admin-data-table > div:not(.admin-data-table__head):hover { background: var(--admin-stone); }
.admin-data-table__head { letter-spacing: 0.05em; text-transform: uppercase; font-weight: 600; background: var(--admin-stone) !important; min-height: 42px !important; color: var(--admin-ashen) !important; border-bottom: 1px solid var(--admin-chalk) !important; font-size: 11px !important; }
.admin-data-table strong, .admin-data-table small { display: block; }
.admin-data-table strong { color: var(--admin-ink); font-size: 13px; font-weight: 600; }
.admin-data-table small { color: var(--admin-ashen); margin-top: 2px; font-size: 11px; }
.admin-data-table > div > button { color: rgb(37, 99, 235); text-underline-offset: 2px; cursor: pointer; text-align: right; background: 0px 0px; border: 0px; padding: 0px; font-size: 12px; font-weight: 600; text-decoration: underline; transition: color 0.15s; }
.admin-data-table > div > button:hover { color: rgb(29, 78, 216); }
.admin-modal-backdrop { z-index: 20; backdrop-filter: blur(4px); background: rgba(15, 23, 42, 0.45); place-items: center; padding: 30px; display: grid; position: absolute; inset: 0px; }
.admin-dialog { background: var(--admin-paper); border: 1px solid var(--admin-chalk); width: 460px; box-shadow: var(--admin-shadow-xl); border-radius: 16px; padding: 28px; }
.admin-dialog__icon { background: var(--admin-stone); width: 48px; height: 48px; color: var(--admin-clay); border-radius: 12px; place-items: center; margin-bottom: 18px; display: grid; }
.admin-dialog__icon .huge-icon { width: 24px; height: 24px; }
.admin-dialog h2 { font-family: var(--font-ui); color: var(--admin-ink); margin: 0px; font-size: 22px; font-weight: 700; line-height: 1.3; }
.admin-dialog > p:not(.admin-kicker) { color: var(--admin-ashen); margin: 10px 0px 20px; font-size: 13px; line-height: 1.6; }
.admin-dialog__actions { justify-content: flex-end; gap: 10px; margin-top: 24px; display: flex; }
.admin-dialog-error { color: rgb(185, 28, 28); background: rgb(254, 242, 242); border: 1px solid rgb(252, 165, 165); border-radius: 8px; margin: 10px 0px 0px; padding: 10px 14px; font-size: 12px; }
@keyframes admin-skeleton { 
  0% { opacity: 0.55; }
  100% { opacity: 1; }
}
.admin-provider-gallery button:hover:not(:disabled) { border-color: var(--admin-mist); box-shadow: var(--admin-shadow); }
@media (prefers-reduced-motion: reduce) {*, ::before, ::after { scroll-behavior: auto !important; transition-duration: 1ms !important; animation-duration: 1ms !important; animation-iteration-count: 1 !important; }}
.admin-screen h1, .admin-screen h2, .admin-screen h3, .admin-screen .admin-brand strong, .admin-screen .admin-nav-item.is-active { font-weight: 600; }
    html, body { width: 100%; height: auto; min-height: 100%; overflow: auto; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  </style>
</head>
<body>
<div class="admin-screen admin-five-screen admin-five-screen--detail admin-five-deletion-screen">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark brand-mark--small" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img" aria-label="Rocket logo">
      <path d="M24 5c8.3 3.6 13 10.1 13 18.1C37 32 31.9 39.5 24 43c-7.9-3.5-13-11-13-19.9C11 15.1 15.7 8.6 24 5Z"></path>
      <path class="brand-mark__cut" d="M24 13.3c3.8 3.1 5.8 6.6 5.8 10.5 0 4.4-2.2 8.2-5.8 11.1-3.6-2.9-5.8-6.7-5.8-11.1 0-3.9 2-7.4 5.8-10.5Z"></path>
      <circle class="brand-mark__dot" cx="24" cy="22" r="3.2"></circle>
    </svg></span>
            <div><strong>Rocket</strong><small>Administration</small></div>
          </div>
          <nav class="admin-nav" aria-label="Admin navigation">
            
      <button class="admin-nav-item" type="button" data-admin-route="admin-dashboard">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\smart house\outline\home.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Dashboard</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-users">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\user\outline\user.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Users</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-provider-verification">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Provider Verification</span>
        <small>23</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-appointments">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\calendar.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Appointments</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-no-show">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\time and date\outline\time-oclock.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>No-Show Cases</span>
        <small>5</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-complaints">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\notes and task\outline\notes.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Complaints</span>
        <small>14</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reports">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\education\outline\report.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reports</span>
        <small>4</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-reviews">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\star.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Reviews</span>
        <small>3</small>
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-regions">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\navigation maps\outline\location.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Regions</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-notifications">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\device\outline\notification.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Notifications</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-banners">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\multimedia and audio\outline\image.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Banners</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-audit">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\editor\outline\document-text.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Audit Log</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-app-config">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\setting.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>App Update</span>
        
      </button>
      <button class="admin-nav-item is-active" type="button" data-admin-route="admin-deletion-requests">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\trash.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Deletion Requests</span>
        
      </button>
      <button class="admin-nav-item" type="button" data-admin-route="admin-team">
        <span class="admin-nav-item__icon"><img class="huge-icon" src="assets\icons\interface\outline\shield-check.svg" alt="" aria-hidden="true" decoding="async"></span>
        <span>Admin Accounts</span>
        
      </button>
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-identity">
              <span>AM</span>
              <div><strong>Ava Morgan</strong><small>Owner</small></div>
            </div>
            <button class="admin-sidebar-action" type="button" data-admin-change-password=""><img class="huge-icon" src="assets\icons\device\outline\lock.svg" alt="" aria-hidden="true" decoding="async"><span>Change Password</span></button>
            <button class="admin-sidebar-action" type="button" data-admin-sign-out=""><img class="huge-icon" src="assets\icons\interface\outline\logout.svg" alt="" aria-hidden="true" decoding="async"><span>Sign Out</span></button>
          </div>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar">
            <div>
              <h1>Account Deletion Requests</h1>
            </div>
            <div class="admin-topbar__actions"></div>
          </header>
          <div class="admin-content"><div class="admin-five-layout"><div class="admin-five-stack"><section class="admin-table-panel admin-five-table-panel"><div class="admin-deletion-heading"><div><h2>Account deletion requests</h2></div><span>3 requests in this view</span></div>
      <form class="admin-filter-bar admin-deletion-filter"><label class="admin-search-field"><img class="huge-icon" src="assets\icons\interface\outline\search 01.svg" alt="" aria-hidden="true" decoding="async"><input id="deletion-search" type="search" value="" placeholder="Search reference or requester" aria-label="Search deletion requests"></label><label><span>Status</span><select id="deletion-status"><option value="all">All statuses</option><option value="Received · policy review required">Received · policy review required</option></select></label><label><span>Requested</span><select id="deletion-date"><option value="all">Any time</option><option value="today">Today</option><option value="7-days">Last 7 days</option><option value="30-days">Last 30 days</option></select></label></form>
      <div class="admin-data-table admin-deletion-table" role="table" aria-label="Account deletion requests"><div class="admin-data-table__head" role="row"><span>Reference</span><span>Requester</span><span>Requested</span><span>Status</span><span></span></div><div role="row" class=""><strong>DEL-1024</strong><div><strong>Jamie Rivera</strong><small>Customer · Active</small></div><span>Sep 24, 2026 · 18:12 ICT</span><span><span class="admin-status admin-status--attention admin-status--received-·-policy-review-required"><span></span>Received · policy review required</span></span><button type="button" data-five-view-deletion="DEL-1024">View Request</button></div><div role="row" class=""><strong>DEL-1023</strong><div><strong>Lotus Wellness</strong><small>Service Provider · Active</small></div><span>Sep 18, 2026 · 09:30 ICT</span><span><span class="admin-status admin-status--attention admin-status--received-·-policy-review-required"><span></span>Received · policy review required</span></span><button type="button" data-five-view-deletion="DEL-1023">View Request</button></div></div></section><nav class="admin-deletion-pagination" aria-label="Request pages"><span>Page 1 of 2 · 3 matching requests</span><div><button class="admin-secondary-button" type="button" data-five-deletion-page="0" disabled="">Previous</button><button class="admin-secondary-button" type="button" data-five-deletion-page="2">Next</button></div></nav></div></div></div>
        </main>
        
        
      <div class="admin-modal-backdrop">
        <section class="admin-dialog admin-change-password-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-change-password-title">
          <span class="admin-dialog__icon"><img class="huge-icon" src="assets\icons\device\outline\lock.svg" alt="" aria-hidden="true" decoding="async"></span>
          <h2 id="admin-change-password-title">Change Password</h2>
          
            <p>Enter your current password and choose a new one.</p>
            <form id="admin-change-password-form" class="admin-change-password-form" novalidate="">
              <label class="admin-field"><span>Current Password</span><input id="admin-current-password" name="currentPassword" type="password" autocomplete="current-password" required=""></label>
              <label class="admin-field"><span>New Password</span><input id="admin-new-password" name="newPassword" type="password" autocomplete="new-password" minlength="8" required=""></label>
              <label class="admin-field"><span>Confirm New Password</span><input id="admin-confirm-password" name="confirmPassword" type="password" autocomplete="new-password" required=""></label>
              <p class="admin-dialog-error" id="admin-change-password-error" role="alert" hidden=""></p>
              <div class="admin-dialog__actions"><button class="admin-secondary-button" type="button" data-admin-close-change-password="">Cancel</button><button class="admin-primary-button" type="submit">Save Password</button></div>
            </form>
          
        </section>
      </div>
      </div>
</body>
</html>
```