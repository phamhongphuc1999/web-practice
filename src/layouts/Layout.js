import React from 'react'
import Header from './headers/Header'
import LocalModal from '../components/layouts/LocalModal'
import SearchModal from '../components/layouts/SearchModal'
import PreservationFooter from './footers/PreservationFooter'
import NowControl from '../components/layouts/NowControl'

const Layout = ({ pathname, children }) => {
  return (
    <>
      <Header pathname={pathname} />
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
