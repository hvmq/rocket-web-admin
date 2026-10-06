Hãy setup repository này thành một project **Web Admin** hoàn chỉnh, có cấu trúc rõ ràng, dễ maintain và có thể mở rộng về sau.

## 1. Tech stack

* Frontend sử dụng **Next.js**.
* Backend hiện tại của Web Admin sử dụng **Supabase**.
* Frontend sẽ gọi **Supabase trực tiếp**, không gọi thông qua API của repository này.
* Repository vẫn cần setup sẵn phần **API/backend structure** để sau này tôi có thể tự viết thêm API khi cần.
* Project phải chạy được bằng **Docker**.

## 2. Version

Không sử dụng version dạng:

* `latest`
* `^x.x.x`
* version không cố định nếu có thể tránh được.

Phải chỉ định version cụ thể cho:

* Node.js
* Next.js
* React
* TypeScript
* các package chính
* Docker image

Mục tiêu là đảm bảo môi trường local, CI/CD và production có version nhất quán, tránh việc dependency tự động thay đổi ngoài ý muốn.

## 3. Environment variables

Project sử dụng file `.env` để quản lý environment variables.

Yêu cầu:

* Docker/Docker Compose chỉ đọc value từ `.env`.
* Không hard-code giá trị environment variable trực tiếp trong:

  * `Dockerfile`
  * `docker-compose.yml`
  * source code

* Không commit secret lên repository.
* Tạo `.env.example` chỉ chứa tên biến và giá trị mẫu an toàn nếu cần.

Trong `.env` cần có biến xác định môi trường hiện tại, ví dụ:

```env
APP_ENV=local
```

Các môi trường cần hỗ trợ:

```text
local
production
```

Code phải sử dụng biến environment này thay vì tự suy đoán môi trường bằng hostname hoặc các cách khác.

## 4. Logging

Setup một utility dùng chung cho việc log, không gọi `console.log()` trực tiếp rải rác trong source code.

Ví dụ structure:

```text
src/
  lib/
    logger.ts
```

Có thể sử dụng dạng:

```ts
logger.log(...)
logger.info(...)
logger.warn(...)
logger.error(...)
```

Yêu cầu quan trọng:

* Các log phục vụ debug chỉ được output khi:

```env
APP_ENV=local
```

* Production không được output các debug log không cần thiết.
* `error` có thể được xử lý riêng nếu cần để production vẫn ghi nhận lỗi.

Ví dụ mong muốn:

```ts
logger.log('debug data', data)
```

thay vì:

```ts
console.log('debug data', data)
```

## 5. Supabase

Setup Supabase theo hướng frontend gọi trực tiếp Supabase.

Cần chuẩn bị structure rõ ràng, ví dụ:

```text
src/
  lib/
    supabase/
      client.ts
      server.ts
```

Phân biệt rõ:

* Supabase client chạy phía browser.
* Supabase client chạy phía server nếu cần.
* Public environment variables.
* Secret/server-only environment variables.

Không expose các Supabase secret key xuống frontend.

Frontend hiện tại **không gọi Supabase thông qua API nội bộ của Next.js**.

Flow hiện tại:

```text
Browser
   ↓
Next.js Web Admin
   ↓
Supabase
```

Không làm:

```text
Browser
   ↓
Next.js API
   ↓
Supabase
```

trừ khi sau này có requirement cụ thể.

## 6. API structure

Mặc dù hiện tại frontend chưa sử dụng API của repository này, vẫn cần setup sẵn structure để tôi có thể thêm API sau này.

Sử dụng convention phù hợp với version Next.js được chọn.

Ví dụ:

```text
src/
  app/
    api/
```

Có thể tạo một endpoint health check đơn giản:

```text
GET /api/health
```

Response ví dụ:

```json
{
  "status": "ok"
}
```

Không cần xây dựng business API ở thời điểm hiện tại.

## 7. Docker

Setup Docker cho 2 môi trường:

### Local

