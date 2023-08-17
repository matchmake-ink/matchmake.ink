"use client";
import { useState, useEffect } from "react";
import { Profile, getProfile } from "@/lib/client/profile";
import ProfileCard from "@/components/profile-card";

export default function Profile({ params }: { params: { profile: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile(params.profile)
        .then((profile) => profile)
        .catch(() => null);

      console.log(profile);
      setProfile(profile);
      setLoading(false);
    };
    fetchProfile();
  }, [params.profile]);

  const profileUi =
    profile !== null ? (
      <ProfileCard
        avatarUrl="https://via.placeholder.com/150"
        ign={profile.ign}
        discordTag={profile.discordTag}
        teamName="Bread Gang"
        teamAvatar="https://via.placeholder.com/150"
      />
    ) : (
      <h1>Profile not found</h1>
    );

  return (
    <>
      <div className="flex flex-col mx-auto align-middle justify-center w-full">
        {loading ? <h1>Loading...</h1> : profileUi}
      </div>
    </>
  );
}
