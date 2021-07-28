import { MEDICIEN } from "../assets/config/constant"
import NowSearch from "../components/shared/pages/NowSearch"
import React from 'react'

const categoryList = [
  'all', 'pharmacies'
]

const Liquor = () => {
  return (
    <>
      <NowSearch
        categoryList={categoryList}
        type={MEDICIEN}
      />
    </>
  )
}

export default Liquor
