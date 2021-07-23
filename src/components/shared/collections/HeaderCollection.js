import { Card } from '@material-ui/core'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsChevronRight } from 'react-icons/bs'

const HeaderCollection = ({ action, address }) => {
  const searchAddressClick = () => {

  }

  return (
    <Card className="flex py-3 pl-7 pr-5 rounded-md text-sm items-center cursor-pointer"
      onClick={() => searchAddressClick()}>
      <span className="font-bold text-blue-500 mr-2">
        {action}
      </span>
      <AiOutlineArrowRight className="mr-2 text-gray-600" />
      <span className="text-gray-600 mr-auto">{address}</span>
      <BsChevronRight className="font-extrabold" />
    </Card>
  )
}

export default HeaderCollection
