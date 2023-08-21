import { initializeApp, getApps, cert } from "firebase-admin/app";

export enum INIT_APP {
  SUCCESS = "SUCCESS",
  NO_ENV = "NO_ENV",
  ALREADY_INITIALIZED = "ALREADY_INITIALIZED",
}

export default function initApp(): INIT_APP {
  if (getApps().length <= 0) {
    if (process.env.init_firebase_app !== "real") {
      console.log("no env file");
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
