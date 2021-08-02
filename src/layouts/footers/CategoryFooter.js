import { Box, Container } from "@material-ui/core"
import React from 'react'
import cx from 'classnames'

import * as styles from '../../assets/css/layouts/footer.module.css'

const Item = ({ title, content }) => (
  <div className="py-3">
    <div className={cx(styles.categoryTitle, 'pb-3')}>{title}</div>
    <div className="text-sm text-gray-400">{content}</div>
  </div>
)

const CategoryFooter = () => {
  return (
    <Container maxWidth="lg">
      <Box>
        <div className={styles.categoryTitle}>Danh mục</div>
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-1">
            <Item
              title="Thuốc"
              content="Hoá mỹ phẩm | BCS | Thiết bị | Vitamins | Thuốc tây | Khẩu trang| Khẩn cấp"
            />
            <Item
              title="Thú cưng"
              content="Thú cưng"
            />
            <Item
              title="Rượu bia"
              content="Rượu | Bia"
            />
          </div>
          <div className="col-span-1">
            <Item title="Đồ ăn Homepage" />
            <Item title="Đồ ăn"
              content="Vỉa hè | Món lẩu | Cơm hộp | Đồ uống | Đồ chay | Bánh kem | Tráng miệng | Homemade | Sushi | Mì phở | Đồ ăn | Pizza/Burger | Món gà" />
          </div>
          <div className="col-span-1">
            <Item title="Giặt ủi" />
            <Item title="Sản phẩm" />
          </div>
          <div className="col-span-1">
            <Item title="Thực phẩm" />
            <Item title="Hoa" />
          </div>
        </div>
      </Box>
    </Container>
  )
}

export default CategoryFooter
