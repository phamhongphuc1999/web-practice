import React from 'react'
import { FRESH } from '../assets/config/constant'
import MainFresh from '../components/fresh/MainFresh'
import NowSearch from '../components/shared/pages/NowSearch'

const categoryList = [
  'all', 'vege', 'fruit', 'meat', 'seafood', 'vegetable', 'rice', 'canned', 'spice'
]

const Fresh = () => {
  return (
    <>
      <NowSearch
        categoryList={categoryList}
        type={FRESH}
      />
      <div style={{ position: 'relative', marginTop: '70px' }}>
        <MainFresh />
      </div>
    </>
  )
}

export default Fresh
