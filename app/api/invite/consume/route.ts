import { ERRORS, getErrorResponse } from "@/lib/server/errors";
import { getUser } from "@/lib/server/user";
import { db } from "@/lib/server/firebase";

export async function POST(request: Request) {
  let uid: string;
  let team: string;

  const body = await request.clone().json();

  try {
    if (db === undefined) throw ERRORS.MOCKING_BACKEND;

    const user = await getUser(body, false, true);
    uid = user.uid;

    const { inviteId } = body;
    if (inviteId === undefined) {
      throw ERRORS.BAD_ARGS;
    }

    const inviteRef = db.doc(`invites/${inviteId}`);
    const invite = await inviteRef.get();

    team = invite.get("team");
    const expires = invite.get("expires");

    if (expires === undefined || expires < Date.now()) {
      throw ERRORS.INVITE_EXPIRED;
    }

    await inviteRef.delete();
  } catch (error: unknown) {
    return await getErrorResponse(error);
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
