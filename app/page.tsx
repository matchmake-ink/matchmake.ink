"use client";
import { useUser } from "@/lib/client/auth";
import { useState } from "react";
import ProfileEditor from "@/components/profile-editor";
import ProfileCard from "@/components/profile-card";
import Input from "@/components/input";
import Button from "@/components/button";
import Modal from "@/components/modal";

export default function Home() {
  const { user, userLoading, userError } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProfileCard
        avatarUrl="/images/user_placeholder.png"
        ign="1234567890"
        discordTag="@firesquid6"
        teamName="Bread Gang"
        teamAvatar="/images/team_placeholder.png"
      />
      <Input
        label="Test"
        type="text"
        value="Test"
        onChange={(value) => console.log(value)}
      />
      <Button label="Test" color="accent" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Update Your Profile"
      >
        <ProfileEditor onFinishedSubmitting={() => setOpen(false)} />
      </Modal>
    </>
  );
}
