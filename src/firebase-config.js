// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASmKICWFzTyukOdbc29peUtYvp9wYspCk",
  authDomain: "cypress-todo.firebaseapp.com",
  projectId: "cypress-todo",
  storageBucket: "cypress-todo.appspot.com",
  messagingSenderId: "382803296709",
  appId: "1:382803296709:web:26140055f199c8d6694bac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
