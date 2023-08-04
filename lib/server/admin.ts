import { initializeApp, getApps, cert } from "firebase-admin/app";
import key from "./key.json";

export default function initApp() {
  if (getApps().length <= 0) {
    initializeApp({
      //@ts-ignore
      credential: cert(key),
    });
  }
}
