import { Box, Container } from "@material-ui/core";
import React from "react";
import cx from "classnames";

import * as styles from "../../../assets/css/layouts/footer.module.css";

const Item = ({ title, content }) => (
  <div className="py-3">
    <div
      className={cx(
        styles.categoryTitle,
        "pb-3 hover:text-blue-400 cursor-pointer"
      )}
    >
      {title}
    </div>
    <div className="text-left">
      {(() => {
        if (content) {
          const count = content.length;
          return content.map((element, index) => (
            <a
              className={cx("text-sm text-gray-400", styles.linkItem, {
                [styles.linkItemAfter]: index < count - 1,
              })}
              key={index}
              href="/"
            >
              {element}
            </a>
          ));
        }
      })()}
    </div>
  </div>
);

const CategoryFooter = () => {
  return (
    <Container maxWidth="lg" className={styles.categoryContainer}>
      <Box>
        <div className={styles.categoryTitle}>Danh mục</div>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <Item
              title="Thuốc"
              content={[
                "Hoá mỹ phẩm",
                "BCS",
                "Thiết bị",
                "Vitamins",
                "Thuốc tây",
                "Khẩu trang",
                "Khẩn cấp",
              ]}
            />
            <Item title="Thú cưng" content={["Thú cưng"]} />
            <Item title="Rượu bia" content={["Rượu", "Bia"]} />
          </div>
          <div className="col-span-1">
            <Item title="Đồ ăn Homepage" />
            <Item
              title="Đồ ăn"
              content={[
                "Vỉa hè",
                "Món lẩu",
                "Cơm hộp",
                "Đồ uống",
                "Đồ chay",
                "Bánh kem",
                "Tráng miệng",
                "Homemade",
                "Sushi",
                "Mì phở",
                "Đồ ăn",
                "Pizza/Burger",
                "Món gà",
              ]}
            />
          </div>
          <div className="col-span-1">
            <Item
              title="Giặt ủi"
              content={[
                "Giặt ủi",
                "Giày",
                "Thú bông",
                "Giặt hấp",
                "Vệ sinh công nghiệp",
              ]}
            />
            <Item
              title="Sản phẩm"
              content={[
                "Mỹ phẩm",
                "Đồ chơi",
                "Sữa",
                "Tã bỉm",
                "Dụng cụ",
                "Quần áo",
                "Giày dép",
                "Điện tử",
                "Trang sức",
                "Sản phẩm - TP.HCM",
              ]}
            />
          </div>
          <div className="col-span-1">
            <Item
              title="Thực phẩm"
              content={[
                "Ăn chay",
                "Trái cây",
                "Gia vị",
                "Đặc sản",
                "Thịt/trứng",
                "Hải sản",
                "Rau củ",
                "Gạo mì",
                "Đồ uống/Ăn vặt",
                "Thực phẩm - TP.HCM",
              ]}
            />
            <Item
              title="Hoa"
              content={[
                "Chia buồn",
                "Cây cảnh",
                "Chúc mừng",
                "Sinh nhật",
                "Tình yêu",
              ]}
            />
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default CategoryFooter;
