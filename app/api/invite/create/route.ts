import { getUid } from "@/lib/server/getUid";
import { getUser } from "@/lib/server/getUser";
import { noId, mustBeInTeam, mustBeCaptain } from "@/lib/server/errors";
import { getFirestore } from "firebase-admin/firestore";
import { genRandomInviteCode } from "@/lib/server/random";

const db = getFirestore();

export async function POST(request: Request) {
  const { teamId } = await getUser(request);

  const inviteId = genRandomInviteCode();

  await db.doc(`invites/${inviteId}`).set({
    // 7 days from now
    team: teamId,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  return new Response(JSON.stringify({ invite: inviteId }), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
