import React from 'react'
import Header from './headers/Header'
import LocalModal from '../components/layouts/LocalModal'
import SearchModal from '../components/layouts/SearchModal'
import PreservationFooter from './footers/PreservationFooter'
import NowControl from '../components/layouts/NowControl'

const Layout = ({ action, children }) => {
  return (
    <>
      <Header action={action} />
      <div id="content">
        {children}
      </div>
      <PreservationFooter />
      <SearchModal />
      <LocalModal />
      <NowControl />
    </>
  )
}

export default Layout
