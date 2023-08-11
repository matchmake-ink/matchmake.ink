"use client";
import { useUser } from "@/lib/client/auth";
import Button from "./button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/client/auth";

export default function AuthButton() {
  const { user } = useUser();
  const router = useRouter();

  const buttonClicked = () => {
    signOut();
    router.push("/auth");
  };

  return (
    <div className="flex-none">
      <Button
        onClick={buttonClicked}
        label={user ? "Sign Out" : "Sign In"}
        color="primary"
      />
    </div>
  );
}
