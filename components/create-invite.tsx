import Button from "./button";
import Modal from "./modal";
import { useState, useCallback } from "react";
import { createInvite } from "@/lib/client/team";

export default function CreateInvite() {
  const [invite, setInvite] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const onClick = useCallback(async () => {
    const id = await createInvite();
    setInvite(id);
    setOpen(true);
  }, []);

  return (
    <>
      <Button onClick={onClick} label="Create Invite" />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Your Invite Code"
      >
        <h3 className="text-4xl p-6 my-2 mx-auto text-center w-72 bg-secondary-600 border-text border rounded-xl">
          {invite}
        </h3>
        <p>This code can be used ONCE by another user to join your team.</p>
      </Modal>
    </>
  );
}
