"use client";
import { useUser } from "@/lib/client/auth";
import ProfileEditor from "@/components/profile-editor";
import ProfileView from "@/components/profile-view";

export default function Home() {
  const { user, userLoading, userError } = useUser();

  return (
    <div>
      <p>
        Hello world!
        {userLoading || userError || user === null || user === undefined
          ? "Someone!"
          : user.email}{" "}
      </p>
      <ProfileEditor />
      <ProfileView />
    </div>
  );
}
