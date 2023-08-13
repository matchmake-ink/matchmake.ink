import Button from "./button";
import Input from "./input";
import { useCallback, useState } from "react";
import { createTeam } from "@/lib/client/team";

interface CreateTeamProps {
  onFinishedSubmitting?: () => void;
}

export default function CreateTeam({
  onFinishedSubmitting = () => {},
}: CreateTeamProps) {
  const [teamName, setTeamName] = useState("");
  const submit = useCallback(async () => {
    if (teamName === "") {
      return;
    }

    onFinishedSubmitting();
    createTeam(teamName);
  }, [teamName, onFinishedSubmitting]);

  return (
    <form>
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
