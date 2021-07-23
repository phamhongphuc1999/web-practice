import { Card, CardContent, CardMedia } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

const HorizontalItem = ({ data, ...prop }) => {
  const { t } = useTranslation()

  const itemClick = () => {

  }

  return (
    <Card {...prop} onClick={() => itemClick()}>
      <CardContent>
        <CardMedia
          component="img"
          image={data.image}
          alt={data.title}
        />
      </CardContent>
    </Card>
  )
}

export default HorizontalItem
