import { Container, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import preservationImg from '../../assets/images/footer/Box-food-preservation-footer.jpg'

import * as styles from '../../assets/css/layouts/footer.module.css'

const PreservationFooter = () => {
  const { t } = useTranslation()

  return (
    <Paper className="my-10 py-3">
      <Container maxWidth="md">
        <Typography variant="div" className={styles.footerTitle}>
          {t("footer.preservation.title")}
        </Typography>
        <Typography className="">{t("footer.preservation.text")}</Typography>
        <img src={preservationImg} alt="footer preservation" />
      </Container>
    </Paper>
  )
}

export default PreservationFooter
