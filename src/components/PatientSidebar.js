import React, { useEffect, useState } from "react";
import { Menu, Avatar, Tooltip } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ProfileOutlined,
  UserSwitchOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuthContext } from "../contexts/AuthContext";

const { SubMenu } = Menu;

function PatientSidebar() {
  const location = useLocation();
  const history = useHistory();
  const { user } = useAuthContext();
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    setPatient(location.pathname.split("/")[2]);
  }, [location]);
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
        backgroundColor: "#f7f7f7",
      }}
      selectedKeys={[location.pathname.split("/")[1]]}
      //   defaultSelectedKeys={["/patients"]}
      //   defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <Menu.Item
        key="patients"
        icon={<ProfileOutlined />}
        onClick={() => history.push(`/patients/${patient}`)}
      >
        Information
      </Menu.Item>
      <Menu.Item
        key="message"
        icon={<UserSwitchOutlined />}
        onClick={() => history.push(`/message/${patient}`)}
      >
        Message
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
              Margarette
            </h3>
            <p style={{ fontSize: 10, opacity: 0.7 }}>
              {/* @{user.firstname.toLowerCase()}_{user.lastname.toLowerCase()} */}
              {user.email}
            </p>
          </div>
        </div>
        <div>
          <Tooltip title="Signout" overlayInnerStyle={{ fontSize: 11 }}>
            <LogoutOutlined className="text-lg cursor-pointer" />
          </Tooltip>
        </div>
      </div>
    </Menu>
  );
}

export default PatientSidebar;
