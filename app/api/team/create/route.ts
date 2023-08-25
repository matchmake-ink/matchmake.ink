import { ERRORS, getErrorResponse } from "@/lib/server/errors";
import { genRandomUid } from "@/lib/server/random";
import { getGravatarUrl } from "@/lib/client/gravatar";
import { createTeam } from "@/lib/server/database";
import { ServerFunction } from "@/lib/server/request";

// can't write tests for this because firebase is a pain
// I mean I could but it's really just not worth the effort
export async function POST(request: Request) {
  const body = await request.clone().json();
  try {
    const func = new ServerFunction();
    await func.init(request);

    const uid = await func.getUid();
    await func.enforce({
      onTeam: false,
      freeAgent: true,
      captain: false,
      authenticated: true,
    });

    const name = func.getProperty<string>("name");
    const email = func.getProperty<string>("email");
    const teamUid = genRandomUid();

    createTeam(uid, name, teamUid, getGravatarUrl(email));
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
