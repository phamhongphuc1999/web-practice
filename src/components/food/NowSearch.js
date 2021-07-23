import React from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineSearch } from 'react-icons/ai'
import cx from 'classnames'

import AppStoreEn from '../../assets/images/apps/AppStore.png'
import AppStoreVi from '../../assets/images/apps/AppStore-vn.png'
import PlayStoreEn from '../../assets/images/apps/PlayStore.png'
import PlayStoreVi from '../../assets/images/apps/PlayStore-vn.png'

import * as styles from '../../assets/css/pages/food.module.css'

const categoryList = [
  'all', 'food', 'drink', 'vege', 'cakes', 'dessert', 'homemade', 'stressfood',
  'pizza/burger', 'chicken', 'hotpot', 'sushi', 'noodles', 'rice'
]

const NowSearch = ({ className }) => {
  const { t } = useTranslation();

  const categoryClick = (category) => {

  }

  return (
    <div className={cx(styles.nowSearch, className)}>
      <div className="font-bold text-3xl pb-1">{t('foodPage.searchTitle')}</div>
      <div className="text-base">{t('foodPage.searchText')}</div>
      <div className={styles.inputSearch}>
        <input className={styles.input} type="text" placeholder={t('foodPage.inputPlaceholder')} />
        <button className={styles.searchBtn}>
          <AiOutlineSearch size="30px" />
        </button>
      </div>
      <div className={styles.categoryFilter}>
        {categoryList.map((element, index) => {
          return (
            <button className={styles.categoryBtn} onClick={() => categoryClick(element)}>
              {t(`foodPage.category.${element}`)}
            </button>
          )
        })}
      </div>
      <div className="text-lg pt-4">{t('foodPage.useAppText')}</div>
      <div className="flex mt-5">
        <img src={AppStoreEn} alt="app store" className={cx(styles.imgApp, 'border border-white rounded-md')} />
        <img src={PlayStoreEn} alt="play store"
          className="ml-4" style={{ width: '37%', height: '37%' }} />
      </div>
    </div>
  )
}

export default NowSearch
