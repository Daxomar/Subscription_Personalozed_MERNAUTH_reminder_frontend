import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";




import { fetchWithAuth } from "../utils/fetchWithAuth";
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





  const getIsUserAuthAndVerified = async () => {
  try {
    const res = await fetchWithAuth("/auth/is-auth", {
      method: 'GET',
      headers: {
        "Content-type" : "application/json",
      }
    });

    // If request succeeds, token is valid
    const data = await res;

    if (data.success) {
      const user = await GetUser();  // Fetch user details only if verified
      setIsLoggedIn(true);
      setUserData(user);


        // Sync with session storage  //this also happens in my frontend login
        sessionStorage.setItem('userData', JSON.stringify(user));
        sessionStorage.setItem('isLoggedIn', 'true');
        console.log("✅ User validated & updated:", user);


      console.log("User is set to", user);
      return true;
    } else {
      console.log("User is not verified");
      return false;
    }

  } catch (error) {
    console.error("Auth check failed:", error.message);
    setIsLoggedIn(false);
    setUserData(null);
    return false;
  }
};






  useEffect(() => {

     // Step 1: Restore session if user already stored
    const storedUser = sessionStorage.getItem("userData");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setIsLoggedIn(true);
      console.log("Restored user from session:", parsedUser);
    }

    // Step 2: Always revalidate in the background
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