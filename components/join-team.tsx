import { joinTeam } from "@/lib/client/team";
import { useState } from "react";
import Input from "./input";
import Button from "./button";
import Modal from "./modal";

export default function JoinTeam() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  <>
    <button onClick={() => setOpen(true)}>Join a Team</button>
    <Modal open={open} onClose={() => setOpen(false)} title="Join a Team">
      <form>
        <Input
          label="Team Code"
          type="text"
          value={code}
          onChange={(value) => setCode(value)}
        />
        <Button
          label="Join"
          disabled={!code}
          onClick={async () => {
            await joinTeam(code);
          }}
        />
      </form>
    </Modal>
  </>;
}
