import { Container, Paper } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import preservationImg from '../../assets/images/footer/Box-food-preservation-footer.jpg'

const PreservationFooter = () => {
  const { t } = useTranslation()

  return (
    <Paper>
      <Container maxWidth="md">
        <div className="font-semibold">{t("footer.preservationTitle")}</div>
        <span className="">{t("footer.preservationText")}</span>
        <img src={preservationImg} alt="footer preservation" />
      </Container>
    </Paper>
  )
}

export default PreservationFooter
