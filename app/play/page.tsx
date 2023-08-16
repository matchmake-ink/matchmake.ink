"use client";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "@/lib/client/firebase";
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
      <button
        onClick={async () => {
          const res = await fetch("/api/invite/consume", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: (await auth.currentUser?.getIdToken(true)) || "",
              inviteId: "2HKTCAGJ",
            }),
          });

          console.log(res);
          const body = await res.json();
          console.log(body);
        }}
      >
        Accept the Invite
      </button>

      <CreateInvite />
    </>
  );
}
