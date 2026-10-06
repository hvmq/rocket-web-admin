# Rocket Web Admin

Starter project cho Web Admin dùng Next.js và Supabase. Trình duyệt kết nối Supabase trực tiếp bằng publishable key; API route nội bộ hiện chỉ có health check.

## Yêu cầu môi trường

- Node.js `24.x` (LTS); Docker dùng image `24.21.0`
- pnpm `12.6.0`
- Docker Engine và Docker Compose nếu chạy bằng container

Các dependency chính và image Node đều được pin version cụ thể. `pnpm-lock.yaml` khóa phiên bản transitive.

## Cấu hình môi trường

Tạo `.env` từ file mẫu:

```bash
cp .env.example .env
```

| Biến                                   | Phạm vi               | Mô tả                                                                                              |
| -------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| `APP_ENV`                              | Server và giao diện   | `local` hoặc `production`; logger chỉ ghi log debug khi là `local`.                                |
| `PORT`                                 | Server                | Cổng HTTP, mặc định mẫu là `3000`.                                                                 |
| `NEXT_PUBLIC_SUPABASE_URL`             | Public                | URL project Supabase.                                                                              |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public                | Publishable key của Supabase; có thể xuất hiện trong bundle trình duyệt.                           |
| `SUPABASE_SECRET_KEY`                  | Server-only, tùy chọn | Dành cho API server tin cậy trong tương lai. Không dùng biến này ở client hoặc đưa vào build args. |

Chỉ điền Supabase key thật trong `.env`; file này đã được thêm vào `.gitignore` và `.dockerignore`. Không dùng secret/service key làm publishable key. Publishable key không thay thế Row Level Security: hãy cấu hình policy phù hợp trong Supabase.

`NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` được đóng gói vào JavaScript public ở bước production build. Nếu thay đổi hai giá trị này, cần build lại image. `SUPABASE_SECRET_KEY` không được truyền vào bước build.

Khi sửa `.env` trong lúc chạy Docker local, tạo lại container để cập nhật biến môi trường: `docker compose up -d --force-recreate`.

## Chạy local không dùng Docker

```bash
npm install --global pnpm@12.6.0
pnpm install --frozen-lockfile
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000). Cổng chạy theo `PORT` trong `.env`.

Khi chia sẻ dev server qua ngrok, thêm hostname của tunnel vào `.env` để Next.js cho phép tải JavaScript, font và kết nối HMR:

```dotenv
ALLOWED_DEV_ORIGINS=your-tunnel.ngrok-free.app
```

Chỉ dùng hostname, không có `https://`, port hoặc đường dẫn. Nếu có nhiều tunnel, phân cách hostname bằng dấu phẩy. Cập nhật biến này khi link ngrok đổi, rồi khởi động lại `pnpm dev`; với Docker local, chạy `docker compose up -d --force-recreate web`. Cấu hình này chỉ áp dụng cho development.

Các lệnh dự án:

```bash
pnpm dev           # Next.js development server
pnpm build         # Production build
pnpm start         # Chạy production build
pnpm lint          # ESLint
pnpm typecheck     # TypeScript strict check
pnpm format        # Format source và tài liệu
pnpm format:check  # Kiểm tra format
```

## Deploy lên Vercel

