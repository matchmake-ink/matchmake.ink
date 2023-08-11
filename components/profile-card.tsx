"use client";
import Image from "next/image";

export interface ProfileCardProps {
  avatarUrl: string;
  ign: string;
  discordTag?: string;
  teamName?: string;
  teamAvatar?: string;
}
export default function ProfileCard({
  avatarUrl,
  ign,
  discordTag = "",
  teamName = "",
  teamAvatar = "",
}: ProfileCardProps) {
  return (
    <div>
      <Image src={avatarUrl} alt="avatar" width="64" height="64" />
      <h1>{ign}</h1>
    </div>
  );
}
