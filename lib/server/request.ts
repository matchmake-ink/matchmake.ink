import { ERRORS } from "./errors";
import { db, auth } from "./firebase";

//! ----------------------------------------------
//! BEGIN OLD LEGACY CODE YOU SHOULD NOT USE!!!
// todo: delete this crap!

export async function getUser(
  body: any,
  captain: boolean = false,
  mustBeInTeam: boolean = false
) {
  if (db === undefined) throw ERRORS.MOCKING_BACKEND;
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
  if (auth === undefined) throw ERRORS.MOCKING_BACKEND;
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

//! END OLD LEGACY CODE
//! ----------------------------------------------

export class ServerFunction {
  map: Map<string, any> = new Map();

  async init(request: Request) {
    const body = await request.clone().json();
    const entires = Object.entries(body);

    for (const [key, value] of entires) {
      this.map.set(key, value);
    }
  }

  getProperty<T>(
    key: string,
    validator: (value: any) => boolean = () => true
  ): T {
    const value = this.map.get(key) as T;

    if (value === undefined && validator(value)) {
      throw ERRORS.BAD_ARGS;
    }

    return value;
  }

  async getUid(): Promise<string> {
    if (auth === undefined) throw ERRORS.MOCKING_BACKEND;
    let uid = "";

    const token: string = this.getProperty<string>("token");

    if (token === undefined) {
      return Promise.resolve("");
    }

    await auth.verifyIdToken(token).then((decodedToken) => {
      uid = decodedToken.uid;
    });

    return Promise.resolve(uid);
  }
}
