import React from 'react'
import cx from 'classnames'
import logo from '../../assets/images/nowvn.png'
import * as styles from '../../assets/css/layouts/header.module.css'
import { FLOWERS, FOOD, FRESH, LIQOR, MART, MEDICIEN, RESTAURANT } from '../../assets/config/constant'
import { history } from '../../history'
import { useTranslation } from 'react-i18next'
import { BsCircleFill } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'

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
          <div className="col-start-3 col-end-10 flex">
            <div className={cx(styles.columnContent, "text-center", { [styles.active]: action === FOOD })}
              onClick={() => actionClick(FOOD)}>{t('food')}</div>
            <div className={cx(styles.columnContent, "text-center", { [styles.active]: action === RESTAURANT })}
              onClick={() => actionClick(RESTAURANT)}>{t('restaurant')}</div>
            <div className={cx(styles.columnContent, "text-center", { [styles.active]: action === FRESH })}
              onClick={() => actionClick(FRESH)}>{t('fresh')}</div>
            <div className={cx(styles.columnContent, "text-center", { [styles.active]: action === LIQOR })}
              onClick={() => actionClick(LIQOR)}>{t('liquor')}</div>
            <div className={cx(styles.columnContent, "text-center", { [styles.active]: action === FLOWERS })}
              onClick={() => actionClick(FLOWERS)}>{t('flowers')}</div>
            <div className={cx(styles.columnContent, "text-center", { [styles.active]: action === MART })}
              onClick={() => actionClick(MART)}>{t('mart')}</div>
            <div className={cx(styles.columnContent, "text-center", { [styles.active]: action === MEDICIEN })}
              onClick={() => actionClick(MEDICIEN)}>{t('medicien')}</div>
            <div className={cx(styles.columnContent, "text-center flex items-center")}>
              <BsCircleFill size="5px" color="gray" className="mr-1" />
              <BsCircleFill size="5px" color="gray" className="mr-1" />
              <BsCircleFill size="5px" color="gray" />
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-end">
            <AiOutlineSearch size="30px" className="mr-5 cursor-pointer" />
            <button className={styles.loginBut}>{t("login")}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
