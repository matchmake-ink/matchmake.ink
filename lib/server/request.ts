import { ERRORS } from "./errors";
import { db, auth } from "./firebase";

export class ServerFunction {
  map: Map<string, any> = new Map();
  user: User | undefined = undefined;

  async init(request: Request) {
    if (auth === undefined || db === undefined) throw ERRORS.MOCKING_BACKEND;

    try {
      const body = await request.clone().json();
      const entries = Object.entries(body);

      for (const [key, value] of entries) {
        this.map.set(key, value);
      }
    } catch (e) {
      console.log("body wasn't found. This is fine if it's a GET request.");
    }

    // parse the url parameters
    const url = new URL(request.url);
    for (const [key, value] of url.searchParams) {
      this.map.set(key, value);
    }

    return { db, auth };
  }

  getProperty<T>(
    key: string,
    validator: (value: any) => boolean = () => true
  ): T {
    const value = this.map.get(key) as T;

    if (value === undefined || !validator(value)) {
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

  async getUser(): Promise<User> {
    if (db === undefined) throw ERRORS.MOCKING_BACKEND;

    if (this.user !== undefined) {
      return this.user;
    }

    const uid = await this.getUid();
    let profile, teamId, team;

    try {
      profile = await db.doc(`profiles/${uid}`).get();
      teamId = profile.get("teamId");
      team = await db.doc(`teams/${teamId}`).get();
    } catch (e) {
      throw ERRORS.READ_ERROR;
    }

    return Promise.resolve({
      uid: uid,
      teamId: teamId,
      profile: profile,
      team: team,
    });
  }

  async enforce({
    captain = false,
    onTeam = false,
    freeAgent = false,
    authenticated = false,
  }: EnforceOptions) {
    try {
      const { profile, team } = await this.getUser();

      if (authenticated && profile === undefined) {
        throw ERRORS.NO_ID;
      }

      if (onTeam && team === undefined) {
        throw ERRORS.MUST_BE_IN_TEAM;
      }

      if (freeAgent && team !== undefined) {
        throw ERRORS.MUST_BE_FREE_AGENT;
      }

      if (
        captain &&
        profile !== undefined &&
        profile.get("captain") === false
      ) {
        throw ERRORS.MUST_BE_CAPTAIN;
      }
    } catch (e) {
      throw e;
    }

    return Promise.resolve();
  }
}

interface EnforceOptions {
  captain: boolean;
  onTeam: boolean;
  freeAgent: boolean;
  authenticated: boolean;
}

interface User {
  uid: string;
  teamId: string;
  profile: FirebaseFirestore.DocumentSnapshot;
  team: FirebaseFirestore.DocumentSnapshot;
}
