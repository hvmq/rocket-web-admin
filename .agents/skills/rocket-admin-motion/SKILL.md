---
name: rocket-admin-motion
description: Dùng khi thêm hoặc sửa animation, transition, drawer hoặc dialog trong Rocket Web Admin. Áp dụng bộ motion dùng chung của dự án; không kích hoạt cho thay đổi giao diện không liên quan đến chuyển động.
---

# Animation cho Rocket Web Admin

Khi làm việc trong dự án `rocket-web-admin`, hãy giữ chuyển động nhất quán giữa các màn hình quản trị. Trước khi sửa, đọc `src/components/admin/motion.css`, `src/components/admin/useAnimatedDismiss.ts` và CSS/TSX của màn hình liên quan.

## Dùng lại motion hiện có

- Dùng `.admin-motion-enter` cho phần tử xuất hiện; dùng `.admin-motion-drawer` cho panel trượt từ phải; dùng `.admin-motion-backdrop` và `.admin-motion-dialog` cho hộp thoại. Thêm các class này vào phần tử hiện có, không tạo keyframes giống nhau trong CSS của từng màn hình.
- Dùng các biến `--admin-motion-*` trong `motion.css` cho thời lượng, easing, transition và nhịp xuất hiện. CSS của màn hình chỉ nên xác định phần tử nào chuyển động và thứ tự xuất hiện của chúng. Dùng `--admin-motion-stagger-0` đến `--admin-motion-stagger-4`; giới hạn delay của danh sách dài ở mức cuối.
- Nếu hiệu ứng mới thật sự cần thiết cho nhiều màn hình, thêm token/keyframes/class dùng chung vào `motion.css`. Giữ hiệu ứng mang ý nghĩa riêng của một màn hình, như loading skeleton, ở CSS của màn hình đó.
- Ưu tiên `opacity` và `transform` cho hiệu ứng vào/ra. Tránh làm nội dung quan trọng chỉ xuất hiện sau animation hoặc phụ thuộc vào animation để cập nhật trạng thái.

## Đóng drawer và dialog

- Dùng `useAnimatedDismiss` để giữ phần tử trên màn hình cho đến khi hiệu ứng đóng hoàn tất. Gắn `.is-closing` lên drawer hoặc backdrop; dialog là con trực tiếp của backdrop để quy tắc đóng dùng chung hoạt động.
- Vô hiệu hóa tương tác khi đang đóng, theo mẫu `inert={closing}` hiện có. Hook đọc `--admin-motion-exit-duration` từ CSS; nếu đổi thời lượng đóng, sửa token trong `motion.css` thay vì đặt thêm một số khác trong component.
- Với `prefers-reduced-motion: reduce`, việc đóng phải hoàn tất ngay và không phụ thuộc vào sự kiện animation. Khi thêm phần tử chuyển động ngoài `.admin-theme`, bảo đảm nó dùng class motion chung hoặc được bao phủ bởi quy tắc reduced motion.

## Kiểm tra trước khi hoàn tất

- Xem lại animation khi mở, đóng, đổi màn hình và khi bật reduced motion. Kiểm tra nội dung không bị nhấp nháy, che khuất hoặc vẫn nhận tương tác trong lúc đóng.
- Chạy kiểm tra định dạng, TypeScript và lint cho các file đã sửa; chạy build nếu thay đổi CSS dùng chung hoặc cách import của nó.
- Chỉ thêm dependency animation khi nhu cầu cụ thể không thể đáp ứng hợp lý bằng hệ CSS/React hiện có.
