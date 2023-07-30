"use client";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
const callableFunction = httpsCallable(functions, "callableFunction");

export default function Dashboard() {
  return (
    <button
      onClick={async () => {
        const result = await callableFunction();
        console.log(result);
      }}
    >
      Create a Team
    </button>
  );
}
