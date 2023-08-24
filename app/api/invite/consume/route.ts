import { ERRORS, getErrorResponse } from "@/lib/server/errors";
import { ServerFunction } from "@/lib/server/request";

export async function POST(request: Request) {
  let team: string;

  try {
    const func = new ServerFunction();
    const { db } = await func.init(request);

    const inviteId = func.getProperty<string>("inviteId");

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

  return new Response(JSON.stringify({ team: team }), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
