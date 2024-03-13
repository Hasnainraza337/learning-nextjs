import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA0DoNLFjdLdMg6nOliC0lgGT1-HF4Be1g",
    authDomain: "nextjs-firebase-cdfb4.firebaseapp.com",
    projectId: "nextjs-firebase-cdfb4",
    storageBucket: "nextjs-firebase-cdfb4.appspot.com",
    messagingSenderId: "1098210779146",
    appId: "1:1098210779146:web:c86077cf4ceda29d24bff3",
    measurementId: "G-0WM8K1BJZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app)


export { firestore, storage };