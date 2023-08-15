import { mustBeCaptain, mustBeInTeam, noId, writeError } from "./errors";
import { getUid } from "./getUid";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

/**
 * Returns a snapshot of the user's profile and their team
 * @param request - The request from the client
 * @param captain - Whether the user has to be the captain or not
 */
export async function getUser(request: Request, captain: boolean = false) {
  const creator = await getUid(request);

  if (creator === "") {
    throw new Error("noId");
  }

  const profile = await db.doc(`profiles/${creator}`).get();
  const teamId = profile.get("teamId");

  if (typeof teamId !== "string" || teamId === "") {
    throw new Error("noTeam");
  }

  const team = await db.doc(`teams/${teamId}`).get();

  // check if captain is the user
  if (team.get("captain") !== creator) {
    throw new Error("notCaptain");
  }

  return {
    uId: creator,
    teamId: teamId,
    profile: profile,
    team: team,
  };
}

export async function getErrorResponse(error: string) {
  switch (error) {
    case "noId":
      return noId;
    case "notCaptain":
      return mustBeCaptain;
    case "noTeam":
      return mustBeInTeam;
    default:
      return writeError;
  }
}
