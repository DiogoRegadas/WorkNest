
  // src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApiTOzAFOF4z7m1mz10hdFv00c2zr0Lvo",
  authDomain: "worknest-b0d90.firebaseapp.com",
  projectId: "worknest-b0d90",
  storageBucket: "worknest-b0d90.firebasestorage.app",
  messagingSenderId: "469291518448",
  appId: "1:469291518448:web:e3929419000e1b3562b535",
  measurementId: "G-53D9E30HXS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "worknest");

export { db };
