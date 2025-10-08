const API_URL = "https://89a22ec05e1f.ngrok-free.app/api/v1/users/me";


export const backend_url=process.env.REACT_APP_BACKEND_URL

// export const authRoute =/api/v1/auth
// export const subscriptionRoute=/api/v1/subscriptions
// export const userRoute =/api/v1/users



export const SendVerifyOtp = async () => {
  try {
    const payload = {
      // Add your payload here
    };

    const res = await fetch(`${backend_url}/auth/send-verify-otp`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Send Verify OTP request failed!");

    const response = await res.json();
    console.log("Send Verify OTP response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Send Verify OTP failed:", error.message);
    }
  }
};






export const VerifyAccount = async () => {
  try {
    const payload = {
      otp:"541710"
    };

    const res = await fetch(`${backend_url}/auth/verify-account`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Verify Account request failed!");

    const response = await res.json();
    console.log("Verify Account response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Verify Account failed:", error.message);
    }
  }
};




export const IsAuthenticated = async () => {
  try {
    const payload = {
      // Add your payload here if needed
    };

    const res = await fetch(`${backend_url}/auth/is-auth`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Is Auth request failed!");

    const response = await res.json();
    console.log("Is Authenticated response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Is Auth failed:", error.message);
    }
  }
};






export const SendResetOtp = async () => {
  try {
    const payload = {
      // Add your payload here (probably email) no payload in this case lol
    };

    const res = await fetch(`${backend_url}/auth/send-reset-otp`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Send Reset OTP request failed!");

    const response = await res.json();
    console.log("Send Reset OTP response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Send Reset OTP failed:", error.message);
    }
  }
};




export const ResetPassword = async () => {
  try {
    const payload = {
    
      "otp":"341118",
      "newPassword":"David12345678"

    };

    const res = await fetch(`${backend_url}/auth/reset-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Reset Password request failed!");

    const response = await res.json();
    console.log("Reset Password response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Reset Password failed:", error.message);
    }
  }
};






// ============== USER ENDPOINTS ==============

export const GetUsers = async () => {
  try {
    const res = await fetch(`${backend_url}/users/`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) throw new Error("Get Users request failed!");

    const response = await res.json();
    console.log("Get Users response:", response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Get Users failed:", error.message);
    }
  }
};




export const GetUser = async () => {
  try {
    const res = await fetch(`${backend_url}/users/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) throw new Error("Get User request failed!");

    const response = await res.json();
    console.log("Get User response:", response);
    return response.data; // {success:true,data:user}
   
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Get User failed:", error.message);
    }
  }
};




// export const GetUser = async () => {
//   try {
//     const res = await fetch(`${backend_url}/users/me`, {
//       method: 'GET',
//       credentials: 'include',
//     });

//     if (!res.ok) throw new Error("Get User request failed!");

//     const response = await res.json();
//     console.log("Get User response:", response);
//     return response;
//   } catch (error) {
//     if (error.response) {
//       console.error("Server error:", error.response.data);
//     } else {
//       console.error("Get User failed:", error.message);
//     }
//   }
// };





// ============== SUBSCRIPTION ENDPOINTS ==============
export const GetmySubscription  = async () =>{
    try{
      const res = await fetch(`${backend_url}/subscriptions/my-subscriptions`,{
        method:"GET",
        credentials:"include",
        headers: {
           'Content-Type': 'application/json',
        }
      })

      if (!res.ok) throw new Error("Create Subscription request failed!");

    const response = await res.json();
    console.log("Get subscriptions reponse:", response);
    return response;
    }catch(error){
      
     console.log(error)

}
}


export const GetAllSubscriptionsByAdmin = async () =>{

  try{
      const res = await fetch(`${backend_url}/subscriptions`,{
        method:"GET",
        credentials:"include",
        headers:{
              'Content-Type': 'application/json',
        }
      }) 

    if (!res.ok) throw new Error("Admin Get All Subscriptions  request failed!");
    const response = await res.json();
    console.log("Admin Get All Subscriptions", response);
    return response;

  }catch(error){
  console.log(error.message)

  }
}


export const CreateSubscription = async () => {
  try {
    const payload = {
   "name": "From my froexport const ing 4 promax",
   "price": 139,
   "currency": "USD",
   "frequency": "monthly",
   "category": "entertainment",
   "startDate": "2025-08-4",
   "paymentMethod": "Credit Card"
}

    const res = await fetch(`${backend_url}/subscriptions/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Create Subscription request failed!");

    const response = await res.json();
    console.log("Create Subscription response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Create Subscription failed:", error.message);
    }
  }
};



export const UpdateSubscription = async (subscriptionId) => {
  try {
    const payload = {
      "name": "From my froexport const ing 4 promax",
      "price": 139,
      "currency": "USD",
      "frequency": "monthly",
      "category": "entertainment",
      "startDate": "2025-08-4",
      "paymentMethod": "Credit Card"
    };

    const res = await fetch(`${backend_url}/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Update Subscription request failed!");

    const response = await res.json();
    console.log("Update Subscription response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Update Subscription failed:", error.message);
    }
  }
};

export const DeleteSubscription = async (subscriptionId) => {
  try {
    const res = await fetch(`${backend_url}/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!res.ok) throw new Error("Delete Subscription request failed!");

    const response = await res.json();
    console.log("Delete Subscription response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Delete Subscription failed:", error.message);
    }
  }
};






export const Logout = async(setIsLoggedin, setUserData) =>{

       try{
          const res = await fetch(`${backend_url}/auth/sign-out`,{
            method:"POST",
            credentials:"include"
          })

           if (!res.ok) throw new Error("logging out failed!")
                  
          const response = await res.json();

          // if the return message is success, then clear loggedin state and userData
          response.success && setIsLoggedin(false)
          response.success && setUserData(false)
          console.log("logging out:", response);
          return response;

       }catch(error){
         if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("LOGGING OUT :", error.message);
    }
       }

}













