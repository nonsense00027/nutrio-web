import React, { useState } from "react";
import "./Login.css";

import logo2 from "../../assets/img/logo2.svg";
import { Tabs } from "antd";
import Signin from "./Signin";
import Signup from "./Signup";

const { TabPane } = Tabs;

function Login() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="flex-grow py-20 my-auto mx-auto">
        <div className="w-96 mx-auto">
          <Tabs defaultActiveKey="1" centered type="card">
            <TabPane tab="Login" key="1">
              <Signin />
            </TabPane>
            <TabPane tab="Register" key="2">
              <Signup />
            </TabPane>
          </Tabs>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login__right bg-primary flex flex-col justify-center items-center">
        <img src={logo2} alt="" className="mx-auto h-96 object-contain" />
        <h1 className="font-bold text-4xl text-white leading-3">
          Eat wisely, Stay healthy
        </h1>
        <p className="text-xl text-white">
          "What you eat affect's your baby's health."
        </p>
      </div>
    </div>
  );
}

export default Login;
