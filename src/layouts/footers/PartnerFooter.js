import React from 'react'
import { Container, Paper } from '@material-ui/core'
import partnerImg from '../../assets/images/footer/bg-deliverynow.png'

const PartnerFooter = () => {
  return (
    <Paper>
      <Container maxWidth="md">
        <div className="grid grid-col-12 gap-2">
          <div className="col-span-9">

          </div>
          <div className="col-span-3">
            <img src={partnerImg} alt="partner footer" />
          </div>
        </div>
      </Container>
    </Paper>
  )
}

export default PartnerFooter