Import repository `Rocket-Ms/rocket-web-admin` tại [Vercel New Project](https://vercel.com/new), chọn nhánh production `main` và Root Directory `./`.

`vercel.json` cấu hình framework Next.js, cài dependency từ lockfile và build bằng pnpm `12.6.0`. Giữ các mục Build Command, Install Command và Output Directory theo cấu hình repository. Node.js dùng nhánh `24.x` được khai báo trong `package.json`; Vercel tự quản lý phiên bản minor và patch.

Trước khi bấm Deploy, thêm các Environment Variables sau cho Production và Preview:

| Biến                                   | Giá trị                     |
| -------------------------------------- | --------------------------- |
| `APP_ENV`                              | `production`                |
| `NEXT_PUBLIC_SUPABASE_URL`             | URL project Supabase        |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key của project |

Lấy hai giá trị Supabase từ project đang sử dụng. `SUPABASE_SECRET_KEY` chỉ cần khi bổ sung nghiệp vụ server sử dụng secret key. Các lệnh Vercel đã ghim phiên bản pnpm qua `npx`, nên không cần thêm biến `ENABLE_EXPERIMENTAL_COREPACK`.

Sau khi deployment có trạng thái Ready, mở URL Vercel cấp và kiểm tra `/api/health` trả về `{"status":"ok"}`. Các lần push lên `main` sẽ tự tạo production deployment. Sau khi thay đổi biến môi trường, tạo deployment mới hoặc Redeploy để áp dụng giá trị mới, đặc biệt với các biến `NEXT_PUBLIC_` được đóng gói khi build.

Nếu repository private thuộc GitHub Organization, Git integration của Vercel yêu cầu gói Pro. Tham khảo [cấu hình bằng vercel.json](https://vercel.com/docs/project-configuration/vercel-json), [Node.js trên Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) và [deploy Git repository](https://vercel.com/docs/git).

## Chạy Docker local

Sau khi tạo `.env`, chạy:

```bash
docker compose up --build
```

Compose mặc định dùng target development, mount source code để hot reload, và giữ `node_modules` cùng `.next` trong Docker volumes. Dừng bằng `Ctrl+C`; chạy nền bằng `docker compose up -d`.

## Build và chạy production Docker

Trước khi build, cập nhật `.env`:

```env
APP_ENV=production
PORT=3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_project_key
SUPABASE_SECRET_KEY=
```

Build rồi chạy image production:

```bash
docker compose -f docker-compose.production.yml up --build -d
```

Image dùng Next.js standalone output, multi-stage build và user không phải root. Production không mount source code. Xem log và dừng service:

```bash
docker compose -f docker-compose.production.yml logs -f web
docker compose -f docker-compose.production.yml down
```

Khi deploy, có thể inject `.env` từ secret manager của nền tảng; không đưa file có secret vào image hoặc Git.

## Kết nối Supabase

`src/lib/supabase/client.ts` tạo browser client bằng public URL và publishable key. `src/lib/supabase/server.ts` tạo server client theo cookie, cũng dùng publishable key để giữ ngữ cảnh người dùng. Hai helper chưa được gọi từ giao diện mẫu.

Luồng hiện tại:

```text
Browser → Next.js Web Admin → Supabase
```

Giao diện gọi Supabase trực tiếp từ browser; API nội bộ không làm proxy cho Supabase. Giữ Row Level Security bật và định nghĩa policy ở Supabase. Chỉ dùng `SUPABASE_SECRET_KEY` trong server-side code có yêu cầu cụ thể và không bao giờ import vào client component.

## API nội bộ

Health check có sẵn tại `GET /api/health`, trả về:

```json
{ "status": "ok" }
```

Thêm endpoint mới bằng Route Handler trong `src/app/api/<route>/route.ts`. Chỉ chuyển nghiệp vụ sang API Next.js khi có yêu cầu cụ thể.

## Assets dùng chung với Flutter

Hai bộ asset được sao chép từ `rocket-flutter/assets` vào `public/assets` và giữ nguyên tên file, thư mục con:

- `public/assets/images/`: ảnh PNG/JPG và ghi chú nguồn tại `public/assets/images/README.md`.
- `public/assets/icons/`: SVG/PNG, phân theo nhóm và kiểu icon.

Trong giao diện, tham chiếu bằng URL bắt đầu từ `/assets/`, ví dụ `/assets/images/rocket.png` hoặc `/assets/icons/arrows/bulk/arrow-back.svg` (không thêm `public` vào URL). Với tên thư mục hoặc file có ký tự đặc biệt, mã hóa từng đoạn đường dẫn bằng `encodeURIComponent`; ví dụ `/assets/icons/files%20and%20folder/bulk/folder-share%402x.png`. Đặt kích thước hiển thị rõ ràng khi dùng ảnh để tránh xê dịch bố cục.

## Cấu trúc chính

```text
src/
  app/
    api/health/route.ts
    globals.css
    layout.tsx
    page.tsx
  lib/
    logger.ts
    supabase/
      client.ts
      server.ts
public/
  assets/
    images/
    icons/
Dockerfile
docker-compose.yml
docker-compose.production.yml
```

Các route và layout dùng App Router. Có thể bổ sung `features/`, `components/`, `hooks/`, `types/` khi xuất hiện nhu cầu thực tế.
