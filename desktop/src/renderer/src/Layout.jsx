import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './components/Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node, // validates React children
}

export default Layout
