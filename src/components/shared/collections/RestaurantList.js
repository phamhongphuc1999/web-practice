import { Card, CardContent } from '@material-ui/core'
import React, { useState } from 'react'
import HorizontalItem from './HorizontalItem'

const RestaurantList = ({ titles, actions }) => {
  const [index, setIndex] = useState(0)

  const actionClick = (index) => {

  }

  return (
    <Card className="mt-5 px-5">
      <CardContent>
        <div className="grid grid-cols-6 gap-1">
          <div className="col-span-4 grid grid-cols-4 gap-1">
            {titles.map((element, index) => (
              <div key={index} onClick={() => actionClick(index)}>{element}</div>
            ))}
          </div>
          <div className="col-span-2">
          </div>
        </div>
        <div>
          {actions[index].map((element, index) => (
            <HorizontalItem
              key={index} data={element}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RestaurantList
