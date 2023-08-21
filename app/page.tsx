"use client";
import { useTeam } from "@/lib/client/team";
import { useUser } from "@/lib/client/auth";
import { getGravatarUrl } from "@/lib/client/gravatar";
import ProfileCard from "@/components/profile-card";
import Input from "@/components/input";
import { CreateTeam, UpdateTeam } from "@/components/team";
import Select from "@/components/select";

export default function Home() {
  const { team, teamLoading, teamError } = useTeam();
  const { user } = useUser();

  return (
    <main>
      <ProfileCard
        avatarUrl={
          user === null || user.email === null
            ? "/images/user_placeholder.png"
            : getGravatarUrl(user.email)
        }
        ign="1234567890"
        discordTag="@firesquid6"
        teamName="Bread Gang"
        teamAvatar="/images/team_placeholder.png"
      />
      <CreateTeam />
      <UpdateTeam />
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
