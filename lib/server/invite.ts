import { getFirestore } from "firebase-admin/firestore";

export async function createInvite(
  teamUid: string,
  uid: string,
  expires: number
) {
  const db = getFirestore();

  await db.doc(`profiles/${uid}/invites/${teamUid}`).set({
    expires: expires,
  });
}
