
import React from "react";
import Sub from "../User & Sub/Sub";
import Subscription from "../../Pages/Subscription";

const Subs = ({ subscriptions = [] }) => {
  return (
    <div>
      {subscriptions.length > 0 ? (
        <ul className="w-full max-w-6xl">
          {subscriptions.map((subscription) => (
            <Sub key={subscription._id} subscription={subscription} />
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600 mt-8">No users found.</p>
      )}
    </div>
  );
};

export default Subs;
