import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { backend_url } from '../utils/api'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router';
import { assets } from '../assets/assets';
import { useAuth } from '../context/AuthContext'


const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const inputRefs = useRef([]);

  const { isLoggedIn, userData, GetUser, email, setEmail } = useAuth()
  const [isEmailSent, setIsEmailSent] = useState('')
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
  const [isLoading, setisLoading] = useState(false); // added this
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")




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
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }



  // Funtion to send Reset OTP to email(user not logged in yet)
  const SendResetOtp = async (e) => {
    e.preventDefault();
    setisLoading(true)
    try {
      const res = await fetch(`${backend_url}/auth/send-reset-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      })


      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setisLoading(false)
        return toast.error(errorData.message || "Something went wrong");
      }

      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        setIsEmailSent(true) 
        setisLoading(false)
        console.log("EmailSent STATE:", isEmailSent)
      } else {
        toast.error(data.message)
        setisLoading(false)
      }

    } catch (error) {
      console.log(error)
    }

  }


 
  console.log("IsLoggedInState:", isLoggedIn)




  //Function to submit the OTP
  const onSubmitOTP = async (e) => {
    e.preventDefault()
    setisLoading(true) // added this
   const otpArray = inputRefs.current.map(e=>e.value)
   setOtp(otpArray.join(''))
    console.log("Entered OTP:", otpArray.join(''));

    const payload = {
      email: email,
      otp:otpArray.join(''),
    }


    try {
      const res = await fetch(`${backend_url}/auth/verify-reset-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      console.log(email)

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return toast.error(errorData.message || "Something went wrong with submiting OTP");

      }

      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        setIsOtpSubmitted(true)
        console.log("OtpSubmitted STATE:", isOtpSubmitted) 
        setisLoading(false) // added this
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }


  }






  const onSubmitHandlerResetPassword = async (e) => {
    e.preventDefault();
   
    setisLoading(true) // added this
    //The otp being used here is from the state we set when we submitted the otp 
    try {
      const payload = {
        email:email,
        newPassword: newPassword,
        otp:otp

      }

      const res = await fetch(`${backend_url}/auth/reset-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },

        body: JSON.stringify(payload)

      })


      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        return toast.error(errorData.message) || "Something went wrong with reseting your password"
      }

      const data = await res.json() 
      if (data.success){
        toast.success(data.message)
        setEmail('')
        setNewPassword('')
        setOtp('')
        setIsEmailSent(false)
        setIsOtpSubmitted(false)
        navigate('/login')
        setisLoading(false) // added this
      }
        

    } catch (error) {
      console.log(error)
    }



  }












  return (
    <div>
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt=''
          className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        />
        <div>

          {/* enter email id */}
          {!isEmailSent &&

            <form className=' flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={SendResetOtp}>
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                Password Reset
              </h1>

              <p className='text-center mb-6 text-indigo-300'>
                Enter the email you used to create your account
              </p>


              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5  rounded-full bg-[#333A5C]'>
                <img src={assets.mail_icon} alt="Person icon Image" />
                <input
                  className="bg-transparent outline-none"
                  type="email"
                  placeholder='Your Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>
              {isLoading? (
                  <>
                     <button className='btn  loading loading-spinner loading-sm mr-2 bg-green-500 text-black outline-none rounded-full '></button>
                  </>
                ) : (
                  <button className='btn w-full bg-green-500 text-white outline-none rounded-full '>Click Here</button>
                )}
                  
              
            </form>

          }


          {/* otp input form */}

          {!isOtpSubmitted && isEmailSent &&
            <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={onSubmitOTP}>
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                Reset Password OTP
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
                    ref={(e) => inputRefs.current[index] = e}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <button className='w-full btn bg-green-500 py-3 text-white hover:bg-white hover:text-black'>Submit</button>
            </form>
          }

          {/* enter new password form */}



          {isOtpSubmitted && isEmailSent &&
            <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={onSubmitHandlerResetPassword}>
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                New Password
              </h1>

              <p className='text-center mb-6 text-indigo-300'>
                Enter the new password you want to set.
              </p>

              <div className='flex gap-10 mb-8' onPaste={handlePaste}>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5  rounded-full bg-[#173950]'>
                  <img src={assets.person_icon} alt="Person icon Image" />
                  <input

                    className='bg-transparent text-white'
                    type="password"
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className='w-full btn bg-green-500 py-3 text-white hover:bg-white hover:text-black'>Submit</button>
            </form>

          }
        </div>


      </div>
    </div>
  )
}

export default ResetPassword