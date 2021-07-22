import React from 'react'
import { useTranslation } from 'react-i18next'
import preservationImg from '../../assets/images/footer/Box-food-preservation-footer.jpg'

const PreservationFooter = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div className={className}>
      <div className="font-semibold">{t("footer.preservationTitle")}</div>
      <span className="">{t("footer.preservationText")}</span>
      <img src={preservationImg} alt="footer preservation" />
    </div>
  )
}

export default PreservationFooter
