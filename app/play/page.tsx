"use client";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "@/lib/client/firebase";
import { createInvite } from "@/lib/client/team";
import CreateInvite from "@/components/create-invite";
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

          console.log(res);
        }}
      >
        Create a Team
      </button>
      <CreateInvite />
    </>
  );
}
