import React from "react";
import Sidebar from "../../components/Sidebar";
import Notification from "../../components/Notification";
import Categories from "./Categories";
import MainStats from "./MainStats";
import Time from "./Time";
import { useAuthContext } from "../../contexts/AuthContext";
import { ClipboardCheckIcon } from "@heroicons/react/solid";

function Dashboard() {
  const { user } = useAuthContext();

  return (
    <div>
      <Sidebar />
      <Notification />
      <div className="pl-32 pt-10 pr-96 bg-gray-50 min-h-screen">
        <div className="pr-10">
          <Time />
          <div className="flex items-center gap-2 mb-20">
            <h1 className="font-semibold text-3xl font-primary">
              Welcome back <strong>{user.firstname}!</strong>{" "}
            </h1>
            <p className="animate-bounce text-2xl">👋</p>
          </div>
          {/* <div className="mb-20">
            <button className="bg-secondary text-white px-4 py-2 rounded-sm flex items-center gap-2">
              <ClipboardCheckIcon className="h-4 w-4" /> Monitor Patients
            </button>
          </div> */}
          <MainStats />
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
