import { auth, db } from "@/lib/client/firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { getGravatarUrl } from "./gravatar";
import { StateContext } from "./context";
import { useContext } from "react";

export async function signUp(
  email: string,
  password: string,
  ign: string,
  discordTag: string
): Promise<{ result: UserCredential | null; error: any }> {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);

    const userId = result.user.uid;
    await setDoc(doc(db, "profiles", userId), {
      ign: ign,
      discordTag: discordTag,
      teamId: "",
      avatar: getGravatarUrl(email),
    });
  } catch (e) {
    error = e;
  }

  return Promise.resolve({ result, error });
}

export async function signIn(
  email: string,
  password: string
): Promise<{ result: UserCredential | null; error: any }> {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return Promise.resolve({ result, error });
}

export function useUser() {
  const { user, loading, errors } = useContext(StateContext);

  return {
    user: user === undefined ? null : user,
    userLoading: loading,
    userError: errors[0],
  };
}

export async function signOut(): Promise<void> {
  await auth.signOut();
}
