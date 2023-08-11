"use client";
import { signIn, signUp } from "@/lib/client/auth";
import { useCallback, useState } from "react";
import Button from "./button";
import Input from "./input";

export default function AuthForm() {
  const [signingIn, setSigningIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ign, setIgn] = useState<string>("");
  const [discordTag, setDiscordTag] = useState<string>("");

  const onSubmit = useCallback(async () => {
    // TODO: add proper error handling
    if (signingIn) {
      let { result, error } = await signIn(email, password);
      console.log(result, error);
    } else {
      let { result, error } = await signUp(email, password, ign, discordTag);
      console.log(result, error);
    }
  }, [email, password, signingIn, ign, discordTag]);

  return (
    <form className="flex flex-col align-center justify-center">
      <div className="flex flex-col justify-center align-center m-auto min-w-[24rem]">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
        />
        {signingIn ? (
          <></>
        ) : (
          <>
            <Input
              label="Discord Tag"
              type="text"
              value={discordTag}
              onChange={(value) => setDiscordTag(value)}
            />
            <Input
              label="IGN"
              type="text"
              value={ign}
              onChange={(value) => setIgn(value)}
            />
          </>
        )}
        <Button color="primary" onClick={onSubmit} label="Submit" />
      </div>

      <button
        type="button"
        className="text-accent-500 hover:text-accent-400 transition-colors my-4"
        onClick={() => setSigningIn(!signingIn)}
      >
        {signingIn
          ? "Don't have an account? Sign up now!"
          : "Already have an account? Sign in now!"}
      </button>
    </form>
  );
}
