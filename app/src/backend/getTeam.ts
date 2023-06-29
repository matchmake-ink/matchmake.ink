export interface Team {
  tag: string;
  discord_server_invite: string | null;
  members: string[];
  invitees?: string[] | null;
  rating: number;
  rd: number;
  volitility: number;
}

// gets the current user's team
export async function getMyTeam(): Promise<Team> {
  return Promise.resolve({
    tag: "Awesome Team",
    members: ["abcdefg", "1234567"],
    rating: 1500,
    rd: 75,
    volitility: 10,
    discord_server_invite: null,
    invitees: null,
  });
}

// export async function getTeamFromTag(tag: string): Promise<Team>
// export async function getTeamFromUserId(userId: string): Promise<Team>
