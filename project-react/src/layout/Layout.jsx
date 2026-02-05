import React from 'react'
import {Outlet} from 'react-router'
import Nav_Main from '../components/ui/Nav_Main.jsx'

const Layout = () => {
  return (
    <div>
      <Nav_Main />
      <div className="h-20" aria-hidden="true" />
      <Outlet />
    </div>
  )
}

export default Layout