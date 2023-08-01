"use client";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "@/lib/firebase";
const callableFunction = httpsCallable(functions, "callableFunction");

export default function Dashboard() {
  return (
    <button
      onClick={async () => {
        fetch("/api/create-team", {
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
  );
}
