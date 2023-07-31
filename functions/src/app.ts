import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin";

initializeApp();
export const db = getFirestore();
