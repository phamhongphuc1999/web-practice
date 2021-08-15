import { Box } from "@material-ui/core";
import * as styles from "../../../../assets/css/layouts/footer.module.css";

const FreshFooter = () => {
  return (
    <Box>
      <div className={styles.hTitle}>
        NowFresh - Đi chợ online gói gọn trong bàn tay
      </div>
      <p className={styles.textDocument}>
        NowFresh là một trong những ứng dụng đi chợ online có sức ảnh hưởng và
        thu hút sự chú ý của nhiều người dùng với loạt ưu điểm sáng giá, như chỉ
        cần vài cú click đơn giản là bạn có thể dễ dàng lựa chọn những loại thực
        phẩm tươi ngon nhất cho bữa cơm gia đình dù đang ở nơi đâu. Tiết kiệm
        thời gian, hàng lọat deal giảm giá, không chen chúc mua đồ và xếp hàng
        thanh toán
      </p>
      <p className={styles.textDocument}>
        Bạn có thể đặt mua online thịt, cá , trứng, sữa, trái cây, rau củ quả và
        rất nhiều mặt hàng tươi sống khác nữa trên hệ thống của NowFresh.
      </p>
      <div className={styles.hTitle}>
        Tại sao lại lựa chọn đặt thực phẩm online qua NowFresh?
      </div>
      <p className={styles.textDocument}>
        Là ứng dụng đi chợ online đầu tiên tại Việt Nam, NowFresh đã mang lại
        nhiều ưu thế cũng như cạnh tranh mạnh mẽ so với các nền tảng đối thủ
        khác cũng như so với cách đi chợ truyền thống
      </p>
      <Box ml={4}>
        <ul>
          <li>
            <p className={styles.textDocument}>
              <b>Danh sách siêu thị, cửa hàng tiện lợi</b> được cập nhật thường
              xuyên ở tỉnh thành khác nhau, cập nhật liên tục về địa điểm, giá
              cả và thời gian; giúp việc đi chợ trực tuyến trở nên dễ dàng
            </p>
          </li>
          <li>
            <p className={styles.textDocument}>
              <b>Ưu đãi ngập tràn:</b> deal giảm giá, đồng giá khủng từ hàng
              loạt cửa hàng hợp tác trên NowFresh: Homefarm, Farmer Market,
              MEATDeli,...
            </p>
          </li>
          <li>
            <p className={styles.textDocument}>
              <b>Nguồn hàng tươi sống an toàn - giá rẻ:</b> Chợ thực phẩm online
              là nơi có thể mua rau củ quả, thịt, cá, hải sản, trái cây nội/
              ngoại nhập, gạo, gia vị, trà, thực phẩm dinh dưỡng... với định
              lượng rõ ràng. Thậm chí bạn còn có thể tìm thấy những món đặc sản
              vùng miền ngay trên NowFresh mà không cần cất công tìm kiếm cửa
              hàng. Nếu bạn còn băn khoăn mua thực phẩm tươi sống online trên
              Now có đảm bảo không thì hoàn toàn có thể tin tưởng với chính sách
              và dịch vụ khách hàng của Now.
            </p>
          </li>
          <li>
            <p className={styles.textDocument}>
              <b>Tiện dụng và tiết kiệm:</b> với ứng dụng đi chợ trực tuyến Now,
              hỗ trợ bạn tìm kiếm và mua thực phẩm online đúng nhu cầu, uy tín
              và có nguồn cung cấp rõ ràng có thương hiệu trên thị trường. Ngoài
              việc tiết kiệm chi phí đi lại, hình thức đi chợ online còn có
              nhiều ưu điểm khác: miễn phí ship đồ ăn online trong vòng bán kính
              3km, giao hàng siêu tốc 1 tiếng...
            </p>
          </li>
        </ul>
      </Box>
      <div className={styles.hTitle}>
        Trải nghiệm thân thiện, thanh toán đơn giản với App Now
      </div>
      <p className={styles.textDocument}>
        Giao diện NowFresh được tối ưu với các đề mục cụ thể, đồng thời phân
        chia rõ thành các bộ sưu tập khác nhau trên ứng dụng giúp cho việc đi
        chợ online trở nên dễ dàng hơn. Chưa kể, nhằm tiếp tục mang đến sự thuận
        tiện cho người dùng, NowFresh - dịch vụ đi chợ mua thực phẩm tươi sống
        online đã có mặt trên ứng dụng Shopee - mang đến trải nghiệm mua sắm
        trực tuyến thuận tiện, nhanh chóng và an toàn trong mua sắm.
      </p>
      <p className={styles.textDocument}>
        Ứng dụng đi chợ bên cạnh hình thức trả tiền mặt khi nhận hàng, người
        dùng Now còn có thể thanh toán qua ví điện tử Air Pay với nhiều ưu đãi
        hấp dẫn, thẻ tín dụng (Visa/Mastercard), thẻ ATM hoặc tài khoản ngân
        hàng online (iBanking).
      </p>
    </Box>
  );
};

export default FreshFooter;
