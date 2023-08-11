"use client";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "@/lib/client/firebase";
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
          const res = await fetch("/api/invite/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: auth.currentUser?.uid,
              expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
              token: (await auth.currentUser?.getIdToken(true)) || "",
            }),
          });

          console.log(res);
        }}
      >
        Invite someone to a team
      </button>
    </>
  );
}
