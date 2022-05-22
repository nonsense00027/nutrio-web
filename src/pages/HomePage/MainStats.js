import React from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { usePatientsContext } from "../../contexts/PatientsContext";
import { useAuthContext } from "../../contexts/AuthContext";

function MainStats() {
  const { patients, loading } = usePatientsContext();

  const { user } = useAuthContext();

  const getPatients = () => {
    return patients.filter(
      (patient) => patient.pending === false && patient.dietician === user.id
    );
  };

  return (
    <div className="flex my-10 bg-green-500 rounded-xl text-white px-4 py-6 shadow-xl">
      <div className="flex-1 space-y-3 px-6 py-2 border-r border-gray-100">
        <h3 className="font-semibold text-white">Active patients</h3>
        <div className="flex items-center gap-2 pb-2">
          <h1 className="font-bold text-4xl font-primary text-white">
            {getPatients().length}
          </h1>
          <UserCircleIcon className="h-8 w-8" />
        </div>
        <p className="text-xs leading-tight opacity-80">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
          rem.
        </p>
      </div>
      <div className="flex-1 space-y-3 px-6 py-2 border-r border-gray-100">
        <h3 className="font-semibold text-white">Inactive patients</h3>
        <div className="flex items-center gap-2 pb-2">
          <h1 className="font-bold text-4xl font-primary text-white">4</h1>
          <UserCircleIcon className="h-8 w-8" />
        </div>
        <p className="text-xs leading-tight opacity-80">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
          rem.
        </p>
      </div>
      <div className="flex-1 space-y-3 px-6 py-2">
        <h3 className="font-semibold text-white">Total patients</h3>
        <div className="flex items-center gap-2 pb-2">
          <h1 className="font-bold text-4xl font-primary text-white">
            {getPatients().length}
          </h1>
          <UserCircleIcon className="h-8 w-8" />
        </div>
        <p className="text-xs leading-tight opacity-80">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
          rem.
        </p>
      </div>
    </div>
  );
}

export default MainStats;
