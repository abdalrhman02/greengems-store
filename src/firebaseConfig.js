// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-DGUlIJXQzGxxpYJdOv1RUGOYOWm1GgY",
  authDomain: "greengems-store-97ae6-f6bd7.firebaseapp.com",
  projectId: "greengems-store-97ae6",
  storageBucket: "greengems-store-97ae6.appspot.com",
  messagingSenderId: "166899626143",
  appId: "1:166899626143:web:d044c6282dc34f86ce32aa",
  measurementId: "G-Q8SLYFRPMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
