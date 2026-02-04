import React from 'react'
import {Outlet} from 'react-router'
import Nav_Home from '../components/ui/Nav_Home.jsx'

const Layout = () => {
  return (
    <div>
      <Nav_Home />
      <Outlet />
    </div>
  )
}

export default Layout