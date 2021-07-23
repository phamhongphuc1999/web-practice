import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import BaseTooltip from '../BaseTooltip'

const VerticalItem = ({ data, ...prop }) => {
  const { t } = useTranslation()
  const cardRef = useRef()

  const itemClick = () => {

  }

  const cardMouseEnter = () => {
    cardRef.current.style.boxShadow = '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)';
  }

  const cardMouseLeave = () => {
    cardRef.current.style.boxShadow = 'none'
  }

  return (
    <Card ref={cardRef} {...prop} onClick={() => itemClick()} style={{ boxShadow: 'none' }}
      onMouseEnter={() => cardMouseEnter()} onMouseLeave={() => cardMouseLeave()}
      className="border-0 bg-transparent">
      <CardActionArea>
        <BaseTooltip title={data.title}>
          <CardMedia
            component="img"
            alt={data.title}
            image={data.image}
          />
        </BaseTooltip>
        <CardContent>
          <BaseTooltip title={data.title}>
            <div className="font-bold text-sm whitespace-nowrap overflow-ellipsis overflow-hidden">
              {data.title}
            </div>
          </BaseTooltip>
          <BaseTooltip title={data.title}>
            <a href={`/bo-suu-tap/${data.metalink}`} className="text-xs text-blue-500">
              {`${data.numberOfPlace} ${t('location')}`}
            </a>
          </BaseTooltip>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default VerticalItem
