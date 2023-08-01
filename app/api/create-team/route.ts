import { NextResponse } from "next/server";
import { getUid } from "@/lib/server/getUid";

export async function POST(request: Request) {
  const uid = await getUid(request)
    .then((result) => result)
    .catch(() => "");

  if (uid === "") {
    return NextResponse.json({
      result: "error",
      message:
        "uid wasn't found. Session may be expired, or the user isn't logged in.",
    });
  }
}
