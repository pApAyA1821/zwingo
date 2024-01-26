// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxreWvFOWdSsYXiw50yBAeK_XExio0T9Q",
  authDomain: "test-57af6.firebaseapp.com",
  databaseURL:
    "https://test-57af6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-57af6",
  storageBucket: "test-57af6.appspot.com",
  messagingSenderId: "1097805074752",
  appId: "1:1097805074752:web:a8c29c0e234749367deaa5",
  measurementId: "G-ED6D8F0GZH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };
