import { ServerFunction } from "@/lib/server/request";
import {
  AuthSuccess,
  SignUpOptions,
  signUpWithPassword,
} from "@/lib/server/auth";
import { getErrorResponse } from "@/lib/server/errors";

export async function POST(request: Request) {
  let res: AuthSuccess;

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
