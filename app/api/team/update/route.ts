import { getUser } from "@/lib/server/user";
import { getGravatarUrl } from "@/lib/client/gravatar";
import { db } from "@/lib/server/firebase";
import { getErrorResponse, ERRORS } from "@/lib/server/errors";

export async function POST(request: Request) {
  const body = await request.clone().json();

  try {
    if (db === undefined) throw ERRORS.MOCKING_BACKEND;
    const { teamId } = await getUser(body, true, true);

    const teamName: string = body.name;
    const teamEmail: string = body.email;

    if (teamName === undefined || teamEmail === undefined) {
      throw ERRORS.BAD_ARGS;
    }

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
