

import React from "react";
import User from "../User & Sub/User";

const Users = ({ users = [] }) => {
  return (
    <div>
      {users.length > 0 ? (
        <ul className="w-full max-w-6xl">
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600 mt-8">No users found.</p>
      )}
    </div>
  );
};

export default Users;
