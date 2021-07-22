import React from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineSearch } from 'react-icons/ai'

import AppStoreEn from '../../assets/images/apps/AppStore.png'
import AppStoreVi from '../../assets/images/apps/AppStore-vn.png'
import PlayStoreEn from '../../assets/images/apps/PlayStore.png'
import PlayStoreVi from '../../assets/images/apps/PlayStore-vn.png'

import * as styles from '../../assets/css/pages/food.module.css'

const categoryList = [
  'all', 'food', 'drink', 'vege', 'cakes', 'dessert', 'homemade', 'stressfood',
  'pizza/burger', 'chicken', 'hotpot', 'sushi', 'noodles', 'rice'
]

const NowSearch = () => {
  const { t } = useTranslation();

  const categoryClick = (category) => {

  }

  return (
    <div className={styles.nowSearch}>
      <div className={styles.searchTitle}>
        <div className="font-bold">{t('foodPage.searchTitle')}</div>
        <div className="">{t('foodPage.searchText')}</div>
      </div>
      <div className={styles.inputSearch}>
        <input type="text" placeholder={t('foodPage.inputPlaceholder')} />
        <button>
          <AiOutlineSearch />
        </button>
      </div>
      <div className={styles.categoryFilter}>
        {categoryList.map((element, index) => {
          return (
            <button onClick={() => categoryClick(element)}>
              {t(`foodPage.category.${element}`)}
            </button>
          )
        })}
      </div>
      <div>{t('foodPage.useAppText')}</div>
      <div className="searchApp">

      </div>
    </div>
  )
}

export default NowSearch
