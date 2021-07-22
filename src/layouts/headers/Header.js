import React from 'react'
import cx from 'classnames'
import logo from '../../assets/images/nowvn.png'
import * as styles from '../../assets/css/layouts/header.module.css'
import { FLOWERS, FOOD, FRESH, LIQOR, MART, MEDICIEN, RESTAURANT } from '../../assets/config/constant'
import { history } from '../../history'
import { useTranslation } from 'react-i18next'

const Header = ({ action }) => {
  const { t } = useTranslation();

  const actionClick = (action) => {
    history.push(`/${action}`)
  }

  return (
    <div className={styles.containerHeader}>
      <div className={styles.containerContent}>
        <div className={cx(styles.content, "grid grid-cols-12 gap1")}>
          <div className="col-auto w-auto">
            <a href="/">
              <img src={logo} alt="now" />
            </a>
          </div>
          <div className="col-auto"></div>
          <div className="col-start-3 col-end-10 grid grid-cols-7 gap-1">
            <div className={cx(styles.columnContent, "col-1 text-center", { [styles.active]: action === FOOD })}
              onClick={() => actionClick(FOOD)}>{t('food')}</div>
            <div className={cx(styles.columnContent, "col-1 text-center", { [styles.active]: action === RESTAURANT })}
              onClick={() => actionClick(RESTAURANT)}>{t('restaurant')}</div>
            <div className={cx(styles.columnContent, "col-1 text-center", { [styles.active]: action === FRESH })}
              onClick={() => actionClick(FRESH)}>{t('fresh')}</div>
            <div className={cx(styles.columnContent, "col-1 text-center", { [styles.active]: action === LIQOR })}
              onClick={() => actionClick(LIQOR)}>{t('liquor')}</div>
            <div className={cx(styles.columnContent, "col-1 text-center", { [styles.active]: action === FLOWERS })}
              onClick={() => actionClick(FLOWERS)}>{t('flowers')}</div>
            <div className={cx(styles.columnContent, "col-1 text-center", { [styles.active]: action === MART })}
              onClick={() => actionClick(MART)}>{t('mart')}</div>
            <div className={cx(styles.columnContent, "col-1 text-center", { [styles.active]: action === MEDICIEN })}
              onClick={() => actionClick(MEDICIEN)}>{t('medicien')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
