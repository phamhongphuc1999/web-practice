import { FLOWERS } from "../../assets/config/constant"
import NowSearch from "../../components/shared/pages/NowSearch"
import React from 'react'

const categoryList = [
  'all', 'congratulatory', 'condolatory', 'plants'
]

const Flower = () => {
  return (
    <>
      <NowSearch
        categoryList={categoryList}
        type={FLOWERS}
      />
    </>
  )
}

export default Flower
