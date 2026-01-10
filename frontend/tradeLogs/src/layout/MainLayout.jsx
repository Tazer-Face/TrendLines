import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div style={{backgroundColor :"#f9fafb" ,display: "flex", flexDirection: "column", minHeight: "100dvh" ,overflowY: "hidden" , overflowX : "hidden"}}>
        <Header/>
        <div style={{flex: 1}} >
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout