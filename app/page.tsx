"use client";
import { useTeam } from "@/lib/client/team";
import ProfileCard from "@/components/profile-card";
import Input from "@/components/input";
import CreateTeam from "@/components/create-team";

export default function Home() {
  const { team, teamLoading, teamError } = useTeam();

  return (
    <main>
      <ProfileCard
        avatarUrl="/images/user_placeholder.png"
        ign="1234567890"
        discordTag="@firesquid6"
        teamName="Bread Gang"
        teamAvatar="/images/team_placeholder.png"
      />
      <Input
        label="Test"
        type="text"
        value="Test"
        onChange={(value) => console.log(value)}
      />
      <CreateTeam />
      <div>
        <h1>Team</h1>
        {teamLoading && <p>Loading...</p>}
        {teamError && <p>Error: {teamError.message}</p>}
        {team && (
          <div>
            <p>Team Name: {team.name}</p>
            <p>Team Members:</p>
            {team.members}
          </div>
        )}
      </div>
    </main>
  );
}
