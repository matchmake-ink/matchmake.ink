import { useState, useEffect } from "react";
import { backendClient } from "./client";
import { useSession } from "./session";

export interface Team {
  tag: string;
  discord_server_invite?: string | null;
  members: string[];
  memberNames: string[];
  invitees?: string[] | null;
  rating: number;
  rd: number;
  volitility: number;
}

export const noTeam: Team = {
  tag: "Free Agent",
  discord_server_invite: "",
  members: [],
  memberNames: [],
  rating: 0,
  rd: 0,
  volitility: 0,
};

export function useCurrentTeam(): [Team, boolean] {
  const [team, setTeam] = useState<Team>(noTeam);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();

  useEffect(() => {
    setLoading(true);
    backendClient
      .from("teams")
      .select("*")
      .contains("members", [session?.user.id])
      .then(({ data }) => {
        if (data === null || data.length === 0) {
          setTeam(noTeam);
        } else {
          setTeam(data[0] as Team);

          // this is a hack to get the member names to show up
          // it needs to be implemented properly
          setTeam((team) => {
            if (team) {
              return {
                ...team,
                memberNames: team.members.map((member) => member),
              };
            } else {
              return team;
            }
          });
        }
        setLoading(false);
      });
  }, [session]);

  return [team, loading];
}
