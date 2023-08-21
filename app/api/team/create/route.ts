import { ERRORS, getErrorResponse } from "@/lib/server/errors";
import { getUid } from "@/lib/server/user";
import { genRandomUid } from "@/lib/server/random";
import { getGravatarUrl } from "@/lib/client/gravatar";
import { createTeam } from "@/lib/server/database";
import { db } from "@/lib/server/firebase";

// can't write tests for this because firebase is a pain
// I mean I could but it's really just not worth the effort
export async function POST(request: Request) {
  const body = await request.clone().json();
  try {
    if (db === undefined) throw ERRORS.MOCKING_BACKEND;

    const uid = await getUid(body);

    const profile = await db.doc(`profiles/${uid}`).get();

    if (
      !(profile.data()?.teamId === "" || profile.data()?.teamId === undefined)
    ) {
      throw ERRORS.MUST_BE_FREE_AGENT;
    }

    if (body.name === undefined || body.email === undefined) {
      throw ERRORS.BAD_ARGS;
    }

    const teamUid = genRandomUid();
    const teamName: string = body.name;
    const teamEmail: string = body.email;

    createTeam(uid, teamName, teamUid, getGravatarUrl(teamEmail));
  } catch (error: unknown) {
    return await getErrorResponse(error);
  }

  return new Response(JSON.stringify({ result: "success" }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
    statusText: "OK",
  });
}
