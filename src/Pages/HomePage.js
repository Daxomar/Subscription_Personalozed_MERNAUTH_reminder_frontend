import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import { assets } from '../assets/assets'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundImage: `url(${assets.bg_img})` }} >
      <Navbar />
      <Header/>
    </div>
  )
}

export default HomePage
