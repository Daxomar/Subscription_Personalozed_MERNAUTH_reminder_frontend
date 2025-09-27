import React from 'react'
import { useState, useEffect,useRef} from 'react'
import { backend_url } from '../utils/api'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router';
import { assets } from '../assets/assets';
import { useAuth } from '../context/AuthContext'

const EmailVerify = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const inputRefs = useRef([]);

  const {isLoggedIn, userData, GetUser} = useAuth()
  

  const otpArray = inputRefs.current.map(e=>e.value)




//MOVING FROM ONE INOUT TO THE NEXT AUTOMATICALLY
const handleInput = (e, index) => {
    console.log("Current value:", e.target.value);

    // Example: move focus to next input automatically
    if (e.target.value.length === e.target.maxLength) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };



    //DELETING THE CODE
    const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      // Move focus to previous input
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    } else if (e.key >= "0" && e.key <= "9") {
      // Allow only numbers and move to next
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        setTimeout(() => nextInput.focus(), 10); // slight delay to allow input
      }
    } else if (e.key === "ArrowLeft") {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    } else if (e.key === "ArrowRight") {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };



// PASTING THE CODE 
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (paste.length === 0) return;
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char
      }
    })
  }


 



    
    //SUBMIT THE FORM TO GET EMAIL VERIFIED
     const onSubmitHandlerEmailVerify = async (e) =>{  

    try {
       e.preventDefault();
       const otpArray = inputRefs.current.map(e=>e.value)
      const payload = {
        otp:otpArray.join('')
      }

      const res = await fetch(`${backend_url}/auth/verify-account`, {
        method: "POST",
        credentials: "include",
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)


      })

      
        if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                return toast.error(errorData.message || "Something went wrong");
            }



      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        GetUser() 
        navigate('/')
      }else{
        toast.error(data.message)
      }
     

    } catch (error) {
      console.log(error)
    }


  }


// Use Effect to automatically take me away from the verify page
// useEffect(() => {
//   if (isLoggedIn && userData?.isAccountVerified) {
//     // redirect ONLY if they’re currently on the verify page
//     if (location.pathname === '/email-verify') {
//       navigate('/');
//     }
//   }
// }, [isLoggedIn, userData, location, navigate]);


useEffect(()=>{
  isLoggedIn && userData && userData.isAccountVerified && navigate("/")
},[isLoggedIn,userData])






  return (
    <div>
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt=''
          className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        />

        <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={onSubmitHandlerEmailVerify}>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>
            Email Verify OTP
          </h1>

          <p className='text-center mb-6 text-indigo-300'>
            Enter the 6-digit code sent to your email id.
          </p>

          <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                type="text"
                maxLength='1'
                key={index}
                required
                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                //Code beneath is for automatic filling when you enter input
                ref={(e) => inputRefs.current[index] =e}
                onInput = {(e) => handleInput(e, index)}
                onKeyDown={(e)=> handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button className='w-full btn bg-green-500 py-3 text-white hover:bg-white hover:text-black'>Verify email</button>
        </form>

      </div>


    </div>
  )
}

export default EmailVerify
