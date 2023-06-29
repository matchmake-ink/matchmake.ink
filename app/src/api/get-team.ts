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
  return Promise.resolve({
    id: "1234567890",
    created_at: "2021-08-01T00:00:00.000Z",
    name: "Awesome Team",
    members: ["abcdefg", "1234567"],
    rating: 1500,
    rd: 75,
    volitility: 10,
    discord_server_invite: "",
  });
}

// export async function getTeamFromTag(tag: string): Promise<Team>
// export async function getTeamFromUserId(userId: string): Promise<Team>
