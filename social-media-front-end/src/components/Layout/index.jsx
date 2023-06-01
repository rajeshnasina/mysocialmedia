import React from 'react'
import PrimaryNavbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <PrimaryNavbar/>
        <Outlet/>
    </div>
  )
}

export default Layout