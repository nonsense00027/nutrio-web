import "./App.css";
import { useAuthContext } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/AuthPage/Login";
import PatientsPage from "./pages/PatientsPage";
import PatientPage from "./pages/PatientPage";
import { Spin } from "antd";
import PendingPage from "./pages/PendingPage";
import MessagePage from "./pages/MessagePage";
import { UserContextProvider } from "./contexts/UserContext";
import MediaPage from "./pages/MediaPage";

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
        <UserContextProvider>
          <Router>
            <Switch>
              <Route path="/media/:patientId">
                <MediaPage />
              </Route>
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
        </UserContextProvider>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
