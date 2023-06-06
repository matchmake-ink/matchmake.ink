import { useCurrentTeam } from "../backend/team";
import { useCurrentProfile } from "../backend/profile";
import { RecentMatches } from "../components/recent-matches/RecentMatches";

export default function TeamDashboard() {
  const team = useCurrentTeam();
  const profile = useCurrentProfile();

  // needs:
  // - Team Info box
  //     - Team tag
  //     - Team rating
  //     - Team members
  // - Recent matches component
  //     - Recent matches
  //     - Match history
  // - Submit matches component
  //     - Submit match
  // - Team settings component
  //    - Invite users
  return (
    <div className="page">
      <h1 className="text-center w-full text-2xl">My Team</h1>
      <div className="grid grid-cols-2 gap-4"></div>
    </div>
  );
}
