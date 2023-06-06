import { useState, useEffect } from "react";
import { databaseClient } from "./client";
import { useSession } from "./session";

export interface Team {
  tag: string;
  discord_server_id?: string | null;
  discord_server_invite?: string | null;
  members: string[];
  invitees?: string[] | null;
  rating: number;
  rd: number;
  volitility: number;
}

export const noTeam: Team = {
  tag: "Free Agent",
  discord_server_id: "",
  discord_server_invite: "",
  members: [],
  rating: 0,
  rd: 0,
  volitility: 0,
};

export function useCurrentTeam(): Team {
  const [team, setTeam] = useState<Team>(noTeam);
  const session = useSession();

  useEffect(() => {
    databaseClient
      .from("teams")
      .select("*")
      .contains("members", [session?.user.id])
      .then(({ data, error }) => {
        if (error) {
          console.log(error.message);
        } else {
          setTeam(data[0] as Team);
        }
      });
  }, [session]);

  return team;
}
