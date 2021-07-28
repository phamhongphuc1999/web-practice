import React from 'react'
import cx from 'classnames'
import * as styles from '../../assets/css/pages/restaurant.module.css'
import { useTranslation } from 'react-i18next'
import { AiTwotonePhone, AiOutlineSearch } from 'react-icons/ai'
import { GrClock } from 'react-icons/gr'

const RestaurantBanner = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.tbnowBanner}>
      <div className={cx("grid grid-rows-2 gap-4", styles.restauranContainer)}>
        <div className="row-span-1">
          <div className={styles.logo}></div>
        </div>
        <div className="row-span-1 text-white">
          <div className="flex justify-between">
            <div className="text-2xl">{t('restaurantPage.findRestaurant')}</div>
            <div className="flex items-center">
              <AiTwotonePhone /> 1900 2042
              <GrClock color="#ffff" /> 08:00 AM - 09:00 PM
            </div>
          </div>
          <div className="grid grid-cols-12">
            <input className="p-5 col-span-10 focus:outline-none text-gray-500"
              placeholder={t('restaurantPage.findRestaurant')} />
            <div className="col-span-2 flex items-center justify-center bg-yellow-700">
              <AiOutlineSearch size="20" />
              <span className="font-semibold">{t('restaurantPage.findText')}</span>
            </div>
          </div>
          <div className="text-right">{t('restaurantPage.moreInfo')}</div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantBanner
