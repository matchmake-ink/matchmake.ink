import Button from "./button";
import Input from "./input";
import { useCallback, useState } from "react";
import { createTeam } from "@/lib/client/team";
import Modal from "./modal";

interface CreateTeamProps {
  onFinishedSubmitting?: () => void;
}

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [open, setOpen] = useState(false);
  const submit = useCallback(async () => {
    if (teamName === "") {
      return;
    }

    createTeam(teamName);
  }, [teamName]);

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
          <Button label="Submit" disabled={teamName === ""} onClick={submit} />
        </form>
      </Modal>
    </>
  );
}
