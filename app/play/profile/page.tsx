"use client";
import { useState } from "react";
import UserProfile from "@/components/user-profile";
import ProfileEditor from "@/components/profile-editor";

export default function ProfilePage() {
  return (
    <div className="flex flex-col mx-auto align-middle justify-center w-full">
      <UserProfile />
      <ProfileEditor />
    </div>
  );
}
