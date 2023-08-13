import { auth } from "@/lib/client/firebase";

// note - this file does not have unit tests because it simply wraps api calls

export async function createTeam(teamName: string): Promise<void> {
  const res = await fetch("/api/team/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: (await auth.currentUser?.getIdToken(true)) || "",
      name: teamName,
    }),
  });
  console.log(res);

  const body = await res
    .clone()
    .json()
    .then((body) => body)
    .catch((error) => console.log(error));

  console.log(body);

  if (res.status > 210) {
    return Promise.reject();
  }
  return Promise.resolve();
}
