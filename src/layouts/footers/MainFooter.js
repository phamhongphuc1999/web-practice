import { Box, Container } from "@material-ui/core"
import React from 'react'

import * as styles from '../../assets/css/layouts/footer.module.css'

const MainFooter = () => {
  return (
    <Container maxWidth="lg">
      <Box>
        <div className="grid grid-cols-5 gap-1">
          <div className="col-span-1">
            <div className={styles.mainTitle}>Công ty</div>
            <Box>
              <a href="#">Giới thiệu</a>
              <a href="#">Trung tâm Trợ giúp</a>
              <a href="#">Quy chế</a>
              <a href="#">Điều khoản sử dụng</a>
              <a href="#">Bảo mật thông tin</a>
              <a href="#">Giải quyết khiếu nại</a>
              <a href="#">Liên hệ</a>
              <a href="#">Hợp tác nhân viên giao nhận</a>
              <a href="#">Đăng ký quán</a>
              <a href="#">Now Academy</a>
            </Box>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-2"></div>
          <div className="col-span-1"></div>
        </div>
      </Box>
    </Container>
  )
}

export default MainFooter
