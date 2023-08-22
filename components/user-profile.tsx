"use client";
import { useProfile } from "@/lib/client/profile";
import ProfileCard from "./profile-card";

// retuns an automatically updating ProfileCard for the currently logged in User's profile
export default function UserProfile() {
  const { profile, profileLoading, profileError } = useProfile();

  if (profileLoading) return <p>Loading...</p>;

  return (
    <>
      {profile && !profileError ? (
        <ProfileCard
          // placeholder for avatar
          avatarUrl={profile.avatar || "/images/user_placeholder.png"}
          ign={profile.ign}
          discordTag={profile.discordTag}
          bio={profile.bio}
          region={profile.region}
          sendou={profile.sendou}
          rank={profile.rank}
          teamName="Bread Gang"
          teamAvatar="/images/team_placeholder.png"
        />
      ) : (
        <p>Something went wrong! Are you signed in?</p>
      )}
    </>
  );
}
