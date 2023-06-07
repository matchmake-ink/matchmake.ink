import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { backendClient } from "../backend/client";

export default function Login() {
  return (
    <Auth
      supabaseClient={backendClient}
      onlyThirdPartyProviders={true}
      providers={["discord"]}
      appearance={{ theme: ThemeSupa }}
      dark={true}
    />
  );
}
