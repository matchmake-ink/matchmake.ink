import { auth } from "@/lib/client/firebase";

export async function createTeam(teamName: string): Promise<void> {
  const res = await fetch("/api/create-team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: (await auth.currentUser?.getIdToken(true)) || "",
      name: teamName,
    }),
  });

  const body = await res.json();

  if (body.result === "error") {
    return Promise.reject();
  }
  return Promise.resolve();
}
