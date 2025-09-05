// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "nike-shoe-store-200b9.firebaseapp.com",
  projectId: "nike-shoe-store-200b9",
  storageBucket: "nike-shoe-store-200b9.firebasestorage.app",
  messagingSenderId: "883089200895",
  appId: "1:883089200895:web:4ea1b030810492626b5eca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app); // Add this export

export default app;
