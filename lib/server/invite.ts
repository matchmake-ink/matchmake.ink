import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

export async function createInvite(
  teamUid: string,
  uid: string,
  expires: number
) {
  await db.doc(`profiles/${uid}/invites/${teamUid}`).set({
    expires: expires,
  });
}
