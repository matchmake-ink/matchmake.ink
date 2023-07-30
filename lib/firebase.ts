import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqlvjhfLC0XP4WNxGCVboJS4HN9Hr6nUw",
  authDomain: "test-project-31ae6.firebaseapp.com",
  projectId: "test-project-31ae6",
  storageBucket: "test-project-31ae6.appspot.com",
  messagingSenderId: "264834451109",
  appId: "1:264834451109:web:17d2acf0f0e368e414af4c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
