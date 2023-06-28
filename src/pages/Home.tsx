import TeamJoin from "./TeamJoin";
import TeamDashboard from "./TeamDashboard";
import { useState, useEffect } from "react";
import { getMyTeam } from "../backend/getTeam";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [teamExists, setTeamExists] = useState<boolean>(false);

  useEffect(() => {
    getMyTeam()
      .then(() => {
        setTeamExists(true);
      })
      .catch(() => {
        setTeamExists(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <h4 className="text-center align-middle text-white text-4xl">
          Loading...
        </h4>
      ) : teamExists ? (
        <TeamDashboard />
      ) : (
        <TeamJoin />
      )}
    </>
  );
}
