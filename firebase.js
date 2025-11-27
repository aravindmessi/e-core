import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBa81NyqHiGjZ3HgwXlnkfPSdqpV6G5MUE",
  authDomain: "e-core-c34c3.firebaseapp.com",
  projectId: "e-core-c34c3",
  storageBucket: "e-core-c34c3.firebasestorage.app",
  messagingSenderId: "4819111920",
  appId: "1:4819111920:web:a5096ad3b943932f0dd735"
};

const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db = getFirestore(app);
