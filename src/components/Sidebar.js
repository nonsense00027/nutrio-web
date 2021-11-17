import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ProfileOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

function Sidebar() {
  const location = useLocation();
  const history = useHistory();
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
      }}
      selectedKeys={[location.pathname]}
      mode="inline"
    >
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
      </Menu.Item>

      {/* <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu> */}
    </Menu>
  );
}

export default Sidebar;
