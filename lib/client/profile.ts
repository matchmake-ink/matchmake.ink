import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/client/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth } from "@/lib/client/firebase";

export interface Profile {
  discordTag: string;
  ign: string;
  teamId: string;
}

export async function setProfile(
  userId: string,
  ign: string,
  discordTag: string
): Promise<void> {
  await setDoc(doc(db, "profiles", userId), {
    ign: ign,
    discordTag: discordTag,
  });
}

/**
 * returns the currently logged in user's profile, whether it's loading, and if there's an error.
 */
export function useProfile() {
  const [value, loading, error] = useDocument(
    doc(db, `profiles/${auth.currentUser?.uid}`)
  );

  if (auth.currentUser?.uid === undefined) {
    return {
      profile: undefined,
      profileLoading: false,
      profileError: undefined,
    };
  }

  const profile: Profile = {
    discordTag: value?.data()?.discordTag ?? "",
    ign: value?.data()?.ign ?? "",
    teamId: value?.data()?.teamId ?? "",
  };

  return { profile: profile, profileLoading: loading, profileError: error };
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
  });
}
