import {
  noId,
  writeError,
  badArgs,
  mustBeFreeAgent,
} from "@/lib/server/errors";
import { getUid } from "@/lib/server/getUid";
import { genRandomUid } from "@/lib/server/random";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

// can't write tests for this because firebase is a pain
// I mean I could but it's really just not worth the effort
export async function POST(request: Request) {
  const uid = await getUid(request);
  const body = await request.clone().json();

  const profile = await db.doc(`profiles/${uid}`).get();

  if (
    !(profile.data()?.teamId === "" || profile.data()?.teamId === undefined)
  ) {
    return mustBeFreeAgent;
  }

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

  return new Response(JSON.stringify({ result: "success" }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
