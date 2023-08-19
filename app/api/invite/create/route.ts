import { getUser } from "@/lib/server/user";
import { getErrorResponse } from "@/lib/server/errors";
import { genRandomInviteCode } from "@/lib/server/random";
import { db } from "@/lib/server/firebase";

export async function POST(request: Request) {
  const body = await request.clone().json();
  let inviteId: string;
  try {
    const { teamId } = await getUser(body, false, true);

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
