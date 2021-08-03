import { MEDICINE } from "../../assets/config/constant"
import NowSearch from "../../components/shared/pages/NowSearch"
import React from 'react'

const categoryList = [
  'all', 'pharmacies'
]

const Medicine = () => {
  return (
    <>
      <NowSearch
        categoryList={categoryList}
        type={MEDICINE}
      />
    </>
  )
}

export default Medicine
