import { ServerFunction } from "@/lib/server/request";

export async function POST(request: Request) {
  const func = new ServerFunction();
  const { auth } = await func.init(request);

  const email = func.getProperty<string>("email");
  const password = func.getProperty<string>("password");
}
