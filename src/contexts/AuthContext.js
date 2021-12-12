import React, { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  onAuthStateChanged,
  signOut,
  onSnapshot,
  doc,
  db,
} from "../shared/configs/firebase";
import { collectIdsAndDocs } from "../shared/utilities";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);
  // auth().signOut();
  // signOut(auth);
  const handleError = (err) => {
    switch (err.code) {
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/wrong-password":
        setError("Invalid password.");
        break;
      case "auth/user-not-found":
        setError("Account not found.");
        break;
      default:
        setError("Something went wrong, please try again.");
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser != null) {
        onSnapshot(doc(db, "dieticians", authUser.uid), (doc) => {
          setUser({ email: authUser.email, ...collectIdsAndDocs(doc) });
          setAuthLoading(false);
        });
      } else {
        setUser(null);
        setAuthLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  // const login = (email, password) => {
  //   setAuthLoading(true);
  //   signInWithPopup(auth, new GoogleAuthProvider())
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        error,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
