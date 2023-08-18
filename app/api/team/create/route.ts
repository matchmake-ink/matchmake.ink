import { ERRORS, getErrorResponse } from "@/lib/server/errors";
import { getUid } from "@/lib/server/user";
import { genRandomUid } from "@/lib/server/random";
import { getFirestore } from "firebase-admin/firestore";
import { createTeam } from "@/lib/server/database";

const db = getFirestore();

// can't write tests for this because firebase is a pain
// I mean I could but it's really just not worth the effort
export async function POST(request: Request) {
  const body = await request.clone().json();
  try {
    const uid = await getUid(body);

    const profile = await db.doc(`profiles/${uid}`).get();

    if (
      !(profile.data()?.teamId === "" || profile.data()?.teamId === undefined)
    ) {
      throw new Error(ERRORS.MUST_BE_FREE_AGENT);
    }

    if (body.name === undefined) {
      throw new Error(ERRORS.BAD_ARGS);
    }

    const teamUid = genRandomUid();
    const teamName: string = body.name;

    createTeam(uid, teamName, teamUid);
  } catch (error: unknown) {
    return await getErrorResponse(error);
  }

  return new Response(JSON.stringify({ result: "success" }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
