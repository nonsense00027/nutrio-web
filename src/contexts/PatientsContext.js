import React, { createContext, useContext, useState, useEffect } from "react";
import {
  query,
  db,
  onSnapshot,
  collection,
  getMessaging,
  getToken,
} from "../shared/configs/firebase";
import { collectIdsAndDocs } from "../shared/utilities";
import { Button } from "antd";
export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "profile"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPatients(querySnapshot.docs.map((doc) => collectIdsAndDocs(doc)));
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  return (
    <PatientsContext.Provider
      value={{
        patients,
        loading,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatientsContext = () => useContext(PatientsContext);
