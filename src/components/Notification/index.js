import React from "react";
import moment from "moment";
import logo from "../../assets/img/logo3.svg";
import { BellIcon } from "@heroicons/react/solid";

const notifications = [
  {
    id: 1,
    title: "Patient Application",
    message: "Regine Reyes wants to collaborate with you.",
  },
];

function Notification() {
  return (
    <div className="fixed right-0 top-0 h-screen w-96 shadow-md flex flex-col bg-white z-50">
      <div className="px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold font-primary text-xl">
            🔔 Notifications
          </h1>
          <h1 className="opacity-60 text-sm">
            {moment().format("MMMM D, YYYY")}
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="px-4 py-3 border-b border-gray-100 flex gap-2"
          >
            <div className="pt-1">
              <BellIcon className="h-4 w-4 text-yellow-500" />
            </div>
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-xs opacity-75">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center bg-gray-100 px-2">
        <img src={logo} alt="" className="h-20" />
        <div className="ml-1">
          <h1 className="font-bold text-lg -mb-1 leading-tight">Nutr.io</h1>
          <h3 className="-mt-5">Eat wisely, Stay healthy</h3>
          <p className="text-xs opacity-50">
            What you eat affects your baby's health.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
