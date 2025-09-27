import React from 'react'
import { Route, Routes } from 'react-router' 
import toast from "react-hot-toast"

import {AuthProvider} from "./context/AuthContext"
import HomePage from './Pages/HomePage'
import SignupForm from './Pages/SignupForm'
import LoginForm from './Pages/LoginForm'
import EmailVerify from './Pages/EmailVerify'
import ResetPassword from './Pages/ResetPassword'
import ProfilePage from './Pages/ProfilePage'
import AdminPage from './Pages/AdminPage'

const App = () => {
  return (
    <AuthProvider>
    <div>
      {/* <button onClick= {() => toast.success("success")} className='btn btn-outline bg-green-500 text-white border-2 border-black'>Click me</button> */}
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/sign-up" element = {<SignupForm/>}/>
        <Route path="/sign-in" element = {<LoginForm />}/>
        {/* <Route path="/sign-out" element = {<HomePage/>}/> */}
        <Route path="/email-verify" element = {<EmailVerify/>}/>
        <Route path="/reset-password" element = {<ResetPassword/>}/>
        <Route path="/admin" element = {<AdminPage/>}/>
      </Routes>
    </div>
    </AuthProvider>
  )
}

export default App
