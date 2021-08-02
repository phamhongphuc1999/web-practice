import { Container, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import bannerPhone from '../../assets/images/footer/merchant.png'
import cx from 'classnames'

import * as styles from '../../assets/css/layouts/footer.module.css'

const MerchantAppFooter = () => {
  const { t } = useTranslation()

  return (
    <Paper className="my-10 py-3">
      <Container maxWidth="md">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-9">
            <Typography variant="h6" className={styles.footerTitle}>
              NowMerchant App
            </Typography>
            <Typography className={cx("text-xs", styles.content)}>
              - <span className="font-bold">NowMerchant</span> {t('footer.merchant.text1')}
            </Typography>
            <Typography className={cx("text-xs", styles.content)}>
              - <span className="font-bold">Now.vn</span> {t('footer.merchant.text2')}
            </Typography>
            <Typography className={cx("text-xs", styles.content)}>
              {t('footer.merchant.text3')}:
              <span className="text-blue-500 font-extrabold"> {t('here')}</span>
            </Typography>
          </div>
          <div className="col-span-3">
            <img src={bannerPhone} alt="footer merchant" width="294px" />
          </div>
        </div>
      </Container>
    </Paper>
  )
}

export default MerchantAppFooter
