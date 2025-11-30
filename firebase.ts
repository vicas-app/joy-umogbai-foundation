import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5sSMP9VO_F-Zg90TOWP-c6RakYrKJZq8",
  authDomain: "cgmi-cfi.firebaseapp.com",
  databaseURL: "https://cgmi-cfi-default-rtdb.firebaseio.com",
  projectId: "cgmi-cfi",
  storageBucket: "cgmi-cfi.firebasestorage.app",
  messagingSenderId: "431793511242",
  appId: "1:431793511242:web:36b4d2ea757368d8cd7fb3",
  measurementId: "G-5PN75R0BT0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);