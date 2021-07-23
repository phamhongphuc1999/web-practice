import { Card, CardContent, CardMedia } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {ImPriceTag} from 'react-icons/im'
import {BsTagFill} from 'react-icons/bs'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'

const HorizontalItem = ({ data, ...prop }) => {
  const { t } = useTranslation()

  const itemClick = () => {

  }

  return (
    <Card {...prop} onClick={() => itemClick()} 
    className="border-0 bg-transparent" style={{boxShadow: 'none'}}>
      <CardContent className="grid grid-cols-12 gap-2">
        <CardMedia
        className="col-span-3"
          component="img"
          image={data.image}
          alt={data.title}
        />
        <div className="flex flex-col col-span-9 ml-3">
          <div className="font-bold text-sm whitespace-nowrap overflow-ellipsis overflow-hidden">
            {data.title}
          </div>
          <a href={`/bo-suu-tap/${data.metalink}`} className="text-xs text-blue-500">
              {`${data.numberOfPlace} ${t('location')}`}
            </a>
            <div>
              <div>
                <ImPriceTag />
                <span>{`${t('minimum')} ${data.minimum}`}</span>
              </div>
              <div>
                <RiMoneyDollarCircleFill />
                <span>{`${t('price')} ${data.price}`}</span>
              </div>
              <div>
                <BsTagFill />
                <span>{`${data.promotion}`}</span>
              </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HorizontalItem
