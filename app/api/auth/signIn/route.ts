import { ServerFunction } from "@/lib/server/request";
import { signInWithPassword } from "@/lib/server/auth";
import { getErrorResponse } from "@/lib/server/errors";
import { AuthResponse } from "@/lib/interfaces";

export async function POST(request: Request) {
  let res: AuthResponse;

  try {
    const func = new ServerFunction();
    await func.init(request);

    const email = func.getProperty<string>("email");
    const password = func.getProperty<string>("password");

    res = await signInWithPassword(email, password);
  } catch (e) {
    return getErrorResponse(e);
  }

  return new Response(JSON.stringify(res), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
