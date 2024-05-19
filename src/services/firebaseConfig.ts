// services/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAn9L7DxyBZYxUtncKeMeV-Uc2Wm7RiWmo",
  authDomain: "rogercatalog.firebaseapp.com",
  projectId: "rogercatalog",
  storageBucket: "rogercatalog.appspot.com",
  messagingSenderId: "64665085075",
  appId: "1:64665085075:web:0ed4ef7c47eb1a78bd5966",
  measurementId: "G-G9TNBDTL4R"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
