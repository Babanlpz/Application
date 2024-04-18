// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAufm7qbgRyC1iQqSystCaVn5KgcuGwTFs",
  authDomain: "contactapp-118e5.firebaseapp.com",
  projectId: "contactapp-118e5",
  storageBucket: "contactapp-118e5.appspot.com",
  messagingSenderId: "720594412869",
  appId: "1:720594412869:web:3a6b456427dea505254a2c",
  measurementId: "G-P4P4TN6BP8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
