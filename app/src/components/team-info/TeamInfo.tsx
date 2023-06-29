import { getMyTeam, Team } from "@/api/get-team";
import { FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";
import { getProfileFromId, Profile } from "@/api/get-profile";
import { useAsync } from "@/lib/use-async";

export function TeamInfo() {
  const [team, setTeam] = useState<Team>({
    id: "1",
    created_at: "",
    name: "Loading...",
    discord_server_invite: "",
    rating: 0,
    rd: 0,
    volitility: 0,
    members: [],
  });

  const [members, setMembers] = useState<Profile[]>([]);

  useAsync(async () => {
    const team = await getMyTeam();
    setTeam(team);

    team.members.forEach(async (memberId) => {
      const member = await getProfileFromId(memberId);
      setMembers((members) => [...members, member]);
    });
  });

  return (
    <div className="flex flex-col text-left">
      <h3 className="text-2xl">{team.name}</h3>
      <p className="text-sm text-gray-400">
        🏆{team.rating}±{team.rd}{" "}
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Glicko_rating_system"
          className="inline-block text-gray-400 hover:text-gray-500 transition-all"
        >
          <FaQuestionCircle />
        </a>
      </p>
      <div>
        <h4 className="text-xl">Members</h4>
        <ul className="list-disc list-inside">
          {members.map((member, i) => (
            <li key={i}>{member.ign}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
