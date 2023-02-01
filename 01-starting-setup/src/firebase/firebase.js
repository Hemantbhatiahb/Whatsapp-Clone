import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt60poSs5U0sJvBv_QSWZFDNtsy-zi-wM",
  authDomain: "whatsapp-clone-99670.firebaseapp.com",
  projectId: "whatsapp-clone-99670",
  storageBucket: "whatsapp-clone-99670.appspot.com",
  messagingSenderId: "589841725867",
  appId: "1:589841725867:web:0e4e93a4bb4e1c38bcbaee",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
