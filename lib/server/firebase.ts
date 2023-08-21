import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import initApp from "@/lib/server/admin";

const init = initApp() !== "NO_ENV";

export const db = init ? getFirestore() : undefined;
export const auth = init ? getAuth() : undefined;
