import { getUid } from "@/lib/server/getUid";
import { noId, badArgs } from "@/lib/server/errors";
import { createInvite } from "@/lib/server/invite";

export async function POST(request: Request) {
  const uid = await getUid(request);
  const body = await request.json();

  if (uid === "") {
    return noId;
  }

  if (body.teamUid === undefined || body.expires === undefined) {
    return badArgs;
  }
  // ensure that teamUid and expires are present in the request body

  createInvite(uid, body.teamUid, body.expires);

  return {};
}
