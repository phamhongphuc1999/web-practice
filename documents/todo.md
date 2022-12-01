##### Xây dựng một chương trình đơn giản

- Ý tưởng: Xây dựng một ví đơn giản với ý tưởng chia thành hai môi trường riêng biệt(tham khảo tại [đây](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=8412192)). Một để chạy những tác vụ không cần bảo mật(normal execution environment), một để lưu trữ và chạy những tác vụ nhạy cảm(secure execution environment).
- Yêu cần cơ bản của ví
  - Phần secure execution environment: chạy tác vụ tạo ví(tạo private key), chạy tác vụ ký cơ bản
  - Phần normal execution environment: lấy dữ liệu đã được ký bằng private key
- Các phần cần lưu ý: các giao tiếp giữa hai phần của ví

##### Tìm hiểu về Metamask

- Tiếp tục tìm hiểu về Metamask
  - tìm hiểu chi tiết các lưu khoá, các ký transaction, ký message
  - cách metamask khôi phục tài khoản, khoá. Cách khôi phục lại tất cả dữ liệu khi bị xoá rồi cài lại(cách lưu trữ dữ liệu)
