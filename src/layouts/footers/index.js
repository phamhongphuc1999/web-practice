import { Container } from '@material-ui/core'
import React from 'react'
import CategoryFooter from './CategoryFooter'
import MainFooter from './MainFooter'
import MerchantAppFooter from './MerchantAppFooter'
import PartnerFooter from './PartnerFooter'
import PreservationFooter from './PreservationFooter'

const StandardFooter = () => {
  return (
    <Container maxWidth="lg">
      <PreservationFooter />
      <MerchantAppFooter />
      <PartnerFooter />
      <CategoryFooter />
      <MainFooter />
    </Container>
  )
}

export default StandardFooter
