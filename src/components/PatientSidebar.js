import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ProfileOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const { SubMenu } = Menu;

function PatientSidebar() {
  const location = useLocation();
  const history = useHistory();
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    setPatient(location.pathname.split("/")[2]);
  }, [location]);
  console.log("location is: ", location.pathname.split("/"));
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
    </Menu>
  );
}

export default PatientSidebar;
