import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

import {
  Logout,
  SendVerifyOtp, VerifyAccount, IsAuthenticated, SendResetOtp, ResetPassword,
  GetUsers, GetUser,
  GetmySubscription, GetAllSubscriptionsByAdmin, CreateSubscription, UpdateSubscription, DeleteSubscription,

  backend_url
}
  from '../utils/api'





const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [formType, setFormType] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const [userResData, setUserResData] = useState(false)  // will use this to test it later


  //LOL about to make this my source of truth code(pinger), fatherlord forgive me!!
  const getIsUserAuthAndVerified = async () => {

    try {
      const res = await fetch(`${backend_url}/auth/is-Auth`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })

      console.log(res)
      const user = await GetUser()

      console.log("USERRRRRRR", user)
      if (res.ok) {
        setIsLoggedIn(true);
        setUserData(user);
        console.log("User is set to", user)

      }   // okay response meaning the token is valid



      const data = await res.json()
      return data.success      //returns true or false if user is really verified

    } catch (error) {
      console.log(error)
    }

  }







  //   const getUserData = async () =>{
  //     console.log("getUserData called!");


  // //   
  //     try{
  //         const res = await fetch('https://89a22ec05e1f.ngrok-free.app/api/v1/users/me', {
  //           method: 'GET',
  //           credentials: 'include',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           }
  //         })

  //         if(!res.ok) throw new Error("Failed to fetch user data")
  //         const data = await res.json()
  //         console.log(data)
  //         if(data.success){
  //             setIsLoggedIn(true)
  //             setUserData(data.data.user)
  //         }

  //     }catch(error){
  //         console.log(error)
  //     }
  // }




  useEffect(() => {
    getIsUserAuthAndVerified();
  }, [])



  const value = {
    formType, setFormType,
    name, setName,
    email, setEmail,
    password, setPassword,
    backend_url, isLoggedIn, setIsLoggedIn,
    userData, setUserData,
    userResData, setUserResData,
    Logout,
    SendVerifyOtp, VerifyAccount, IsAuthenticated, SendResetOtp, ResetPassword,
    GetUsers, GetUser,
    GetmySubscription, GetAllSubscriptionsByAdmin, CreateSubscription, UpdateSubscription, DeleteSubscription,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook so you don’t keep importing useContext everywhere
export const useAuth = () => {
  return useContext(AuthContext);
};