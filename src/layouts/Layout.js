import React from 'react'
import Header from './headers/Header'
import PreservationFooter from './footers/PreservationFooter'

const Layout = ({ action, children }) => {
  return (
    <div>
      <Header action={action} />
      <div>
        {children}
      </div>
      <PreservationFooter />
    </div>
  )
}

export default Layout
