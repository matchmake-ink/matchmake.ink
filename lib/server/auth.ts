import { clientAuth } from "./firebase";
import { ERRORS } from "./errors";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getGravatarUrl } from "../gravatar";

export interface AuthSuccess {
  uid: string;
  email: string;
  avatar: string;
  token: string;
}

export async function signInWithPassword(email: string, password: string) {
  let res: AuthSuccess = {
    uid: "",
    email: "",
    token: "",
    avatar: "",
  };

  try {
    const { user } = await signInWithEmailAndPassword(
      clientAuth,
      email,
      password
    );

    res.token = await user.getIdToken();
    res.uid = user.uid;
    res.email = user.email === null ? "" : user.email;
    res.avatar =
      user.email === null
        ? "/images/user_placeholder.png"
        : getGravatarUrl(user.email);
  } catch (e) {
    throw ERRORS.AUTHENTICATION_FAILED;
  }

  return Promise.resolve(res);
}
