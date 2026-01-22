import React from 'react'
import Header from '../shared/components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../shared/components/Footer'

const MainLayout = () => {
  return (
    <div style={{backgroundColor :"#f9fafb" ,display: "flex", flexDirection: "column", height: "100dvh" ,overflowY: "hidden" , overflowX : "hidden"}}>
        <Header/>
        <main style={{ flex: 1, overflow: "auto" }}>
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout