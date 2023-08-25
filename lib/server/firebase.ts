import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth as getClientAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqlvjhfLC0XP4WNxGCVboJS4HN9Hr6nUw",
  authDomain: "test-project-31ae6.firebaseapp.com",
  projectId: "test-project-31ae6",
  storageBucket: "test-project-31ae6.appspot.com",
  messagingSenderId: "264834451109",
  appId: "1:264834451109:web:17d2acf0f0e368e414af4c",
};

export const clientApp = initializeClientApp(firebaseConfig);
export const clientAuth = getClientAuth(clientApp);

enum INIT_APP {
  SUCCESS = "SUCCESS",
  NO_ENV = "NO_ENV",
  ALREADY_INITIALIZED = "ALREADY_INITIALIZED",
}

function initApp(): INIT_APP {
  if (getApps().length <= 0) {
    if (process.env.init_firebase_app !== "real") {
      return INIT_APP.NO_ENV;
    }

    const key = JSON.parse(process.env.key as string);

    initializeApp({
      //@ts-ignore
      credential: cert(key),
    });

    return INIT_APP.SUCCESS;
  }

  return INIT_APP.ALREADY_INITIALIZED;
}

const init = initApp() !== "NO_ENV";

export const db = init ? getFirestore() : undefined;
export const auth = init ? getAuth() : undefined;
