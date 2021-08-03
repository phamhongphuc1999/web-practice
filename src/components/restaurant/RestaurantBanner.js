import React from 'react'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { AiTwotonePhone, AiOutlineSearch } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'
import { Container } from '@material-ui/core'

import * as styles from '../../assets/css/pages/restaurant.module.css'

const RestaurantBanner = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.tbnowBanner}>
      <Container maxWidth="lg" className={cx("grid grid-rows-2 gap-4 pt-20 pb-3")}>
        <div className="row-span-1">
          <div className={styles.logo}></div>
        </div>
        <div className="row-span-1 text-white pt-5">
          <div className="flex justify-between pb-4">
            <div className="text-2xl">{t('restaurantPage.findRestaurant')}</div>
            <div className="flex items-center font-bold text-base">
              <AiTwotonePhone className="mr-2" /> 1900 2042
              <BiTime color="#ffff" className="ml-4 mr-2" /> 08:00 AM - 09:00 PM
            </div>
          </div>
          <div className="grid grid-cols-12">
            <input className="p-5 col-span-10 focus:outline-none text-gray-500"
              placeholder={t('restaurantPage.findRestaurant')} />
            <div className="col-span-2 flex items-center justify-center bg-yellow-700 cursor-pointer">
              <AiOutlineSearch size="20" className="mr-3" />
              <span className="font-semibold">{t('restaurantPage.findText')}</span>
            </div>
          </div>
          <div className="text-right pt-5">{t('restaurantPage.moreInfo')}</div>
        </div>
      </Container>
    </div>
  )
}

export default RestaurantBanner
