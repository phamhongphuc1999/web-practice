import React from 'react'
import { Container, Paper } from '@material-ui/core'
import partnerImg from '../../assets/images/footer/bg-deliverynow.png'
import { useTranslation } from 'react-i18next'

const PartnerFooter = () => {
  const { t } = useTranslation()

  return (
    <Paper className="my-10 py-3">
      <Container maxWidth="md">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-9">
            <div>
              <a href="#">Now.vn</a>
              <a href="#">{t('footer.partner.text1')}</a>
            </div>
            <div>{t('footer.partner.text2')}</div>
            <div>
              <span>Now</span>{t('footer.partner.text3')}
            </div>
            <div>
              {t('footer.partner.text4')}
              <a href="#">{t('here')}</a>
              {t('footer.partner.text5')}
              <a href="#">jobs@gofast.vn</a>
              {t('footer.partner.text6')}
            </div>
          </div>
          <div className="col-span-3">
            <img src={partnerImg} alt="partner footer" width="170px" />
          </div>
        </div>
      </Container>
    </Paper>
  )
}

export default PartnerFooter
