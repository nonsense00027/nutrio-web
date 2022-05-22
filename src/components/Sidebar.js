import React from "react";
import { Menu, Avatar, Tooltip } from "antd";
import {
  ProfileOutlined,
  UserSwitchOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import logo from "../assets/img/logo3.svg";
import { usePatientsContext } from "../contexts/PatientsContext";
import {
  HomeIcon as HomeIconOutlined,
  ClipboardListIcon as ClipboardListIconOutlined,
  UserGroupIcon as UserGroupIconOutlined,
} from "@heroicons/react/outline";
import {
  HomeIcon,
  ClipboardListIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";

const tabs = [
  {
    id: 1,
    activeIcon: HomeIcon,
    inactiveIcon: HomeIconOutlined,
    path: "/",
    title: "Dashboard",
  },
  {
    id: 2,
    activeIcon: ClipboardListIcon,
    inactiveIcon: ClipboardListIconOutlined,
    path: "/patients",
    title: "Patients",
  },
  {
    id: 3,
    activeIcon: UserGroupIcon,
    inactiveIcon: UserGroupIconOutlined,
    path: "/pending",
    title: "Pending",
  },
];

function Sidebar() {
  const location = useLocation();
  const history = useHistory();
  const { user, logout } = useAuthContext();
  const { patients } = usePatientsContext();

  const getPending = () => {
    return patients.filter(
      (patient) => patient.pending === true && patient.dietician === user.id
    );
  };

  const handleClick = (e) => {
    console.log("click ", e);
  };

  const handleRedirect = (path) => {
    history.push(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  console.log("PATH IS: ", location.pathname);
  return (
    <div className="bg-white fixed w-24 h-full left-0 top-0 shadow-sm flex flex-col items-center py-6">
      <img src={logo} alt="" />
      <div className="py-10 w-full flex-1">
        {tabs.map((tab) => (
          <Tooltip
            title={tab.title}
            overlayInnerStyle={{ fontSize: 11 }}
            placement="right"
          >
            <div
              className={`side-menu  ${
                isActive(tab.path) && "border-r-2 border-gray-300"
              }`}
              onClick={() => handleRedirect(tab.path)}
            >
              {isActive(tab.path) ? (
                <tab.activeIcon className="h-5 w-5 text-primary" />
              ) : (
                <tab.inactiveIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </Tooltip>
        ))}
      </div>
      <div>
        <Avatar
          size={36}
          style={{
            backgroundColor: "#87d068",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={<UserOutlined />}
        />
      </div>
    </div>
  );
}

export default Sidebar;
