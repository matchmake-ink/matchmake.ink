"use client";
import Image from "next/image";
import { BsDiscord, BsGlobe, BsTrophyFill } from "react-icons/bs";
import { GiSquidHead } from "react-icons/gi";

export interface ProfileCardProps {
  avatarUrl: string;
  ign: string;
  discordTag?: string;
  teamName?: string;
  teamAvatar?: string;
  bio?: string;
  sendou?: string;
  rank?: string;
  region?: string;
}
export default function ProfileCard({
  avatarUrl,
  ign,
  discordTag = "",
  bio = "",
  teamName = "",
  teamAvatar = "",
  sendou = "",
  rank = "",
  region = "",
}: ProfileCardProps) {
  return (
    <div className="max-w-sm mx-auto my-4 bg-secondary-600 rounded-xl">
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
      <p className="m-4">{bio}</p>
      <ul className="m-4">
        {region && (
          <li>
            <BsGlobe size={24} /> <span className="w-4"></span>
            {region}
          </li>
        )}
        {discordTag && (
          <li>
            <BsDiscord size={24} /> <span className="w-4"></span>
            {discordTag}
          </li>
        )}
        {sendou && (
          <li>
            <GiSquidHead size={24} /> <span className="w-4"></span>
            {sendou}
          </li>
        )}
        {rank && (
          <li>
            <BsTrophyFill size={24} /> <span className="w-4"></span>
            {rank}
          </li>
        )}
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
