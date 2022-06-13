// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcwRzloPD45qmG8RarVj4lYJChgWK_IQg",
  authDomain: "doc-luck-658d8.firebaseapp.com",
  projectId: "doc-luck-658d8",
  storageBucket: "doc-luck-658d8.appspot.com",
  messagingSenderId: "333873638513",
  appId: "1:333873638513:web:9e639fae200a5d7e517fd0",
  measurementId: "G-MF92K8VV55"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const analytics = getAnalytics(app);