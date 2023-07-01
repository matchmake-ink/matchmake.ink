import { backendClient } from "./client";
import { sessionManager } from "./session-manager";
import { Session } from "@supabase/supabase-js";
export interface TeamCreation {
  name: string;
  discordServerInvite: string;
}

export async function createTeam(team: TeamCreation): Promise<void> {
  const session: Session | null = sessionManager.getSession();
  if (session == null) {
    return Promise.reject("Session is null");
  }
  const id = crypto.randomUUID();

  // oops! there's no error handling here. I spent about 5 minutes thinking about how to do that without ending up in callback hell, and couldn't come up with anything.
  await backendClient.from("team_profiles").insert({
    id: id,
    name: team.name,
    discord_server: team.discordServerInvite,
    // createdAt?
  });

  await backendClient.from("team_ratings").insert({
    team_id: id,
  });

  await backendClient.from("team_registry").upsert({
    user_id: session.user.id,
  });

  return Promise.resolve();
}
