import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer/Footer';

export default function MainLayout() {
  return (
    <div className='bg-image'>
      <Navbar/>
      <div className='px-md-5'>
        <Outlet/>
      </div>
     <Footer/>
    </div>
  )
}
