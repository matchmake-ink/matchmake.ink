"use client";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "@/lib/client/firebase";
import CreateInvite from "@/components/create-invite";
import JoinTeam from "@/components/join-team";
const callableFunction = httpsCallable(functions, "callableFunction");

export default function Dashboard() {
  return (
    <>
      <button
        onClick={async () => {
          const res = await fetch("/api/team/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: auth.currentUser?.uid,
              token: (await auth.currentUser?.getIdToken(true)) || "",
            }),
          });
        }}
      >
        Create a Team
      </button>
      <JoinTeam />
      <CreateInvite />
    </>
  );
}
