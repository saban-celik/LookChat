import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";


const firebaseConfig = {
    
  };
  const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);

export { auth, firestore, serverTimestamp };
export default app;
