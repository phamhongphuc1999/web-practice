import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BaseTooltip from '../BaseTooltip'

const VerticalItem = ({ data, ...prop }) => {
  const { t } = useTranslation()

  const itemClick = () => {

  }

  return (
    <Card {...prop} onClick={() => itemClick()}>
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
