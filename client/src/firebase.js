/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-8e65d.firebaseapp.com",
  projectId: "mern-estate-8e65d",
  storageBucket: "mern-estate-8e65d.appspot.com",
  messagingSenderId: "1042667558020",
  appId: "1:1042667558020:web:9f481dbf9d3edfd51a5ed1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
