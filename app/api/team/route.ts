import { getGravatarUrl } from "@/lib/gravatar";
import { Team } from "@/lib/interfaces";
import { ServerFunction } from "@/lib/server/request";
import { getErrorResponse } from "@/lib/server/errors";

export async function POST(request: Request) {
  try {
    const func = new ServerFunction();
    const { db } = await func.init(request);

    const { teamId } = await func.getUser();

    const teamName = func.getProperty<string>("name");
    const teamEmail = func.getProperty<string>("email");

    db.doc(`teams/${teamId}`).update({
      name: teamName,
      avatar: getGravatarUrl(teamEmail),
    });
  } catch (error: unknown) {
    return await getErrorResponse(error);
  }

  //return
  return new Response(
    JSON.stringify({
      result: "success",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
      statusText: "team updated successfully",
    }
  );
}

export async function GET(request: Request) {
  let team: Team;

  try {
    const func = new ServerFunction();
    const { db } = await func.init(request);

    const teamId = func.getProperty<string>("teamId");

    const teamDoc = await db.doc(`teams/${teamId}`).get();

    team = {
      id: teamId,
      name: teamDoc.data()?.name ?? "",
      avatar: teamDoc.data()?.avatar ?? "",
      members: teamDoc.data()?.members ?? [],
    };
  } catch (e) {
    return await getErrorResponse(e);
  }

  return new Response(JSON.stringify(team), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
    statusText: "team retrieved successfully",
  });
}
