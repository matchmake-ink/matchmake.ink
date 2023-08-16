import {
  badArgs,
  inviteExpired,
  serverError,
  writeError,
} from "@/lib/server/errors";
import { getUser, getErrorResponse } from "@/lib/server/getUser";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
const db = getFirestore();

export async function POST(request: Request) {
  let uId: string;
  let team: string;

  const body = await request.clone().json();
  try {
    const user = await getUser(request, false, true);
    uId = user.uId;
  } catch (error: unknown) {
    return await getErrorResponse(error);
  }

  const { inviteId } = body;
  if (inviteId === undefined) {
    return badArgs;
  }

  const inviteRef = await db.doc(`invites/${inviteId}`);
  const invite = await inviteRef.get();

  team = invite.get("team");
  const expires = invite.get("expires");

  if (expires === undefined || expires < Date.now()) {
    return inviteExpired;
  }

  // TODO: reject the invite if the user is on the team the invite is for

  const createSuccess = await db
    .doc(`teams/${team}`)
    .update({
      members: FieldValue.arrayUnion(uId),
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
    .doc(`profiles/${uId}`)
    .update({
      teamId: team,
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

  await inviteRef.delete();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
