import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import initApp from "@/lib/server/admin";

initApp();

export const db = getFirestore();
export const auth = getAuth();
