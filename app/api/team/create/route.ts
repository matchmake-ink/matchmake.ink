import { NextResponse } from "next/server";
import { noId } from "@/lib/server/errors";
import { getUid } from "@/lib/server/getUid";
import { genRandomName, genRandomUid } from "@/lib/server/random";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

export async function POST(request: Request) {
  const uid = await getUid(request);

  if (uid === "") {
    return noId;
  }

  const teamUid = genRandomUid();
  const teamName = genRandomName();

  return await db
    .doc(`teams/${teamUid}`)
    .set({
      name: teamName,
      members: [uid],
    })
    .then(() => {
      return NextResponse.json({
        result: "success",
        uid: teamUid,
      });
    })
    .catch(() => {
      return NextResponse.json({
        result: "error",
        error: "unknown",
      });
    });
}
