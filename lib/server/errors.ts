import { NextResponse } from "next/server";

// list of errors to return if something goes wrong on the backend
export const noId = NextResponse.json({
  status: 400,
  result: "error",
  message:
    "uid wasn't found. Session may be expired, or the user isn't logged in.",
});

export const badArgs = NextResponse.json({
  status: 400,
  result: "error",
  message: "bad arguments",
});

export const writeError = NextResponse.json({
  status: 500,
  result: "error",
  message: "write error",
});

export const mustBeInTeam = NextResponse.json({
  status: 401,
  result: "error",
  message: "must be in a team",
});
