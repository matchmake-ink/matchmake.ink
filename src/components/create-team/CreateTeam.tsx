import { useState } from "react";
import { backendClient } from "../../backend/client";
import { TextInputField } from "../text-input-field/TextInputField";

export interface CreateTeamProps {
  userId: string | null;
}

export function CreateTeam({ userId }: CreateTeamProps) {
  const [teamTag, setTeamTag] = useState("");
  const [discordServerInvite, setDiscordServerInvite] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [statusColor, setStatusColor] = useState<
    "text-turquois-500" | "text-red-500"
  >("text-red-500");

  return (
    <form className="bg-background-light flex flex-col w-fit border-red-100 rounded-lg p-8 my-4 mx-auto border">
      <h3 className="text-xl text-center m-2">Create Team</h3>
      <TextInputField label="Team Tag" onChange={setTeamTag} id="team-tag" />
      <TextInputField
        label="Discord Server Invite"
        onChange={setDiscordServerInvite}
        id="discord-server-invite"
      />
      <button
        type="submit"
        role="submit"
        disabled={teamTag === "" || userId === null}
        className="bg-turquois-500 hover:bg-turquois-400 text-white p-2 m-2 rounded-lg disabled:bg-turquois-600"
        onClick={(e) => {
          e.preventDefault();
          backendClient
            .from("teams")
            .insert([
              {
                tag: teamTag,
                discord_server_invite: discordServerInvite,
                members: [userId],
              },
            ])
            .then(({ error }) => {
              if (error) {
                setStatus(
                  "Failed to create team. Does another team with the same tag already exist? Check the console for a full error message."
                );
                setStatusColor("text-red-500");
                console.log(error.message);
              } else {
                setStatus("Team created!");
                setStatusColor("text-turquois-500");
              }
            });
        }}
      >
        {userId === null ? "Loading..." : "Create Team"}
      </button>
      {status ? (
        <p className={`${statusColor} text-center w-96`}>{status}</p>
      ) : null}
    </form>
  );
}
