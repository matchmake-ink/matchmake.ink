import { LocalStore } from "./store";
import { createContext } from "react";
import { AuthResponse } from "../interfaces";
import { makeRequest } from "./api";

enum AUTH_STATUS {
  LOGGED_IN,
  LOGGED_OUT,
}

interface AuthState {
  state: AUTH_STATUS;
  res: AuthResponse | null;
}

export class Auth {
  store: LocalStore<AuthState>;

  constructor() {
    this.store = new LocalStore<AuthState>("auth", {
      state: AUTH_STATUS.LOGGED_OUT,
      res: null,
    });
  }

  getStatus(): AUTH_STATUS {
    return this.store.get().state;
  }

  getAuthResponse(): AuthResponse | null {
    return this.store.get().res;
  }

  subscribe(listener: (data: AuthState) => void) {
    this.store.subscribe(listener);
  }

  unsubscribe(listener: (data: AuthState) => void) {
    this.store.unsubscribe(listener);
  }

  async signUpWithPassword(
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

    if (status === 200) {
      this.store.set({
        state: AUTH_STATUS.LOGGED_IN,
        res: result,
      });
    } else {
      this.store.set({
        state: AUTH_STATUS.LOGGED_OUT,
        res: null,
      });
    }

    return Promise.resolve({ result, statusText, status });
  }

  async signInWithPassword(
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

    if (status === 200) {
      this.store.set({
        state: AUTH_STATUS.LOGGED_IN,
        res: result,
      });
    } else {
      this.store.set({
        state: AUTH_STATUS.LOGGED_OUT,
        res: null,
      });
    }

    return Promise.resolve({ result, statusText, status });
  }

  async signOut(): Promise<void> {
    this.store.set({
      state: AUTH_STATUS.LOGGED_OUT,
      res: null,
    });

    return Promise.resolve();
  }
}

export const auth = new Auth();
