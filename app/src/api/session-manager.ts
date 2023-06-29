import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { backendClient } from "./client";
import axios from "axios";

export async function updateDiscordUserData(
  session: Session,
  providerToken: string | null
): Promise<string | void> {
  // ensure arguments
  if (session === null) return Promise.reject("Session is null");

  if (session.provider_token === null || session.provider_token === undefined) {
    return Promise.reject("No provider token");
  }

  await axios
    .get("https://discordapp.com/api/users/@me", {
      headers: { Authorization: `Bearer ${providerToken}` },
    })
    .then((res) => {
      const updates = {
        id: session.user.id,
        discord_id: res.data.id,
        discord_tag: `${res.data.username}#${res.data.discriminator}`,
        avatar_url: `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}.png`,
        email: res.data.email,
      };

      backendClient
        .from("profiles")
        .upsert(updates)
        .then((response) => {
          console.log(response);
        }); // do we need error handling here?
      return Promise.resolve();
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });

  return Promise.resolve();
}

// DO NOT CALL THIS hook OUTSIDE OF THE ROUTER!! It will cause an error
export enum SESSION_STATUS {
  LOADING,
  LOGGED_IN,
  LOGGED_OUT,
}
class SessionManager {
  constructor() {
    backendClient.auth.getSession().then(({ data: { session } }) => {
      this.currentSession = session;
      this.sessionFound = true;
    });
    backendClient.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event == "SIGNED_IN" && session !== null) {
        console.log("signed in!");
        updateDiscordUserData(session, session.provider_token || null);
      }

      this.currentSession = session;
      this.sessionListeners.forEach((listener) => listener(event, session));
    });
  }

  public getSession(): Session | null {
    return this.currentSession;
  }

  public getSessionStatus(): SESSION_STATUS {
    if (!this.sessionFound) {
      return SESSION_STATUS.LOADING;
    }

    if (this.currentSession === null) {
      return SESSION_STATUS.LOGGED_OUT;
    }

    return SESSION_STATUS.LOGGED_IN;
  }

  public addSessionListener(
    listener: (event: AuthChangeEvent, session: Session | null) => void
  ): void {
    this.sessionListeners.push(listener);
  }

  private currentSession: Session | null = null;
  private sessionListeners: ((
    event: AuthChangeEvent,
    session: Session | null
  ) => void)[] = [];
  private sessionFound = false;
}

export const sessionManager = new SessionManager();
