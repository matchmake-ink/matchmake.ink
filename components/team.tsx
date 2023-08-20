import Button from "./button";
import Input from "./input";
import { useCallback, useState } from "react";
import { createTeam, updateTeam } from "@/lib/client/team";
import Modal from "./modal";

export function CreateTeam() {
  const [open, setOpen] = useState(false);
  const submit = useCallback(async (teamName: string, teamEmail: string) => {
    if (teamName === "") {
      return;
    }

    await createTeam(teamName, teamEmail);
    setOpen(false);
  }, []);

  return (
    <>
      <Button
        label="Create Team"
        color="primary"
        onClick={() => setOpen(true)}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Create a Team">
        <TeamForm onSubmit={submit} />
      </Modal>
    </>
  );
}

export function UpdateTeam() {
  const [open, setOpen] = useState(false);
  const submit = useCallback(async (teamName: string, teamEmail: string) => {
    if (teamName === "") {
      return;
    }

    updateTeam(teamName, teamEmail);
  }, []);

  return (
    <>
      <Button
        label="Update Team"
        color="primary"
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Update Your Team"
      >
        <TeamForm onSubmit={submit} />
      </Modal>
    </>
  );
}

interface TeamFormProps {
  onSubmit: (teamName: string, teamEmail: string) => void;
}

function TeamForm({ onSubmit }: TeamFormProps) {
  const [teamName, setTeamName] = useState("");
  const [teamEmail, setTeamEmail] = useState("");
  return (
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
      <Button
        label="Submit"
        disabled={teamName === ""}
        onClick={() => onSubmit(teamName, teamEmail)}
      />
    </form>
  );
}
