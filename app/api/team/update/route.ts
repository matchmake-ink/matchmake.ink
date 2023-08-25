import { getGravatarUrl } from "@/lib/client/gravatar";
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
