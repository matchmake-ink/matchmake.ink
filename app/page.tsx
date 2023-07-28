"use client";
import { useUser } from "@/lib/auth";

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
    </div>
  );
}
