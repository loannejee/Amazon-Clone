import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "clone-6805b.firebaseapp.com",
    projectId: "clone-6805b",
    storageBucket: "clone-6805b.appspot.com",
    messagingSenderId: "126686782748",
    appId: "1:126686782748:web:929b6beebd9fc3df6ac6d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// default exports; can only have one
export default db