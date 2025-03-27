// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Düzeltildi: app parametresi eklendi
const firestore = getFirestore(app);

export { auth, firestore, serverTimestamp };
export default app;
