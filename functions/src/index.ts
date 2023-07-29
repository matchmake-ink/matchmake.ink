import { onCall } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";

initializeApp();

export const createTeam = onCall({ cors: "localhost:3000" }, (request) => {
  if (request.auth?.uid == null) {
    return {
      success: false,
      message: "You must be logged in to create a team",
    };
  }

  return {
    success: true,
    message: `Team created successfully for user with uid ${request.auth.uid}`,
  };
});
