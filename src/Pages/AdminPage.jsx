import React, { useState } from "react";
import toast from "react-hot-toast";
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import { backend_url } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import Users from "../Components/Users && Subscriptions/Users";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // fetch function for react query
  const fetchData = async () => {
    try {
      // ✅ fetchWithAuth already parses JSON and handles errors internally
      const data = await fetchWithAuth("/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!data.success) {
        toast.error(data.message || "Failed to fetch users");
        throw new Error(data.message || "Failed to fetch users");
      }

      toast.success(data.message);
      console.log("Fetched users:", data.users);

      return data.users; // must return users for React Query
    } catch (error) {
      console.error("Fetch users error:", error.message);
      toast.error(error.message || "Unexpected error");
      throw error; // Let React Query handle retry logic
    }
  };

  // useQuery hook
  const {
    data: allUsersdata = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });

  // filter users based on search term
  const users = allUsersdata.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // UI states
if (isLoading)
  return (
    <div className="flex justify-center items-center h-screen border-2 border-green-500">
      <Waveform
        size="150"
        stroke="10"
        speed="1"
        color="blue"
      />
    </div>
  );


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

      <Users users={users} />
       




{/* 
      <div className ="">
        {filteredUsers.length > 0 ? (
          <div>
            <h2 className="text-3xl ">All Users:</h2>
            <ul className="border-2 border-black p-4 mb-2 flex flex-col flex-1 w-[1670px]">
              {filteredUsers.map((user) => (

                <li key={user._id} className="flex flex-col mt-4 p-8 border-2 border-black rounded-2xl bg-slate-50">
                  <div className="text-2xl mb-6 font-bold font-serif border-b-2 pb-4 ">{user.name}</div>   
                  <div className="flex justify-between items-center flex-wrap" >
                      <div>
                        <div>Email Address <i className="fa-solid fa-envelope"></i></div>
                        <div className=" font-semibold text-xl">{user.email}</div>
                      </div>

                       <div>
                        <div>Role</div>
                        <div className=" font-semibold text-xl">{user.role}</div>
                      </div>

                       <div>
                        <div>ID</div>
                        <div className=" font-semibold text-xl ">{user._id}</div>
                      </div>
                      <div>
                        <div>Joined on</div>
                        <div className=" font-semibold text-xl">{user.createdAt}</div>
                      </div>

                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1>Oops, no users found 🤷‍♂️</h1>
        )}
      </div> */}
    </div>
  );
};

export default AdminPage;
