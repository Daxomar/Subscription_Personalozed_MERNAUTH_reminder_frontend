import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { fetchWithAuth } from '../utils/fetchWithAuth'
import toast from 'react-hot-toast'
const Navbar = () => {

  const navigate = useNavigate()
  const { userData, getUserData, GetUser, setIsLoggedIn, setUserData, backend_url } = useAuth()
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  //LOGOUT FUNCTION CONNECTING TO MY BACKEND
  const Logout = async () => {

    try {
      const res = await fetch(`${backend_url}/auth/sign-out`, {
        method: "POST",
        credentials: "include"
      })

      if (!res.ok) throw new Error("logging out failed!")

      const response = await res.json();

      // if the return message is success, then clear loggedin state and userData  
      if (response.success) {
        setIsLoggedIn(false)
        setUserData(false)
        navigate("/")
        toast.success("Logout Successful, See you later");
      }
      console.log("logging out:", response);

      return response;

    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("LOGGING OUT :", error.message);
      }
    }

  }




  const SendVerifyOtp = async () => {

    try {
      const res = await fetch(`${backend_url}/auth/send-verify-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": " application/json"
        },
      })


      if (!res.ok) throw new Error("Unable to verify account")

      const response = await res.json();
      console.log(response)
      toast.success(response.message)
      navigate('/email-verify')

    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Send Verify OTP failed:", error.message);
      }
    }
  }



  const handleAdminClick = async () => {
    setLoadingAdmin(true);
    try {
      await myOwnGetUsers(); // ✅ wait for it to finish
    } finally {
      setLoadingAdmin(false);
    }
  };



//This is my function as an admin for getting all users using my webapp
//note to self, i no longer need to include credentials over here, i have integrated it into the fetchWithAuth wrapper

const myOwnGetUsers = async () => {
  try {
    const res = await fetchWithAuth("/users", {
      method: "GET",
      headers: { "Content-type": "application/json" }
    });

   const response = await res; // redundant, but okay for now to keep the pattern clear
   console.log(response);

    if (response.success) {
      toast.success("Moved to Admin Panel");
      navigate("/admin");
    } else {
      toast.error(response.message || "Unable to get all Users sir");
      throw new Error(response.message || "Unable to get all Users sir");
    }
  } catch (err) {
    console.error("myOwnGetUsers error:", err);
    toast.error(err.message || "Unexpected error occurred");
  }
};





  console.log("DATAAAAAA", userData);
  return (
    <div className=' w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="Logo Image" className="w-22 sm:w-32" />
      {userData ?
        (<div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>

              {!userData.isAccountVerified && <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={SendVerifyOtp}>Verify email</li>}

              {userData.role === "admin" && <li className='py-1 px-4 hover:bg-gray-300 cursor-pointer' onClick={handleAdminClick}>
                {loadingAdmin ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Loading...
                  </>
                ) : (
                  "Admin Overview"
                )}
              </li>}

              <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10' onClick={Logout}>Logout</li>
            </ul>
          </div>
        </div>)
        :
        (<button onClick={() => navigate("/sign-in")}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-100 transition-all text-grey-800'>Login <img src={assets.arrow_icon} />
        </button>)
      }

    </div>
  )
}

export default Navbar