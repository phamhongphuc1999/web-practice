import { Container, Paper } from '@material-ui/core'
import React from 'react'
import bannerPhone from '../../assets/images/footer/merchant.png'

const MerchantAppFooter = () => {
  return (
    <Paper>
      <Container maxWidth="lg">
        <div className="grid grid-col-12 gap-2">
          <div className="col-span-9">

          </div>
          <div className="col-span-3">
          <img src={bannerPhone} alt="footer merchant" />
          </div>
        </div>
      </Container>
    </Paper>
  )
}

export default MerchantAppFooter
