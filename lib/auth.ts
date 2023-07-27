import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export async function signUp(
  email: string,
  password: string
): Promise<{ result: UserCredential | null; error: any }> {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
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

  return { result, error };
}

export function useUser() {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
}
