import { NextResponse } from "next/server";
import { noId, writeError, badArgs } from "@/lib/server/errors";
import { getUid } from "@/lib/server/getUid";
import { genRandomName, genRandomUid } from "@/lib/server/random";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

export async function POST(request: Request) {
  const uid = await getUid(request);
  const body = await request.clone().json();

  if (body.name === undefined) {
    return badArgs;
  }

  if (uid === "") {
    return noId;
  }

  const teamUid = genRandomUid();
  const teamName: string = body.name;

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
    return writeError;
  }

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
    return writeError;
  }

  return NextResponse.json({
    status: 201,
    result: "success",
    message: "team created",
    teamUid: teamUid,
    teamName: teamName,
  });
}
