"use client";
import { useUser } from "@/lib/client/auth";
import ProfileEditor from "@/components/profile-editor";
import ProfileView from "@/components/profile-view";
import Input from "@/components/input";

export default function Home() {
  const { user, userLoading, userError } = useUser();

  return (
    <>
      <p>
        Hello world!
        {userLoading || userError || user === null || user === undefined
          ? "Someone!"
          : user.email}{" "}
      </p>
      <ProfileEditor />
      <ProfileView />
      <Input
        label="Test"
        type="text"
        value="Test"
        onChange={(value) => console.log(value)}
      />
    </>
  );
}
