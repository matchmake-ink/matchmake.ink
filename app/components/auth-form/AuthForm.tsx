"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthForm() {
  const backendClient = createClientComponentClient();
  return (
    <Auth
      supabaseClient={backendClient}
      providers={["discord"]}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      onlyThirdPartyProviders={true}
      redirectTo="/auth/callback"
    />
  );
}
