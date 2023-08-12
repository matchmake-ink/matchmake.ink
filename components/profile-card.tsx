"use client";
import Image from "next/image";
import { BsDiscord } from "react-icons/bs";

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
    <div className="max-w-sm bg-secondary-600 rounded-xl">
      <div className="flex flex-row align-midde justify-center bg-secondary-400 rounded-xl py-4">
        <Image
          unoptimized
          src={avatarUrl}
          alt="avatar"
          width="96"
          height="96"
          className="bg-secondary-500 border-text border-4 rounded-full mx-4"
        />
        <h1 className="my-auto mx-4">{ign}</h1>
        <span className="w-full"></span>
      </div>
      <ul className="m-4">
        <li>
          <BsDiscord size={24} /> <span className="w-4"></span>
          {discordTag}
        </li>
      </ul>
      <div className="flex flex-col mt-4 bg-secondary-400 py-4 rounded-xl">
        <Image
          unoptimized
          src={teamAvatar}
          alt="team avatar"
          width="96"
          height="96"
          className="bg-secondary-500 border-text border-4 rounded-full mx-auto"
        />
        <h3 className="mx-auto">{teamName}</h3>
      </div>
    </div>
  );
}
