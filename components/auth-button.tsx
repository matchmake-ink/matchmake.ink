"use client";
import { useUser } from "@/lib/client/auth";
import { useRouter } from "next/router";
import { signOut } from "@/lib/client/auth";

export default function AuthButton() {
  const { user } = useUser();
  const router = useRouter();

  const buttonClicked = () => {
    signOut();
    router.push("/signin");
  };

  return (
    <div className="flex-none">
      <button onClick={buttonClicked}>{user ? "Sign Out" : "Sign In"}</button>
    </div>
  );
}
