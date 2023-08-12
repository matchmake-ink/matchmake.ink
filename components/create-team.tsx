import Button from "./button";
import Input from "./input";
import { useCallback, useState } from "react";
import { createTeam } from "@/lib/client/team";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const submit = useCallback(async () => {
    await createTeam(teamName);
  }, [teamName]);

  return (
    <form>
      <h1>Create a Team</h1>
      <Input
        label="Team Name"
        type="text"
        value={teamName}
        onChange={(value: string) => setTeamName(value)}
      />
      <Button label="Submit" color="accent" onClick={submit} />
    </form>
  );
}
