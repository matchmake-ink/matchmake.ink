import { NextResponse } from "next/server";
import { noId, writeError } from "@/lib/server/errors";
import { getUid } from "@/lib/server/getUid";
import { genRandomName, genRandomUid } from "@/lib/server/random";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

export async function POST(request: Request) {
  const uid = await getUid(request);

  if (uid === "") {
    return noId;
  }

  // TODO: ensure that the user isn't already on a team

  const teamUid = genRandomUid();
  const teamName = genRandomName();

  const createSuccess = await db
    .doc(`teams/${teamUid}`)
    .set({
      name: teamName,
      members: [uid],
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (!createSuccess) {
    return writeError;
  }

  const addSuccess = await db
    .doc(`profiles/${uid}`)
    .update({
      teams: [teamUid],
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (!addSuccess) {
    return writeError;
  }

  return NextResponse.json({
    result: "success",
    message: "team created",
    teamUid: teamUid,
    teamName: teamName,
  });
}
