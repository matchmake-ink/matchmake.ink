import { Profile } from "@/lib/interfaces";
import { getErrorResponse } from "@/lib/server/errors";
import { ServerFunction } from "@/lib/server/request";

export async function GET(request: Request) {
  let profile: Profile;

  try {
    const func = new ServerFunction();
    const { db } = await func.init(request.clone());

    const uid = func.getProperty<string>("uid");
    const profileDoc = await db.doc(`profiles/${uid}`).get();

    profile = {
      ign: profileDoc.data()?.ign ?? "",
      discordTag: profileDoc.data()?.discordTag ?? "",
      bio: profileDoc.data()?.bio ?? "",
      sendou: profileDoc.data()?.sendou ?? "",
      rank: profileDoc.data()?.rank ?? "",
      region: profileDoc.data()?.region ?? "",
      avatar: profileDoc.data()?.avatar ?? "",
      teamId: profileDoc.data()?.teamId ?? "",
    };
  } catch (e) {
    return getErrorResponse(e);
  }

  return new Response(JSON.stringify(profile), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
