import { NextResponse } from "next/server";
export const noId = NextResponse.json({
  result: "error",
  message:
    "uid wasn't found. Session may be expired, or the user isn't logged in.",
});
