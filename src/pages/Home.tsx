import TeamJoin from "./TeamJoin";
import TeamDashboard from "./TeamDashboard";
import { useCurrentTeam } from "../backend/team";

export default function Home() {
  const [team, loading] = useCurrentTeam();
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : team.tag === "Free Agent" ? (
        <TeamJoin />
      ) : (
        <TeamDashboard />
      )}
    </>
  );
}
