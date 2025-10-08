import React from "react";

const User = ({ user }) => {
  return (
    <li className="flex flex-col mt-4 p-8 border-2 border-black rounded-2xl bg-slate-50 shadow-md hover:shadow-lg transition-shadow">
      {/* Name */}
      <div className="text-2xl mb-6 font-bold font-serif border-b-2 pb-4">
        {user.name}
      </div>

      {/* Details */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="font-medium text-gray-600">
            Email Address <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="font-semibold text-xl">{user.email}</div>
        </div>

        <div>
          <div className="font-medium text-gray-600">Role</div>
          <div className="font-semibold text-xl">{user.role}</div>
        </div>

        <div>
          <div className="font-medium text-gray-600">ID</div>
          <div className="font-semibold text-xl break-all">{user._id}</div>
        </div>

        <div>
          <div className="font-medium text-gray-600">Joined on</div>
          <div className="font-semibold text-xl">
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </li>
  );
};

export default User;