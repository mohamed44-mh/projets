// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCj8JEdtAhjUoGbf9c-fEeHalx_-t9ghKg",
    authDomain: "portfolio-ec2bd.firebaseapp.com",
    projectId: "portfolio-ec2bd",
    storageBucket: "portfolio-ec2bd.firebasestorage.app",
    messagingSenderId: "125619018747",
    appId: "1:125619018747:web:71a10e87ca565246f9095e",
    measurementId: "G-02H0SND5VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);