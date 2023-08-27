import { StateContext } from "./context";
import { Store } from "./store";
import { AuthResponse } from "../interfaces";
import { makeRequest } from "./api";

enum AuthState {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
}

export class Auth {
  email: string = "";
  password: string = "";
  ign: string = "";
  discordTag: string = "";

  state: AuthState = AuthState.LOADING;

  async signUp(
    email: string,
    password: string,
    ign: string,
    discordTag: string
  ): Promise<{ result: AuthResponse; statusText: string; status: number }> {
    const { statusText, body, status } = await makeRequest(
      "POST",
      "/api/auth/signUp",
      {
        email,
        password,
        ign,
        discordTag,
      }
    );

    const result: AuthResponse = {
      token: body.token ?? "",
      uid: body.uid ?? "",
      email: body.email ?? "",
      avatar: body.avatar ?? "",
    };

    return Promise.resolve({ result, statusText, status });
  }

  async signIn(
    email: string,
    password: string
  ): Promise<{
    result: AuthResponse | null;
    status: number;
    statusText: string;
  }> {
    const { statusText, body, status } = await makeRequest(
      "POST",
      "/api/auth/signIn",
      {
        email,
        password,
      }
    );

    const result: AuthResponse = {
      token: body.token ?? "",
      uid: body.uid ?? "",
      email: body.email ?? "",
      avatar: body.avatar ?? "",
    };

    return Promise.resolve({ result, statusText, status });
  }
}
