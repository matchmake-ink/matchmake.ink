import { NextResponse } from "next/server";

// list of errors to return if something goes wrong on the backend
export const noId = new Response(
  JSON.stringify({
    status: "User is not logged in or the token was not provide",
  }),
  {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  }
);

export const badArgs = new Response(
  JSON.stringify({
    message: "improper arguments were provided",
  }),
  {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  }
);

export const writeError = new Response(
  JSON.stringify({
    message: "error writing to database",
  }),
  {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  }
);

export const mustBeInTeam = new Response(
  JSON.stringify({
    message: "user must be in a team",
  }),
  {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  }
);

export const mustBeCaptain = new Response(
  JSON.stringify({
    message: "user must be captain",
  }),
  {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  }
);

export const mustBeFreeAgent = new Response(
  JSON.stringify({
    message: "user must not be in a team",
  }),
  {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  }
);
