import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div style={{backgroundColor :"#f9fafb"}}>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout