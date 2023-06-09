import TeamJoin from "./TeamJoin";
import TeamDashboard from "./TeamDashboard";
import { useCurrentTeam } from "../backend/team";

export default function Home() {
  const [team, loading] = useCurrentTeam();
  return (
    <>
      {loading ? (
        <h4 className="text-center align-middle text-white text-4xl">
          Loading...
        </h4>
      ) : team.tag === "Free Agent" ? (
        <TeamJoin />
      ) : (
        <TeamDashboard />
      )}
    </>
  );
}
