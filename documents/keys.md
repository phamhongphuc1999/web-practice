<h1 align="center">
  Public and private key
</h1>

- bài viết [tham khảo](https://www.gemini.com/cryptopedia/public-private-keys-cryptography)

### Mục lục

---

1. [Giới thiệu](#section1)
2. [What Is Public-Key Cryptography?](#section2)
3. [What is a public key?](#section3)
4. [What is a private key?](#section4)
5. [What Does It Mean to “Digitally Sign” a Transaction?](#section5)
6. [Mã khoá đối xứng và mã khoá bất đối xứng](#section6)
   1. [cryptography](#section6_1)
   2. [Hệ mật mã khóa đối xứng](#section6_2)
   3. [Hệ mật mã khóa bất đối xứng](#section6_3)

---

### 1. Giới thiệu <a name="section1"></a>

- public and private keys là một phần của Bitcoin và các đồng tiền điện tử khác. Nó cho phép chúng ta gửi hoặc nhận các đồng tiền điện tử(cryptocurrency) mà không cần đến một bên thứ ba để xác thực. Chúng là một phần của public-key cryptography (PKC) framework. Chúng ta có thể dùng chúng để gửi tiền của mình cho bất kỳ ai, ở bất kỳ đâu trong bất kỳ khoảng thời gian nào. Public key và private key được gọi là key pair. Bạn phải chia sẻ public key của mình nếu muốn nhận tiền, nhưng phải luôn bảo mật private key. Nếu ai đó có thể tiếp cận với private key của bạn, họ cũng có thể tiếp cận với tất cả các tiền điện tử liên kết với private key đó.

---

### 2. What Is Public-Key Cryptography? <a name="section2"></a>

- Public-key cryptography (PKC) là một kỹ thuật được sử dụng để xác thực dữ liệu sử dụng mã khoá bất đới xứng([asymmetric encryption](https://www.gemini.com/cryptopedia/symmetric-vs-asymmetric-encryption)). Ban đầu chúng được dùng để mã hoá và giải mã trong các máy tính truyền thống(traditional computing). Hiện tại, tiền điện tử dùng chúng để mã hoá và giải mã các giao dịch(transaction).
- Mấu chốt của PKC là trapdoor functions, một hàm toán học một chiều có thể dễ dàng giải ở một chiều, nhưng gần như bất khả thi trong việc bẻ khoá ngược lại. Nếu chúng có khả năng, nó sẽ đòi hỏi một siêu máy tính trong hàng nghìn năm để bẻ khoá.

---

### 3. What is a public key <a name="section3"></a>

- public key cho phép bạn nhận giao dịch. Nó là một mật mã bắt cặp với private key. Tất cả mọi người có thể gửi giao dịch bằng public key, bạn cần private key để "mở khoá(unlock)" chúng và chứng minh bạn là chủ của tài sản được nhận trong giao dịch. Public key có thể nhận giao dịch thường là [address](https://www.gemini.com/cryptopedia/glossary#public-address)

---

### 4. What is a private key? <a name="section4"></a>

- private key giúp bạn chứng minh quyền sở hữu hoặc chi tiêu tài sản liên kết với public address. Private key có thể có những dạng sau
  - 256 character long binary code
  - 64 digit hexadecimal code
  - QR code
  - mnemonic phrase
- Bất kể ở dạng nào, private key là một số lớn(astronomically large number), điều này có nhiều nguyên nhân. Trong khi bạn có thể tạo public key với một private key, làm điều ngược lại thực tế là không thể vì trapdoor function.
- Private key của bạn ở trong một ví điện tử([cryptocurrency wallet](https://www.gemini.com/cryptopedia/crypto-wallet-types)), nó có thể là một phần mềm desktop hoặc mobile hoặc một thiết bị phần cứng đặc biệt. Private key của bạn không nằm trên blockchain network. Nếu bạn giữ tiền điện tử ở một [exchange](https://www.gemini.com/cryptopedia/what-is-a-crypto-exchange) và nó quản lý private key của bạn thì bạn sẽ phải tin nó giống như cách bạn tin tưởng ngân hàng để giữ vàng của mình.
- Nếu bạn chuyển tiền điện tử từ exchange tới một [non-custodial wallet](https://www.gemini.com/cryptopedia/crypto-wallets-custodial-vs-noncustodial), sau đó bạn sẽ kiểm soát khoá của mình. Vì các cài đặt và các chứng năng của ví điện tử, bạn sẽ không xử lý trực tiếp với private key. Thay vào đó, ví sẽ quản lý chúng cho bạn một cách tự động. thông thường, bạn được cung cấp một [seed phrase](https://www.gemini.com/cryptopedia/glossary#seed-phrase) để có thể back-up private key của mình.

---

### 5. What Does It Mean to “Digitally Sign” a Transaction? <a name="section5"></a>

- Để một giao dịch trên blockchain được hoàn tất, nó cần được ký. Các bước để một người gửi giao dịch của họ là:
  1. Giao dịch được mã hoá bằng public key. Giao dịch đó chỉ có thể giải mã bằng private key đi kèm với public key trên.
  2. Giao dịch đó được ký bởi private key, thứ chứng minh rằng giao dịch không bị chỉnh sửa. Chữ ký điện tử được tạo ra bằng cách kết hợp private key với data được gửi trong giao dịch.
  3. Giao dịch được xác thực là chính danh bằng public key

---

### 6. Mã khoá đối xứng và mã khoá bất đối xứng <a name="section6"></a>

### 6.1. cryptography <a name="section6_1"></a>

- tham khảo tại [đây](https://viblo.asia/p/khai-niem-co-ban-ve-he-mat-ma-hoa-khoa-doi-xung-va-bat-doi-xung-jvElao3dKkw)
- Là ngành khoa học nghiên cứu các phương pháp toán học để mã hóa bảo mật thông tin. Bao gồm mã hóa và giải mã.
  - Mã hóa là biến đổi cách thức biểu diễn thông tin từ dạng bản rõ (chúng ta có thể đọc được) sang dạng bản mã (chỉ người giải mã mới hiểu được), nó giúp chúng ta che giấu, giữ mật thông tin trong khi lưu trữ cũng như truyền thông tin đi.
  - Giải mã là quá trình ngược lại đó là biến bản mã thành bản rõ.
- Chức năng cơ bản của mật mã đó là:
  - `Tính bí mật`: nó đảm bảo tính bí mật của dữ liệu mà mình gửi đi và chỉ những người liên quan mới biết được nội dung.
  - `Tính toàn vẹn`: đảm bảo dữ liệu không thể bị mất mát hoặc chỉnh sửa trong qua trình gửi và nhận mà không bị phát hiện.
  - `Tính xác thực`: đảm bảo danh tính của thực thể được xác minh.
  - `Tính không thể chối từ`: đảm bảo người gửi không thể chối cãi với thông tin mình gửi đi.

### 6.2. Hệ mật mã khóa đối xứng <a name="section6_2"></a>

- Là những hệ mật chỉ sử dụng chung 1 khóa trong quá trình mã hóa và mã hóa. Do đó khóa phải được giữ bí mật tuyện đối.
  <image src="./doi_xung.webp" />

### 6.3. Hệ mật mã khóa bất đối xứng <a name="section6_3"></a>

- Ở hệ mật này thay vì nguời dùng dùng chung 1 khóa như ở hệ mật mã khóa đối xứng thì ở đây sẽ dùng 1 cặp khóa có tên là public key và private key.
  <image src="./bat_doi_xung.webp" />
