import { Box, Container } from "@material-ui/core"
import React from 'react'
import cx from 'classnames'
import { AiOutlineGooglePlus } from 'react-icons/ai'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import GoldSeals from '../../assets/images/footer/gov_seals.jpg'
import Logo from '../../assets/images/logo/Logo-NowVN.png'
import AppStore from '../../assets/images/apps/AppStore-vn.png'
import PlayStore from '../../assets/images/apps/PlayStore-vn.png'

import * as styles from '../../assets/css/layouts/footer.module.css'

const MainFooter = () => {
  return (
    <Container maxWidth="lg" className={styles.mainContainer}>
      <Box>
        <div className="grid grid-cols-6 gap-1">
          <div className="col-span-1">
            <div className={styles.mainTitle}>Công ty</div>
            <Box className="flex flex-col text-sm">
              <a className="py-1 text-blue-500" href="#">Giới thiệu</a>
              <a className="py-1 text-blue-500" href="#">Trung tâm Trợ giúp</a>
              <a className="py-1 text-blue-500" href="#">Quy chế</a>
              <a className="py-1 text-blue-500" href="#">Điều khoản sử dụng</a>
              <a className="py-1 text-blue-500" href="#">Bảo mật thông tin</a>
              <a className="py-1 text-blue-500" href="#">Giải quyết khiếu nại</a>
              <a className="py-1 text-blue-500" href="#">Liên hệ</a>
              <a className="py-1 text-blue-500" href="#">Hợp tác nhân viên giao nhận</a>
              <a className="py-1 text-blue-500" href="#">Đăng ký quán</a>
              <a className="py-1 text-blue-500" href="#">Now Academy</a>
            </Box>
          </div>
          <div className="col-span-1">
            <div className={styles.mainTitle}>Now App</div>
            <img src={AppStore} alt="app store" />
            <img src={PlayStore} alt="play store" />
          </div>
          <div className="col-span-3 flex flex-col items-center">
            <img className="h-2/6 w-2/6" src={Logo} alt="GoldSeals" />
            <div>© 2021 Now - A Foody Corporation</div>
            <div className="flex justify-between pt-4">
              <div className={cx(styles.mainIcon, "mr-5 hover:bg-blue-400")}>
                <FaFacebookF size={20} />
              </div>
              <div className={cx(styles.mainIcon, "mr-5 hover:bg-red-500")}>
                <AiOutlineGooglePlus size={20} />
              </div>
              <div className={cx(styles.mainIcon, "hover:bg-indigo-600")}>
                <FaInstagram size={20} />
              </div>
            </div>
          </div>
          <div className="col-span-1 text-right text-sm">
            <div className={styles.mainTitle}>Địa chỉ công ty</div>
            <div className="py-1 text-gray-500">Công Ty Cổ Phần Foody</div>
            <div className="py-1 text-gray-500">Lầu G, Tòa nhà Jabes 1,</div>
            <div className="py-1 text-gray-500">số 244 đường Cống Quỳnh, phường Phạm Ngũ Lão, Quận 1, TPHCM</div>
            <div className="py-1 text-gray-500">Giấy CN ĐKDN số: 0311828036</div>
            <div className="py-1 text-gray-500">do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 11/6/2012,</div>
            <div className="py-1 text-gray-500">sửa đổi lần thứ 23, ngày 10/12/2020</div>
            <div className="py-1 text-gray-500">Số điện thoại: 1900 2042</div>
            <div className="py-1 text-gray-500">
              Email: <a>info@now.vn</a>
            </div>
            <div>
              <img src={GoldSeals} alt="GoldSeals" />
            </div>
          </div>
        </div>
      </Box>
    </Container>
  )
}

export default MainFooter
