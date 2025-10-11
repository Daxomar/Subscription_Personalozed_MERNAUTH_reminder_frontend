import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import {fetchWithAuth} from "../utils/fetchWithAuth"
import Subs from '../Components/Users && Subscriptions/Subs';



const Subscription = () => {

    const [searchTerm, setSearchTerm] = useState("");
  const fetchAllSubs = async () => {
    try {
      // ✅ fetchWithAuth already parses JSON and handles errors internally
      const data = await fetchWithAuth("/subscriptions", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!data.success) {
        toast.error(data.message || "Failed to fetch users");
        throw new Error(data.message || "Failed to fetch users");
      }

      toast.success(data.message);
      console.log("Fetched subscriptions:", data.subscriptions);

      return data.subscriptions; // must return users for React Query
    } catch (error) {
      console.error("Fetch users error:", error.message);
      toast.error(error.message || "Unexpected error");
      throw error; // Let React Query handle retry logic
    }
  };
    
   const {
    data: allSubsdata = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchAllSubs,
  });

  // filter users based on search term
  const subscriptions = allSubsdata.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // UI states
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users</p>;

 


  return (
   <div className="flex flex-col flex-1 justify-center items-center border-2">
      <h1>Admin Page - Only Admins can see this</h1>

      <div className="p-0 border-2 flex">
        {/* search input */}
        <div className="flex gap-2 box-border m-8 w-full items-center border-2 justify-between">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-black rounded-lg w-full h-12"
          />
          <button
            onClick={() => refetch()} // ✅ manual refresh if needed
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>

      <Subs subscriptions={subscriptions} />
  </div>
  );
};

export default Subscription
