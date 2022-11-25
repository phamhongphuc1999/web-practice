<h1 align="center">
  Metamask
</h1>

### Mục lục

1. [Giới thiệu về Metamask](#section1)
2. [Kiến trúc của Metamask](#section2)
3. [Tìm hiểu về thư viện Eth keyring controller](#section3)
4. [Các hàm ký message](#section4)

---

### 1. Giới thiệu về [Metamask](https://docs.metamask.io/guide/)<a name="section1"></a>

- Metamask giúp người dùng quản lý tài khoản và các khoá của họ theo nhiều cách khác nhau, trong khi vẫn có thể cách ly chúng với các dữ liệu khác của trang web. Nó là một sự cải tiến so với việc lưu ở một server tập trung, kể cả là ở local storage, nơi có thể cho phép [mass account thefts](https://www.ccn.com/cryptocurrency-exchange-etherdelta-hacked-in-dns-hijacking-scheme/)
- Metamask có sẵn một số kết nối nhanh tới mạng Ethereum và một số mạng testnet. Nó cho phép chúng ta bắt đầu mà không cần đồng bộ với full node, trong khi vẫn cung cấp các lựa chọn để nâng cấp sự bảo mật và sử dụng `blockchain provider` của mình.

Tài liệu này sẽ tập trung vào việc giải thích(hy vọng là cụ thể) các vấn đề sau

- Các Metamask tạo ví, tạo tài khoản mới
- Các Metamask lưu trữ và bảo mật khoá riêng(private key)
- Các Metamask tương tác với các dApp, các chúng sử dụng private key gửi giao dịch

Một đường link thú vị để test với Metamask ở [đây](https://metamask.github.io/test-dapp/), code ở [đây](https://github.com/metamask/test-dapp)

---

### 2. Kiến trúc của Metamask <a name="section2"></a>

<image src="./architecture.png" />

---

#### 3. Tìm hiểu về thư viện [Eth keyring controller](https://www.npmjs.com/package/eth-keyring-controller) <a name="section3"></a>

- Là một module cho việc quản lý các nhóm các tài khoản ethereum
- Module có ba chức năng chính
  - Khởi tạo và sử dụng các nhóm tài khoản ethereum
  - Theo dõi các `local nicknames` cho từng tài khoản
  - Cung cấp các giải thuật mã hoá và lấy lại các dữ liệu bí mật

---

### 4. Các hàm ký message <a name="section4"></a>
