import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const LoginForm = () => {

    const navigate = useNavigate();

    const { formType, setFormType,
        name, setName,
        email, setEmail,
        password, setPassword, getUserData,
        backend_url, setIsLoggedIn, setUserData, GetUser } = useAuth();


    //On submit function for signing into my app
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const endpoint = formType === "Sign Up"
            ? `${backend_url}/auth/sign-up`
            : `${backend_url}/auth/sign-in`;



        //payload to be sent to my backend auth depending on either sign-up/sign-in
        const payload = formType === "Sign Up" ?
            {
                name,
                email,
                password
            }
            : {
                email,
                password
            }

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                credentials: "include", //cookies
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })


            // ✅ Ensure response is valid JSON
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                return toast.error(errorData.message || "Something went wrong");
            }


            const data = await res.json();
            const user = data.user  //weird looking right? well its all from the response it has user in it
            // ✅ Explicitly check server response
            if (!data.success) {
                return toast.error(data.message || "Authentication failed");
            }

            toast.success(formType==="Sign Up"? "Account Create Successfully" : "Login Successful");

          
            // ✅ Update client state only if success
            setIsLoggedIn(true); 
            navigate("/");
            setName('');
            setUserData(user)


            // Cache in sessionStorage
             sessionStorage.setItem('isLoggedIn', 'true');
             sessionStorage.setItem('userData', JSON.stringify(user));

                setPassword('');
                setEmail('')


        } catch (err) {
            console.error("Auth request failed:", err);
            toast.error("Network error, please try again later");
        }
    }


    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-[#e2e2e2] to-[#f3f3f3]'>
            <img src={assets.logo} onClick={() => navigate('/')} alt="Logo image" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-point' />

            <div className="bg-white p-10 rounded- shadow-lg w-full sm:w-96 text-indigo-300 text-sm" style={{ borderRadius: 20 }} >

                <h2 className='text-3xl font-semibold text-[#2176AE] text-center mb-3'>
                    {formType === "Sign Up" ? "Create your account" : "Login to your account!"}
                </h2>
                <p className='text-center text-sm mb-6'>
                    {formType === "Sign Up" ? "Create your account" : "Login to your account!"}
                </p>

                <form onSubmit={onSubmitHandler} >

                    {formType == "Sign Up" && (
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5  rounded-full bg-[#2176AE]'>
                            <img src={assets.person_icon} alt="Person icon Image" />
                            <input
                                className="bg-transparent outline-none"
                                type="text"
                                placeholder='Full Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                    )}


                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5  rounded-full bg-[#2176AE]'>
                        <img src={assets.mail_icon} alt="Person icon Image" />
                        <input
                            className="bg-transparent outline-none"
                            type="email"
                            placeholder='Your Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5  rounded-full bg-[#2176AE]'>
                        <img src={assets.lock_icon} alt="Person icon Image" />
                        <input
                            className="bg-transparent outline-none"
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forget Password</p>
                    <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{formType}</button>
                </form>


                {formType === "Sign Up" ?
                    (<p>Already have an account?{' '}
                        <span onClick={() => setFormType("Sign In")} className="text-blue-400 cursor-pointer underline">
                            Login here
                        </span>
                    </p>)
                    :
                    (<p>Don't have an account?{' '}
                        <span onClick={() => setFormType("Sign Up")} className="text-blue-400 cursor-pointer underline">
                            Sign Up
                        </span>
                    </p>)
                }
            </div>


        </div>
    )
}

export default LoginForm