import { ERRORS } from "./errors";

export function getArg<T>(body: any): T {
  let { arg } = body;
  arg = arg as T;

  if (arg === undefined) {
    throw ERRORS.BAD_ARGS;
  }

  return arg as T;
}
