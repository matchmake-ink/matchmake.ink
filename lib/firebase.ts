import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTNdHElGkqDptz9UQdE9oCgS9Ml4cRtNY",
  authDomain: "matchmake-ink.firebaseapp.com",
  projectId: "matchmake-ink",
  storageBucket: "matchmake-ink.appspot.com",
  messagingSenderId: "329277467094",
  appId: "1:329277467094:web:d652b765053a1ebf2e1c77",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
