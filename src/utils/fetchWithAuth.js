// utils/fetchWrapper.js
// const backend_url = "http://localhost:5000"; // adjust

  
  import { backend_url }from '../utils/api'


export async function fetchWithAuth(url, options = {}) {
  const res = await fetch(`${backend_url}${url}`, {
    ...options,
    credentials: "include",
  });

  // If unauthorized, try refresh
  if (res.status === 401) {
    console.log("Access token expired, trying refresh...");


  //This is where the refresh happens
    const refreshRes = await fetch(`${backend_url}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
         const errData = await refreshRes.json().catch(() => ({}));
      throw new Error(errData.message || "Refresh token failed, please login again");
    }

    // Retry original request
    const retryRes = await fetch(`${backend_url}${url}`, {
      ...options,
      credentials: "include",
    });

  if (!retryRes.ok) {
      const errData = await retryRes.json().catch(() => ({}));
      throw new Error(errData.message || "Request failed after refresh");
    }

    return retryRes.json();
  }

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Request failed");
  }
  
  return res.json();
}
