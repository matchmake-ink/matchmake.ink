import { onCall } from "firebase-functions/v2/https";
import { db } from "./app";
import { genRandomUid, genRandomName } from "./random";

export const createTeam = onCall(async (request) => {
  if (request.auth?.uid === undefined) {
    return {
      status: "failed",
      message: "You need to be logged in to create a team.",
      id: "",
    };
  }

  const id = genRandomUid();
  await db.doc(`teams/${id}`).create({
    name: genRandomName,
    members: [request.auth.uid],
  });

  await db.doc(`profiles/${request.auth.uid}`).set({
    teamId: id,
  });

  return {
    status: "success",
    message: "successfully created team",
    id: id,
  };
});
