// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5prjMQoZg9v9NOf7GkJI99XfbakAP2-A",
    authDomain: "seproj-10566.firebaseapp.com",
    projectId: "seproj-10566",
    storageBucket: "seproj-10566.firebasestorage.app",
    messagingSenderId: "969784035807",
    appId: "1:969784035807:web:5bed2eb2b99e5862cedc6a",
    measurementId: "G-9FM6GQEB71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);