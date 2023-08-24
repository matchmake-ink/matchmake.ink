import { getErrorResponse } from "@/lib/server/errors";
import { genRandomInviteCode } from "@/lib/server/random";
import { ServerFunction } from "@/lib/server/request";

export async function POST(request: Request) {
  let inviteId: string;
  try {
    const func = new ServerFunction();
    const { db } = await func.init(request);

    const { teamId } = await func.getUser();
    inviteId = genRandomInviteCode();

    await db.doc(`invites/${inviteId}`).set({
      // 7 days from now
      team: teamId,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error: unknown) {
    return await getErrorResponse(error);
  }

  return new Response(JSON.stringify({ invite: inviteId }), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
