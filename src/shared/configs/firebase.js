// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDlro0XgCOGOEyyHI2X6fTrURvJAw-TESk",
//   authDomain: "nutrio-e0798.firebaseapp.com",
//   projectId: "nutrio-e0798",
//   storageBucket: "nutrio-e0798.appspot.com",
//   messagingSenderId: "947923365174",
//   appId: "1:947923365174:web:10e1ca6ae3821bf7b1d797",
//   measurementId: "G-0NP1VRMRHL",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCbiRE0qYFnd_XdCMwH_1dErDQnH0_LARE",
  authDomain: "nutrio-final.firebaseapp.com",
  projectId: "nutrio-final",
  storageBucket: "nutrio-final.appspot.com",
  messagingSenderId: "177494396823",
  appId: "1:177494396823:web:bdef933a8ac8f421d0fed2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {
  db,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getMessaging,
  getToken,
  createUserWithEmailAndPassword,
};
