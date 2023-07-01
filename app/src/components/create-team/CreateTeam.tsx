import { useState } from "react";
import { TextInputField } from "../text-input-field/TextInputField";
import { createTeam } from "@/api/create-team";
import { redirect } from "react-router-dom";

export function CreateTeam() {
  const [teamTag, setTeamTag] = useState("");
  const [discordServerInvite, setDiscordServerInvite] = useState("");

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
        disabled={teamTag === ""}
        className="bg--500 hover:bg-primary-400 text-white p-2 m-2 rounded-lg disabled:bg-primary-600"
        onClick={(e) => {
          e.preventDefault();
          createTeam({
            name: teamTag,
            discordServerInvite: discordServerInvite,
          }).then(() => {
            redirect("/dashboard");
          });
        }}
      ></button>
    </form>
  );
}
