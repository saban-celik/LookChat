// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBURZOG2GlHS8b65moloZiAQ0io3w0_mU",
  authDomain: "lookchat-64b42.firebaseapp.com",
  projectId: "lookchat-64b42",
  storageBucket: "lookchat-64b42.appspot.com",
  messagingSenderId: "629755343620",
  appId: "1:629755343620:web:cdc307ac2b519691e19651",
  measurementId: "G-CD4YS88E9X",
  databaseURL: "https://lookchat-64b42-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig); // firestoreConfig yerine firebaseConfig
const auth = getAuth(app); // getAuth(app) olarak düzeltildi
const firestore = getFirestore(app);
const realtimeDb = getDatabase(app);

export { app, auth, firestore, realtimeDb, serverTimestamp }; // Tek export
