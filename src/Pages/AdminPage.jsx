import React, { useState } from "react";
import toast from "react-hot-toast";
import { backend_url } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import Users from "../Components/Users && Subscriptions/Users";

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // fetch function for react query
  const fetchData = async () => {
    const res = await fetch(`${backend_url}/users`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      toast.error(errorData.message || "Something went wrong with getting users");
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      console.log(data.users);
    }
    return data.users; // must return users
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
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users</p>;

  return (
    <div className=" flex flex-col flex-1 justify-center items-center border-2   ">
      <h1>Admin Page - Only Admins can see this</h1>

      <div className ="p-0 border-2 flex">
      {/* search input */}

      <div className="flex  ga-2 box-border m-8 w-full items-center border-2 justify-between">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-black rounded-lg w-full h-12  "
        />
        <button
          onClick={() => refetch()} // ✅ manual refresh if needed
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Refresh
        </button>
      </div>
      </div>


        <Users users ={users} />
       




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
