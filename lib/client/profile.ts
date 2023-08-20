import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/client/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth } from "@/lib/client/firebase";
import { StateContext } from "./context";
import { useContext } from "react";

export interface Profile {
  discordTag: string;
  ign: string;
  avatar: string;
  teamId: string;
}

export async function setProfile(
  userId: string,
  ign: string,
  discordTag: string
): Promise<void> {
  await updateDoc(doc(db, "profiles", userId), {
    ign: ign,
    discordTag: discordTag,
  });
}

/**
 * returns the currently logged in user's profile, whether it's loading, and if there's an error.
 */
export function useProfile() {
  const { profile, loading, errors } = useContext(StateContext);

  return { profile: profile, profileLoading: loading, profileError: errors[1] };
}

export async function getProfile(userId: string): Promise<Profile> {
  const profile = await getDoc(doc(db, `profiles/${userId}`));

  if (!profile.exists()) {
    return Promise.reject();
  }

  return Promise.resolve({
    discordTag: profile.data()?.discordTag ?? "",
    ign: profile.data()?.ign ?? "",
    teamId: profile.data()?.teamId ?? "",
    avatar: profile.data()?.avatar ?? "",
  });
}
