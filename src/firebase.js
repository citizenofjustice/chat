// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ",
  authDomain: "chat-app-1e2f6.firebaseapp.com",
  databaseURL:
    "https://chat-app-1e2f6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-app-1e2f6",
  storageBucket: "chat-app-1e2f6.appspot.com",
  messagingSenderId: "524531463278",
  appId: "1:524531463278:web:cdaf01e09b815f9eeee27f",
  measurementId: "G-NFV4YQXHGL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const db = getDatabase();
export { storage, db };
