import React from 'react'
import { Route, Routes } from 'react-router' 
import toast from "react-hot-toast"

import {AuthProvider} from "./context/AuthContext"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from './Pages/HomePage'
import SignupForm from './Pages/SignupForm'
import LoginForm from './Pages/LoginForm'
import EmailVerify from './Pages/EmailVerify'
import ResetPassword from './Pages/ResetPassword'
import ProfilePage from './Pages/ProfilePage'
import AdminPage from './Pages/AdminPage'
import Subscription from './Pages/Subscription'

const App = () => {
  return (
    <AuthProvider>
    <div className="flex flex-col">
      {/* <button onClick= {() => toast.success("success")} className='btn btn-outline bg-green-500 text-white border-2 border-black'>Click me</button> */}
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/sign-up" element = {<SignupForm/>}/>
        <Route path="/sign-in" element = {<LoginForm />}/>
        {/* <Route path="/sign-out" element = {<HomePage/>}/> */}
        <Route path="/email-verify" element = {<EmailVerify/>}/>
        <Route path="/reset-password" element = {<ResetPassword/>}/>
        <Route path="/admin" element = {<AdminPage/>}/>
        <Route path="/admin/subscriptions" element = {<Subscription/>}/>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
    </AuthProvider>
  )
}

export default App
