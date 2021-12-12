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
import logo from "../assets/img/logo.svg";
import { usePatientsContext } from "../contexts/PatientsContext";

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
  return (
    <Menu
      onClick={handleClick}
      style={{
        width: 256,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 99,
        // backgroundColor: "#fff",
        backgroundColor: "#f7f7f7",
      }}
      selectedKeys={[location.pathname]}
      mode="inline"
    >
      <img src={logo} alt="" className="h-36 object-contain mx-auto my-4" />
      <Menu.Item
        key="/"
        icon={<ProfileOutlined />}
        onClick={() => history.push("/")}
      >
        Patients
      </Menu.Item>
      <Menu.Item
        key="/pending"
        icon={<UserSwitchOutlined />}
        onClick={() => history.push("/pending")}
      >
        Pending
        {getPending().length > 0 && (
          <div className="float-right mr-4">
            <span className="text-white bg-red-500 rounded-full py-1 px-2">
              {getPending().length}
            </span>
          </div>
        )}
      </Menu.Item>

      {/* <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu> */}

      <div className="absolute bottom-0 py-3 px-4 bg-gray-50 w-full border-t border-gray-100 flex items-center">
        {/* LEFT */}
        <div className="flex items-center space-x-2 flex-grow">
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
          <div className="flex flex-col flex-1">
            <h3 className="text-sm font-semibold mb-1 -mt-1 flex-grow">
              {user.firstname}
            </h3>
            <p style={{ fontSize: 10, opacity: 0.7 }}>
              {/* @{user.firstname.toLowerCase()}_{user.lastname.toLowerCase()} */}
              {user.email}
            </p>
          </div>
        </div>
        <div>
          <Tooltip title="Signout" overlayInnerStyle={{ fontSize: 11 }}>
            <LogoutOutlined
              className="text-lg cursor-pointer"
              onClick={logout}
            />
          </Tooltip>
        </div>
      </div>
    </Menu>
  );
}

export default Sidebar;
