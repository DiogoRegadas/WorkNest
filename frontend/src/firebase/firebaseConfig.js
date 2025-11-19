
  // src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "worknest");

export { db };
