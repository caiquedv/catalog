// services/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5pGYdhLCzasHocESb9fgJlPIVD_KqUVM",
  authDomain: "wcatalog-16a10.firebaseapp.com",
  projectId: "wcatalog-16a10",
  storageBucket: "wcatalog-16a10.appspot.com",
  messagingSenderId: "581544083925",
  appId: "1:581544083925:web:32a46dd12192bdf90cfd5c",
  measurementId: "G-HBDKVJZXEG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };

