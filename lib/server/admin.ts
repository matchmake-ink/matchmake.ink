import { initializeApp, cert, getApps } from "firebase-admin/app";
import service from "./service"; // need this file? I'll send it to you if you want to contribute

const adminConfig = {
  credential: cert({
    projectId: service.project_id,
    clientEmail: service.client_email,
    privateKey: service.private_key,
  }),
};

export default function initApp() {
  if (getApps().length <= 0) {
    initializeApp(adminConfig);
  }
}
