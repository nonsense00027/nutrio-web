import React, { useState } from "react";
import "./Login.css";
import {
  auth,
  signInWithEmailAndPassword,
} from "../../shared/configs/firebase";
import { Spin, message } from "antd";

function Login() {
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
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="flex-grow px-44 py-20 my-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-1">Sign in</h1>
          {/* <p className="text-sm italic">
            Eat wisely, Stay healthy. <br /> What you eat affects your baby's
            health.
          </p> */}
        </div>
        <form onSubmit={login}>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="ml-1 text-sm" htmlFor="email">
                Email
              </label>
              <input
                className="border mt-1 border-gray-200 rounded-full w-full px-4 py-3 outline-none focus:border-primary text-sm"
                type="email"
                name="email"
                value={email}
                autoFocus
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="ml-1" htmlFor="password">
                Password
              </label>
              <input
                className="border mt-1 border-gray-200 rounded-full w-full px-4 py-3 outline-none focus:border-primary text-sm"
                type="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
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

      {/* RIGHT */}
      <div className="login__right bg-primary"></div>
    </div>
  );
}

export default Login;
