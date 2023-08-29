"use client";
import AuthForm from "@/components/auth-form";
import Button from "@/components/button";
import { auth } from "@/lib/client/auth";

export default function AuthPage() {
  console.log(auth.getAuthResponse());
  console.log(localStorage);

  if (typeof window !== "undefined") {
    console.log("we are running on the client");
  } else {
    console.log("we are running on the server");
  }

  const authResponse = auth.getAuthResponse();

  return (
    <>
      <AuthForm />
      <ul>
        <li>Auth Status: {auth.getStatus()}</li>
        <li>
          Auth Uid: {authResponse === null ? "it's null" : authResponse.uid}
        </li>
      </ul>
      <Button
        label="Sign Out"
        color="primary"
        onClick={() => {
          auth.signOut();
        }}
      />
    </>
  );
}
