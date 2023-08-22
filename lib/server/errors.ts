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
  MOCKING_BACKEND = "mockingBackend",
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
      statusText: "User is not logged in or the token was not provide",
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
      statusText: "Improper arguments were provided",
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
      statusText: "Error writing to database",
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
      statusText: "User must be in a team",
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
      statusText: "User must be captain",
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
      statusText: "User must not be in a team",
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
      statusText: "Something went wrong on the server",
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
      statusText: "The invite you tried to use was expired",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);

errors.set(
  ERRORS.MOCKING_BACKEND,
  new Response(
    JSON.stringify({
      result: "success",
      invite: "12345678",
    }),
    {
      status: 200,
      statusText:
        "The backend is being mocked and your request didn't actually do anyting. If you're a user and seeing this, or if you're a developer working on the backend, this is a problem and you should contact the developer. Otherwise, you can ignore this.",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
);
