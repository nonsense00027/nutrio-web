import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useAuthContext } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/AuthPage/Login";
import Home from "./pages/HomePage";
import PatientsPage from "./pages/PatientsPage";
import PatientPage from "./pages/PatientPage";
import { auth, signInWithEmailAndPassword } from "./shared/configs/firebase";
import { Spin } from "antd";
import PendingPage from "./pages/PendingPage";
import MessagePage from "./pages/MessagePage";

function App() {
  const { user, authLoading } = useAuthContext();

  if (authLoading) {
    return (
      <div className="h-screen w-screen grid place-items-center">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="App">
      {user ? (
        <Router>
          <Switch>
            <Route path="/message/:patientId">
              <MessagePage />
            </Route>
            <Route path="/patients/:patientId">
              <PatientPage />
            </Route>
            <Route path="/pending">
              <PendingPage />
            </Route>
            <Route path="/">
              <PatientsPage />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
