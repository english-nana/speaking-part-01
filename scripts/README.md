# Scripts

Các script phụ trợ được tách khỏi thư mục gốc để không lẫn với mã chạy chính.

## Build & Đồng bộ
- `node scripts/build.js`: đồng bộ mã React từ `app.js` vào thẻ `<script type="text/babel">` trong `index.html` để website có thể mở trực tiếp bằng cách click đúp file `index.html` (giao thức `file://`) mà không bị lỗi CORS của trình duyệt.

## Kiểm tra

- `node scripts/check-errors.js`: mở project qua HTTP tạm thời và kiểm tra lỗi runtime bằng Puppeteer.
- `scripts/tests/`: các fixture/test cũ dùng cho thử nghiệm riêng.

## Migrations

`migrations/` chứa các script chỉnh dữ liệu hoặc giao diện theo từng lần cập nhật trước đây. Đây là script một lần, không chạy tự động khi mở project.
