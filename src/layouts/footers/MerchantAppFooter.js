import { Container, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import bannerPhone from '../../assets/images/footer/merchant.png'

const MerchantAppFooter = () => {
  const { t } = useTranslation()

  return (
    <Paper className="my-10 py-3">
      <Container maxWidth="lg">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-9">
            <Typography variant="h6">NowMerchant App</Typography>
            <div>
              - NowMerchant {t('footer.merchant.text1')}
            </div>
            <div>
              - Now.vn {t('footer.merchant.text2')}
            </div>
            <div>
              {t('footer.merchant.text3')}: <span>{t('here')}</span>
            </div>
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
