import React, { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
} from "../../shared/configs/firebase";
import { Spin, message, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleError = (err) => {
    switch (err.code) {
      case "auth/invalid-email":
        return "Sorry, the email address is invalid.";
      case "auth/wrong-password":
        return "Sorry, you entered a wrong password.";
      case "auth/user-not-found":
        return "Sorry, account not found.";
      default:
        return "Something went wrong, please try again.";
    }
  };

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {})
      .catch((err) => {
        message.error(handleError(err));
        setLoading(false);
      });
  };

  return (
    <div className="mt-8">
      <form onSubmit={login}>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            {/* <input
              className="border mt-1 border-gray-200 rounded-full w-full px-4 py-3 outline-none focus:border-primary text-sm"
              type="email"
              name="email"
              value={email}
              autoFocus
              required
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <Input
              size="large"
              prefix={<MailOutlined />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            {/* <input
              className="border mt-1 border-gray-200 rounded-full w-full px-4 py-3 outline-none focus:border-primary text-sm"
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary rounded-full text-white w-full py-3 mt-4 font-semibold shadow-md"
        >
          {loading ? <Spin /> : "LOGIN"}
        </button>
      </form>
    </div>
  );
}

export default Signin;
