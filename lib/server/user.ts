import { getAuth } from "firebase-admin/auth";
import { db } from "./firebase";
import initApp from "@/lib/server/admin";

initApp();

/**
 * Returns a snapshot of the user's profile and their team
 * @param request - The request from the client
 * @param captain - Whether the user has to be the captain or not
 */
export async function getUser(
  body: any,
  captain: boolean = false,
  mustBeInTeam: boolean = true
) {
  const creator = await getUid(body);

  if (creator === "") {
    throw new Error("noId");
  }

  const profile = await db.doc(`profiles/${creator}`).get();
  const teamId = profile.get("teamId");

  if ((typeof teamId !== "string" || teamId === "") && mustBeInTeam) {
    throw new Error("noTeam");
  }

  if ((typeof teamId === "string" || teamId !== "") && !mustBeInTeam) {
    throw new Error("inTeam");
  }

  const team = await db.doc(`teams/${teamId}`).get();

  // check if captain is the user
  if (team.get("captain") !== creator && captain) {
    throw new Error("notCaptain");
  }

  return {
    uid: creator,
    teamId: teamId,
    profile: profile,
    team: team,
  };
}

const auth = getAuth();

export async function getUid(body: any): Promise<string> {
  let uid = "";

  const token: string = body.token;

  if (token === undefined) {
    return Promise.resolve("");
  }

  console.log(auth);

  await auth.verifyIdToken(token).then((decodedToken) => {
    uid = decodedToken.uid;
  });

  return Promise.resolve(uid);
}
