import { NextResponse } from "next/server";
import { noId } from "@/lib/server/errors";
import { getUid } from "@/lib/server/getUid";
import { genRandomName, genRandomUid } from "@/lib/server/random";
import { getDatabase } from "firebase-admin/database";

const db = getDatabase();

export async function POST(request: Request) {
  const uid = await getUid(request);

  if (uid === "") {
    return noId;
  }

  const teamUid = genRandomUid();
  const teamName = genRandomName();

  return await db
    .ref(`teams/${teamUid}`)
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
