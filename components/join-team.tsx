import { joinTeam } from "@/lib/client/team";
import { useState } from "react";
import Input from "./input";
import Button from "./button";
import Modal from "./modal";

export default function JoinTeam() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  return (
    <>
      <Button label="Join a Team" onClick={() => setOpen(true)} />
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
              console.log("i was called");
              await joinTeam(code);
            }}
          />
        </form>
      </Modal>
    </>
  );
}
