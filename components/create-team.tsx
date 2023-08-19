import Button from "./button";
import Input from "./input";
import { useCallback, useState } from "react";
import { createTeam } from "@/lib/client/team";
import Modal from "./modal";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [teamEmail, setTeamEmail] = useState("");
  const [open, setOpen] = useState(false);
  const submit = useCallback(async () => {
    if (teamName === "") {
      return;
    }

    createTeam(teamName, teamEmail);
  }, [teamName, teamEmail]);

  return (
    <>
      <Button
        label="Create Team"
        color="primary"
        onClick={() => setOpen(true)}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Create a Team">
        <form>
          <Input
            label="Team Name"
            type="text"
            value={teamName}
            onChange={(value: string) => setTeamName(value)}
          />
          <Input
            label="Team Email"
            type="text"
            value={teamEmail}
            onChange={(value: string) => setTeamEmail(value)}
            placeholder="this email will be used to get the team's icon and banner from gravatar"
          />
          <Button label="Submit" disabled={teamName === ""} onClick={submit} />
        </form>
      </Modal>
    </>
  );
}
