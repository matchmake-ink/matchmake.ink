import { ServerFunction } from "@/lib/server/request";
import { SignUpOptions, signUpWithPassword } from "@/lib/server/auth";
import { AuthResponse } from "@/lib/interfaces";
import { getErrorResponse } from "@/lib/server/errors";

export async function POST(request: Request) {
  let res: AuthResponse;

  try {
    const func = new ServerFunction();
    await func.init(request);

    const email = func.getProperty<string>("email");
    const password = func.getProperty<string>("password");
    const options = func.getProperty<SignUpOptions>(
      "options",
      (value) => (value as SignUpOptions) !== undefined
    );

    res = await signUpWithPassword(email, password, options);
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
