import { sessionManager } from "./session-manager";
import { backendClient } from "./client";
export interface Team {
  id: string;
  created_at: string;
  name: string;
  discord_server_invite: string;
  members: string[];
  rating: number;
  rd: number;
  volitility: number;
}

// gets the current user's team
export async function getMyTeam(): Promise<Team> {
  const session = sessionManager.getSession();

  // wow! I should really create a standardized system for getting rows
  if (session === null) {
    return Promise.reject("Session is null");
  }

  const team: Team = {
    id: "",
    created_at: "",
    name: "",
    discord_server_invite: "",
    members: [],
    rating: 0,
    rd: 0,
    volitility: 0,
  };

  try {
    const { data: registryData } = await backendClient
      .from("team_registry")
      .select("team_id")
      .eq("user_id", session.user.id)
      .throwOnError();

    if (
      registryData === null ||
      registryData.length <= 0 ||
      registryData[0].team_id === null
    ) {
      throw "team registry response was null";
    }
    team.id = registryData[0].team_id;

    const { data: profileData } = await backendClient
      .from("team_profiles")
      .select()
      .eq("id", team.id)
      .throwOnError();

    if (profileData === null || registryData.length <= 0) {
      throw "profile response was null";
    }

    team.discord_server_invite = profileData[0].discordServer;
    team.created_at = profileData[0].created_at ?? "";
    team.name = profileData[0].name;

    const { data: ratingData } = await backendClient
      .from("team_ratings")
      .select()
      .eq("id", team.id)
      .throwOnError();

    if (ratingData === null || ratingData.length <= 0) {
      throw "rating response was null";
    }

    team.rating = ratingData[0].rating ?? -1;
    team.rd = ratingData[0].rd ?? -1;
    team.volitility = ratingData[0].volitility ?? -1;
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(team);
}

// export async function getTeamFromUserId(userId: string): Promise<Team>
