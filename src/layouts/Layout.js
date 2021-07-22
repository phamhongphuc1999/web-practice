import React from 'react'
import Header from './headers/Header'
import Footer from './footers/Footer'

const Layout = ({ action, children }) => {
  return (
    <div>
      <Header action={action} />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
