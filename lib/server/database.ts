import { getFirestore, FieldValue } from "firebase-admin/firestore";
const db = getFirestore();

export async function createTeam(
  uid: string,
  teamName: string,
  teamUid: string
) {
  const createSuccess = await db
    .doc(`teams/${teamUid}`)
    .set({
      name: teamName,
      members: [uid],
      captain: uid,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (!createSuccess) {
    throw new Error("writeError");
  }

  await setProfileIdAsTeam(uid, teamUid);

  return Promise.resolve();
}

async function setProfileIdAsTeam(uid: string, teamUid: string) {
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
    throw new Error("writeError");
  }
}

export async function joinTeam(uid: string, teamUid: string) {
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
    throw new Error("writeErrror");
  }
}
