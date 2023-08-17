"use client";
import { useState } from "react";
import UserProfile from "@/components/user-profile";
import ProfileEditor from "@/components/profile-editor";
import Modal from "@/components/modal";
import Button from "@/components/button";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col mx-auto align-middle justify-center w-full">
      <UserProfile />
      <Button
        label="Edit Profile"
        onClick={() => setOpen(true)}
        className="my-4"
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Edit Profile">
        <ProfileEditor />
      </Modal>
    </div>
  );
}
