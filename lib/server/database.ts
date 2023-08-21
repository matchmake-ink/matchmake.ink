import { FieldValue } from "firebase-admin/firestore";
import { ERRORS } from "./errors";
import { db } from "./firebase";

export async function createTeam(
  uid: string,
  teamName: string,
  teamUid: string,
  avatar: string
) {
  if (db === undefined) throw ERRORS.MOCKING_BACKEND;

  const createSuccess = await db
    .doc(`teams/${teamUid}`)
    .set({
      name: teamName,
      members: [uid],
      captain: uid,
      avatar: avatar,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (!createSuccess) {
    throw ERRORS.WRITE_ERROR;
  }

  await setProfileIdAsTeam(uid, teamUid);

  return Promise.resolve();
}

async function setProfileIdAsTeam(uid: string, teamUid: string) {
  if (db === undefined) throw ERRORS.MOCKING_BACKEND;

  const addSuccess = await db
    .doc(`profiles/${uid}`)
    .update({
      teamId: teamUid,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (!addSuccess) {
    throw ERRORS.WRITE_ERROR;
  }
}

export async function joinTeam(uid: string, teamUid: string) {
  if (db === undefined) throw ERRORS.MOCKING_BACKEND;

  const joinSuccess = await db
    .doc(`teams/${teamUid}`)
    .update({
      members: FieldValue.arrayUnion(uid),
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (!joinSuccess) {
    throw ERRORS.WRITE_ERROR;
  }
}
