import React, { useEffect, useState } from "react";
import { Menu, Avatar, Tooltip } from "antd";
import {
  ProfileOutlined,
  UserSwitchOutlined,
  UserOutlined,
  LogoutOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuthContext } from "../contexts/AuthContext";
import logo from "../assets/img/logo3.svg";

import {
  IdentificationIcon as IdentificationIconOutlined,
  ChatAlt2Icon as ChatAlt2IconOutlined,
  PhotographIcon as PhotographIconOutlined,
} from "@heroicons/react/outline";
import {
  IdentificationIcon,
  ChatAlt2Icon,
  PhotographIcon,
} from "@heroicons/react/solid";

const tabs = [
  {
    id: 1,
    activeIcon: IdentificationIcon,
    inactiveIcon: IdentificationIconOutlined,
    path: "patients",
    title: "Information",
  },
  {
    id: 2,
    activeIcon: ChatAlt2Icon,
    inactiveIcon: ChatAlt2IconOutlined,
    path: "message",
    title: "Message",
  },
  {
    id: 3,
    activeIcon: PhotographIcon,
    inactiveIcon: PhotographIconOutlined,
    path: "media",
    title: "Media",
  },
];

function PatientSidebar() {
  const location = useLocation();
  const history = useHistory();
  const { user, logout } = useAuthContext();
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    setPatient(location.pathname.split("/")[2]);
  }, [location]);
  const handleClick = (e) => {};
  console.log("location: ", location.pathname);
  const handleRedirect = (path) => {
    console.log("clicked: ", path);
    history.push(`/${path}/${patient}`);
  };

  const isActive = (path) => {
    return location.pathname.split("/")[1] === path;
  };

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

export default PatientSidebar;
