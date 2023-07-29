"use client";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
const createTeam = httpsCallable(functions, "createTeam");

export default function Dashboard() {
  return (
    <button
      onClick={async () => {
        const result = await createTeam({ name: "test" });
        console.log(result);
      }}
    >
      Create a Team
    </button>
  );
}
