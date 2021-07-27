import { Card, CardContent } from '@material-ui/core'
import React, { useState } from 'react'
import HorizontalItem from './HorizontalItem'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { AiOutlineReload } from 'react-icons/ai'

const RestaurantList = ({ titles, actions }) => {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)

  const actionClick = (index) => {
    setActive(index)
  }

  return (
    <Card className="mt-5 px-5">
      <CardContent>
        <div className="grid grid-cols-6 gap-1">
          <div className="col-span-4 grid grid-cols-4 gap-1">
            {titles.map((element, index) => (
              <div key={index} onClick={() => actionClick(index)}
                className={cx('cursor-pointer', { 'text-blue-400': active === index })}>
                {element}
              </div>
            ))}
          </div>
          <div className="col-span-2">
          </div>
        </div>
        <div className="mt-5">
          {actions[active].map((element, index) => (
            <HorizontalItem
              key={index} data={element}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-center items-center cursor-pointer text-sm font-medium text-blue-500">
          <span className="mr-3">{t('seeMore')}</span>
          <AiOutlineReload size="15" />
        </div>
      </CardContent>
    </Card>
  )
}

export default RestaurantList
