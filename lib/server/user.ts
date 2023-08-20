import { ERRORS } from "./errors";
import { db, auth } from "./firebase";

/**
 * Returns a snapshot of the user's profile and their team
 * @param request - The request from the client
 * @param captain - Whether the user has to be the captain or not
 */
export async function getUser(
  body: any,
  captain: boolean = false,
  mustBeInTeam: boolean = false
) {
  const creator = await getUid(body);

  if (creator === "") {
    throw ERRORS.NO_ID;
  }

  const profile = await db.doc(`profiles/${creator}`).get();
  const teamId = profile.get("teamId");

  if ((typeof teamId !== "string" || teamId === "") && mustBeInTeam) {
    throw ERRORS.MUST_BE_IN_TEAM;
  }

  if ((typeof teamId === "string" || teamId !== "") && !mustBeInTeam) {
    throw ERRORS.MUST_BE_FREE_AGENT;
  }

  const team = await db.doc(`teams/${teamId}`).get();

  // check if captain is the user
  if (team.get("captain") !== creator && captain) {
    throw ERRORS.MUST_BE_CAPTAIN;
  }

  return {
    uid: creator,
    teamId: teamId,
    profile: profile,
    team: team,
  };
}

export async function getUid(body: any): Promise<string> {
  let uid = "";

  const token: string = body.token;

  if (token === undefined) {
    return Promise.resolve("");
  }

  await auth.verifyIdToken(token).then((decodedToken) => {
    uid = decodedToken.uid;
  });

  return Promise.resolve(uid);
}
