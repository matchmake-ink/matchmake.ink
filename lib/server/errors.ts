// list of errors to return if something goes wrong on the backend

export enum ERRORS {
  NO_ID = "noId",
  BAD_ARGS = "badArgs",
  WRITE_ERROR = "writeError",
  MUST_BE_IN_TEAM = "mustBeInTeam",
  MUST_BE_CAPTAIN = "mustBeCaptain",
  MUST_BE_FREE_AGENT = "mustBeFreeAgent",
  SERVER_ERROR = "serverError",
  INVITE_EXPIRED = "inviteExpired",
}

export async function getErrorResponse(error: unknown) {
  return errors.get(error as string) ?? errors.get("serverError");
}

const errors = new Map<string, Response>();
errors.set(
  ERRORS.NO_ID,
  new Response(
    JSON.stringify({
      message: "User is not logged in or the token was not provide",
    }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);

errors.set(
  ERRORS.BAD_ARGS,
  new Response(
    JSON.stringify({
      message: "improper arguments were provided",
    }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);

errors.set(
  ERRORS.WRITE_ERROR,
  new Response(
    JSON.stringify({
      message: "error writing to database",
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);

errors.set(
  ERRORS.MUST_BE_IN_TEAM,
  new Response(
    JSON.stringify({
      message: "user must be in a team",
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);

errors.set(
  ERRORS.MUST_BE_CAPTAIN,
  new Response(
    JSON.stringify({
      message: "user must be captain",
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);

errors.set(
  ERRORS.MUST_BE_FREE_AGENT,
  new Response(
    JSON.stringify({
      message: "user must not be in a team",
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);

errors.set(
  ERRORS.SERVER_ERROR,
  new Response(
    JSON.stringify({
      message: "something went wrong on the server",
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);

errors.set(
  ERRORS.INVITE_EXPIRED,
  new Response(
    JSON.stringify({
      message: "the invite you tried to use was expired",
    }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);
