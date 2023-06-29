import { InvitedTeams } from "@/components/invited-teams/InvitedTeams";
import { useState } from "react";
import { CreateTeam } from "@/components/create-team/CreateTeam";

export default function TeamJoin() {
  const [creatingTeam, setCreatingTeam] = useState(false);

  const createTeamButton = (
    <div className="m-2 flex flex-col justify-center align-middle">
      <button
        onClick={() => setCreatingTeam(true)}
        className="bg-accent-500 p-4 rounded-lg m-4 w-48 h-24 text-xl mx-auto text-center align-middle hover:bg-accent-400 transition-all"
      >
        Create Team
      </button>
    </div>
  );

  // note - team logo is a placeholder for now because it hasn't been implemented
  return (
    <main className="page flex-col flex justify-center align-center">
      {creatingTeam ? <CreateTeam /> : createTeamButton}
      <InvitedTeams />
    </main>
  );
}
