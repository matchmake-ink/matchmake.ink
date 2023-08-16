import {
  mustBeCaptain,
  mustBeInTeam,
  noId,
  writeError,
  mustBeFreeAgent,
} from "./errors";
import { getUid } from "./getUid";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

/**
 * Returns a snapshot of the user's profile and their team
 * @param request - The request from the client
 * @param captain - Whether the user has to be the captain or not
 */
export async function getUser(
  request: Request,
  captain: boolean = false,
  mustBeInTeam: boolean = true
) {
  const creator = await getUid(request);

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
    uId: creator,
    teamId: teamId,
    profile: profile,
    team: team,
  };
}

export async function getErrorResponse(error: unknown) {
  switch (error) {
    case "noId":
      return noId;
    case "notCaptain":
      return mustBeCaptain;
    case "noTeam":
      return mustBeInTeam;
    case "inTeam":
      return mustBeFreeAgent;
    default:
      return writeError;
  }
}
