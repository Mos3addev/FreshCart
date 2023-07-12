import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer/Footer';

export default function MainLayout() {
  return (
    <div className='bg-image'>
      <Navbar/>
      <div className='px-5 main-layout'>
        <Outlet/>
      </div>
     <Footer/>
    </div>
  )
}
