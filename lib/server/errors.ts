import { NextResponse } from "next/server";
export const noId = NextResponse.json({
  result: "error",
  message:
    "uid wasn't found. Session may be expired, or the user isn't logged in.",
});

export const badArgs = NextResponse.json({
  result: "error",
  message: "bad arguments",
});

export const writeError = NextResponse.json({
  result: "error",
  message: "write error",
});

export const mustBeInTeam = NextResponse.json({
  result: "error",
  message: "must be in a team",
});
