// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzgO5Jvy5NdHCRvi8z_ghaG-hu3ECK9rk",
  authDomain: "tutorial--signin-c7c93.firebaseapp.com",
  projectId: "tutorial--signin-c7c93",
  storageBucket: "tutorial--signin-c7c93.firebasestorage.app",
  messagingSenderId: "304638601732",
  appId: "1:304638601732:web:e1583283f5b43e33a06351",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
