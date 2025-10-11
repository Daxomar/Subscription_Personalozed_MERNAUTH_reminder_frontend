 import { backend_url }from '../utils/api'

 export async function deleteWithAuth(url, options = {}) {

    const fullUrl = `${backend_url}${url}`;

//The makerequest will now hold the object returned when called { ok: res.ok, status: res.status, data }
  const makeRequest = async () => {
    const res = await fetch(fullUrl, {
      method: "DELETE",
      credentials: "include",
      ...options,
    });

    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  };

  let result = await makeRequest();

  // If unauthorized, try refresh
 if (result.status === 401) {
    console.log("Access token expired, trying refresh...");

//This now goes to my backend to refresh the needed token
    const refreshRes = await fetch(`${backend_url}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

     if (!refreshRes.ok) {
      const errData = await refreshRes.json().catch(() => ({}));
      throw new Error(errData.message || "Refresh token failed, please login again");
    }

        // Retry original DELETE request after refresh I already create result globally in the function so now we can use it in the function anywhere
    result = await makeRequest();
}

    if (!result.ok) {
    throw new Error(result.data.message || "Delete request failed");
  }

   return result; // { ok, status, data }
}