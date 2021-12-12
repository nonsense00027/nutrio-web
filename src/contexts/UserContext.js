import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  onSnapshot,
  collection,
  db,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "../shared/configs/firebase";
import { collectIdsAndDocs } from "../shared/utilities";
import { useAuthContext } from "./AuthContext";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "dieticians", user.id, "chats"),
      orderBy("modified", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChats(snapshot.docs.map((doc) => collectIdsAndDocs(doc)));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const sendMessage = async (receiver, message) => {
    await setDoc(doc(db, "dieticians", user.id, "chats", receiver), {
      modified: new Date(),
    });

    await setDoc(doc(db, "profile", receiver, "chats", user.id), {
      modified: new Date(),
    });

    await addDoc(
      collection(db, "dieticians", user.id, "chats", receiver, "conversations"),
      {
        user: user.id,
        message: message,
        timestamp: serverTimestamp(),
      }
    );

    await addDoc(
      collection(db, "profile", receiver, "chats", user.id, "conversations"),
      {
        user: user.id,
        message: message,
        timestamp: serverTimestamp(),
      }
    );
  };

  const payload = useMemo(() => ({ chats, sendMessage }), [chats]);
  return (
    <UserContext.Provider value={payload}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
