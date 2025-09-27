import React from 'react'
import axios from "axios";
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthContext'
const Header = () => {

  const { userData,  getUserData, GetUser } = useAuth()
  console.log(userData)

 

  return (
    <div className=" flex flex-col items-center mt-20 px-4 text-center">
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6 ' />

      <h1 className='flex items-center gap-2 text-x1 sm:text-3xl font-medium mb-2'>Hey  {userData ? userData.name : "Guest"}<img src={assets.hand_wave}
        alt="" className="w-8 aspect-square" />
      </h1>

      <h2 className='text-3xl sm:text-5xl font-semibold mb-4' >Welcome to Dave SubDub</h2>

      <p className="mb-8 max-w-md">Kindly Create an account by signing up and let's get those subs tracked!!!</p>
      <button onClick={GetUser} className="btn btn-outline rounded-full mb-6 border-[#ffffff]  text-white bg-[#43c407] hover:bg-[#48a0e2]">Get Started</button>
    </div>
  )
}

export default Header