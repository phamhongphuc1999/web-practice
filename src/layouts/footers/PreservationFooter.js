import { Container, Paper } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import preservationImg from '../../assets/images/footer/Box-food-preservation-footer.jpg'

const PreservationFooter = () => {
  const { t } = useTranslation()

  return (
    <Paper className="my-10 py-3">
      <Container maxWidth="md">
        <div className="font-semibold">{t("footer.preservation.title")}</div>
        <span className="">{t("footer.preservation.text")}</span>
        <img src={preservationImg} alt="footer preservation" />
      </Container>
    </Paper>
  )
}

export default PreservationFooter
