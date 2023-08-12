"use client";
import { useProfile } from "@/lib/client/profile";
import ProfileCard from "./profile-card";

// retuns an automatically updating ProfileCard for the currently logged in User's profile
export default function UserProfile() {
  const { profile, profileLoading, profileError } = useProfile();
  console.log(profile);

  if (profileLoading) return <p>Loading...</p>;

  return (
    <>
      {profile && !profileError ? (
        <ProfileCard
          // placeholder for avatar
          avatarUrl="https://via.placeholder.com/150"
          ign={profile.ign}
          discordTag={profile.discordTag}
          teamName="Bread Gang"
          teamAvatar="https://via.placeholder.com/150"
        />
      ) : (
        <p>Something went wrong! Are you signed in?</p>
      )}
    </>
  );
}
