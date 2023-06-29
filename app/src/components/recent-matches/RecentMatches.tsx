import { Match } from "../../backend/match";

export interface RecentMatchesProps {
  matches: Match[];
}

// this function is untested and dumb because the match features hasn't been implemented yet
export function RecentMatches({ matches }: RecentMatchesProps) {
  return (
    <div className="bg-background-light flex flex-col w-fit border-red-100 rounded-lg p-8 my-4 mx-auto border">
      <h3 className="text-xl text-center m-2">Recent Matches</h3>
      <div className="flex flex-col">
        {matches.map((match) => (
          <div className="flex flex-row">
            <p className="text-lg">{match.alpha}</p>
            <p className="text-xl"> {match.alpha_score} </p>
            <p className="text-lg"> vs </p>
            <p className="text-xl"> {match.bravo_score} </p>
            <p className="text-lg">{match.bravo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