Mục tiêu:

* phục vụ development
* hỗ trợ hot reload
* source code được mount từ máy host vào container
* cài dependency ổn định
* chạy Next.js development server
* expose port cần thiết ra host
* đọc environment variables từ `.env`

Có thể chạy bằng command đơn giản như:

```bash
docker compose up
```

hoặc:

```bash
docker compose -f docker-compose.local.yml up
```

### Production

Mục tiêu:

* build production image tối ưu.
* sử dụng Docker multi-stage build.
* không chứa dependency development không cần thiết trong final image.
* không mount source code.
* chạy Next.js ở production mode.
* image càng nhỏ và deterministic càng tốt.
* environment variables lấy từ `.env` hoặc được inject từ môi trường deploy.
* tuyệt đối không hard-code secret vào Docker image.

Nên có structure rõ ràng như:

```text
Dockerfile
docker-compose.yml
docker-compose.local.yml
docker-compose.production.yml
.dockerignore
```

Có thể điều chỉnh tên file nếu có cách tổ chức tốt hơn, nhưng phải giữ được sự phân biệt rõ giữa local và production.

## 8. Project structure

Thiết kế folder structure rõ ràng, có khả năng mở rộng.

Có thể tham khảo:

```text
src/
  app/
    api/
    (auth)/
    (dashboard)/

  components/

  features/

  lib/
    logger.ts
    supabase/

  hooks/

  types/

  utils/
```

Không tạo abstraction không cần thiết khi project còn nhỏ.

Ưu tiên:

* đơn giản
* dễ đọc
* dễ mở rộng
* separation of concerns
* tránh over-engineering

## 9. TypeScript

Sử dụng TypeScript.

Bật strict mode nếu không có lý do đặc biệt để tắt.

Không sử dụng `any` nếu có thể định nghĩa type cụ thể.

## 10. Code quality

Setup tối thiểu:

* ESLint
* Prettier
* `.editorconfig`
* `.gitignore`
* `.dockerignore`

Thêm các scripts cần thiết vào `package.json`, ví dụ:

```text
dev
build
start
lint
typecheck
format
```

Version của các package phải được pin cụ thể.

## 11. README

Viết README hướng dẫn rõ:

* yêu cầu môi trường
* Node version
* cách cài dependency
* cách tạo `.env`
* cách chạy local không dùng Docker nếu có
* cách chạy bằng Docker local
* cách build/run production Docker
* cấu trúc project
* cách config Supabase
* cách thêm API mới sau này

## 12. Kết quả mong muốn

Sau khi setup xong, repository phải đạt các yêu cầu:

1. Chạy được Web Admin bằng Next.js.
2. Chạy được bằng Docker.
3. Có Docker configuration riêng cho local và production.
4. Frontend kết nối trực tiếp Supabase.
5. Có sẵn structure để thêm API trong tương lai.
6. Environment variables quản lý qua `.env`.
7. Không hard-code environment values hoặc secret trong Docker.
8. Có `APP_ENV` để xác định môi trường.
9. Debug logging chỉ chạy ở local.
10. Package và runtime version được pin cụ thể.
11. Code structure rõ ràng và dễ mở rộng.
12. README đủ để một developer khác clone repository và chạy project.

Trước khi implement, hãy xác định cụ thể version sẽ sử dụng cho:

* Node.js
* Next.js
* React
* TypeScript
* package manager

Sau đó setup project hoàn chỉnh theo các yêu cầu trên.

Nếu repository hiện tại đã có code/configuration, hãy ưu tiên **refactor và giữ lại phần có thể tái sử dụng**, không xóa hoặc overwrite một cách không cần thiết.

Sau khi hoàn thành, hãy trả về:

* danh sách file đã tạo/chỉnh sửa
* project structure cuối cùng
* các version đã chọn
* các command để chạy local
* các command để chạy production
* danh sách environment variables cần cấu hình
* giải thích ngắn các quyết định kiến trúc quan trọng
