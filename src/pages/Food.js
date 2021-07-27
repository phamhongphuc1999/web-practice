import React from 'react'
import NowSearch from '../components/shared/pages/NowSearch'
import MainHome from '../components/food/MainHome'
import { FOOD } from '../assets/config/constant'

const categoryList = [
  'all', 'food', 'drink', 'vege', 'cakes', 'dessert', 'homemade', 'stressfood',
  'pizza/burger', 'chicken', 'hotpot', 'sushi', 'noodles', 'rice'
]

const Food = () => {
  return (
    <>
      <NowSearch
        categoryList={categoryList}
        type={FOOD}
      />
      <div style={{ position: 'relative', marginTop: '70px' }}>
        <div className="now-container">
          <MainHome className="float-right" />
        </div>
      </div>
    </>
  )
}

export default Food
