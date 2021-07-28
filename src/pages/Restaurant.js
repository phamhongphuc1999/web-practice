import React from 'react'
import RestaurantBanner from '../components/restaurant/RestaurantBanner'
import CategoryTag from '../components/restaurant/CategoryTab'

const Restaurant = () => {
  return (
    <div style={{ paddingTop: '70px' }}>
      <RestaurantBanner />
      <div>
        <CategoryTag />
      </div>
    </div>
  )
}

export default Restaurant
