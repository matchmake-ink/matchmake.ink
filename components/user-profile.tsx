"use client";
import { useProfile } from "@/lib/client/profile";
import { useUser } from "@/lib/client/auth";
import ProfileCard from "./profile-card";
import Button from "./button";

// retuns an automatically updating ProfileCard for the currently logged in User's profile
export default function UserProfile() {
  const { user } = useUser();
  const { profile, profileLoading, profileError } = useProfile();

  if (profileLoading) return <p>Loading...</p>;

  return (
    <>
      {profile && !profileError ? (
        <>
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
          <Button
            label="Copy Sharable Link"
            color="primary"
            className="my-4 max-w-lg mx-auto"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://matchmake.ink/profile/${user?.uid}`
              );
            }}
          />
        </>
      ) : (
        <p>Something went wrong! Are you signed in?</p>
      )}
    </>
  );
}
