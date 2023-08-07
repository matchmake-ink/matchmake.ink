import { getUid } from "@/lib/server/getUid";
import { noId, badArgs, mustBeInTeam } from "@/lib/server/errors";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

const db = getFirestore();

export async function POST(request: Request) {
  // TODO: don't send invites to users that are in a team already
  const creator = await getUid(request);
  const body = await request.json();

  if (creator === "") {
    return noId;
  }

  const teamId = (await db.doc(`profiles/${creator}`).get()).get("teamId");

  if (typeof teamId !== "string" || teamId === "") {
    return mustBeInTeam;
  }

  if (body.expires === undefined || body.uid === undefined) {
    return badArgs;
  }

  await db.doc(`profiles/${body.uid}/invites/${teamId}`).set({
    expires: body.expires,
  });

  return NextResponse.json({
    result: "success",
  });
}
