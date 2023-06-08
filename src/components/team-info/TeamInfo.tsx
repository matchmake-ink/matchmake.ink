import { Team } from "../../backend/team";
import { FaQuestionCircle } from "react-icons/fa";

export interface TeamInfoProps {
  team: Team;
  editable?: boolean;
  submitCallback?: () => void;
}

export function TeamInfo({ team }: TeamInfoProps) {
  return (
    <div className="flex flex-col text-left">
      <h3 className="text-2xl">{team.tag}</h3>
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
          {team.memberNames.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
