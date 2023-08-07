"use client";
import { signIn, signUp } from "@/lib/client/auth";
import { useCallback, useState } from "react";

export default function AuthForm() {
  const [signingIn, setSigningIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = useCallback(async () => {
    // TODO: add proper error handling
    if (signingIn) {
      let { result, error } = await signIn(email, password);
      console.log(result, error);
    } else {
      let { result, error } = await signUp(email, password);
      console.log(result, error);
    }
  }, [email, password, signingIn]);

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={onSubmit}>
        Submit
      </button>
      <button type="button" onClick={() => setSigningIn(!signingIn)}>
        {signingIn
          ? "Don't have an account? Sign up now!"
          : "Already have an account? Sign in now!"}
      </button>
    </form>
  );
}
