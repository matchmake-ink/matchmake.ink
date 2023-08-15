import Button from "./button";
import Modal from "./modal";
import { useState, useCallback } from "react";

export default function CreateInvite() {
  const [invite, setInvite] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const onClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <>
      <Button onClick={onClick} label="Create Invite" />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Your Invite Code"
      >
        <h3>{invite}</h3>
        <p>This code can be used once by another user to join your team.</p>
      </Modal>
    </>
  );
}
